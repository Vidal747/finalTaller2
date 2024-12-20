//Components
import { Panel } from '@/components/Dashboard';
// Sources
import { PiNewspaper, PiQuestion, PiUser, PiArticle, PiHandbag } from 'react-icons/pi';

export default function AdminPage() {
	const options = [
		{
			name: 'Logs',
			link: '/dashboard/admin/logs',
			icon: <PiNewspaper size={120} />,
		},
		{
			name: 'Usuarios',
			link: '/dashboard/admin/users',
			icon: <PiUser size={120} />,
		},
		{
			name: 'Preguntas',
			link: '/dashboard/admin/frequentQuestions',
			icon: <PiQuestion size={120} />,
		},
		{
			name: 'Artículos',
			link: '/dashboard/admin/articles',
			icon: <PiArticle size={120} />,
		},
		{
			name: 'Planes',
			link: '/dashboard/admin/products',
			icon: <PiHandbag size={120} />,
		},
	];
	
	return (
		<>	
			<Panel options={options} />
		</>
	)
}