import { toast } from 'react-toastify';

export const useToast = () => {
  return {
    showSuccess: (message: string) => toast.success(message),
    showError: (message: string) => toast.error(message),
    showInfo: (message: string) => toast.info(message),
  };
};
