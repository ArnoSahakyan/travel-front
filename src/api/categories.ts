import { api } from './axios';

export const fetchAllCategories = async () => {
  const res = await api.get('/categories');
  return res.data;
};

export const createCategory = async (data: { name: string }) => {
  const res = await api.post(`/categories`, data);
  return res.data;
};

export const updateCategory = async (id: number, data: { name: string }) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategoryById = async (id: number) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
