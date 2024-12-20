// Components
import { ContactForm } from '@/components/Forms';
// Sources
import { Button, Image, Link } from '@nextui-org/react';
import { BsChatSquareText } from 'react-icons/bs';

export function Contact() {
    return (
        <div className='relative px-5'>
            <section className='py-10 px-5 ' id='contact'>
                <div className='max-w-5xl mx-auto px-5'>

                    <div className='text-center md:text-left'>
                        <p className='text-4xl md:text-5xl font-black'>
                            ¿ALGUNA DUDA?
                            <span className='block w-20 mt-3 mx-auto md:mx-0 border-b-2 border-foreground rounded-full'></span>
                        </p>
                        <p className='max-w-md mx-auto md:mx-0 my-8 text-lg text-center md:text-left'>
                            Envíanos un mensaje para solucionar tus dudas o problemas.
                        </p>
                    </div>
                    <div className='flex gap-x-40 gap-y-10 flex-col md:flex-row items-center justify-between py-10'>
                        <Button
                            as={Link}
                            href='https://api.whatsapp.com/send?phone=573242886008'
                            variant='bordered'
                            className='w-minlex h-16 border-foreground border-1 px-10 text-xl font-semibold'
                        >
                            <BsChatSquareText />
                            Chatea con nosotros
                        </Button>
                        <div className='flex gap-4 items-center'>
                            <span className='w-16 min-w-[64px] h-16 rounded-full bg-white flex justify-center items-center'>
                                <Image
                                    src='/icon-180.png'
                                    alt='Logo de Market Poli'
                                    width={50}
                                    height={50}
                                />
                            </span>
                            <span className='max-w-[185px] flex flex-col text-lg'>
                                <Link
                                    href='tel:+573160526274'
                                    className='text-xl text-black font-semibold'
                                >
                                    +57 300 884 03 62
                                </Link>
                                Puedes llamarnos o enviarnos un mensaje directo.
                            </span>
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </section>
            <div className="absolute top-0 right-0 items-start justify-end p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
            <div className="absolute bottom-0 left-0 items-end justify-start p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-2.png"
                    alt="mancha-2"
                    height={300}
                    width={400}
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
        </div>
    )
};
