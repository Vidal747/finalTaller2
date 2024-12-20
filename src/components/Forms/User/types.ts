import { Option } from '@/types/app';

interface Inputs {
    roleId: string;
    name: string;
    phone: string;
    email: string;
    imageUrl: string;
    user: string;
    password: string;
    active: boolean;
};

interface Props {
    type: 'create' | 'edit';
    defaultValues?: {
        id: string;
        role: Option;
        name: string;
        phone: string;
        email: string;
        imageUrl: string;
        user: string;
        password: string;
        active: boolean;
    },
    message?: string;
}

export type { Inputs, Props };