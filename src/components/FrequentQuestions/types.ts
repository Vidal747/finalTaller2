import { FrequentQuestion } from '@prisma/client';

interface Question {
    title: string;
    questions: FrequentQuestion[];
}

interface Props {
    questions: Question[];
    message: string;
}

export type { Props };