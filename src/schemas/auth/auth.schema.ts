import { z } from 'zod';

const credentialsLoginSchema = z.object({
    user: z
        .string({required_error: 'El usuario es requerido.'})
        .min(5, 'El usuario es de minimo 5 caracteres.')
        .max(50, 'El usuario es de maximo 50 caracteres.'),
    password: z
        .string({required_error: 'La contraseña es requerida.'})
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .max(50, 'La contraseña debe tener maximo 50 caracteres.')
        .refine(value => /[a-z]/.test(value), {
            message: 'La contraseña debe contener al menos una letra minúscula.',
        })
        .refine(value => /[A-Z]/.test(value) ,{
            message: 'La contraseña debe contener al menos una letra mayúscula.'
        })
        .refine(value => /\d/.test(value), {
            message: 'La contraseña debe contener al menos un número.',
        })
        .refine(value => /[\W_]/.test(value),{
            message: 'La contraseña debe contener al menos un caracter especial.',
        }),
});

const googleLoginSchema = z.object({
    email: z
        .string({required_error: 'El correo electrónico es requerido.'})
        .email('El correo electrónico debe ser un correo valido.')
        .min(10, 'El correo electrónico es de minimo 10 caracteres.')
        .max(50, 'El correo electrónico es de maximo 50 caracteres.'),
    picture: z
        .string({required_error: 'La imagen es requerida.'})
        .url('La imagen debe ser una url valida.'),
    accessToken: z
        .string({required_error: 'El token de acceso es requerido.'}),
    accessTokenExpiration: z
        .string({required_error: 'La fecha de expiracion del token de acceso es requerida.'}),
});

export { credentialsLoginSchema, googleLoginSchema };