import { z } from 'zod';

export const baseBlogSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title must be less than 150 characters'),
  excerpt: z.string().min(10, 'Excerpt is too short'),
  content: z
    .string({ required_error: 'Content is required' })
    .trim()
    .min(10, 'Content must be at least 10 characters'),
  is_published: z.boolean(),
  slug: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export const createBlogSchema = baseBlogSchema.extend({
  image: z.instanceof(File, { message: 'Cover image is required' }),
});

export const updateBlogSchema = baseBlogSchema;

export type CreateBlogFormData = z.infer<typeof createBlogSchema>;
export type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;
export type BlogPayload = CreateBlogFormData | UpdateBlogFormData;
