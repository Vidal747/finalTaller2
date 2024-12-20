interface Option {
    name: string;
    icon: React.ReactNode;
    link: string;
}

interface Props {
    options: Option[];
}

export type { Props };