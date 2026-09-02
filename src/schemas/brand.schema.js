import { z } from 'zod';

// Esquema para crear una marca (POST)
export const createBrandSchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la marca es obligatorio' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede exceder los 80 caracteres'),
  country: z
    .string()
    .trim()
    .max(60, 'El país no puede exceder los 60 caracteres')
    .optional(),
  website: z
    .string()
    .trim()
    .url('El sitio web debe tener un formato URL válido')
    .max(200, 'El sitio web no puede exceder los 200 caracteres')
    .optional()
});
