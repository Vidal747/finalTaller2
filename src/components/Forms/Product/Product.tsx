'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Sources
import { Props, Inputs } from './types';
import { ResponseApi } from '@/types/app';
import { Button, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/schemas';
import { toast } from 'react-toastify';
import axios from 'axios';

export function ProductForm({ type, defaultValues, message }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState<string>(defaultValues?.imagesByProduct[0].imageUrl || '/assets/noImage.svg');
    const statesOfUser = [
        {id: 1, name: 'Activo'},
        {id: 0, name: 'Inactivo'}
    ];
    const availablesOfUser = [
        {id: 1, name: 'Disponible'},
        {id: 0, name: 'Agotado'}
    ];

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Inputs>({
        resolver: zodResolver(productSchema),
    });
    
    useEffect(() => {
        setIsLoading(false);      
        if (message) {
            toast.warning(message, {toastId: message});
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            values.imagesByProduct = Array.from(values.imagesByProduct);

            if (type === 'create') {
                const response = await axios.post('/api/products', values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/products');
                }
            } else if (type === 'edit') {
                const response = await axios.put(`/api/products/${defaultValues?.id}`, values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/products');
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
                alt='Imagen del plan'
                className='w-40 h-40 mx-auto object-cover'
                draggable='false'
                isZoomed
                onClick={() => {
                    control._fields.imagesByProduct?._f.ref.click && control._fields.imagesByProduct._f.ref.click()
                }}
            />
            <span className='w-full'></span>
            <Input
                label='Nombre del plan'
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name')}
                defaultValue={defaultValues?.name}
                className='w-72 md:w-80'
            />
            <Textarea
                label='Características del plan'
                isInvalid={!!errors.details}
                errorMessage={errors.details?.message}
                {...register('details')}
                defaultValue={defaultValues?.details}
                minRows={1}
                maxLength={1000}
                className='w-72 md:w-80'
            />
            <Input
                label='Precio del plan'
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message}
                {...register('price', {valueAsNumber: true})}
                defaultValue={defaultValues?.price.toString()}
                className='w-72 md:w-80'
                type='number'
                startContent={<span className='text-small'>$</span>}
                endContent={<span className='text-small'>COP</span>}
            />
            <Select
                label='Disponibilidad del plan'
                isInvalid={!!errors.available}
                errorMessage={errors.available?.message}
                {...register('available')}
                className='w-72 md:w-80'
                items={availablesOfUser}
                defaultSelectedKeys={defaultValues && [defaultValues.available ? '1' : '0']}
                isLoading={isLoading}
            >
                {(available) => <SelectItem key={available.id}>{available.name}</SelectItem>}
            </Select>
            <Input
                label='Imágen del plan'
                isInvalid={!!errors.imagesByProduct}
                errorMessage={errors.imagesByProduct?.message}
                {...register('imagesByProduct', {
                    onChange: (e) => {
                        if (e.target.files[0]) {
                            const objetUrl = URL.createObjectURL(e.target.files[0]);
                            
                            setImage(objetUrl ? objetUrl : defaultValues?.imagesByProduct[0].imageUrl || '/assets/noImage.svg');
                        } else {
                            setImage(defaultValues?.imagesByProduct[0].imageUrl || '/assets/noImage.svg');
                        }
                    },
                })}
                className='w-72 md:w-80'
                classNames={{input: 'absolute opacity-0'}}
                type='file'
                accept='image/jpeg, image/jpg, image/png'
            />
            <Select
                label='Estado del plan'
                isInvalid={!!errors.active}
                errorMessage={errors.active?.message}
                {...register('active')}
                className='w-72 md:w-80'
                items={statesOfUser}
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
                {type === 'create' ? 'Crear' : 'Editar'} plan
            </Button>
        </form>
    )
};