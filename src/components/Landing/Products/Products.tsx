'use client';

// components
import { ProductCard } from '@/components/ProductCard';
// Sources
import { Props } from './types';
import { Button, Card, Link } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Styles
import 'swiper/css';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Autoplay } from 'swiper/modules';

export function Products({ products }: Props) {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme('light');
    }, []);

    return (
        <div className='relative overflow-x-hidden'>
            <section className='py-10' id='plans'>
                <div className='max-w-5xl my-10 mx-auto px-5 md:px-0'>
                    <h2 className='text-4xl md:text-5xl text-center font-black'>
                        Mas de 14 años de experiencia en el mercado digital
                    </h2>
                    <p className='text-lg text-center flex gap-3 py-20 justify-center items-center'>
                        <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                        Somos la agencia digital que potencia tu marca con creatividad y tecnología. Conectamos clientes con su público objetivo. En Softing SAS escuchamos, entendemos, investigamos y analizamos, combinando creatividad y tecnología. Generemos experiencias memorables con tácticas de marketing digital integrales que aumentan las ventas de tu negocio.
                        <span className='hidden md:flex w-12 border-b-3 border-primary rounded-full'></span>
                    </p>
                    <h2 className='text-4xl md:text-5xl text-center font-black'>
                        NUESTROS PLANES
                    </h2>
                </div>
                <div className='flex flex-wrap justify-center py-14 md:hidden'>
                    <Swiper
                        grabCursor
                        loop
                        speed={10000}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.5,
                            },
                            768: {
                                slidesPerView: 3,
                            }
                        }}
                        autoplay={{ delay: 1, disableOnInteraction: false, }}
                        modules={[Autoplay]}
                        className='absolute w-screen bg-sliderLinear'
                    >
                        {products?.map(({ id, name, details, price, available, imagesByProduct }) => (
                            <SwiperSlide key={id} className='[display:flex_!important] mx-4 justify-center '>
                                <ProductCard
                                    name={name}
                                    details={details}
                                    imageUrl={imagesByProduct[0]?.imageUrl}
                                    price={price}
                                    available={available}
                                    variant='slider'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='hidden md:flex flex-wrap justify-center gap-8 my-14'>
                    {products?.map(({ id, name, details, price, available, imagesByProduct }) => (
                        <Card key={id} className='flex justify-center mx-10 h-auto w-auto'>
                            <ProductCard
                                name={name}
                                details={details}
                                imageUrl={imagesByProduct[0]?.imageUrl}
                                price={price}
                                available={available}
                                variant='slider'
                            />
                        </Card>
                    ))}
                </div>
                <p className='text-lg text-center max-w-xl md:mx-auto my-10 mx-2'>
                    ¿No encontraste el servicio que buscas? No te preocupes, contáctanos y te ayudaremos a encontrar la solución a tu necesidad.
                </p>
                <Button
                    as={Link}
                    href='/plans'
                    className='w-fit flex mx-auto px-8 py-6 rounded-[0_1.5rem_0_1.5rem] text-white bg-black'
                >
                    CONOCER TODOS LOS PLANES
                </Button>
            </section>
            <div className="absolute bottom-0 left-0 items-end justify-start p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-3.png"
                    alt="mancha"
                    width={400}
                    height={300}
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
            <div className="absolute top-0 right-0 items-start justify-end p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
        </div>
    );
};
