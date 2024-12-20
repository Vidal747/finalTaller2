'use client';

// Sources
import { helpData } from './ButtonHelp.data';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { TfiHeadphoneAlt } from 'react-icons/tfi';

export function ButtonHelp() {
    return (
        <Dropdown placement='left-start' className='bg-primary' >
            <DropdownTrigger>
                <Button
                    startContent={<TfiHeadphoneAlt size={25} />}
                    className='flex w-36 h-12 text-xl text-black font-bold rounded-full rounded-br-none sticky top-20 mr-5 ml-auto z-[5] bg-primary'
                >
                    AYUDA
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Listado de botones de contacto'
                variant='flat'
            >
                {helpData.map((({ name, link, icon }, index) => (
                    <DropdownItem
                        key={index}
                        href={link}
                        aria-label={`Soporte vía ${name}`}
                        startContent={icon}
                        className='text-xl font-black'
                    >
                        {name}
                    </DropdownItem>
                )))}
            </DropdownMenu>
        </Dropdown>
    )
}