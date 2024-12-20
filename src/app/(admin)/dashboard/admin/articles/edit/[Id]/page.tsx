// Components
import { ArticleForm } from '@/components/Forms';
// Controllers
import { GetArticle } from '@/controllers';
// Sources
import { Props } from './types';
import { TiArrowBackOutline } from 'react-icons/ti';
import { Button, Link } from '@nextui-org/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuth';

export default async function EditArticlePage({ params }: Props) {
    const values = {
        defaultValues: undefined,
        message: '',
    }
    const session = await getServerSession(authOptions);
        
	const result = await GetArticle(session?.user.id!, session?.user.session!, params.Id);

    if (!result.ok || !result.data?.length) {
        values.message = result.message;
    } else {
        values.defaultValues = result.data[0];
    }

    return (
        <main className='max-w-5xl mx-auto px-5 pb-10 flex gap-6 flex-col'>
            <Button
                as={Link}
                href='../'
                isIconOnly
                className='text-2xl mt-2 -mb-4'
                color='primary'
            >
                <TiArrowBackOutline />
            </Button>
            <h3 className='text-3xl md:text-4xl text-center font-black'>
                Editar artículo
            </h3>
            <ArticleForm type='edit' defaultValues={values.defaultValues} message={values.message} />
        </main>
    )
};