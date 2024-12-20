import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog - Softing'
};

interface Props {
	children: React.ReactNode;
};

export default function BlogLayout({ children }: Props) {
	return (
		<>
			{ children }
		</>
	)
};