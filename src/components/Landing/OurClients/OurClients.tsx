// Sources
import { ourClientsData } from './OurClients.data';
import { Button, Link, Image } from '@nextui-org/react';

export function OurClients() {
    return (
        
        <section className='max-w-screen overflow-x-hidden py-40 px-5 -my-28 cut-right' id='transport'>
            <div className='max-w-5xl mx-auto px-5 md:px-0'>
                <h2 className='text-4xl md:text-5xl text-center font-black'>
                    NUESTROS CLIENTES
                </h2>
                <p className='text-lg text-center flex gap-3 justify-center items-center'>
                    <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                    Explora el universo de beneficios al trabajar con nosotros.
                    <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                </p>
                <div className='flex gap-8 flex-wrap-reverse justify-center mt-10'>
                    {ourClientsData.map(({ name, imageUrl }, index) => (
                        <span key={index} className='relative w-32'>
                            <Image
                                src={imageUrl}
                                alt={name}
                                draggable='false'
                                className='grayscale hover:grayscale-0'
                            />
                        </span>
                    ))}
                </div>
            </div>
            <div className='max-w-5xl mx-auto mt-20 px-5 md:px-0'>
                <h2 className='text-4xl md:text-5xl text-center font-black'>
                    NUESTRO EQUIPO
                </h2>
                <p className='text-lg text-center flex gap-3 justify-center items-center'>
                    <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                    Representamos la calidad con nuestro mejor de equipo de trabajo.
                    <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                </p>
                <p className='text-lg text-center mt-10'>
                    Nuestro equipo de trabajo está conformado por profesionales altamente capacitados y con amplia experiencia en el campo. Estamos comprometidos con la calidad y la garantia  en cada uno de nuestros servicios.
                </p>
                <Button
                    as={Link}
                    href='https://api.whatsapp.com/send?phone=573008840362'
                    target='_blank'
                    className='flex w-fit mx-auto mt-6 px-8 py-6 rounded-[0_1.5rem_0_1.5rem] text-white bg-black'
                >
                    CONOCER MÁS
                </Button>
            </div>
        </section>
    )
};
