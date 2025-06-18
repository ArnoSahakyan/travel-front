import { z } from 'zod';

// Regex patterns
const fullNameRegex = /^[a-zA-ZÀ-ÿ' -]+$/; // Latin letters, hyphens, apostrophes, accents
const phoneRegex = /^\+?[0-9\s\-().]{9,20}$/;

export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters')
    .regex(fullNameRegex, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be at most 100 characters')
    .trim(),

  phone_number: z
    .string()
    .min(9, 'Phone number must be at least 9 digits')
    .max(20, 'Phone number must be at most 20 digits')
    .regex(phoneRegex, 'Phone number can only contain digits, spaces, +, -, (, )')
    .trim(),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
