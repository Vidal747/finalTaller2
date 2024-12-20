// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { CreateProductProps, UpdateProductProps } from './types';
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { ZodError, productSchema } from '@/schemas';
import { generateResponseApi, getUserIp } from '@/utils/functions';
import { uploadImage, deleteImage } from '@/libs/firebase/config';

const GetProducts = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Product',
                    canRead: true,
                },
                {
                    entityName: 'ImagesByProduct',
                    canRead: true,
                }
            ]
        });

        if (!response.ok) {
            return response;
        }

        const products = await prisma.product.findMany({
            orderBy: [
                {
                    name: 'desc'
                }
            ],
            select: {
                id: true,
                name: true,
                details: true,
                price: true,
                available: true,
                imagesByProduct: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                },
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!products || !products.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay servicios registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: products});
    } catch (error) {
        return generateResponseApi({});
    }
}

const CreateProduct = async (userId: string, session: string, values: CreateProductProps): Promise<ResponseApi> => {
    try {
        const { name, details, price, available, imagesByProduct, active } = productSchema.parse(values);
        const { ip, geolocation } = await getUserIp();
        const imagesOfTheProduct: any[] = [];
        
        const response = await validateUserPermissions({
            userId,
            session,
            permissions: [
                {
                    entityName: 'Product',
                    canCreate: true,
                },
                {
                    entityName: 'ImagesByProduct',
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

        const actualProduct = await prisma.product.findUnique({
            where: {
                name: name,
            }
        });

        if (actualProduct) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que ya existe un producto con este nombre.'});
        }

        if (imagesByProduct && imagesByProduct.length) {
            for (const image of imagesByProduct) {
                try {
                    const name = crypto.randomUUID();
                    const imageUrl = await uploadImage(image, 'services', name);
                    
                    imagesOfTheProduct.push({name, imageUrl});
                } catch (error) {
                    return {ok: false, status: 500, message: '¡Ups! Algo salió mal, estamos trabajando para resolverlo.'}
                }
            }
        }

        const productData = await prisma.product.create({
            data: {
                name,
                details,
                price,
                available,
                imagesByProduct: {
                    createMany: {
                        data: imagesOfTheProduct,
                    }
                },
                active
            }
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Create product',
                details: JSON.stringify({data: productData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Producto creado con exito.', data: [productData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const DeleteProduct = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Product',
                    canDelete: true,
                },
                {
                    entityName: 'ImagesByProduct',
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
        
        const productData = await prisma.product.delete({
            where: {
                id: id,
            },
            include: {
                imagesByProduct: true,
            }
        });

        productData.imagesByProduct.forEach(async ({ name }) => {            
            await deleteImage('services', name);
        });
        
        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Delete product',
                details: JSON.stringify({data: productData}),
            }
        })
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Producto eliminado con exito.', data: [productData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const GetProduct = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Product',
                    canRead: true,
                },
                {
                    entityName: 'ImagesByProduct',
                    canRead: true,
                }
            ]
        });

        if (!response.ok) {
            return response;
        }
        
        const productData = await prisma.product.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                details: true,
                price: true,
                available: true,
                imagesByProduct: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                },
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!productData) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que el producto no esta registrado en este momento.'});
        }

        return generateResponseApi({ok: true, data: [productData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const UpdateProduct = async (userId: string, session: string, values: UpdateProductProps): Promise<ResponseApi> => {
    try {
        const { id, name, details, price, available, imagesByProduct, active } = productSchema.parse(values);
        const { ip, geolocation } = await getUserIp();
        const imagesOfTheProduct: any[] = [];

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Product',
                    canUpdate: true,
                },
                {
                    entityName: 'ImagesByProduct',
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

        const actualProduct = await prisma.product.findUnique({
            where: {
                name: name,
                AND: {
                    id: {
                        not: id,
                    }                
                }
            }
        });

        if (actualProduct) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que ya existe un producto con este nombre.'});
        }

        if (imagesByProduct && imagesByProduct.length) {
            for (const image of imagesByProduct) {
                try {
                    const name = crypto.randomUUID();
                    const imageUrl = await uploadImage(image, 'services', name);
                    
                    imagesOfTheProduct.push({name, imageUrl});
                } catch (error) {
                    return {ok: false, status: 500, message: '¡Ups! Algo salió mal, estamos trabajando para resolverlo.'}
                }
            }

            const deleteImages = await prisma.imagesByProduct.findMany({
                where: {
                    productId: id,
                },
            });

            deleteImages.forEach(async ({ name }) => {
                await deleteImage('services', name);
            });

            await prisma.imagesByProduct.deleteMany({
                where: {
                    productId: id,
                }
            });
        }

        const productData = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                name,
                details,
                price,
                available,
                imagesByProduct: {
                    createMany: {
                        data: imagesOfTheProduct,
                    }
                },
                active
            },
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Update product',
                details: JSON.stringify({data: productData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Producto editado con exito.', data: [productData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const GetActiveProducts = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const products = await prisma.product.findMany({
            where: {
                active: true,
            },
            orderBy: [
                {
                    name: 'desc'
                }
            ],
            select: {
                id: true,
                name: true,
                details: true,
                price: true,
                available: true,
                imagesByProduct: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                },
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!products || !products.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay servicios registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: products});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { GetProducts, CreateProduct, DeleteProduct, GetProduct, UpdateProduct, GetActiveProducts };