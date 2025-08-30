import { api, public_api } from './axios';
import { IFetchFilters } from '../shared';

export interface BlogPayload {
  title: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  slug?: string;
  image?: File | null;
}

// --- PUBLIC ---
export const fetchBlogs = async (filters: Partial<IFetchFilters>) => {
  const { data } = await public_api.get('/blog', { params: filters });
  return data;
};

export const fetchBlog = async (slug: string) => {
  const { data } = await public_api.get(`/blog/${slug}`);
  return data;
};

// --- ADMIN ---
export const fetchAdminBlogs = async (filters: Partial<IFetchFilters>) => {
  const { data } = await api.get('/blog', { params: filters });
  return data;
};

export const fetchAdminBlog = async (slug: string) => {
  const { data } = await api.get(`/blog/${slug}`);
  return data;
};

export const createBlog = async (payload: BlogPayload) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('excerpt', payload.excerpt);
  formData.append('content', payload.content);
  formData.append('is_published', String(payload.is_published));
  if (payload.slug) formData.append('slug', payload.slug);
  if (payload.image) formData.append('images', payload.image);

  const { data } = await api.post('/blog', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateBlog = async (slug: string, payload: Partial<BlogPayload>) => {
  const formData = new FormData();
  if (payload.title) formData.append('title', payload.title);
  if (payload.excerpt) formData.append('excerpt', payload.excerpt);
  if (payload.content) formData.append('content', payload.content);
  if (payload.is_published !== undefined)
    formData.append('is_published', String(payload.is_published));
  if (payload.slug) formData.append('slug', payload.slug);
  if (payload.image) formData.append('images', payload.image);

  const { data } = await api.put(`/blog/${slug}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteBlog = async (id: number) => {
  const { data } = await api.delete(`/blog/${id}`);
  return data;
};
