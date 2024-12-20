'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Sources
import { Props, Inputs } from './types';
import { ResponseApi } from '@/types/app';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { frequentQuestionSchema } from '@/schemas';
import { toast } from 'react-toastify';
import axios from 'axios';

export function FrequentQuestionForm({ type, defaultValues, message }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const titleOfFrequentQuestion = [
        {id: 'Información General', name: 'Información General'},
        {id: 'Pagos', name: 'Pagos'},
        {id: 'Servicios', name: 'Servicios'},
        {id: 'Seguridad', name: 'Seguridad'},
        {id: 'Privacidad', name: 'Privacidad'},
        {id: 'Otros', name: 'Otros'},
    ];
    const FrequentQuestion = [
        {id: 1, name: 'Activo'},
        {id: 0, name: 'Inactivo'}
    ];

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
        resolver: zodResolver(frequentQuestionSchema),
    });

    useEffect(() => {
        setIsLoading(false);
        if (message) {
            toast.warning(message, {toastId: message});
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            if (type === 'create') {
                const response = await axios.post('/api/frequentQuestions', values);

                const data = response.data as ResponseApi;
    
                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/frequentQuestions');
                }
            } else if (type === 'edit') {
                const response = await axios.put(`/api/frequentQuestions/${defaultValues?.id}`, values);

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/frequentQuestions');
                }
            }
        } catch (error: any) {
            const toastId = (error.response?.data as ResponseApi).message;
            const type = error.response?.status !== 500 ? 'warning' : 'error';

            toast(toastId, {toastId, type})
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-2xl mx-auto flex gap-4 flex-wrap justify-center'>
            <Select 
                label='Titulo de la pregunta'
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                {...register('title')}
                className='w-72 md:w-80'
                items={titleOfFrequentQuestion}
                defaultSelectedKeys={defaultValues && [defaultValues.title]}
                isLoading={isLoading}
            >
                {(title) => <SelectItem key={title.id}>{title.name}</SelectItem>}
            </Select>
            <Textarea
                label='Pregunta'
                isInvalid={!!errors.question}
                errorMessage={errors.question?.message}
                {...register('question')}
                className='w-72 md:w-80'
                defaultValue={defaultValues?.question}
                minRows={1}
                maxLength={200}
            />
            <Textarea
                label='Respuesta'
                isInvalid={!!errors.answer}
                errorMessage={errors.answer?.message}
                {...register('answer')}
                className='w-72 md:w-80'
                defaultValue={defaultValues?.answer}
                minRows={1}
                maxLength={500}
            />
            <Select
                label='Estado de la pregunta'
                isInvalid={!!errors.active}
                errorMessage={errors.active?.message}
                {...register('active')}
                className='w-72 md:w-80'
                items={FrequentQuestion}
                defaultSelectedKeys={defaultValues && [defaultValues.active ? '1' : '0']}
                isLoading={isLoading}
            >
                {(state) => <SelectItem key={state.id}>{state.name}</SelectItem>}
            </Select>
            <span className='w-full'></span>
            <Button
                type='submit'
                color='primary'
                className='w-72 md:w-80 my-2 h-12 text-base font-semibold'
            >
                {type === 'create' ? 'Crear' : 'Editar'} pregunta frecuente
            </Button>
        </form>
    )
};