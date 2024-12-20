'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Components
import { Spinner } from '../../Spinner';
// Sources
import { Inputs } from './types';
import { Button, Input, Link } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { credentialsLoginSchema } from '@/schemas';
import { toast } from 'react-toastify';
import { PiEyeBold, PiEyeClosedBold, PiUserBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';

export function SignInForm() {
    const session = useSession();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(credentialsLoginSchema)
    });

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [session.status]);

    const onSubmit: SubmitHandler<Inputs> = async ({ user, password }) => {
        try {
            setIsLoading(true);

            const response = await signIn('credentials', {
                user,
                password,
                redirect: false,
            });
            
            if (response?.error) {
                toast.warning(response?.error, {toastId: response?.error!});
            } else if (response?.ok) {
                const route = response.url?.includes('/auth/signin') ? '/dashboard/admin' : response.url || '/dashboard/admin';
                router.push(route);
            }
        } catch (error) {
            toast.error('¡Ups! Algo salió mal, estamos trabajando para resolverlo.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col items-center p-2'>
            <Input
                label='Usuario'
                isInvalid={!!errors.user}
                errorMessage={errors.user?.message}
                {...register('user')}
                className='w-72 md:w-80'
                endContent={<PiUserBold size={20} className='my-2' />}
            />
            <Input
                label='Contraseña'
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password')}
                className='w-72 md:w-80'
                type={isVisible ? 'text' : 'password'}
                endContent={
                    <button
                        className='focus:outline-none'
                        aria-label='mostar contraseña'
                        type='button'
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? 
                            <PiEyeBold size={20} className='my-2' />
                        : 
                            <PiEyeClosedBold size={20} className='my-2' />
                        }
                    </button>
                }
            />
            <Button
                type='submit'
                aria-label='Iniciar sesión'
                color='primary'
                className='w-72 md:w-80 my-2 h-12 text-base font-semibold'
            >
                Iniciar sesión
            </Button>

            <span className='flex gap-2 font-semibold'>
                ¿Olvidaste la contraseña?
                <Link
                    href='/auth/recovery'
                    color='secondary'
                    // isDisabled
                >
                    Recuperar
                </Link>
            </span>

            <span className='my-2 text-base font-bold'>
                O continuar con
            </span>

            <Button
                variant='bordered'
                aria-label='Iniciar sesión con Google'
                onClick={() => signIn('google', {callbackUrl: '/dashboard/admin', })}
            >
                <FcGoogle size={28} />
            </Button>
            
            {isLoading && <Spinner/>}
        </form>
    )
};