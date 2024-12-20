'use client';

import { useRouter } from 'next/navigation';
// Sources
import { Props } from './types';
import { Button, Card, CardFooter, CardHeader, Link, Image } from "@nextui-org/react";
import { formatToCurrency, formatToURL } from '@/utils/functions';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';

export function ProductCard({ imageUrl, name, details, price, available, variant }: Props) {
    const router = useRouter();

    return (
        <Card
            className={`${variant === 'slider' ? 'w-72 h-[450px]' : 'w-56 h-72'} rounded-xl`}
            isPressable
            onClick={() => router.push(`/plans/${formatToURL(name)}`)}
        >
            <CardHeader className='absolute top-0 left-0'>
                <h2 className={`w-full ${variant === 'slider' ? 'text-lg' : 'text-sm'} text-center font-semibold bg-secondary text-white p-2 rounded-full overflow-hidden whitespace-nowrap text-ellipsis`}>
                    {name}
                </h2>
            </CardHeader>
            <Image
                src={imageUrl || '/assets/noImage.svg'}
                alt={`Imagen servicio ${name} Market Poli`}
                width={variant === 'slider' ? 288 : 224}
                height={variant === 'slider' ? 450 : 288}
                className='z-0 w-full h-full object-cover object-center'
                removeWrapper
                isZoomed
            />
            {variant === 'slider' ? <CardFooter className='absolute bottom-0 left-0 flex flex-col gap-4'>
                <div className='w-full p-4 text-white font-semibold bg-secondary bg-opacity-20 rounded-3xl'>
                    {
                        price === 0 ? (<h2 className='text-sm uppercase'> Precio dado por cotización </h2>) : (
                            <>
                                <p className='text-sm uppercase'>
                                    DESDE
                                </p>
                                <p className='text-3xl font-bold'>
                                    {formatToCurrency(price)}
                                </p>
                                <p className='text-sm uppercase'>
                                    Más recargas
                                </p>
                            </>
                        )

                    }
                </div>
                <div className='w-full flex gap-2'>
                    <Button
                        as={Link}
                        href='https://api.whatsapp.com/send?phone=5730160526274'
                        aria-label={`Agendar servicio ${name}`}
                        color='primary'
                        className='w-full text-lg text-black font-bold rounded-full animate-vibrate'
                        target='_blank'

                    >
                        CONTÁCTANOS
                    </Button>
                    <Button
                        as={Link}
                        href={`/services/${formatToURL(name)}`}
                        aria-label={`Ver detalles del servicio ${name}`}
                        color='primary'
                        isIconOnly
                        className='text-lg text-black rounded-full'
                    >
                        <PiDotsThreeOutlineVertical />
                    </Button>
                </div>
            </CardFooter> : null}
        </Card>
    )
};