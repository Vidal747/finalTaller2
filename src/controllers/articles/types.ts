interface CreateArticleProps {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: any[];
    tags: string;
    active: boolean;
}

interface UpdateArticleProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: any[];
    tags: string;
    active: boolean;
}

export type { CreateArticleProps, UpdateArticleProps }