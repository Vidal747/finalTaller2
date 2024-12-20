'use client';

import { useEffect } from 'react';
// Sources
import { Props } from './types';
import { toast } from 'react-toastify';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { formatDateTime } from '@/utils/functions';
import { Image } from '@nextui-org/react';

export function FrequentQuestions({ questions, message }: Props) {

    useEffect(() => {
        if (message) {
            toast.warning(message, { toastId: message });
        }
    }, []);

    return (
        <div className='relative'>
            <section className='py-40 px-5 -my-28 rounded-b-[100px] flex gap-12 flex-col'>
                {questions.map(({ title, questions }, index) => (
                    <div key={index} className='w-full max-w-5xl mx-auto px-5'>
                        <h2 className={`mb-4 text-4xl md:text-5xl font-black ${index % 2 !== 0 && 'text-right'}`}>
                            {title}
                            <span className={`block w-20 mt-3 border-b-3 border-primary rounded-full ${index % 2 !== 0 && 'ml-auto'}`}></span>
                        </h2>
                        <Accordion
                            className={`md:w-3/4 ${index % 2 !== 0 && 'ml-auto'}`}
                            variant='splitted'
                        >
                            {questions.map(({ id, question, answer, updatedAt }) => (
                                <AccordionItem
                                    key={id}
                                    aria-label={question}
                                    title={question}
                                    classNames={{
                                        content: 'pb-4'
                                    }}
                                >
                                    {answer}
                                    <span className='block w-full text-sm text-right text-gray-400'>
                                        {formatDateTime(updatedAt.toString()).date}
                                        <br />
                                        Market Poli
                                    </span>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </section>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-2.png"
                    alt="mancha"
                    className="max-w-full max-h-full sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg xl:max-w-xl xl:max-h-xl -z-10"
                />
            </div>
            <div className="absolute bottom-0 left-0 items-end justify-start p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-3.png"
                    alt="mancha"
                    width={400}
                    height={300}
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>

        </div>
    )
}; 