import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Preguntas frecuentes - Softing'
};

interface Props {
	children: React.ReactNode;
};

export default function FrequentQuestionsLayout({ children }: Props) {
	return (
		<>
			{ children }
		</>
	)
};