import { z } from 'zod';

const productSchema = z.object({
    id: z
        .string()
        .uuid()
        .optional(),
    name: z
        .string({required_error: 'El nombre es requerido.'})
        .min(5, 'El nombre es de minimo 5 caracteres.')
        .max(50, 'El nombre es de maximo 50 caracteres.'),
    details: z
        .string({required_error: 'Los detalles son requeridos.'})
        .min(5, 'Los detalles son de minimo 5 caracteres.')
        .max(1000, 'Los detalles son de maximo 1000 caracteres.'),
    price: z
        .number({required_error: 'El precio es requerido.', invalid_type_error: 'El precio debe ser un número.'})
        .nonnegative('El precio debe ser mayor a 0.')
        .or(z.string().refine(value => !isNaN(Number(value)), {message: 'El precio debe ser un número.'}))
        .transform(value => {return Number(value)}),
    available: z
        .boolean({required_error: 'La disponibilidad del producto es requerida.'})
        .or(z.string().refine(value => value === '1' || value === '0' || value === 'true' || value === 'false', {message: 'La disponibilidad del producto es requerida.'}))
        .transform(value => {return (value === '1' || value === 'true' || value === true ? true : false)}),
    active: z
        .boolean({required_error: 'El estado del usuario es requerido.'})
        .or(z.string().refine(value => value === '1' || value === '0' || value === 'true' || value === 'false', {message: 'El estado del usuario es requerido.'}))
        .transform(value => {return (value === '1' || value === 'true' || value === true ? true : false)}),
    imagesByProduct: z
        .array(z.any())
        .or(z.any()),
});

export { productSchema };