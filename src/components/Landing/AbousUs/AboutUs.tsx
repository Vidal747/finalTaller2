// Sources
import { Button, Link } from '@nextui-org/react';

export function AboutUs() {
    return (
        <section className='py-40 px-5 cut-right relative z-10' id='aboutUs'>
            <div className='max-w-5xl mx-auto px-10 md:px-0 flex gap-10 flex-col'>
                <h5 className='text-4xl md:text-5xl text-primary text-center md:text-start font-black'>
                    ¿QUIENES SOMOS?
                    <span className='block w-20 mt-3 mx-auto md:mx-0 border-b-1 border-black rounded-full'></span>
                </h5>
                <p className='max-w-md mx-auto text-black text-center md:text-start'>
                    Somos la agencia digital que potencia tu marca con creatividad y tecnología.
                    Conectamos clientes con su público objetivo. En Market Poli SAS escuchamos, entendemos, investigamos y analizamos,
                    combinando creatividad y tecnología. .
                    <br />

                </p>
                <Button
                    as={Link}
                    href='/aboutUs'
                    color='primary'
                    className='w-fit px-8 py-6 flex md:inline-flex mx-auto md:mx-0 md:ml-auto rounded-[0_1.5rem_0_1.5rem] text-black font-bold'
                >
                    CONOCE MÁS DE NOSOTROS
                </Button>
            </div>
        </section>
    )
};