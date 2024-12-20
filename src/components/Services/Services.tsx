'use client';

import { useEffect, useState } from 'react';
// Components
import { Header } from './Header';
import { Aside } from './Aside/Aside';
import { Info } from './Info';
// Sources
import { Props, Service } from './types';
import { toast } from 'react-toastify';

const defaultService = {
    id: '51b07416-ff88-434f-90c7-223bcfbe8529',
    name: 'Defaulr Service',
    details: 'This is a default service',
    price: 100000,
    available: false,
    imagesByProduct: [
        {
            id: '51b07416-ff88-434f-90c7-223bcfbe8529',
            name: 'prueba',
            imageUrl: '/assets/noImage.svg',
        }
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export function Services({ services, message }: Props) {
    const [activeService, setActiveService] =useState<Service>(services[0] || defaultService);
    
    useEffect(() => {        
        if (message) {
            toast.warning(message, {toastId: message});
        }
    }, []);

    const setNextService = () => {
        if (!activeService) return;

        const index = services.findIndex(service => service.id === activeService.id);
        const nextIndex = index + 1;
        const nextService = services[nextIndex] || services[0];

        setActiveService(nextService);
    }

    const setPrevService = () => {
        if (!activeService) return;

        const index = services.findIndex(service => service.id === activeService.id);
        const prevIndex = index - 1;
        const prevService = services[prevIndex] || services[services.length - 1];

        setActiveService(prevService);
    }

	return (
        <main
            className={`w-screen max-w-screen h-screen max-h-screen overflow-hidden bg-cover bg-center`} 
            style={{backgroundImage: `url(${activeService && activeService.imagesByProduct[0]?.imageUrl || '/assets/noImage.svg'})`}}
        >
            <div className='w-screen h-screen flex gap-10 md:gap-20 flex-col md:flex-row justify-between bg-black/50'>
                <Header />
                <Info service={activeService} />
                <Aside setNextService={setNextService} setPrevService={setPrevService} services={services} actualService={activeService} />
            </div>
        </main>
	)
}; 