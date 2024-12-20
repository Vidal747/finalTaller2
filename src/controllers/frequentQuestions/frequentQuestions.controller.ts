// Controllers
import { validateUserPermissions } from '@/controllers';
// Sources
import { CreateFrequentQuestionProps, UpdateFrequentQuestionProps } from './types';
import { ResponseApi } from '@/types/app';
import { prisma } from '@/libs/prisma';
import { ZodError, frequentQuestionSchema } from '@/schemas';
import { generateResponseApi, getUserIp } from '@/utils/functions';

const GetFrequentQuestions = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'FrequentQuestion',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }

        const frequentQuestions = await prisma.frequentQuestion.findMany({
            orderBy: [
                {
                    updatedAt: 'asc'
                }
            ],
            select: {
                id: true,
                title: true,
                question: true,
                answer: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!frequentQuestions || !frequentQuestions.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay preguntas frecuentes registradas en este momento.'});
        }

        return generateResponseApi({ok: true, data: frequentQuestions});
    } catch (error) {
        return generateResponseApi({});
    }
}

const CreateFrequentQuestion = async (userId: string, session: string, values: CreateFrequentQuestionProps): Promise<ResponseApi> => {
    try {
        const { title, question, answer, active } = frequentQuestionSchema.parse(values);
        const { ip, geolocation } = await getUserIp();
        
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'FrequentQuestion',
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

        const frequentQuestionData = await prisma.frequentQuestion.create({ 
            data: {
                title,
                question,
                answer,
                active
            } 
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Create frequent question',
                details: JSON.stringify({data: frequentQuestionData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Pregunta frecuente creada con exito.', data: [frequentQuestionData]});
    } catch (error) {
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const DeleteFrequentQuestion = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'FrequentQuestion',
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
        
        const frequentQuestionData = await prisma.frequentQuestion.delete({
            where: {
                id: id,
            },
        });
        
        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Delete frequent question',
                details: JSON.stringify({data: frequentQuestionData}),
            }
        })
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Pregunta frecuente eliminada con exito.', data: [frequentQuestionData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const GetFrequentQuestion = async (userId: string, session: string, id: string): Promise<ResponseApi> => {
    try {
        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'FrequentQuestion',
                    canRead: true,
                },
            ]
        });

        if (!response.ok) {
            return response;
        }
        
        const frequentQuestionData = await prisma.frequentQuestion.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                question: true,
                answer: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!frequentQuestionData) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que la pregunta frecuente no esta registrada en este momento.'});
        }

        return generateResponseApi({ok: true, data: [frequentQuestionData]});
    } catch (error) {
        return generateResponseApi({});
    }
}

const UpdateFrequentQuestion = async (userId: string, session: string, values: UpdateFrequentQuestionProps): Promise<ResponseApi> => {
    try {
        const { id, title, question, answer, active } = frequentQuestionSchema.parse(values);
        const { ip, geolocation } = await getUserIp();

        const response = await validateUserPermissions({
            userId, 
            session, 
            permissions: [
                {
                    entityName: 'FrequentQuestion',
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

        const frequentQuestionData = await prisma.frequentQuestion.update({
            where: {
                id: id,
            },
            data: {
                title,
                question,
                answer,
                active
            },
        });

        await prisma.log.create({
            data: {
                userId,
                ipAddress: ip,
                geolocation: JSON.stringify(geolocation),
                action: 'Update frequent question',
                details: JSON.stringify({data: frequentQuestionData}),
            }
        });
        
        return generateResponseApi({ok: true, message: '¡Bien hecho! Pregunta frecuente editada con exito.', data: [frequentQuestionData]});
    } catch (error) {        
        if (error instanceof ZodError) {
            return generateResponseApi({status: 400, message: '¡Ups! Por favor valida tus datos o intentalo de nuevo.', issues: error.issues});
        }
        return generateResponseApi({});
    }
}

const GetActiveFrequentQuestions = async (userId: string, session: string): Promise<ResponseApi> => {
    try {
        const frequentQuestion = await prisma.frequentQuestion.findMany({
            where: {
                active: true
            },
            orderBy: [
                {
                    updatedAt: 'asc'
                }
            ],
            select: {
                id: true,
                title: true,
                question: true,
                answer: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        
        if (!frequentQuestion || !frequentQuestion.length) {
            return generateResponseApi({status: 404, message: '¡Ups! Parece que no hay preguntas frecuentes registradas en este momento.'});
        }

        return generateResponseApi({ok: true, data: frequentQuestion});
    } catch (error) {
        return generateResponseApi({});
    }
}

export { GetFrequentQuestions, CreateFrequentQuestion, DeleteFrequentQuestion, GetFrequentQuestion, UpdateFrequentQuestion, GetActiveFrequentQuestions };