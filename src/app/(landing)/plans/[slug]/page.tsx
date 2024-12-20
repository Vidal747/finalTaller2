// Components
import { Services } from '@/components/Services';
// Controllers
import { GetActiveProducts } from '@/controllers';
// Sources
import { Props } from './types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuth';
import { formatToURL } from '@/utils/functions';

interface Product {
    id: string;
    details: string;
    name: string;
    active: boolean;
    price: number;
    available: boolean;
    imagesByProduct: {
        id: string;
        name: string;
        imageUrl: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

async function getProducts(filter: string) {
	const values: {
		products: Product[],
		message: string,
	} = {
		products: [],
		message: '',
	}
	
	try {
		const session = await getServerSession(authOptions);
			
		const result = await GetActiveProducts(session?.user.id!, session?.user.session!);
	
		if (!result.ok || !result.data?.length) {
			values.message = result.message;
		} else {
            const filteredServices = result.data.filter(service => service.id === filter || formatToURL(service.name) === filter);

			values.products = filteredServices;
		}	
	} catch (error) {
		values.products = [];
	}
	
	return values;
};
export default async function ServicesPage({ params }: Props) {
    const { products, message } = await getProducts(params.slug);

    return (
        <>
            <Services services={products} message={message} />
        </>
    )
}