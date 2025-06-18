import { z } from 'zod';

export const personalInfoSchema = z
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

    phone_number: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^[0-9+()\s-]{6,20}$/.test(val), {
        message: 'Invalid phone number format',
      }),
  })
  .strict();

export type PersonalFormData = z.infer<typeof personalInfoSchema>;

export const passwordChangeSchema = z
  .object({
    current_password: z
      .string({
        required_error: 'Current password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim()
      .min(8, 'Current password must be at least 8 characters'),

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
  .strict()
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
