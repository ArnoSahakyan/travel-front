import { FC, useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AdminUser, UpdateUserAdminPayload } from '../../../../api';

const ROLE_ADMIN = 1;
const ROLE_USER = 2;

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onSave: (userId: number, payload: UpdateUserAdminPayload) => Promise<void>;
}

export const UserEditModal: FC<UserEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState<UpdateUserAdminPayload>({
    full_name: '',
    email: '',
    phone_number: '',
    role_id: ROLE_USER,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number || '',
        role_id: user.role_id || ROLE_USER,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await onSave(user.user_id, formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={isLoading ? () => {} : onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30 dark:bg-black/50' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-background-dark p-6 text-left align-middle shadow-xl transition-all'>
          <DialogTitle
            as='h3'
            className='text-lg font-medium leading-6 text-primary-light dark:text-primary-dark mb-4'
          >
            Edit User Profile
          </DialogTitle>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label
                htmlFor='full_name'
                className='block text-sm font-medium text-primary-light dark:text-primary-dark mb-1'
              >
                Full Name
              </label>
              <input
                id='full_name'
                type='text'
                required
                value={formData.full_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                className='block w-full rounded-md border-0 py-1.5 px-3 text-primary-light dark:text-primary-dark ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-white dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-primary-light dark:text-primary-dark mb-1'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className='block w-full rounded-md border-0 py-1.5 px-3 text-primary-light dark:text-primary-dark ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-white dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6'
              />
            </div>

            <div>
              <label
                htmlFor='phone_number'
                className='block text-sm font-medium text-primary-light dark:text-primary-dark mb-1'
              >
                Phone Number <span className='text-gray-400 font-normal'>(Optional)</span>
              </label>
              <input
                id='phone_number'
                type='text'
                value={formData.phone_number || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone_number: e.target.value }))}
                className='block w-full rounded-md border-0 py-1.5 px-3 text-primary-light dark:text-primary-dark ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-white dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6'
              />
            </div>

            <div>
              <label
                htmlFor='role_id'
                className='block text-sm font-medium text-primary-light dark:text-primary-dark mb-1'
              >
                Role
              </label>
              <select
                id='role_id'
                value={formData.role_id}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role_id: parseInt(e.target.value) }))
                }
                className='block w-full rounded-md border-0 py-1.5 px-3 text-primary-light dark:text-primary-dark ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6'
              >
                <option value={ROLE_USER}>User</option>
                <option value={ROLE_ADMIN}>Admin</option>
              </select>
            </div>

            <div className='mt-6 flex justify-end gap-3'>
              <button
                type='button'
                onClick={onClose}
                disabled={isLoading}
                className='inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='inline-flex justify-center rounded-md border border-transparent bg-primary-light px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 disabled:bg-blue-400'
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
