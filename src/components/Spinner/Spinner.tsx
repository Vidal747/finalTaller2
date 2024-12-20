// Sources
import { Image } from '@nextui-org/react';

export function Spinner() {
    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-50 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm'>
            <Image
                src='/assets/logo.webp'
                alt='Logo de Market Poli'
                width='150'
                height='60'
                draggable='false'
            />
            <div>
                <div className='w-[180px] h-[100px] mx-auto text-center'>
                    <div className='w-5 h-5 inline-block mt-12 rounded-full bg-baseRadial animate-boing'>
                    </div>
                    <div className='w-5 h-5 inline-block mt-12 rounded-full bg-baseRadial animate-boing2'>
                    </div>
                    <div className='w-5 h-5 inline-block mt-12 rounded-full bg-baseRadial animate-boing4'>
                    </div>
                    <div className='w-5 h-5 inline-block mt-12 rounded-full bg-baseRadial animate-boing6'>
                    </div>
                    <div className='w-5 h-5 inline-block mt-12 rounded-full bg-baseRadial animate-boing8'>
                    </div>
                </div>
            </div>
        </div>
    )
};  