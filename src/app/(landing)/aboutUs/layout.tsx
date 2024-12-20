import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Acerca de nosotros - Softing',
};

interface Props {
	children: React.ReactNode;
};

export default function AboutUsLayout({ children }: Props) {
	return (
		<>
			{ children }
		</>
	)
};