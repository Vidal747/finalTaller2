import type { Metadata } from 'next';
// Components
import { Header } from '@/components/Dashboard';

export const metadata: Metadata = {
	title: 'Dashboard - Softing',
};

interface Props {
	children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
	return (
		<>
			<Header />
			{ children }
		</>
	)
};