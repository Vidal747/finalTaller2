import { FrequentQuestion } from '@prisma/client';

interface Question {
    title: string;
    questions: FrequentQuestion[];
}

export type { Question };