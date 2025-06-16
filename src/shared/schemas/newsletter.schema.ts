import { z } from 'zod';

export const newsletterSchema = z
  .object({
    email: z
      .string()
      .min(5, 'Email is too short')
      .max(254, 'Email is too long') // RFC 5321 limit
      .email('Please enter a valid email address')
      .refine((email) => !/\s/.test(email), {
        message: 'Email must not contain spaces',
      })
      .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: 'Email format is invalid',
      }),
  })
  .strict();

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
