import { NextResponse } from 'next/server';
// Controllers
import { GetArticles, CreateArticle } from '@/controllers';
import { CreateArticleProps } from '@/controllers/articles/types';
// Sources
import { generateResponseApi } from '@/utils/functions';
import { getToken } from 'next-auth/jwt';

async function GET(req: Request) {
    try {
        const token = await getToken({req: req as any});

        if (!token || !token.user.id || !token.user.session) {
            return NextResponse.json(generateResponseApi({status: 401, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'}), {status: 401});   
        }
        
        const result = await GetArticles(token.user.id, token.user.session);
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

async function POST(req: Request) {
    try {
        const token = await getToken({req: req as any});

        if (!token || !token.user.id || !token.user.session) {
            return NextResponse.json(generateResponseApi({status: 401, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'}), {status: 401});   
        }

        const formData = await req.formData();
        const data: Record<string, any>  = {};

        formData.forEach((value, key) => {
            if (key.includes('imageUrl')) {
                const newData: any[] = data['imageUrl'] || [];
                newData.push(value);

                data['imageUrl'] = newData
            } else {
                data[key] = value;
            }
        });
        
        const result = await CreateArticle(token.user.id, token.user.session, data as CreateArticleProps);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

export { GET, POST };