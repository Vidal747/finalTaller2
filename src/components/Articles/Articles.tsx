'use client';

import { useEffect, useState } from 'react';
// Sources
import { Props } from './types';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { formatDateTime } from '@/utils/functions';
import { toast } from 'react-toastify';

export function Articles({ articles, message }: Props) {
    const [actual, setActual] = useState(articles[0] || {});
    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        if (message) {
            toast.warning(message, { toastId: message });
        }
    }, []);

    return (
        <div className='relative'>
            <section className='py-40 px-5 -my-28 flex gap-6 flex-wrap justify-center'>
                <div className='w-full max-w-5xl mx-auto px-5'>
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            className='w-80 p-2'
                        >
                            <CardHeader>
                                <h2 className='text-2xl text-center md:text-start font-bold -mb-4'>
                                    {article.title}
                                </h2>
                            </CardHeader>
                            <CardBody>
                                <Image
                                    alt={`Imagen de ${article.title}`}
                                    src={article.imageUrl}
                                    className='w-80 h-52 object-cover rounded-xl'
                                />
                                <h4 className='text-xl text-center md:text-start font-semibold my-2'>
                                    {article.subtitle}
                                </h4>
                                <p className='line-clamp-4 text-base text-center md:text-start'>
                                    {article.description}
                                </p>
                                <Button
                                    color='primary'
                                    variant='bordered'
                                    className='flex w-fit mt-4 mx-auto'
                                    onClick={() => {
                                        setActual(article);
                                        setOpenDetails(true);
                                    }}
                                >
                                    Ver más
                                </Button>
                            </CardBody>
                            <CardFooter>
                                <span className='block w-full -mt-4 text-sm text-right text-gray-400'>
                                    {formatDateTime(article.updatedAt.toString()).date}
                                </span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <Modal
                    isOpen={openDetails}
                    placement='center'
                    scrollBehavior='outside'
                    backdrop='opaque'
                    size='xl'
                    onOpenChange={setOpenDetails}
                    className='rounded-3xl'
                >
                    <ModalContent>
                        <ModalBody
                            className='flex gap-4 flex-col items-center p-5 md:p-10'
                        >
                            <h2 className='text-2xl text-center md:text-start font-bold'>
                                {actual?.title}
                            </h2>
                            <Image
                                alt={`Imagen de ${actual?.title}`}
                                src={actual?.imageUrl || '/assets/noImage.svg'}
                                className='w-80 h-52 object-cover rounded-xl'
                            />
                            <h4 className='text-xl text-center md:text-start font-semibold'>
                                {actual?.subtitle}
                            </h4>
                            <p className='text-base text-justify whitespace-pre-line'>
                                {actual?.description}
                            </p>
                            <div className='flex gap-4 flex-wrap justify-center'>
                                {(actual?.tags as string)?.split(',').map((tag, index) => (
                                    <Chip
                                        key={index}
                                        color='primary'
                                        variant='dot'
                                        className='border-primary'
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </div>
                            <span className='block w-full mt-4 text-sm text-right text-gray-400'>
                                {formatDateTime(actual?.updatedAt?.toString() || '').date}
                            </span>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </section>
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
                    width={400}
                    height={300}
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
        </div>
    )
}; 