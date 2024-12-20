'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Sources
import { Props, Inputs } from './types';
import { Option, ResponseApi } from '@/types/app';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/schemas';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

export function UserForm({ type, defaultValues, message }: Props) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [rolesOfUser, setRolesOfUser] = useState<Option[]>([]);
    const statesOfUser = [
        {id: 1, name: 'Activo'},
        {id: 0, name: 'Inactivo'}
    ];

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
        resolver: zodResolver(userSchema),
    });

    const getOptions = async () => {
        try {
            const rolesResponse = await axios.get('/api/roles', {headers: { cache: 'force-cache' }});
            const roles = rolesResponse.data as ResponseApi;
    
            if (!roles.ok || !roles.data || !roles.data.length) {
                toast.warning(roles.message, {toastId: roles.message});
                setRolesOfUser([]);
            } else {
                setRolesOfUser(roles.data);
                if (defaultValues && defaultValues.role.id) {
                    setValue('roleId', defaultValues.role.id);
                }
            }
        } catch (error: any) {
            if (!error.response || !error.response.data || !error.response.data.hasOwnProperty('message')) {
                return toast.error('¡Ups! Algo salió mal, estamos trabajando para resolverlo.', {toastId: 1});
            }
            const toastId = (error.response?.data as ResponseApi).message;
            const type = error.response?.status !== 500 ? 'warning' : 'error';
    
            toast(toastId, {toastId, type})
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOptions();
        if (message) {
            toast.warning(message, {toastId: message});
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            if (type === 'create') {
                const response = await axios.post('/api/users', values);

                const data = response.data as ResponseApi;
    
                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/users');
                }
            } else if (type === 'edit') {
                const response = await axios.put(`/api/users/${defaultValues?.id}`, values);

                const data = response.data as ResponseApi;

                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    router.push('/dashboard/admin/users');
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
                label='Rol del usuario'
                isInvalid={!!errors.roleId}
                errorMessage={errors.roleId?.message}                
                {...register('roleId')}
                className='w-72 md:w-80'
                items={rolesOfUser}
                defaultSelectedKeys={defaultValues && [defaultValues.role.id]}
                isLoading={isLoading}
            >
                {(role) => <SelectItem key={role.id}>{role.name}</SelectItem>}
            </Select>
            <Input
                label='Nombre del usuario'
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name')}
                defaultValue={defaultValues?.name}
                className='w-72 md:w-80'
            />
            <Input
                label='Teléfono del usuario'
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                {...register('phone')}
                defaultValue={defaultValues?.phone}
                className='w-72 md:w-80'
            />
            <Input
                label='Correo del usuario'
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email')}
                defaultValue={defaultValues?.email}
                className='w-72 md:w-80'
            />
            <Input
                label='Imagen del usuario'
                isInvalid={!!errors.imageUrl}
                errorMessage={errors.imageUrl?.message}
                {...register('imageUrl')}
                defaultValue={defaultValues?.imageUrl}
                className='w-72 md:w-80'
            />
            <Input
                label='Usuario'
                isInvalid={!!errors.user}
                errorMessage={errors.user?.message}
                {...register('user')}
                defaultValue={defaultValues?.user}
                className='w-72 md:w-80'
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
            <Select
                label='Estado del usuario'
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
                {type === 'create' ? 'Crear' : 'Editar'} usuario
            </Button>
        </form>
    )
};