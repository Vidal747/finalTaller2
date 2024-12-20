// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { CreateUserProps, UpdateUserProps } from './types';
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { ZodError, userSchema } from '@/schemas';
import { generateResponseApi, getUserIp } from '@/utils/functions';
import { hash } from 'bcrypt';

const GetUsers = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'User',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }

        const users = await prisma.user.findMany({
            orderBy: [
                {
                    name: 'desc'
                }
            ],
            select: {
                id: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                name: true,
                phone: true,
                email: true,
                imageUrl: true,
                user: true,
                active: true,
                logged: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!users || !users.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay usuarios registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: users});
    } catch (error) {
        return generateResponseApi({});
    }
}

const CreateUser = async (userId: string, session: string, values: CreateUserProps): Promise<ResponseApi> => {
    try {
        const { roleId, name, phone, email, imageUrl, user, password, active } = userSchema.parse(values);
        const { ip, geolocation } = await getUserIp();
        
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'User',
                    canCreate: true,
                },
                {
                    entityName: 'Role',
                    canRead: true,
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

        const actualUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { user: user},
                    { email: email},
                ],
            }
        });

        if (actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que ya existe un usuario con este email o usuario.'});
        }

        const hashedPassword = await hash(password, 10);

        const userData = await prisma.user.create({ 
            data: {
                roleId,
                name,
                phone,
                email,
                imageUrl: imageUrl || 'https://api.dicebear.com/7.x/bottts/svg',
                user,
                password: hashedPassword,
                active
            } 
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Create user',
                details: JSON.stringify({data: userData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Usuario creado con exito.', data: [userData]});
    } catch (error) {
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const DeleteUser = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'User',
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
        
        const userData = await prisma.user.delete({
            where: {
                id: id,
            },
        });
        
        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Delete user',
                details: JSON.stringify({data: userData}),
            }
        })
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Usuario eliminado con exito.', data: [userData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const GetUser = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'User',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }
        
        const userData = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                name: true,
                phone: true,
                email: true,
                imageUrl: true,
                user: true,
                active: true,
                logged: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!userData) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que el usuario no esta registrado en este momento.'});
        }

        return generateResponseApi({ok: true, data: [userData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const UpdateUser = async (userId: string, session: string, values: UpdateUserProps): Promise<ResponseApi> => {
    try {
        const { id, roleId, name, phone, email, imageUrl, user, password, active } = userSchema.parse(values);
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'User',
                    canUpdate: true,
                },
                {
                    entityName: 'Role',
                    canRead: true,
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

        const actualUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { user: user},
                    { email: email},
                ],
                id: {
                    not: id
                }
            }
        });

        if (actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que ya existe un usuario con este email o usuario.'});
        }

        const hashedPassword = await hash(password, 10);

        const userData = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                roleId,
                name,
                phone,
                email,
                imageUrl,
                user,
                password: password ? hashedPassword : undefined,
                active
            },
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Update user',
                details: JSON.stringify({data: userData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Usuario editado con exito.', data: [userData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

export { GetUsers, CreateUser, DeleteUser, GetUser, UpdateUser };