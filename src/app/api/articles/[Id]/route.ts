import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';
// Controllers
import { DeleteArticle, GetArticle, UpdateArticle } from '@/controllers';
import { UpdateArticleProps } from '@/controllers/articles/types';
// Sources
import { generateResponseApi } from '@/utils/functions';
import { getToken } from 'next-auth/jwt';

async function GET(req: Request, { params }: Params) {
    try {
        const token = await getToken({req: req as any});

        if (!token || !token.user.id || !token.user.session) {
            return NextResponse.json(generateResponseApi({status: 401, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'}), {status: 401});   
        }

        const result = await GetArticle(token.user.id, token.user.session, params.Id);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

async function DELETE(req: Request, { params }: Params) {
    try {
        const token = await getToken({req: req as any});

        if (!token || !token.user.id || !token.user.session) {
            return NextResponse.json(generateResponseApi({status: 401, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'}), {status: 401});   
        }
        
        const result = await DeleteArticle(token.user.id, token.user.session, params.Id);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

async function PUT(req: Request, { params }: Params) {
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
        data['id'] = params.Id;
        
        const result = await UpdateArticle(token.user.id, token.user.session, data as UpdateArticleProps);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

export { GET, DELETE, PUT };