interface Props {
    name: string;
    details: string;
    imageUrl: string;
    price: number | string;
    available: boolean;
    variant: 'cards' | 'slider';
};

export type { Props };