import { NextResponse } from 'next/server';
// Controllers
import { LogOut } from '@/controllers';

async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const result = await LogOut(data.userId);
        
        if (!result.ok) {
            return NextResponse.json(result, {status: result.status});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({
            ok: false,
            status: 500,
            message: '¡Ups! Algo salió mal, estamos trabajando para resolverlo.'
        }, {status: 500});
    }
}

export { POST };