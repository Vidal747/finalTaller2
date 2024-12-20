import { Service } from '../types';

interface Props {
    setNextService: () => void;
    setPrevService: () => void;
    services: Service[];
    actualService: Service;
}

export type { Props };