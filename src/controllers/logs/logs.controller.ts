// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { generateResponseApi } from '@/utils/functions';

const GetLogs = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'Log',
                    canRead: true,
                },
                {
                    entityName: 'User',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }

        const logs = await prisma.log.findMany({
            orderBy: [
                {
                    timestamp: 'desc'
                }
            ],
            select: {
                id: true,
                timestamp: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                ipAddress: true,
                geolocation: true,
                action: true,
                details: true,
            }
        });
        
        if (!logs || !logs.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay logs registrados en este momento.'});
        }

        return generateResponseApi({ok: true, data: logs});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { GetLogs };