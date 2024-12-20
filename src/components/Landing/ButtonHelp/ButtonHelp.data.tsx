import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { PiPhoneCall } from 'react-icons/pi';
import { TbMessage } from 'react-icons/tb';

const helpData = [
    {
        name: 'Teléfono',
        link: 'tel:+573008840362 ',
        icon: <PiPhoneCall />,
    },
    {
        name: 'Mensaje',
        link: 'sms:5730160526274',
        icon: <TbMessage />,
    },
    {
        name: 'WhatsApp',
        link: 'https://api.whatsapp.com/send?phone=573008840362 ',
        icon: <FaWhatsapp />,
    },
    {
        icon: <FaFacebook />,
        name: 'Facebook ',
        link: 'https://www.facebook.com/Softingc/',
    },
    {
        icon: <FaInstagram />,
        name: 'Instagram    ',
        link: 'https://www.instagram.com/softingcolombia/',
    },
]

export { helpData };