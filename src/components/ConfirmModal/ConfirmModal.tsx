import { FC } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onClose={isLoading ? () => {} : onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30 dark:bg-black/50' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-background-dark p-6 text-left align-middle shadow-xl transition-all'>
          <div className='flex items-start gap-4'>
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${type === 'danger' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}
            >
              {type === 'danger' ? (
                <ExclamationTriangleIcon
                  className='h-6 w-6 text-red-600 dark:text-red-500'
                  aria-hidden='true'
                />
              ) : (
                <InformationCircleIcon
                  className='h-6 w-6 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                />
              )}
            </div>

            <div className='mt-1'>
              <DialogTitle
                as='h3'
                className='text-lg font-medium leading-6 text-primary-light dark:text-primary-dark'
              >
                {title}
              </DialogTitle>
              <div className='mt-2'>
                <p className='text-sm text-secondary-light dark:text-secondary-dark'>{message}</p>
              </div>
            </div>
          </div>

          <div className='mt-6 flex justify-end gap-3'>
            <button
              type='button'
              className='inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              type='button'
              className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                type === 'danger'
                  ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 disabled:bg-red-400'
                  : 'bg-primary-light hover:bg-primary-dark focus-visible:ring-primary-light disabled:bg-blue-400'
              }`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
