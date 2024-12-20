import NextLink from 'next/link';
// Components
import { ThemeSwitch } from '../../ThemeSwitch';
import { Profile } from './Profile';
// Sources
import { Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

export function Header() {
    return (
        <Navbar 
			isBlurred 
			classNames={{wrapper: 'px-5'}}
		>
			<NavbarBrand>
				<Link
					as={NextLink}
					href='/dashboard'
				>
					<Image
						src='/assets/logo.webp'
						alt='Logo de Softing'
						width={160}
						height={38}
						radius='none'
						draggable={false}
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent justify='end'>
				<NavbarItem>
					<Profile />
				</NavbarItem>
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
    )
};