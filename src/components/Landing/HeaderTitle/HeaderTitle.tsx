// Sources
import { Props } from './types';

export function HeaderTitle({ title }: Props) {
    return (
        <div className='py-40 px-5 bg-secondary/20 bg-cover bg-center cut-bottom-left -mt-16'>
            <h1 className='text-4xl md:text-5xl text-center text-primary font-black uppercase'>
                {title}
            </h1>
        </div>
    )
};