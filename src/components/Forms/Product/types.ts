interface Inputs {
    name: string;
    details: string;
    price: number;
    available: boolean;
    active: boolean;
    imagesByProduct: any[];
};

interface Props {
    type: 'create' | 'edit';
    defaultValues?: {
        id: string;
        name: string;
        details: string;
        price: number;
        available: boolean;
        active: boolean;
        imagesByProduct: any[];
    },
    message?: string;
}

export type { Inputs, Props };