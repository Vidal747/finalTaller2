'use client';

import { useState } from 'react';
// Components
import { Spinner } from '@/components/Spinner';
// Sources
import { Inputs } from './types';
import { Button, Input, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/schemas';
import { toast } from 'react-toastify';
import { sendEmail } from '@/libs/email';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: zodResolver(contactSchema)
    });
    
    const onSubmit: SubmitHandler<Inputs> = async ({ name, email, issue, message }) => {
        try {
            setIsLoading(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            // const result = await sendEmail({ 
            //     fromName: name,
            //     toEmail: email,
            //     subject: issue,
            //     text: message
            // });
            
            // if (!result.ok) {
            //     toast.warning(result.message, {toastId: result.message});
            // } else {
            //     toast.success(result.message, {toastId: result.message});
            // }

            reset();            
            toast.success('¡Gracias por contactarnos! Te responderemos lo más pronto posible.');
        } catch (error) {
            toast.error('¡Ups! Algo salió mal, estamos trabajando para resolverlo.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-wrap items-center'>
            <Input
                label='Nombre'
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name')}
                variant='bordered'
                classNames={{
                    inputWrapper: 'border-black border-1',
                    label: 'text-foreground font-semibold'
                }}
                className='w-full md:w-[calc(50%_-.5rem)]'
            />
            <Input
                label='Correo'
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email')}
                variant='bordered'
                classNames={{
                    inputWrapper: 'border-black border-1',
                    label: 'text-foreground font-semibold'
                }}
                className='w-full md:w-[calc(50%_-.5rem)]'
            />
            <Input
                label='Asunto'
                isInvalid={!!errors.issue}
                errorMessage={errors.issue?.message}
                {...register('issue')}
                variant='bordered'
                classNames={{
                    inputWrapper: 'border-black border-1',
                    label: 'text-foreground font-semibold'
                }}
                className='w-full'
            />
            <Textarea
                label='Mensaje'
                isInvalid={!!errors.message}
                errorMessage={errors.message?.message}
                {...register('message')}
                variant='bordered'
                classNames={{
                    inputWrapper: 'border-black border-1',
                    label: 'text-foreground font-semibold'
                }}
                className='w-full'
            />
            <Button
                type='submit'
                className='w-full mt-2 h-12 text-base text-white bg-black'
            >
                Enviar
            </Button>
            
            {isLoading && <Spinner/>}
        </form>
    )
};