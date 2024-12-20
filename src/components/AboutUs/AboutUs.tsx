import { Image } from '@nextui-org/react';

export function AboutUs() {
    return (
        <div className='relative'>
            <article className='w-full max-w-5xl mx-auto px-5 md:px-0'>
                <Image
                    src="/assets/group.jpg"
                    alt="group"
                    className='h-32 w-52 md:h-60 md:w-80 md:block'
                />
                <h2 className='text-4xl md:text-5xl font-black'>
                    Quienes somos
                    <span className='block w-20 mt-3 border-b-3 border-primary rounded-full'></span>
                </h2>

                <p className='text-lg text-justify mt-4 mb-10'>
                    Somos la agencia digital que potencia tu marca con creatividad y tecnología.
                    Conectamos clientes con su público objetivo. En Market Poli SAS escuchamos, entendemos, investigamos y analizamos, combinando creatividad y tecnología.
                    Generemos experiencias memorables con tácticas de marketing digital integrales que aumentan las ventas de tu negocio.
                    con mas 14 años de experiencia.
                    ¡Desarrollamos estrategias enfocadas en resultados!
                </p>
            </article>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-2.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
            <div className="absolute bottom-0 left-0 items-end justify-start p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-3.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
        </div>
    )
}; 