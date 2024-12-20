import { z } from 'zod';

const contactSchema = z.object({
    name: z
        .string({required_error: 'El nombre es requerido.'})
        .min(5, 'El nombre es de minimo 5 caracteres.')
        .max(50, 'El nombre es de maximo 50 caracteres.'),
    email: z
        .string({required_error: 'El email es requerido.'})
        .min(10, 'El email es de minimo 10 caracteres.')
        .max(100, 'El email es de maximo 100 caracteres.')
        .email('El email debe ser válido.'),
    issue: z
        .string({required_error: 'El asunto es requerido.'})
        .min(5, 'El asunto es de minimo 5 caracteres.')
        .max(100, 'El asunto es de maximo 100 caracteres.'),
    message: z
        .string({required_error: 'El mensaje es requerido.'})
        .min(10, 'El mensaje es de minimo 10 caracteres.')
        .max(1000, 'El mensaje es de maximo 1000 caracteres.'),
});

export { contactSchema };