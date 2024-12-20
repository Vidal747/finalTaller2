'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Sources
import { Props, Inputs } from './types';
import { ResponseApi } from '@/types/app';
import { Button, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema } from '@/schemas';
import { toast } from 'react-toastify';
import axios from 'axios';

export function ArticleForm({ type, defaultValues, message }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState<string>(defaultValues?.imageUrl || '/assets/noImage.svg');
    const statesOfArticle = [
        {id: 1, name: 'Activo'},
        {id: 0, name: 'Inactivo'}
    ];

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Inputs>({
        resolver: zodResolver(articleSchema),
    });
    
    useEffect(() => {
        setIsLoading(false);
        if (message) {
            toast.warning(message, {toastId: message});
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            values.imageUrl = Array.from(values.imageUrl);

            if (type === 'create') {
                const response = await axios.post('/api/articles', values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/articles');
                }
            } else if (type === 'edit') {
                const response = await axios.put(`/api/articles/${defaultValues?.id}`, values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/articles');
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
            <Image 
                src={image}
                alt='Imágen del artículo'
                className='w-40 h-40 mx-auto object-cover'
                draggable='false'
                isZoomed
                onClick={() => {
                    control._fields.imageUrl?._f.ref.click && control._fields.imageUrl._f.ref.click()
                }}
            />
            <span className='w-full'></span>
            <Input
                label='Titulo del artículo'
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                {...register('title')}
                defaultValue={defaultValues?.title}
                className='w-72 md:w-80'
            />
            <Input
                label='Subtitulo del artículo'
                isInvalid={!!errors.subtitle}
                errorMessage={errors.subtitle?.message}
                {...register('subtitle')}
                defaultValue={defaultValues?.subtitle}
                className='w-72 md:w-80'
            />
            <Textarea
                label='Descripción del artículo'
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                {...register('description')}
                defaultValue={defaultValues?.description}
                className='w-72 md:w-80'
                minRows={1}
                maxLength={1000}
            />
            <Input
                label='Imágen del artículo'
                isInvalid={!!errors.imageUrl}
                errorMessage={errors.imageUrl?.message}
                {...register('imageUrl', {
                    onChange: (e) => {
                        if (e.target.files[0]) {
                            const objetUrl = URL.createObjectURL(e.target.files[0]);
                            
                            setImage(objetUrl ? objetUrl : defaultValues?.imageUrl || '/assets/noImage.svg');
                        } else {
                            setImage(defaultValues?.imageUrl || '/assets/noImage.svg');
                        }
                    },
                })}
                className='w-72 md:w-80'
                classNames={{ input: 'absolute opacity-0' }}
                type='file'
                accept='image/jpeg, image/jpg, image/png'
            />
            <Input
                label='Etiquetas del artículo'
                isInvalid={!!errors.tags}
                errorMessage={errors.tags?.message}
                {...register('tags')}
                defaultValue={defaultValues?.tags}
                className='w-72 md:w-80'
            />
            <Select
                label='Estado del artículo'
                isInvalid={!!errors.active}
                errorMessage={errors.active?.message}
                {...register('active')}
                className='w-72 md:w-80'
                items={statesOfArticle}
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
                {type === 'create' ? 'Crear' : 'Editar'} artículo
            </Button>
        </form>
    )
};