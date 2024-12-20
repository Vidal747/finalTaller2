'use client';

import NextLink from 'next/link';
import { useState } from 'react';
// Sources
import { signOut } from 'next-auth/react';
import { ResponseApi } from '@/types/app';
import { Link, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { PiLink, PiSignOutBold } from 'react-icons/pi';
import { useSession } from 'next-auth/react';
import { Avatar, User } from '@nextui-org/react';
import { toast } from 'react-toastify';
import axios from 'axios';

export function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();

    const handleLogOut = async () => {
        try {
            const response = await axios.post('/api/auth/logout', {userId: session?.user.id!});           
            const data = response.data as ResponseApi;
            signOut();
    
            if (!data.ok) {
                toast.warning(data.message, {toastId: data.message});
            }
        } catch (error) {
            signOut();
            toast.error('¡Ups! Algo salió mal, estamos trabajando para resolverlo.');
        }
    }

    return (        
        <Popover 
            isOpen={isOpen} 
            onOpenChange={open => setIsOpen(open)} 
            placement='bottom-end' 
            backdrop='blur'
        >
            <PopoverTrigger>
                <Avatar
                    isBordered
                    as='button'
                    color='primary'
                    size='md'
                    src={session?.user.imageUrl}
                    name={session?.user.name}
                />
            </PopoverTrigger>
            <PopoverContent className='p-4 flex items-start'>
                {status === 'authenticated' &&
                    <User
                        className='mb-4'
                        name={session?.user.name}
                        description={session?.user.email}
                        avatarProps={{
                            src: session.user.imageUrl,
                            color: 'primary',
                            isBordered: true,
                        }}
                    />  
                }
                <Link
					as={NextLink}
                    isBlock
                    href='/dashboard/admin'
                    showAnchorIcon
                    anchorIcon={<PiLink className='ml-1' />}
                    color='foreground'
                    className={session?.user.role.name !== 'Administrador' ? 'hidden' : ''}
                    onClick={() => setIsOpen(false)}
                >
                    Panel de control
                </Link>
                <Link
                    isBlock
                    href='mailto:miangelareiza@gmail.com'
                    showAnchorIcon
                    anchorIcon={<PiLink className='ml-1' />}
                    color='foreground'
                    onClick={() => setIsOpen(false)}
                >
                    Soporte
                </Link>
                <Link
                    isBlock
                    href=''
                    showAnchorIcon
                    anchorIcon={<PiSignOutBold className='ml-1' />}
                    color='danger'
                    onClick={handleLogOut}
                    className='font-semibold'
                >
                    Cerrar sesión
                </Link>
            </PopoverContent>
        </Popover>
    )
}