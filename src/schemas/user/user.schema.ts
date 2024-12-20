import { z } from 'zod';

const userSchema = z.object({
    id: z
        .string()
        .uuid()
        .optional(),
    roleId: z
        .string({required_error: 'El rol es requerido.'})
        .uuid({message: 'El rol debe ser un id valido.'}),
    name: z
        .string({required_error: 'El nombre es requerido.'})
        .min(5, 'El nombre es de minimo 5 caracteres.')
        .max(50, 'El nombre es de maximo 50 caracteres.'),
    phone: z
        .string({required_error: 'El teléfono es requerido.'})
        .min(7, 'El teléfono es de minimo 7 caracteres.')
        .max(15, 'El teléfono es de maximo 15 caracteres.'),
    email: z
        .string({required_error: 'El correo electrónico es requerido.'})
        .email('El correo electrónico debe ser un correo valido.')
        .min(10, 'El correo electrónico es de minimo 10 caracteres.')
        .max(50, 'El correo electrónico es de maximo 50 caracteres.'),
    imageUrl: z
        .string({required_error: 'La imagen es requerida.'})
        .optional(),
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
    active: z
        .boolean({required_error: 'El estado del usuario es requerido.'})
        .or(z.string().refine(value => value === '1' || value === '0' || value === 'true' || value === 'false', {message: 'El estado del usuario es requerido.'}))
        .transform(value => {return (value === '1' || value === 'true' || value === true ? true : false)}),
});

export { userSchema };