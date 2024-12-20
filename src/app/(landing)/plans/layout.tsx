import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Planes - Softing'
};

interface Props {
	children: React.ReactNode;
};

export default function ServicesLayout({ children }: Props) {
	return (
		<>
			{ children }
		</>
	)
};