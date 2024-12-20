'use client';

// Components
import { ProductCard } from '@/components/ProductCard';
// Sources
import { Props } from './types';
import { Button } from '@nextui-org/react';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
// Styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useEffect, useRef } from 'react';

export function Aside({ setNextService, setPrevService, services, actualService }: Props) {
    const swiperRef = useRef(null);
  
    useEffect(() => {        
        if (!actualService || !swiperRef.current || !(swiperRef.current as any).swiper)
            return;

        const index = services.findIndex(service => service.id === actualService.id);
        const nextService = services[index + 1] || services[0];
        const nextIndex = services.findIndex(service => service.id === nextService.id);

        (swiperRef.current as any).swiper.slideTo(nextIndex);

    }, [services, actualService]);
    
    return (
        <aside className='w-full md:w-80 md:min-w-80 md:h-screen flex md:flex-col justify-between items-center bg-black/40'>
            <div className='w-full p-5 md:p-10 md:pb-5'>
                <span className='flex md:text-lg text-white font-semibold'>
                    Descubre más
                </span>
                <h1 className='text-3xl md:text-5xl text-white font-bold'>
                    PLANES
                </h1>
            </div>
            <div className='hidden md:block w-56 h-72'>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    ref={swiperRef}
                >
                    {services && services.map(({ id, name, details, price, available, imagesByProduct }) => (
                        <SwiperSlide
                            key={id}
                            className='rounded-3xl'
                        >
                            <ProductCard
                                name={name}
                                details={details}
                                imageUrl={imagesByProduct[0]?.imageUrl}
                                price={price}
                                available={available}
                                variant='cards'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='flex flex-col gap-4 items-center p-5 md:p-10 md:pt-5'>
                <Button
                    variant='light'
                    className='h-8 text-white gap-4 p-2 pl-10'
                    onClick={setNextService}
                >
                    Siguente
                    <FaArrowRightLong />
                </Button>
                <span className='w-full border-t-1 border-primary'></span>
                <Button
                    variant='light'
                    className='h-8 text-white gap-4 p-2 pr-10'
                    onClick={setPrevService}
                >
                    <FaArrowLeftLong />
                    Anterior
                </Button>
            </div>
        </aside>
    )
}