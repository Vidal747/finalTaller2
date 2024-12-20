// Sources
import { termsAndConditionsData } from './TermsAndConditions.data';
import { Image } from '@nextui-org/react';

export function TermsAndConditions() {
    return (
        <div className=' relative'>
            <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-2.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10en "
                />
            </div>
            <div className="absolute bottom-0 left-0 items-end justify-start p-4 pointer-events-none">
                <Image
                    src="/assets/manchas/mancha-3.png"
                    alt="mancha"
                    className="sm:h-96 sm:w-96 h-40 w-40 max-w-full max-h-full -z-10"
                />
            </div>
            <section className='py-40 px-5 -my-28 cut-right flex gap-12 flex-col'>
                {termsAndConditionsData.map(({ title, content }, index) => (
                    <article key={index} className='w-full max-w-5xl mx-auto px-5 md:px-0'>
                        <h2 className='mb-4 text-4xl md:text-5xl font-black'>
                            {title}
                            <span className='block w-20 mt-3 border-b-3 border-primary rounded-full'></span>
                        </h2>
                        {content.map((paragraph, ind) => (
                            <p key={ind} className='text-justify mb-2'>
                                {paragraph}
                            </p>
                        ))}
                    </article>
                ))}
            </section>
        </div>
    )
}; 