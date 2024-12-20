'use client';

import { useRef } from 'react';
// Sources
import { neswData } from './News.data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Image } from '@nextui-org/react';
// Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function News() {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoPlayTimeLeft = (swiper: any, time: number, progress: number) => {
        progressCircle.current?.style.setProperty('--progress', (1 - progress).toString());
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
        }
    };

    return (
        <div className="relativey">
            <Swiper
                grabCursor
                centeredSlides
                loop
                speed={2000}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoPlayTimeLeft}
                className="-mt-16 w-screen h-[450px] md:h-screen cut-bottom-right"
            >
                {neswData.map(({ name, imageUrl }, index) => (
                    <SwiperSlide key={index} className="w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={name}
                            removeWrapper
                            radius="none"
                            className="w-full h-full object-cover rounded-b-lg"
                        />
                    </SwiperSlide>
                ))}
                <div className='absolute left-5 bottom-7 z-10 w-12 h-12 flex justify-center items-center font-bold text-white'>
                    <svg
                        viewBox=' 0 0 48 48'
                        ref={progressCircle}
                        className='[--progress:0] w-full h-full stroke-[4px] stroke-white fill-none [stroke-dashoffset:calc(125.6_*_(1_-_var(--progress)))] [stroke-dasharray:125.6] rotate-90'
                    >
                        <circle cx={24} cy={24} r={20}></circle>
                    </svg>
                    <span
                        ref={progressContent}
                        className='absolute'
                    >
                    </span>
                </div>
            </Swiper>

        </div>
    );
}
