import { z } from 'zod';

export const signInSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .trim()
      .min(5, 'Email is too short')
      .max(254, 'Email is too long')
      .email('Invalid email address')
      .refine((val) => !/\s/.test(val), {
        message: 'Email must not contain spaces',
      }),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password is too long')
      .refine((val) => !/\s/.test(val), {
        message: 'Password must not contain spaces',
      }),
  })
  .strict();

export type SignInFormData = z.infer<typeof signInSchema>;
