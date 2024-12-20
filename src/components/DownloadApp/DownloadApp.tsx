'use client';

import { useEffect, useState } from 'react';
// Sources
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

declare global {
    var deferredPrompt: any;
}

export function DownloadApp() {
    const [isReadyForInstall, setIsReadyForInstall] = useState(false);

    useEffect(() => {        
        const handlePrompt = (e: Event) => {
            const cookies = document.cookie.split(';');
            const isDeclined = cookies.some(cookie => cookie.includes('Softing.decline-install'));
            
            if (!isDeclined) {
                e.preventDefault();
                window.deferredPrompt = e;
                setIsReadyForInstall(true);
            }
        }

        window.addEventListener('beforeinstallprompt', handlePrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handlePrompt);
        }
    }, []);
    
    const handleDownload = async () => {
        const promptEvent = window.deferredPrompt;

        if (!promptEvent) {
            setIsReadyForInstall(false);
            return;
        };
        
        const userChoice = await promptEvent.prompt();

        if (userChoice.outcome === 'accepted') {
            window.deferredPrompt = null;
            setIsReadyForInstall(false);
        }
    }

    const handleClose = (value: boolean) => {
        setIsReadyForInstall(value);
        document.cookie = 'Softing.decline-install=true; path=/; samesite=strict; secure'
    }
    
    return isReadyForInstall ? (
        <Modal
            isOpen={isReadyForInstall}
            placement='center'
            backdrop='blur'
            onOpenChange={handleClose}
        >
            <ModalContent>
                <ModalHeader className='justify-center text-xl pt-6'>
                    ¡Ahora puedes descargar nuestra app!
                </ModalHeader>
                <ModalBody>
                    <div className='flex gap-6 flex-col py-4'>
                        <h4 className='text-center'>
                            ¿Deseas tenernos en tu banco de apps?
                        </h4>
                        <Button
                            color='primary' 
                            onClick={handleDownload}
                        >
                            Descargar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    ) : null;
};  