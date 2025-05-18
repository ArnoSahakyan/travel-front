import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Maximum rating is 5'),
  comment: z
    .string()
    .min(1, 'Review text is required')
    .max(255, 'Review must be less than 255 characters'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
