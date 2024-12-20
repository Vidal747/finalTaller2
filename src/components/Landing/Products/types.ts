interface Product {
    id: string;
    details: string;
    name: string;
    active: boolean;
    price: number;
    available: boolean;
    imagesByProduct: {
        id: string;
        name: string;
        imageUrl: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

interface Props {
    products: Product[];
    message: string;
}

export type { Props };