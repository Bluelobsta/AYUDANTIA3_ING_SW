import { z } from 'zod';

// Esquema para crear una reseña (POST)
export const createReviewSchema = z.object({
  author: z
    .string({ required_error: 'El autor de la reseña es obligatorio' })
    .trim()
    .min(2, 'El autor debe tener al menos 2 caracteres')
    .max(100, 'El autor no puede exceder los 100 caracteres'),
  rating: z
    .number({ required_error: 'La calificación es obligatoria' })
    .int('La calificación debe ser un número entero')
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  comment: z
    .string({ required_error: 'El comentario es obligatorio' })
    .trim()
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede exceder los 500 caracteres')
});
