import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { PiPhoneCall } from 'react-icons/pi';
import { TbMessage } from 'react-icons/tb';

const helpData = [
    {
        name: 'Teléfono',
        link: 'tel:+573242886008 ',
        icon: <PiPhoneCall />,
    },
    {
        name: 'Mensaje',
        link: 'sms:573242886008',
        icon: <TbMessage />,
    },
    {
        name: 'WhatsApp',
        link: 'https://api.whatsapp.com/send?phone=573242886008 ',
        icon: <FaWhatsapp />,
    },
    {
        icon: <FaFacebook />,
        name: 'Facebook ',
        link: 'https://www.facebook.com',
    },
    {
        icon: <FaInstagram />,
        name: 'Instagram    ',
        link: 'https://www.instagram.com',
    },
]

export { helpData };