// Components
import { ProductForm } from '@/components/Forms';
// Sources
import { TiArrowBackOutline } from 'react-icons/ti';
import { Button, Link } from '@nextui-org/react';

export default function CreateProduct() {
    return (
        <main className='max-w-5xl mx-auto px-5 pb-10 flex gap-6 flex-col'>
            <Button
                as={Link}
                href='./'
                isIconOnly
                className='text-2xl mt-2 -mb-4'
                color='primary'
            >
                <TiArrowBackOutline />
            </Button>
            <h3 className='text-3xl md:text-4xl text-center font-black'>
                Crear Plan
            </h3>
            <ProductForm type='create' />
        </main>
    )
};