interface CreateFrequentQuestionProps {
    title: string;
    question: string;
    answer: string;
    active: boolean;
}

interface UpdateFrequentQuestionProps {
    id: string;
    title: string;
    question: string;
    answer: string;
    active: boolean;
}

export type { CreateFrequentQuestionProps, UpdateFrequentQuestionProps }