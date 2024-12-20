// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { generateResponseApi } from '@/utils/functions';

const GetRoles = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Role',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }

        const roles = await prisma.role.findMany({
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
            }
        });
        
        if (!roles || !roles.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay roles registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: roles});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { GetRoles };