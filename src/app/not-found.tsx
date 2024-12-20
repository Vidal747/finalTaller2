// Sources
import { Button, Link, Image } from '@nextui-org/react';

export default function NotFound() {
    return (
        <div className='w-screen h-screen bg-bgSignin bg-cover bg-center'>
            <div className='w-full h-full p-5 flex gap-4 flex-col justify-center items-center bg-black/40 backdrop-blur-sm'>
                <h2 className='text-center text-5xl font-bold'>
                    ¿Te has perdido?
                </h2>
                <p className='text-center text-xl'>
                    La página que consultas no existe o se encuentra en mantenimiento
                </p>
                <Image
                    src='/assets/page404.svg'
                    alt='pagina 404 Market Poli'
                    width={320}
                    className='w-80 h-auto mx-auto'
                    draggable='false'
                />
                <Button
                    as={Link}
                    href='/'
                    variant='bordered'
                    color='secondary'
                    className='w-64 text-xl font-semibold'
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    )
}