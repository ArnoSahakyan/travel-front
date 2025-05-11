import { SUPABASE_STORAGE_URL } from '../shared';

export const images = (path: string, bucket = 'tours-images') => {
  return `${SUPABASE_STORAGE_URL}/${bucket}/${path}`;
};
