'use client';

import { useState } from 'react';
// Sources
import { formatToCurrency } from '@/utils/functions';
import { Props } from './types';
import { Button, Link, Modal, ModalBody, ModalContent, Image } from '@nextui-org/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Styles
import 'swiper/css';

export function Info({ service }: Props) {
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <section className='px-5 md:px-0 w-full md:w-auto md:max-w-xl md:h-screen mr-auto flex flex-col justify-center'>
            <span className={`text-xl text-center md:text-start font-semibold ${service.available ? 'text-success' : 'text-danger'}`}>
                Disponibilidad: {service.available ? 'Disponible' : 'No disponible'}
            </span>
            <h1 className='text-5xl text-center md:text-start text-white font-extrabold my-2'>
                {service.name}
            </h1>
            {
                service.price === 0 ? (<h3 className='text-3xl text-center md:text-start text-white font-bold'>Precio dado por cotización</h3>) :
                    (
                        <>
                            <span className='text-xl text-center md:text-start text-white font-semibold'>
                                Desde
                            </span>
                            <h3 className='text-3xl text-center md:text-start text-white font-bold'>
                                <span translate='no'>
                                    {formatToCurrency(service.price)}
                                </span>
                                <span className='text-xl ml-2'>
                                    COP
                                </span>
                            </h3>
                        </>
                    )
            }

            <p className='line-clamp-4 text-lg text-center md:text-start text-white mt-4'>
                {service.details}
            </p>
            <div className='flex gap-4 justify-center md:justify-start mt-8'>
                <Button
                    as={Link}
                    href='https://api.whatsapp.com/send?phone=573008840362'
                    target='_blank'
                    color='primary'
                    endContent={<FaArrowRightLong />}
                    className='h-12 px-6 text-lg font-bold animate-vibrate'
                >
                    Agendar servicio
                </Button>
                <Button
                    variant='bordered'
                    endContent={<FaArrowRightLong />}
                    className='h-12 px-6 text-lg text-white font-bold'
                    onClick={() => setOpenDetails(true)}
                >
                    Ver Detalles
                </Button>
            </div>
            <Modal
                isOpen={openDetails}
                placement='center'
                scrollBehavior='outside'
                backdrop='opaque'
                size='3xl'
                onOpenChange={setOpenDetails}
                className='rounded-3xl'
            >
                <ModalContent>
                    <ModalBody
                        className='flex gap-10 flex-col items-start md:items-center md:flex-row p-10'
                    >
                        <section className='justify-end text centerw-full md:w-64'>
                            <span className={`text-base font-semibold ${service.available ? 'text-success' : 'text-danger'}`}>
                                Disponibilidad: {service.available ? 'Disponible' : 'No disponible'}
                            </span>
                            {
                                service.price === 0 ? (<h3 className='text-2xl font-semibold'> Precio dado por cotización </h3>) : (
                                    <>     <h1 className='text-3xl font-black'>
                                        {service.name}
                                    </h1>
                                        <span className='text-xl font-semibold'>
                                            Precios desde
                                        </span>
                                        <h3 className='text-2xl font-semibold'>
                                            {formatToCurrency(service.price)} COP
                                        </h3></>
                                )
                            }
                            <Swiper
                                grabCursor
                                loop
                                speed={1000}
                                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                                modules={[Autoplay]}
                                className='w-60 h-72 rounded-2xl mt-4 mx-[0_!important]'
                            >
                                {service.imagesByProduct.map(({ id, imageUrl }) => (
                                    <SwiperSlide key={id} className='w-full h-full'>
                                        <Image
                                            src={imageUrl}
                                            alt={`Imagen de servicio ${service.name}`}
                                            removeWrapper
                                            radius='none'
                                            className='w-full h-full object-cover'
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                        <section className=' text-start w-full'>
                            <h3 className='text-xl font-bold'>
                                Detalles
                            </h3>
                            <p className='text-sm whitespace-pre-line'>
                                {service.details}
                            </p>
                            <div className='flex gap-6  items-center mt-4'>
                                <Button
                                    as={Link}
                                    href='https://api.whatsapp.com/send?phone=573008840362'
                                    target='_blank'
                                    color='primary'
                                    endContent={<FaArrowRightLong />}
                                    className='h-12 m-auto px-6 text-lg font-bold animate-vibrate'
                                >
                                    Agendar servicio
                                </Button>
                            </div>
                        </section>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    )
};