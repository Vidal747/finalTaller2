import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Market Poli'
};

interface Props {
    children: React.ReactNode;
};

export default function BlogLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
};