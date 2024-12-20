import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preguntas frecuentes - Market Poli'
};

interface Props {
    children: React.ReactNode;
};

export default function FrequentQuestionsLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
};