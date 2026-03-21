import { useState, useEffect } from 'react';
import {
  getAdminUsers,
  deleteAdminUser,
  updateUserAdmin,
  AdminUser,
  UpdateUserAdminPayload,
} from '../../../api';
import { Loader, Pagination, ConfirmModal } from '../../../components';
import { UserEditModal } from './components/UserEditModal';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { ShieldCheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const ROLE_ADMIN = 1;

const UsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);

  const fetchUsers = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await getAdminUsers(currentPage, 10);
      setUsers(res.users);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleRoleChange = async (userId: number) => {
    const userToEdit = users.find((u) => u.user_id === userId);
    if (userToEdit) setEditUser(userToEdit);
  };

  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;
    setIsDeleting(true);
    try {
      await deleteAdminUser(deleteUserId);
      toast.success('User deleted successfully');
      fetchUsers(page);
    } catch (err: any) {
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
      setDeleteUserId(null);
    }
  };

  const handleSaveUser = async (userId: number, payload: UpdateUserAdminPayload) => {
    try {
      const updatedUser = await updateUserAdmin(userId, payload);
      setUsers(users.map((u) => (u.user_id === userId ? updatedUser : u)));
      setEditUser(null);
      toast.success('User updated successfully');
    } catch (err: any) {
      toast.error('Failed to update user');
      throw err;
    }
  };

  if (loading && users.length === 0) return <Loader />;

  return (
    <div className='py-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-3xl font-semibold leading-6 text-primary-light dark:text-text-dark'>
            Users
          </h1>
          <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
            Manage website users, assign administrative privileges, and monitor registrations.
          </p>
        </div>
      </div>

      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300 dark:divide-gray-700'>
                <thead className='bg-gray-50 dark:bg-gray-800'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light dark:text-text-dark sm:pl-6'
                    >
                      User
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Contact
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Registered
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Role
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700 bg-background-light dark:bg-background-dark'>
                  {users.map((user) => (
                    <tr key={user.user_id}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-primary-light dark:text-text-dark'>
                        <div className='font-semibold'>{user.full_name}</div>
                        <div className='text-secondary-light dark:text-secondary-dark'>
                          {user.email}
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                        {user.phone_number || '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                        {user.createdAt || user.created_at
                          ? format(
                              new Date(user.createdAt || user.created_at || ''),
                              'MMM dd, yyyy',
                            )
                          : 'Unknown'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm'>
                        {user.role_id === ROLE_ADMIN ? (
                          <span className='inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 bg-purple-50'>
                            <ShieldCheckIcon className='w-4 h-4' /> Admin
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 bg-gray-50'>
                            User
                          </span>
                        )}
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                        <div className='flex justify-end gap-3'>
                          <button
                            onClick={() => handleRoleChange(user.user_id)}
                            title='Edit User Profile'
                            className='text-blue-600 hover:text-blue-900'
                          >
                            <PencilIcon className='w-5 h-5' />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.user_id)}
                            title='Delete User'
                            className='text-red-600 hover:text-red-900'
                          >
                            <TrashIcon className='w-5 h-5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className='py-8 text-center text-sm text-gray-500'>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-4 px-4 py-3 sm:px-6'>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  goToPrevPage={() => setPage((p) => Math.max(1, p - 1))}
                  goToNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
        title='Delete User'
        message='Are you absolutely sure you want to delete this user? All their bookings, reviews, and favorites will be permanently removed. This action cannot be undone.'
        confirmText='Delete User'
        isLoading={isDeleting}
      />

      <UserEditModal
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        user={editUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UsersPage;
