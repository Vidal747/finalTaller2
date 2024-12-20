interface CreateProductProps {
    name: string;
    details: string;
    price: number;
    available: boolean;
    active: boolean;
    imagesByProduct: any[];
}

interface UpdateProductProps {
    id: string;
    name: string;
    details: string;
    price: number;
    available: boolean;
    active: boolean;
    imagesByProduct: any[];
}

export type { CreateProductProps, UpdateProductProps }