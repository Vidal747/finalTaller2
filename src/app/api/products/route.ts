import { NextResponse } from 'next/server';
// Controllers
import { GetProducts, CreateProduct } from '@/controllers';
import { CreateProductProps } from '@/controllers/products/types';
// Sources
import { generateResponseApi } from '@/utils/functions';
import { getToken } from 'next-auth/jwt';

async function GET(req: Request) {
    try {
        const token = await getToken({req: req as any});

        if (!token || !token.user.id || !token.user.session) {
            return NextResponse.json(generateResponseApi({status: 401, message: '¡Ups! Parece que tu sesión ha expirado. Por favor, inicia sesión de nuevo.'}), {status: 401});   
        }
        
        const result = await GetProducts(token.user.id, token.user.session);
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
        const data: Record<string, any> = {};

        formData.forEach((value, key) => {
            if (key.includes('imagesByProduct')) {
                const newData: any[] = data['imagesByProduct'] || [];
                newData.push(value);
                
                data['imagesByProduct'] = newData
            } else {
                data[key] = value;
            }
        });
        
        const result = await CreateProduct(token.user.id, token.user.session, data as CreateProductProps);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(generateResponseApi({}), {status: 500});
    }
}

export { GET, POST };