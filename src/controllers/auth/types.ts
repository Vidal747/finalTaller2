interface GoogleLoginProps {
    email: string;
    picture: string;
    accessToken: string;
    accessTokenExpiration: string;
}

interface CredentialsLoginProps {
    user: string;
    password: string;
}

interface ValidateUserPermissionsProps {
    userId: string;
    session: string;
    withGoogle?: boolean;
    permissions: {
        entityName: string;
        canCreate?: boolean;
        canRead?: boolean;
        canUpdate?: boolean;
        canDelete?: boolean;
    }[];
}

interface Actions {
    id: 'Create' | 'Read' | 'Update' | 'Delete';
    label: string;
}

export type { GoogleLoginProps, CredentialsLoginProps, ValidateUserPermissionsProps, Actions }