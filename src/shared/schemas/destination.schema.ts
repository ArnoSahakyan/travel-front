import { z } from 'zod';

export const baseDestinationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  images: z.array(z.instanceof(File)),
});

export const createDestinationSchema = baseDestinationSchema.extend({
  images: z.array(z.instanceof(File)).min(1, 'Image is required'),
});

export const updateDestinationSchema = baseDestinationSchema;

export type CreateDestinationFormData = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationFormData = z.infer<typeof updateDestinationSchema>;
