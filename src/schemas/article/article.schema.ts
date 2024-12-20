import { z } from 'zod';

const articleSchema = z.object({
    id: z
        .string()
        .uuid()
        .optional(),
    title: z
        .string({required_error: 'El titulo es requerido.'})
        .min(5, 'El titulo es de minimo 5 caracteres.')
        .max(100, 'El titulo es de maximo 50 caracteres.'),
    subtitle: z
        .string({required_error: 'El subtitulo es requerido.'})
        .min(5, 'El subtitulo es de minimo 5 caracteres.')
        .max(100, 'El subtitulo es de maximo 50 caracteres.'),
    description: z
        .string({required_error: 'La descripción es requerida.'})
        .min(50, 'La descripción es de minimo 50 caracteres.')
        .max(1000, 'La descripción es de maximo 1000 caracteres.'),
    imageUrl: z
        .array(z.any())
        .or(z.any()),
    tags: z
        .string()
        .optional(),
    active: z
        .boolean({required_error: 'El estado del articulo es requerido.'})
        .or(z.string().refine(value => value === '1' || value === '0' || value === 'true' || value === 'false', {message: 'El estado del usuario es requerido.'}))
        .transform(value => {return (value === '1' || value === 'true' || value === true ? true : false)}),
});

export { articleSchema };