// Components
import { Footer, Header, HeaderTitle } from '@/components/Landing';
import { FrequentQuestions } from '@/components/FrequentQuestions';
// Controllers
import { GetActiveFrequentQuestions } from '@/controllers';
// Sources
import { Question } from './types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuth';

async function getQuestions() {
	const values: {
		questions: Question[],
		message: string,
	} = {
		questions: [],
		message: '',
	}
	
	try {
		const session = await getServerSession(authOptions);
			
		const result = await GetActiveFrequentQuestions(session?.user.id!, session?.user.session!);
	
		if (!result.ok || !result.data?.length) {
			values.message = result.message;
		} else {
			result.data.forEach(question => {
				const title = question.title;
		
				if (!values.questions.find(group => group.title === title)) {
					values.questions.push({title, questions: []});
				}
		
				values.questions.find(group => group.title === title)?.questions.push(question);
			});
		}	
	} catch (error) {
		values.questions = [];
	}
	
	return values;
};

export default async function FrequentQuestionsPage() {   
	const { questions, message } = await getQuestions();

	return (
		<>
			<Header />
            <HeaderTitle title='Preguntas frecuentes' />
            <FrequentQuestions questions={questions} message={message} />
			<Footer />
		</>
	)
};