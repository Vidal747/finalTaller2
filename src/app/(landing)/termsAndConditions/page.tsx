// Components
import { Header, HeaderTitle, Footer } from '@/components/Landing';
import { TermsAndConditions } from '@/components/TermsAndConditions';

export default function TermsAndConditionsPage() {
	return (
		<>
			<Header />
            <HeaderTitle title='Términos y condiciones' />
            <TermsAndConditions />
			<Footer />
		</>
	)
}; 