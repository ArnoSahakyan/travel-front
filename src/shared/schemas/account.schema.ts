import { z } from 'zod';

// Personal Info Schema
export const personalInfoSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

export type PersonalFormData = z.infer<typeof personalInfoSchema>;

// Password Change Schema
export const passwordChangeSchema = z
  .object({
    current_password: z.string().min(8, 'Current password is required'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
