import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin - Market Poli',
};

interface Props {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
};