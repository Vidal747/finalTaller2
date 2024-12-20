import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terminos y condiciones - Softing'
};

interface Props {
	children: React.ReactNode;
};

export default function TermsAndConditionsLayout({ children }: Props) {
	return (
		<>
			{ children }
		</>
	)
};