// Sources
import { Props } from './types';
import { Link, Image } from '@nextui-org/react';

export function Header({ option }: Props) {
    return (
        <nav className='w-full md:w-36 md:min-w-36 h-20 md:h-screen border-b-1 md:border-b-0 md:border-r-1 border-primary flex md:flex-col justify-between items-center'>
            <Link href='/#'>
                <Image
                    src='/icon-180.png'
                    alt='Logo de Softing'
                    width={56}
                    height={56}
                    className='w-14 h-14 ml-5 md:ml-0 md:mt-6'
                    draggable={false}
                />
            </Link>
            {option && <div className='w-auto md:w-full h-full md:h-auto flex md:flex-col'>
                <Link
                    href='/services/shared'
                    className={`md:w-full px-4 py-4 text-sm text-center text-white font-semibold md:gap-2 flex-col items-center ${option === 'shared' && 'bg-primary'}`}
                >
                    <Image
                        src='/assets/ourServices/sharedTourWhite.svg'
                        alt='Icono de services compartidos'
                        draggable={false}
                        className='w-8 md:w-10 md:h-10'
                    />
                    Planes Compartidos
                </Link>
                <Link
                    href='/services/private'
                    className={`md:w-full px-4 py-4 text-sm text-center text-white font-semibold md:gap-2 flex-col items-center ${option === 'private' && 'bg-primary'}`}
                >
                    <Image
                        src='/assets/ourServices/privateTourWhite.svg'
                        alt='Icono de services privados'
                        draggable={false}
                        className='w-8 md:w-10 md:h-10'
                    />
                    Planes Privados
                </Link>
            </div>}
            <div className='hidden md:flex gap-4 flex-col items-center'>
                <span className='w-6 h-10 flex rounded-full border-1 border-primary'>
                    <span className='h-1/3 mx-auto mt-2 flex border-r-1 border-primary'></span>
                </span>
                <span className='w-0 h-20 flex border-r-1 border-primary'></span>
            </div>
        </nav>
    )
};