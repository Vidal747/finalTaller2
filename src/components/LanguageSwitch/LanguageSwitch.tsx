'use client';
// @ts-nocheck

import { useState } from 'react';
// Sources
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import { Language, LanguageData } from './types';

const languages: Record<Language, LanguageData> = {
    'es': {
        image: <Image src='/assets/languages/spanish.svg' alt='idioma español'/>,
        label: 'Español',
    },
    'en': {
        image: <Image src='/assets/languages/english.svg' alt='idioma ingles'/>,
        label: 'English',
    },
    'fr': {
        image: <Image src='/assets/languages/french.svg' alt='idioma frances'/>,
        label: 'French',
    },
};

export function LanguageSwitch() {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('es');

    const handleChange = (lng: Language) => {
        // @ts-ignore
        let lib = new google.translate.TranslateService();
        lib.translatePage('es', lng, function () {});

        setCurrentLanguage(lng);
    }

    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Button isIconOnly aria-label='cambiar de tema' color='secondary' variant='flat'>
                    {languages[currentLanguage].image}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='opciones de tema'>
                {Object.keys(languages).map(language => (
                    <DropdownItem key={language} onClick={() => handleChange(language as Language)}>
                        <span className='flex gap-2 items-center'>
                            <span className='w-10 h-10'>
                                {languages[language as Language].image}
                            </span>
                            {languages[language as Language].label}
                        </span>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
};