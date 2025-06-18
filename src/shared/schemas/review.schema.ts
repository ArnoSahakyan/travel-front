import { z } from 'zod';

export const reviewSchema = z
  .object({
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .int('Rating must be an integer')
      .min(1, 'Minimum rating is 1')
      .max(5, 'Maximum rating is 5'),

    comment: z
      .string({
        required_error: 'Review text is required',
        invalid_type_error: 'Review must be a string',
      })
      .trim()
      .min(5, 'Review must be at least 5 characters')
      .max(255, 'Review must be less than 255 characters')
      .refine((text) => !/http[s]?:\/\//i.test(text), {
        message: 'Links are not allowed in reviews',
      }),
  })
  .strict();

export type ReviewFormData = z.infer<typeof reviewSchema>;
