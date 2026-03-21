import { AxiosError } from 'axios';

/**
 * Extracts a human-readable error message from an Axios rejection
 * or a standard JavaScript Error object.
 */
export const formatAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
};
