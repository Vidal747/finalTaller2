// Sources
import { Props } from './types';
import { Card, Link } from '@nextui-org/react';

export function Panel({ options }: Props) {
    return (
        <main className='max-w-5xl mx-auto px-5 py-10 flex gap-10 flex-col'>
            <h3 className='text-3xl md:text-4xl text-center font-black'>
                ¿Qué deseas hacer hoy?
            </h3>
            <div className='flex gap-8 flex-wrap justify-center'>
                {options.map(({ name, link, icon }, index) => (
                    <Card
                        key={index}
                        as={Link}
                        href={link}
                        isPressable
                        className='bg-primary w-64 h-64 flex flex-col justify-center rounded-[3rem]'
                    >
                        {icon}
                        <h2 className='text-3xl font-black text-center my-3'>
                            {name}
                        </h2>
                    </Card>
                ))}
            </div>
        </main>
    )
};