import Link from 'next/link';
// Components
import { SignInForm } from '@/components/Forms';
// Sources
import { Image, Card, CardBody, CardHeader } from '@nextui-org/react';

export default function RecoveryPage() {
    return (
        <div className='w-scrren h-screen flex justify-center items-center px-5 bg-bgSignin bg-center bg-cover'>
            <Card className='p-5 md:px-12 rounded-[3rem]'>
                <CardHeader className='flex justify-center'>
                    <Link href='/'>
                        <Image
                            src='/assets/logo.webp'
                            alt='Logo de Market Poli'
                            width='200'
                            height='50'
                            radius='none'
                            draggable='false'
                        />
                    </Link>
                </CardHeader>
                <CardBody>
                    {/* <SignInForm /> */}
                </CardBody>
            </Card>
        </div>
    )
};