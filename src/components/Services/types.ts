interface Service {
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
};

interface Props {
    services: Service[];
    message: string;
};

export type { Props, Service };