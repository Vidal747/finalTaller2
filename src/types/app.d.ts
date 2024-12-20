import { ZodIssue } from 'zod';

interface ResponseApi {
    ok: boolean;
    status: number;
    message: string;
    data?: any[];
    issues?: ZodIssue[];
}

interface Option {
    id: string;
    name: string;
}

interface CustomUser {
    role: {
        id: string;
        name: string;
    };
    user: string;
    id: string;
    name: string;
    phone: string;
    email: string;
    imageUrl: string;
    nextPasswordChange: Date | null;
    session: string | null;
    sessionExpiration: Date | null;
    accessToken: string | null;
    accessTokenExpiration: Date | null;
}