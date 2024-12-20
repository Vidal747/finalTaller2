'use client';
import { useState } from 'react';
// Sources
import { servicesData } from './OurServices.data';
import { Button, Link } from '@nextui-org/react';
import { HiChevronDoubleDown } from "react-icons/hi";

export function OurServices() {
    const [showInfo, setShowInfo] = useState(true);
    function refreshBgImage() {
        return (
            <>
                <div className='bg-bgServices'></div>
                <div className='bg-bgServices2'></div>
                <div className='bg-bgServices3'></div>
            </>
        )
    }
    refreshBgImage();
    return (
        <div className='flex flex-col py-5 bg-center bg-cover'>
            <section className='py-40 px-5 bg-secondary/20 cut-left relative z-10'>
                <div className='max-w-7xl mx-auto px-5 md:px-0 flex gap-20 flex-col md:flex-row items-center'>
                    <div className='justify-center text-center'>
                        <h5 className='text-4xl md:text-5xl text-primary text-center font-black'>
                            ¡QUE ESPERAS!
                            <span className='block w-20 mt-3 mx-auto md:mx-0 border-b-1 border-black rounded-full'></span>
                        </h5>
                        <p className='max-w-md mx-auto md:mx-0 my-8 text-black text-lg text-center'>
                            Recuerda que tu satisfacción es nuestra prioridad y tu experiencia memorable es nuestro compromiso.
                        </p>
                        <Button
                            as={Link}
                            href='/plans'
                            color='primary'
                            className='w-fit px-8 flex md:inline-flex mx-auto rounded-[0_1.5rem_0_1.5rem] text-black font-bold'
                        >
                            NUESTROS PLANES
                        </Button>
                    </div>
                    <div className='hidden md:flex gap-10 flex-wrap justify-around'>
                        {servicesData.map(({ title, description, bgImage }, index) => (
                            <div key={index} className='relative w-[340px] h-[340px] flex items-center justify-center overflow-hidden'>
                                <div className={`absolute inset-0 bg-${bgImage} bg-center bg-cover opacity-60`}></div>
                                <div className='relative z-10 flex flex-col items-center justify-center w-[300px] h-[300px] p-4'>
                                    <h1 className='text-xl md:text-3xl text-black font-bold text-center'>
                                        {title}
                                    </h1>
                                    <span className='text-sm md:text-base font-medium text-black text-center'>
                                        {description}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:hidden text-center">
                        <span
                            onClick={() => setShowInfo(!showInfo)}
                            className={`flex items-center gap-2 px-8 text-xl underline text-secondary font-bold cursor-pointer`}
                        >
                            <HiChevronDoubleDown className={`transform ${showInfo ? 'rotate-180' : ''}`} />
                            {showInfo ? 'Ocultar informacion' : 'Mostrar informacion'}
                            <HiChevronDoubleDown className={`transform ${showInfo ? 'rotate-180' : ''}`} />
                        </span>
                    </div>
                </div>


                {showInfo && (
                    <div className='flex gap-10 flex-wrap justify-around mt-8 md:hidden'>
                        {servicesData.map(({ title, description, bgImage }, index) => (
                            <div key={index} className='relative w-[340px] h-[340px] flex items-center justify-center rounded-full overflow-hidden'>
                                <div className={`absolute inset-0 bg-${bgImage} bg-center bg-cover opacity-60`}></div>
                                <div className='relative z-10 flex flex-col items-center justify-center w-[300px] h-[300px] rounded-full p-4'>
                                    <h1 className='text-xl md:text-3xl text-black font-bold text-center'>
                                        {title}
                                    </h1>
                                    <span className='text-sm md:text-base font-medium text-black text-center'>
                                        {description}
                                    </span>
                                </div>
                            </div>
                        ))}
                       </div>
                )}
            </section>
        </div>
    );
};
