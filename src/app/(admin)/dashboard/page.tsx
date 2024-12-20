//Components
import { Panel } from '@/components/Dashboard';
// Sources
import { PiGear } from 'react-icons/pi';

export default function DashboardPage() {
	const options = [
		{
			name: 'Administrar',
			link: '/dashboard/admin',
			icon: <PiGear size={120} />,
		},
	];
	
	return (
		<>	
			<Panel options={options} />
		</>
	)
}