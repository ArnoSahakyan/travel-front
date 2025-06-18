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

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string({
        required_error: 'New password is required',
      })
      .trim()
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must be less than 128 characters')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must include at least one special character'),
    confirm_password: z
      .string({
        required_error: 'Please confirm your password',
      })
      .trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
