interface Inputs {
    title: string;
    question: string;
    answer: string;
    active: boolean;
};

interface Props {
    type: 'create' | 'edit';
    defaultValues?: {
        id: string;
        title: string;
        question: string;
        answer: string;
        active: boolean;
    },
    message?: string;
}

export type { Inputs, Props };