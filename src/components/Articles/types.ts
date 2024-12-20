import { Article } from '@prisma/client';

interface Props {
    articles: Article[];
    message: string;
}

export type { Props };