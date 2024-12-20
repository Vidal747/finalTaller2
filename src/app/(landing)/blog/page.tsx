// Components
import { Footer, Header, HeaderTitle } from '@/components/Landing';
import { Articles } from '@/components/Articles';
// Controllers
import { GetActiveArticles } from '@/controllers';
// Sources
import { Article } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuth';

async function getArticles() {
	const values: {
		articles: Article[],
		message: string,
	} = {
		articles: [],
		message: '',
	}
	
	try {
		const session = await getServerSession(authOptions);
			
		const result = await GetActiveArticles(session?.user.id!, session?.user.session!);
	
		if (!result.ok || !result.data?.length) {
			values.message = result.message;
		} else {
			values.articles = result.data;
		}	
	} catch (error) {
		values.articles = [];
	}
	
	return values;
};

export default async function ArticlesPage() {
	const { articles, message } = await getArticles();

	return (
		<>
			<Header />
            <HeaderTitle title='Blog' />
            <Articles articles={articles} message={message} />
			<Footer />
		</>
	)
};