import 'next-auth';
// Sources
import { CustomUser } from './app';

declare module 'next-auth' {
    interface Session {
        user: CustomUser,
        accessToken: string;
    }

    interface User {
        role: {
            id: string;
            name: string;
        };
        user: string;
        id: string;
        name: string;
        phone: string;
        email: string;
        imageUrl: string;
        nextPasswordChange: Date | null;
        session: string | null;
        sessionExpiration: Date | null;
        accessToken: string | null;
        accessTokenExpiration: Date | null;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: CustomUser,
        accessToken: string;
    }
}