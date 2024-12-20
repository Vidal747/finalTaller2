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
                link: 'https://api.whatsapp.com/send?phone=573242886008',
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
                name: '3242886008 ',
                link: ' tel:+573242886008',
                icon: <PiPhoneCall />,
            },
            {
                name: 'marketpoli@gmail.com',
                link: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJZWPhJMBKllRcZsDGVgwLQswsgspPbQgKSgsgfjBfkppqfzNcgVXdbRflqBnfXQwQdxgJV',
                icon: <PiEnvelope />,
            },
            {
                name: 'Envigado.',
                link: 'https://maps.app.goo.gl/TP8ciM36SCUNRN4i8',
                icon: <PiMapPinLine />,
            },
        ],
    },
]

const footerSocialNetworks = [
    {
        icon: <FaFacebook />,
        name: 'Facebook de Market Poli',
        link: 'https://www.facebook.com/Softingc/',
    },
    {
        icon: <FaInstagram />,
        name: 'Instagram de Market Poli',
        link: 'https://www.instagram.com/softingcolombia/',
    },
    {
        icon: <FaWhatsapp />,
        name: 'Whatsapp de Market Poli',
        link: 'https://api.whatsapp.com/send?phone=573242886008',
    }
];

export { footerData, footerSocialNetworks };