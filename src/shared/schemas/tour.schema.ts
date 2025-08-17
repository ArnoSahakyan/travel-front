import { z } from 'zod';

const dateString = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' });

const baseTourObject = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than zero'),
  available_spots: z
    .number()
    .int('Available spots must be an integer')
    .positive('Available spots must be greater than zero'),
  start_date: dateString,
  end_date: dateString,
  category_id: z.number().int().positive('Category is required'),
  destination_id: z.number().int().positive('Destination is required'),
});

// Create schema — requires images
export const createTourSchema = baseTourObject
  .extend({
    images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
  })
  .refine((data) => new Date(data.end_date) > new Date(data.start_date), {
    message: 'End date must be after start date',
    path: ['end_date'],
  });

// Update schema — images optional
export const updateTourSchema = baseTourObject.refine(
  (data) => new Date(data.end_date) > new Date(data.start_date),
  {
    message: 'End date must be after start date',
    path: ['end_date'],
  },
);

// Add Images Only schema
export const addTourImagesSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
});

export type CreateTourFormData = z.infer<typeof createTourSchema>;
export type UpdateTourFormData = z.infer<typeof updateTourSchema>;
