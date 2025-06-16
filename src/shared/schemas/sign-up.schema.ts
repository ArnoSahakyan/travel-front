import { z } from 'zod';

export const signUpSchema = z
  .object({
    full_name: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be a string',
      })
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be less than 100 characters')
      .refine((val) => /^[a-zA-Z\s.'-]+$/.test(val), {
        message: 'Full name contains invalid characters',
      }),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .trim()
      .email('Invalid email address')
      .max(254, 'Email is too long'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be less than 128 characters')
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[a-z]/, 'Password must include at least one lowercase letter')
      .regex(/[0-9]/, 'Password must include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character'),

    confirm_password: z
      .string({
        required_error: 'Please confirm your password',
      })
      .trim(),

    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .strict()
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
