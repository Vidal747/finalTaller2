// Components
import { Services } from '@/components/Services';
// Controllers
import { GetActiveProducts } from '@/controllers';
// Sources
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuth';

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

async function getProducts() {
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
			values.products = result.data;
		}	
	} catch (error) {
		values.products = [];
	}
	
	return values;
};

export default async function ServicesPage() {
    const { products, message } = await getProducts();
    
    return (
        <>
            <Services services={products} message={message} />
        </>
    )
}