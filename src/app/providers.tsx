'use client';

import { useRouter } from 'next/navigation';
// Sources
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

interface Props {
    children: React.ReactNode
}

function Providers({ children }: Props) {
    const router = useRouter();

    return (
        <SessionProvider>
            <NextUIProvider navigate={router.push}>
                <ThemeProvider enableSystem={true} attribute='class' defaultTheme='light'>
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}

export { Providers };