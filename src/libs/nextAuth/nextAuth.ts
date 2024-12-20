// Controllers
import { CredentialsLogIn, GoogleLogIn } from '@/controllers';
// Sources
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile, tokens) {
                if ( !profile.email || !profile.picture || !tokens.access_token || !tokens.expires_at ) {
                    throw new Error('¡Ups! Credenciales incompletas.');
                }
                
                const response = await GoogleLogIn({ 
                    email: profile.email,
                    picture: profile.picture,
                    accessToken: tokens.access_token,
                    accessTokenExpiration: new Date(tokens.expires_at! * 1000).toISOString(),
                });
                
                if (!response.ok || !response.data) {
                    return {id: '00000000-0000-0000-0000-000000000000'};
                }

                return response.data[0];
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                user: {label: 'Usuario', type: 'text', placeholder: 'Usuario'},
                password: {label: 'Contraseña', type: 'password', placeholder: 'Contraseña'}
            },
            async authorize(credentials) {
                const user = credentials?.user;
                const password = credentials?.password;
                
                if ( !user || !password ) {
                    throw new Error('¡Ups! Credenciales incompletas.');
                }
                
                const response = await CredentialsLogIn({ user, password });
                
                if (!response.ok || !response.data) {
                    throw new Error(response.message);
                }

                return response.data[0];
            },
        }),
    ],
    jwt: {
        maxAge: 1 * 24 * 60 * 60,
    },
    session: {
        maxAge: 1 * 24 * 60 * 60,
        updateAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            if (user && user.id && user.email && user.session) {
                return true
            } else {
                return false
            }
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            } else if (new URL(url).origin === baseUrl && new URL(url).searchParams.get('callbackUrl')) {
                const parsedUrl = new URL(url);
                const callbackUrl = parsedUrl.searchParams.get('callbackUrl');

                return callbackUrl || `${baseUrl}/dashboard`;
            } else if (new URL(url).origin === baseUrl) {
                return url;
            }

            return `${baseUrl}/dashboard`;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.user = user;
            }
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            
            return token
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;            
            
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };