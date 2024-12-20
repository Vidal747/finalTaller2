// Sources
import { ResponseApi } from '@/types/app';
import { ZodIssue } from 'zod';
import axios from 'axios';

const formatToCurrency = (value: string | number): string => {
    const cleanValue = value.toString().replace(/[^0-9]/g, '');
    const formattedValue = `$${cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    return formattedValue;
};

const formatDateTime = (date: string | Date, format?: 'yyyy-mm-ddThh:mm' | 'dd/mm/yyyy') => {
    const splitedValue = new Date(date || new Date()).toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour12: true, 
        hour: 'numeric', minute: 'numeric', timeZone: 'America/Bogota'
    }).replace('. m.', 'M').toUpperCase().split(', ');

    const values = {
        date: splitedValue[0], 
        time: splitedValue[1], 
        complete: `${splitedValue[0]} - ${splitedValue[1]}`
    }

    if (format === 'yyyy-mm-ddThh:mm') {
        const dateFormat = splitedValue[0].split('/').map(x => x.padStart(2, '0')).reverse().join('-');
        const timeFormat = new Date(date || new Date()).toLocaleTimeString('es-CO', {timeZone: 'America/Bogota', hour12: false}).slice(0, 5);
        values.date = dateFormat;
        values.time = timeFormat;
        values.complete = `${dateFormat}T${timeFormat}`;
    }

    return values;
};

interface GenerateResponseApi {
    ok?: boolean;
    status?: number;
    message?: string;
    data?: any;
    issues?: ZodIssue[];
}

const generateResponseApi = ({
    ok = false,
    status,
    message,
    data,
    issues
}: GenerateResponseApi): ResponseApi => ({
    ok,
    status: !status && ok ? 200 : status || 500,
    message: !message && ok ? 'Successful' : message || '¡Ups! Algo salió mal, estamos trabajando para resolverlo.',
    data: data,
    issues: issues,
});

const getUserIp = async () => {
    try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json', {timeout: 5000});
        const ip = ipResponse.data.ip;

        const locationResponse = await axios.get(`https://ipapi.co/${ip}/json/`,{timeout: 5000});
        const geolocation = {
            lat: locationResponse.data.latitude,
            lng: locationResponse.data.longitude
        };

        return {ip, geolocation};
    } catch (error) {
        return {
            ip: '181.56.132.113',
            geolocation: {
                lat: 6.255415,
                lng: -75.5846335
            }
        };
    }
}

function formatToURL(texto: string) {
    // Convertir a minúsculas y reemplazar caracteres especiales
    return texto
      .toLowerCase()
      .normalize("NFD") // Normalizar para tratar los caracteres especiales
      .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
      .replace(/[^\w\s]/g, "") // Eliminar caracteres no alfanuméricos
      .replace(/\s+/g, "-"); // Reemplazar espacios con guiones
}

export { formatToCurrency, formatDateTime, formatToURL, generateResponseApi, getUserIp };