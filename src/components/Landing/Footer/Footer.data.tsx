import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { PiCalendarPlus, PiNewspaper, PiChats, PiClipboardText, PiEnvelope, PiMapPinLine, PiPhoneCall } from 'react-icons/pi';

const footerData = [
    {
        title: 'Acceso rápido',
        links: [
            {
                name: 'Blog',
                link: '/blog',
                icon: <PiNewspaper />,
            },
            {
                name: 'Agendar servicio',
                link: 'https://api.whatsapp.com/send?phone=573008840362',
                icon: <PiCalendarPlus />,
            },
            {
                name: 'Preguntas frecuentes',
                link: '/frequentQuestions',
                icon: <PiChats />,
            },
            {
                name: 'Terminos y condiciones',
                link: '/termsAndConditions',
                icon: <PiClipboardText />,
            },
        ],
    },
    {
        title: 'Contacto',
        links: [
            {
                name: '+57 300 884 03 62 ',
                link: ' tel:+573008840362',
                icon: <PiPhoneCall />,
            },
            {
                name: 'Softingc@gmail.com',
                link: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJZWPhJMBKllRcZsDGVgwLQswsgspPbQgKSgsgfjBfkppqfzNcgVXdbRflqBnfXQwQdxgJV',
                icon: <PiEnvelope />,
            },
            {
                name: 'Cl. 41 Sur #31 40 of 101, Zona 7, Envigado.',
                link: 'https://maps.app.goo.gl/TP8ciM36SCUNRN4i9',
                icon: <PiMapPinLine />,
            },
        ],
    },
]

const footerSocialNetworks = [
    {
        icon: <FaFacebook />,
        name: 'Facebook de Softing',
        link: 'https://www.facebook.com/Softingc/',
    },
    {
        icon: <FaInstagram />,
        name: 'Instagram de Softing',
        link: 'https://www.instagram.com/softingcolombia/',
    },
    {
        icon: <FaWhatsapp />,
        name: 'Whatsapp de Softing',
        link: 'https://api.whatsapp.com/send?phone=573008840362',
    }
];

export { footerData, footerSocialNetworks };