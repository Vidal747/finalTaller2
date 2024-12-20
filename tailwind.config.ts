import type { Config } from 'tailwindcss';
// Sources
import { nextui } from '@nextui-org/react';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#60ab58',
				secondary: '#abcc49',
				dark: '#1E1B18',
			},
			fontFamily: {
				urbanist: [`var(--font-urbanist)`, 'sans-serif']
			},
			backgroundImage: {
				bgSignin: `url('https://i.postimg.cc/wMk6P8rp/signin.jpg')`,
                bgFooter: `url('https://i.postimg.cc/GhQnnt55/freepik-export-20241009002558-FTuj.png')`,		
				bgServices: `url('/assets/manchas/mancha.png')`,
				bgServices2: `url('/assets/manchas/mancha-2.png')`,
				bgServices3: `url('/assets/manchas/mancha-3.png')`,
				baseRadial: 'linear-gradient(90deg, #60ab58 0%, #abcc49 95.83%)',
				sliderLinear: 'linear-gradient(0deg, #FFF 50%, #FFF0 100%)',
			},
			animation: {
				boing: 'boing 1s ease-out infinite',
				boing2: 'boing 1s .2s ease-out infinite',
				boing4: 'boing 1s .4s ease-out infinite',
				boing6: 'boing 1s .6s ease-out infinite',
				boing8: 'boing 1s .8s ease-out infinite',				
				vibrate: 'vibrate 1s ease-out infinite',
			},
			keyframes: {
				boing: {
					'0%, 100%': { transform: 'translateY(0px)', animationTimingFunction: 'ease-out' },
					'50%': { transform: 'translateY(-30px)', animationTimingFunction: 'ease-in', opacity: '0.5' },
				},
				vibrate: {
					'0%, 100%': { transform: 'scale(1)', animationTimingFunction: 'ease-out' },
					'50%': { transform: 'scale(1.05)', animationTimingFunction: 'ease-in', opacity: '0.9' },
				}
			},
		},
	},
	plugins: [
		nextui({
			prefix: 'nextui', // prefix for themes variables
			addCommonColors: false, // override common colors (e.g. 'blue', 'green', 'pink').
			// defaultTheme: 'dark', // default theme from the themes object
			// defaultExtendTheme: 'dark', // default theme to extend on custom themes
			layout: {}, // common layout tokens (applied to all themes)
			themes: {
				light: {
					layout: {}, // light theme layout tokens
					colors: {}, // light theme colors
				},
				dark: {
					layout: {}, // dark theme layout tokens
					colors: {}, // dark theme colors
				},
			  	// ... custom themes
			},
		}),
		plugin(function({ addUtilities }){
			addUtilities({
				'.cut-left': {
					'clip-path': 'polygon(0 112px, 100% 0, 100% 100%, 0 calc(100% - 112px))'
				},
				'.cut-top-left': {
					'clip-path': 'polygon(0 112px, 100% 0, 100% 100%, 0 100%)'
				},
				'.cut-bottom-left': {
					'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 112px))'
				},
				'.cut-right': {
					'clip-path': 'polygon(0 0, 100% 112px, 100% calc(100% - 112px), 0 100%)'
				},
				'.cut-top-right': {
					'clip-path': 'polygon(0 0, 100% 112px, 100% 100%, 0 100%)'
				},
				'.cut-bottom-right': {
					'clip-path': 'polygon(0 0, 100% 0, 100% calc(100% - 112px), 0 100%)'
				},
			})
		}),
	],
};

export default config;
