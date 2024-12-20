'use client';

import { useEffect, useState } from 'react';
// Sources
import { useTheme } from 'next-themes';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const themeColor = document.querySelector('head > meta[name="theme-color"]');
        themeColor?.setAttribute('content', theme === 'dark' ? '#000000' : '#FEFEFE');
    }, [theme]);

    return mounted ? (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Button isIconOnly aria-label='cambiar de tema' color='primary' variant='flat'>
                    {theme === 'dark' ? <MdLightMode size={25}/> : <MdDarkMode size={25}/> }
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='opciones de tema'>
                <DropdownItem key='Light' onClick={() => setTheme('light')}>
                    <span className='flex gap-2 items-end'>
                        <MdLightMode size={25}/>
                        Light
                    </span>
                </DropdownItem>
                <DropdownItem key='Dark' onClick={() => setTheme('dark')}>
                    <span className='flex gap-2 items-end'>
                        <MdDarkMode size={25}/>
                        Dark
                    </span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    ) : null
};