import { z } from 'zod';

const frequentQuestionSchema = z.object({
    id: z
        .string()
        .uuid()
        .optional(),
    title: z
        .string({required_error: 'El titulo es requerido.'})
        .min(5, 'El titulo es de minimo 5 caracteres.')
        .max(50, 'El titulo es de maximo 50 caracteres.'),
    question: z
        .string({required_error: 'La pregunta es requerida.'})
        .min(10, 'La pregunta es de minimo 10 caracteres.')
        .max(200, 'La pregunta es de maximo 200 caracteres.'),
    answer: z
        .string({required_error: 'La respuesta es requerida.'})
        .min(10, 'La respuesta es de minimo 10 caracteres.')
        .max(500, 'La respuesta es de maximo 500 caracteres.'),
    active: z
        .boolean({required_error: 'El estado la pregunta es requerido.'})
        .or(z.string().refine(value => value === '1' || value === '0' || value === 'true' || value === 'false', {message: 'El estado del usuario es requerido.'}))
        .transform(value => {return (value === '1' || value === 'true' || value === true ? true : false)}),
});

export { frequentQuestionSchema };