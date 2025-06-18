import { api } from './axios.ts';
import { PersonalFormData } from '../shared';

export const updatePersonalInfo = (data: PersonalFormData) => api.put('/account/info', data);

export const changePassword = (data: { current_password: string; new_password: string }) =>
  api.put('/account/password', data);
