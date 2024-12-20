import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth - Market Poli'
};

interface Props {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
};