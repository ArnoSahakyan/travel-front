import { api } from './axios.ts';

export const updatePersonalInfo = (data: { full_name: string; email: string; phone_number?: string }) =>
  api.put('/account/info', data);

export const changePassword = (data: { current_password: string; new_password: string }) =>
  api.put('/account/password', data);
