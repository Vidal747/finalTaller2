// sources
import { prisma } from '@/libs/prisma';
import { Actions, CredentialsLoginProps, GoogleLoginProps, ValidateUserPermissionsProps } from './types';
import { ZodError, credentialsLoginSchema, googleLoginSchema } from '@/schemas';
import { compare, hash } from 'bcrypt';
import { ResponseApi } from '@/types/app';
import { generateResponseApi, getUserIp } from '@/utils/functions';

const CredentialsLogIn = async (credentials: CredentialsLoginProps): Promise<ResponseApi> => {
    try {
        const { user, password } = credentialsLoginSchema.parse(credentials);
        const { ip, geolocation } = await getUserIp();

        const actualUser = await prisma.user.findUnique({ 
            where: {
                user,
                active: true,
            },
        });
        
        // Check that the user is active or exist
        if (!actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que el usuario no está registrado o su cuenta está inactiva. Verifica tus credenciales.'});
        }

        // Validate if the user is blocked by attempts and if it can be activated
        if (actualUser.loginAttempts >= 4 && actualUser.unlockDate! < new Date()) {
            await prisma.user.update({
                where: { id: actualUser.id, loginAttempts: {gte: 4}, unlockDate: {lt: new Date()}},
                data: {
                    loginAttempts: 0,
                    unlockDate: null,
                    logged: false,
                    session: null,
                    sessionExpiration: null,
                    accessToken: null,
                    accessTokenExpiration: null,
                    log: {
                        create: [
                            {
                                ipAddress: ip,
                                geolocation: JSON.stringify(geolocation),
                                action: 'Unlocked user',
                                details: JSON.stringify({reason: 'Its time to unlock'}),
                            }
                        ],
                    }
                }
            })
        }

        // Validate if the user is blocked by attempts
        if (actualUser.loginAttempts >= 4 && actualUser.unlockDate! > new Date()) {
            await prisma.log.create({
                data: {
                    userId: actualUser.id,
                    ipAddress: ip,
                    geolocation: JSON.stringify(geolocation),
                    action: 'Failed login',
                    details: JSON.stringify({reason: 'Blocked by attempts'}),
                }
            });

            return generateResponseApi({status: 400, message: '¡Ups! Parece que tu cuenta está bloqueada por intentos fallidos. Inténtalo nuevamente más tarde.'});
        }

        // Validate that the user does not enter an incorrect password
        const isValidPassword = await compare(password, actualUser.password);

        if (!isValidPassword) {
            await prisma.user.update({
                where: { id: actualUser.id },
                data: {
                    loginAttempts: actualUser.loginAttempts + 1,
                    unlockDate: actualUser.loginAttempts >= 4 ? new Date(new Date().getTime() + 5 * 60000) : actualUser.unlockDate,
                    logged: false,
                    session: null,
                    sessionExpiration: null,
                    accessToken: null,
                    accessTokenExpiration: null,
                    log: {
                        create: [
                            {
                                ipAddress: ip,
                                geolocation: JSON.stringify(geolocation),
                                action: 'Failed login',
                                details: JSON.stringify({reason: 'Incorrect password'}),
                            }
                        ],
                    }
                }
            });

            return generateResponseApi({status: 400, message: '¡Ups! Verifica tus credenciales e inténtalo nuevamente.'});
        }

        // Update the user data, generate a new session and generate a new log
        const session = await hash(crypto.randomUUID(), 10);

        const userData = await prisma.user.update({
            where: { id: actualUser.id },
            data: {
                loginAttempts: 0,
                unlockDate: null,
                logged: true,
                session,
                sessionExpiration: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
                accessToken: null,
                accessTokenExpiration: null,
                log: {
                    create: [
                        {
                            ipAddress: ip,
                            geolocation: JSON.stringify(geolocation),
                            action: 'Login',
                            details: JSON.stringify({reason: 'Successful login with credentials'}),
                        }
                    ]
                }
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
                nextPasswordChange: true,
                session: true,
                sessionExpiration: true,
                accessToken: true,
                accessTokenExpiration: true,
            }
        });
        
        return generateResponseApi({ok: true, data: [userData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }

        return generateResponseApi({});
    }
}

const GoogleLogIn = async (account: GoogleLoginProps): Promise<ResponseApi> => {
    try {
        const { email, picture, accessToken, accessTokenExpiration } = googleLoginSchema.parse(account);
        const { ip, geolocation } = await getUserIp();

        const actualUser = await prisma.user.findUnique({ 
            where: {
                email,
                active: true,
            },
        });
        
        // Check that the user is active or exist
        if (!actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que el usuario no está registrado o su cuenta está inactiva. Verifica tus credenciales.'});
        }

        // Validate if the user is blocked by attempts and if it can be activated
        if (actualUser.loginAttempts >= 4 && actualUser.unlockDate! < new Date()) {
            await prisma.user.update({
                where: { id: actualUser.id, loginAttempts: {gte: 4}, unlockDate: {lt: new Date()}},
                data: {
                    loginAttempts: 0,
                    unlockDate: null,
                    logged: false,
                    session: null,
                    sessionExpiration: null,
                    accessToken: null,
                    accessTokenExpiration: null,
                    log: {
                        create: [
                            {
                                ipAddress: ip,
                                geolocation: JSON.stringify(geolocation),
                                action: 'Unlocked user',
                                details: JSON.stringify({reason: 'Its time to unlock'}),
                            }
                        ],
                    }
                }
            })
        }

        // Validate if the user is blocked by attempts
        if (actualUser.loginAttempts >= 4 && actualUser.unlockDate! > new Date()) {
            await prisma.log.create({
                data: {
                    userId: actualUser.id,
                    ipAddress: ip,
                    geolocation: JSON.stringify(geolocation),
                    action: 'Failed login',
                    details: JSON.stringify({reason: 'Blocked by attempts'}),
                }
            });

            return generateResponseApi({status: 400, message: '¡Ups! Parece que tu cuenta está bloqueada por intentos fallidos. Inténtalo nuevamente más tarde.'});
        }

        // Update the user data, generate a new session and generate a new log
        const session = await hash(crypto.randomUUID(), 10);

        const userData = await prisma.user.update({
            where: { id: actualUser.id },
            data: {
                loginAttempts: 0,
                unlockDate: null,
                logged: true,
                imageUrl: picture,
                session,
                sessionExpiration: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
                accessToken: accessToken,
                accessTokenExpiration: accessTokenExpiration,
                log: {
                    create: [
                        {
                            ipAddress: ip,
                            geolocation: JSON.stringify(geolocation),
                            action: 'Login',
                            details: JSON.stringify({reason: 'Successful login with google'}),
                        }
                    ]
                }
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
                nextPasswordChange: true,
                session: true,
                sessionExpiration: true,
                accessToken: true,
                accessTokenExpiration: true,
            }
        });
        
        return generateResponseApi({ok: true, data: [userData]});
    } catch (error) {
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }

        return generateResponseApi({});
    }
}

const LogOut = async (userId: string): Promise<ResponseApi> => {
    try {
        const { ip, geolocation } = await getUserIp();

        await prisma.user.update({
            where: { id: userId },
            data: {
                loginAttempts: 0,
                unlockDate: null,
                logged: false,
                session: null,
                sessionExpiration: null,
                accessToken: null,
                accessTokenExpiration: null,
                log: {
                    create: [
                        {
                            ipAddress: ip,
                            geolocation: JSON.stringify(geolocation),
                            action: 'Logout',
                            details: JSON.stringify({reason: 'Successful logout'}),
                        }
                    ]
                }
            },
        });
        
        return generateResponseApi({ok: true, message: '¡Hasta pronto!'});
    } catch (error) {
        return generateResponseApi({});
    }
}

const ValidateUserSession = async (userId: string, session: string, withGoogle?: boolean): Promise<ResponseApi> => {
    try {        
        const actualUser = await prisma.user.findUnique({ 
            where: {
                id: userId,
                active: true,
            },
        });
        
        // Check that the user is active or exist
        if (!actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que el usuario no está registrado o su cuenta está inactiva.'});
        }

        // check that the session is active
        if (!actualUser.session || !actualUser.sessionExpiration || actualUser.session !== session || actualUser.sessionExpiration < new Date()) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'});
        }

        // check that the access token is active
        if (withGoogle && (!actualUser.accessToken || !actualUser.accessTokenExpiration || actualUser.accessTokenExpiration < new Date())) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que tu sesión de google ha expirado. Por favor, inicia sesión de nuevo con google.'});
        }
        
        return generateResponseApi({ok: true, data: [actualUser]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const validateUserPermissions = async ({ userId, session, withGoogle, permissions }: ValidateUserPermissionsProps): Promise<ResponseApi> => {
    try {
        const response = await ValidateUserSession(userId, session, withGoogle);

        if (!response.ok) {
            return response;
        }
        
        const actualUser = await prisma.user.findUnique({ 
            where: {
                id: userId,
            },
            select: {
                role: {
                    select: {
                        permissions: {
                            select: {
                                entity: true,
                                canCreate: true,
                                canRead: true,
                                canUpdate: true,
                                canDelete: true,
                            }
                        },
                    }
                }
            }
        });

        // Check that the user is active or exist
        if (!actualUser) {
            return generateResponseApi({status: 400, message: '¡Ups! Parece que el usuario no está registrado o su cuenta está inactiva.'});
        }

        const userPermissions = actualUser.role.permissions;
        
        // Validate that the user has the necessary permissions
        const errors = permissions.map(permission => {
            const userPermission = userPermissions.find(userPermission => userPermission.entity.name === permission.entityName);
        
            if (!userPermission) {
                return generateResponseApi({status: 400, message: '¡Ups! Parece que no tienes permisos para realizar esta acción.'});
            }
        
            const actions: Actions[] = [
                {id: 'Create', label: 'crear'},
                {id: 'Read', label: 'leer'},
                {id: 'Update', label: 'actualizar'},
                {id: 'Delete', label: 'eliminar'}
            ];
        
            for (const action of actions) {
                const canAction = permission[`can${action.id}`];
                const userCanAction = userPermission[`can${action.id}`];
            
                if (canAction && !userCanAction) {
                    return generateResponseApi({status: 400, message: `¡Ups! Parece que no tienes permisos para ${action.label}.`});
                }
            }
        });
        
        if (errors.length > 0 && errors[0]) {
            return errors[0];
        }
    
        return generateResponseApi({ok: true, data: [actualUser]});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { CredentialsLogIn, GoogleLogIn, LogOut, validateUserPermissions };