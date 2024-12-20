interface Inputs {
    title: string;
    subtitle: string;
    imageUrl: any[];
    description: string;
    tags: string;
    active: boolean;
};

interface Props {
    type: 'create' | 'edit';
    defaultValues?: {
        id: string;
        title: string;
        subtitle: string;
        imageUrl: string;
        description: string;
        tags: string;
        active: boolean;
    },
    message?: string;
}

export type { Inputs, Props };