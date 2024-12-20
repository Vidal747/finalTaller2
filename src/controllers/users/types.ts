interface CreateUserProps {
    roleId: string;
    name: string;
    phone: string;
    email: string;
    imageUrl: string;
    user: string;
    password: string;    
    active: boolean;
}

interface UpdateUserProps {
    id: string;
    roleId: string;
    name: string;
    phone: string;
    email: string;
    imageUrl: string;
    user: string;
    password: string;    
    active: boolean;
}

export type { CreateUserProps, UpdateUserProps }