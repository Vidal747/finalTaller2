// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { CreateArticleProps, UpdateArticleProps } from './types';
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { ZodError, articleSchema } from '@/schemas';
import { generateResponseApi, getUserIp } from '@/utils/functions';
import { uploadImage, deleteImage } from '@/libs/firebase/config';

const GetArticles = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Article',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }

        const products = await prisma.article.findMany({
            orderBy: [
                {
                    title: 'desc'
                }
            ],
            select: {
                id: true,
                title: true,
                subtitle: true,
                description: true,
                imageName: true,
                imageUrl: true,
                tags: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!products || !products.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay articulos registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: products});
    } catch (error) {
        return generateResponseApi({});
    }
}

const CreateArticle = async (userId: string, session: string, values: CreateArticleProps): Promise<ResponseApi> => {
    try {
        const { title, subtitle, description, imageUrl, tags, active } = articleSchema.parse(values);
        const { ip, geolocation } = await getUserIp();
        const imageData = {imageUrl: '', imageName: ''};
        
        const response = await validateUserPermissions({
            userId,
            session,
            permissions: [
                {
                    entityName: 'Article',
                    canCreate: true,
                },
                {
                    entityName: 'Log',
                    canCreate: true,
                }
            ]
        });

        if (!response.ok) {
            return response;
        }

        if (imageUrl && imageUrl.length) {
            try {
                imageData.imageName = crypto.randomUUID();
                imageData.imageUrl = await uploadImage(imageUrl[0], 'articles', imageData.imageName);
            } catch (error) {
                return {ok: false, status: 500, message: '¡Ups! Algo salió mal, estamos trabajando para resolverlo. '}
            }
        }

        const articleData = await prisma.article.create({
            data: {
                title,
                subtitle,
                description,
                imageName: imageData.imageName,
                imageUrl: imageData.imageUrl,
                tags,
                active
            }
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Create article',
                details: JSON.stringify({data: articleData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Articulo creado con exito.', data: [articleData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const DeleteArticle = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Article',
                    canDelete: true,
                },
                {
                    entityName: 'Log',
                    canCreate: true,
                }
            ]
        });

        if (!response.ok) {
            return response;
        }
        
        const articleData = await prisma.article.delete({
            where: {
                id: id,
            },
        });

        if (articleData.imageName && articleData.imageUrl) {
            await deleteImage('articles', articleData.imageName);
        }
        
        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Delete article',
                details: JSON.stringify({data: articleData}),
            }
        })
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Articulo eliminado con exito.', data: [articleData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const GetArticle = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Article',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }
        
        const articleData = await prisma.article.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                subtitle: true,
                description: true,
                imageName: true,
                imageUrl: true,
                tags: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!articleData) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que el producto no esta registrado en este momento.'});
        }

        return generateResponseApi({ok: true, data: [articleData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const UpdateArticle = async (userId: string, session: string, values: UpdateArticleProps): Promise<ResponseApi> => {
    try {
        const { id, title, subtitle, description, imageUrl, tags, active } = articleSchema.parse(values);
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Article',
                    canUpdate: true,
                },
                {
                    entityName: 'Log',
                    canCreate: true,
                }
            ]
        });

        if (!response.ok) {
            return response;
        }

        const actualArticle = await prisma.article.findUnique({
            where: {
                id: id,
            }
        });

        let imageData = {imageUrl: actualArticle?.imageUrl, imageName: actualArticle?.imageName};

        if (imageUrl && imageUrl.length) {
            try {
                imageData.imageName = crypto.randomUUID();
                imageData.imageUrl = await uploadImage(imageUrl[0], 'articles', imageData.imageName);
            } catch (error) {
                return {ok: false, status: 500, message: '¡Ups! Algo salió mal, estamos trabajando para resolverlo.'}
            }
            
            if (actualArticle?.imageName) {
                await deleteImage('articles', actualArticle.imageName);
            }
        }

        const articleData = await prisma.article.update({
            where: {
                id: id,
            },
            data: {
                title,
                subtitle,
                description,
                imageName: imageData.imageName,
                imageUrl: imageData.imageUrl,
                tags,
                active
            },
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Update article',
                details: JSON.stringify({data: articleData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Articulo editado con exito.', data: [articleData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const GetActiveArticles = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const products = await prisma.article.findMany({
            where: {
                active: true,
            },
            orderBy: [
                {
                    title: 'desc'
                }
            ],
            select: {
                id: true,
                title: true,
                subtitle: true,
                description: true,
                imageName: true,
                imageUrl: true,
                tags: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!products || !products.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay articulos registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: products});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { GetArticles, CreateArticle, DeleteArticle, GetArticle, UpdateArticle, GetActiveArticles };