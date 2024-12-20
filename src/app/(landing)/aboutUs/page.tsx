// Components
import { Footer, Header, HeaderTitle } from '@/components/Landing';
import { AboutUs } from '@/components/AboutUs';

export default function AboutUsPage() {
	return (
		<>
			<Header />
            <HeaderTitle title='Quienes somos' />
			<AboutUs /> 	
			<Footer />
		</>
	)
}; 