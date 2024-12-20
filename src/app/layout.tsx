import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
// Components
import { Providers } from './providers';
// Styles
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
// Sorces
import { ToastContainer } from 'react-toastify';
import { GoogleTagManager } from '@next/third-parties/google';
import { Urbanist } from 'next/font/google';

const urbanistFont = Urbanist({
    subsets: ['latin'],
    variable: '--font-urbanist',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Market Poli',
    description: 'Agencia de marketing digital Colombia, agencia de marketing en Medellín, agencia de marketing, marketing Colombia, marketing Medellín, llámanosahora planes desde 450.000 mas de 12 años deexperiencia.',
    applicationName: 'Market Poli',
    appleWebApp: {
        capable: true,
        title: 'Market Poli',
        startupImage: '/icon-180.png',
        statusBarStyle: 'black'
    },
    authors: [
        {
            name: 'Critic',
            url: 'https://critic.com.co'
        }
    ],
    icons: {
        icon: './icon.ico',
        apple: './icon.ico'
    },
    keywords: [
        'Agencia marketing',
        'marketing Medellín',
        'agencia Medellín',
        'agencia marketing Medellín',
        'agencia marketing Colombia',
        'agencia marketing Medellín',
        'publicidad redes sociales',
        'publicidad Medellín',
        'publicidad Colombia',
        'Google ads Medellín',
        'Google ads Colombia',
        'Software en medellin',
        'Software a medida ',
        'Aplicaciones móviles ',
        'Software en Colombia ',
        'Desarrollo de Software ',
        'Desarrollo de app',
        'Desarrollo de Software colombia',
    ],
    manifest: '/manifest.json',
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    appLinks: {
        web: {
            url: 'https://www.agenciamarketing.com.co/',
            should_fallback: true,
        },
    },
};

export const viewport: Viewport = {
    themeColor: '#FEFEFE',
};

interface Props {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang='es' className='!scroll-smooth light' style={{ colorScheme: 'light' }}>
            <head>
                <Script src='https://translate.google.com/translate_a/element.js?cb=gtElInit&amp;hl=es&amp;client=wt' type='text/javascript'></Script>

                {/* Google tag (gtag.js) */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16663036408">
                </Script>
                <Script>
                    {`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'AW-16663036408');
					`}
                </Script>
            </head>
            <GoogleTagManager gtmId='GTM-PRB32S4T' />
            <body className={urbanistFont.className}>
                <Providers>
                    {children}
                    <ToastContainer
                        className={urbanistFont.className}
                        position='top-center'
                    />
                </Providers>
            </body>
        </html>
    )
};
