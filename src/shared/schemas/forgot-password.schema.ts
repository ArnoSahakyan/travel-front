import { z } from 'zod';

export const forgotPasswordSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .trim()
      .email('Please enter a valid email address')
      .max(254, 'Email is too long'),
  })
  .strict();

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
