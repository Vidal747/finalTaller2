'use client';

import { useEffect, useState } from 'react';
// Components
import { LanguageSwitch } from '@/components/LanguageSwitch';
// Sources
import { headerData } from './Header.data';
import { Button, Link, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY !== 0 && window.scrollY > 180) {
                setIsTop(false);
            } else {
                setIsTop(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            isBlurred
            isMenuOpen={isOpen}
            classNames={{ wrapper: 'px-5' }}
            className={`duration-1000 delay-200 h-20 ${isTop && 'bg-transparent'}`}
        >
            <NavbarBrand>
                <Link href='/#'>
                    <Image

                        src='/assets/logo.webp'
                        alt='Logo de Market Poli'
                        width={70}
                        height={70}
                        radius='none'
                        draggable={false}
                    />
                </Link>
            </NavbarBrand>
            <NavbarContent className='hidden md:flex gap-8' justify='center'>
                {headerData.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link
                            href={item.link}
                            aria-label={`Ir a ${item.name}`}
                            className='text-lg font-bold text-black'
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem>
                    <NavbarMenuToggle
                        aria-label='Alternar menu'
                        className='md:hidden md:w-0 w-6 h-12 text-black'
                        onChange={setIsOpen}
                    />
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href='https://api.whatsapp.com/send?phone=573242886008'
                        aria-label='Contactar por WhatsApp'
                        color='primary'
                        className='font-bold hidden md:flex'
                    >
                        ¡Contactar!
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <LanguageSwitch />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className={`backdrop-blur-xl backdrop-saturate-150 flex gap-3 flex-col items-center pt-10 ${isTop && 'bg-transparent'}`}>
                {headerData.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Button
                            as={Link}
                            href={item.link}
                            aria-label={`Ir a ${item.name}`}
                            color='primary'
                            className='w-48 font-semibold text-base'
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Button>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
};