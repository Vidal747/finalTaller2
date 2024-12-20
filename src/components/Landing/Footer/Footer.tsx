// Sources
import { footerData, footerSocialNetworks } from './Footer.data';
import { Link, Image } from "@nextui-org/react";

export function Footer() {
    return (
        <footer className='py-40 mt-20 px-5 bg-bgFooter bg-cover bg-center cut-top-right'>
            <div className='max-w-xs md:max-w-5xl mx-auto px-10 md:px-0 flex gap-20 flex-col md:flex-row justify-around items-center'>
                <div className='w-full flex gap-8 flex-col md:flex-row justify-around'>
                    {footerData.map(({ links, title }, index) => (
                        <div key={index}>
                            <h4 className='text-lg text-white text-start font-semibold'>
                                {title}
                                <span className='block w-5 border-b-1 border-white rounded-full'></span>
                            </h4>
                            <div>
                                {links.map(({ name, icon, link }, index) => (
                                    <Link
                                        key={index}
                                        href={link}
                                        target={link.startsWith('/') ? '' : '_blank'}
                                        className='flex gap-3 mt-4 py-2 text-base text-white'
                                    >
                                        <span className={`text-2xl text-primary`}>
                                            {icon}
                                        </span>
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mb-10 md:mb-0'>
                    <Link href='/auth/signin'>
                        <Image
                            src='/assets/logo.webp'
                            alt='Logo de Market Poli'
                            width={250}
                            height={100}
                            draggable={false}
                        />
                    </Link>
                </div>
            </div>
            <div className='max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center mt-12'>
                <span className='text-white text-center'>
                    <span className='whitespace-nowrap block'>
                        2024 Market Poli. All Rights Reserved.
                    </span>
                    Powered by Critic.
                </span>

                <div className='hidden md:block w-full border-b-1 border-primary'></div>

                <div className='flex gap-8'>
                    {footerSocialNetworks.map(({ icon, name, link }, index) => (
                        <Link
                            aria-label={name}
                            key={index}
                            href={link}
                            target='_blank'
                            className='text-white md:text-primary text-2xl'
                        >
                            {icon}
                        </Link>
                    ))}
                </div>
                <div className='md:hidden w-screen border-b-1 border-primary'></div>
            </div>
        </footer>
    );
};
