import { useState, useEffect } from 'react';
import { api } from '../../../api';
import { Loader, Pagination, ConfirmModal } from '../../../components';
import { format } from 'date-fns';
import { EnvelopeIcon, EnvelopeOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export interface ContactMessage {
  contact_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt?: string;
  created_at?: string;
}

const ContactsPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteMessageId, setDeleteMessageId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/contact?page=${currentPage}&limit=10`);
      setMessages(res.data.messages);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  const updateStatus = async (id: number, newStatus: 'unread' | 'read' | 'replied') => {
    try {
      await api.put(`/contact/${id}/status`, { status: newStatus });
      toast.success(`Message marked as ${newStatus}`);
      fetchMessages(page);
    } catch (err: any) {
      toast.error('Failed to update status');
    }
  };

  const deleteMessage = async (id: number) => {
    setDeleteMessageId(id);
  };

  const confirmDeleteMessage = async () => {
    if (!deleteMessageId) return;
    setIsDeleting(true);
    try {
      await api.delete(`/contact/${deleteMessageId}`);
      toast.success('Message deleted');
      fetchMessages(page);
    } catch (err: any) {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(false);
      setDeleteMessageId(null);
    }
  };

  if (loading && messages.length === 0) return <Loader />;

  return (
    <div className='py-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-3xl font-semibold leading-6 text-primary-light dark:text-text-dark'>
            Messages
          </h1>
          <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
            View and manage all contact form submissions from users.
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
                      Sender
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Message
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Status
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700 bg-background-light dark:bg-background-dark'>
                  {messages.map((msg) => (
                    <tr
                      key={msg.contact_id}
                      className={msg.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    >
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-primary-light dark:text-text-dark'>
                        <div className='font-semibold'>{msg.full_name}</div>
                        <div className='text-secondary-light dark:text-secondary-dark'>
                          {msg.email}
                        </div>
                        <div className='text-secondary-light dark:text-secondary-dark text-xs'>
                          {msg.phone_number}
                        </div>
                      </td>
                      <td className='px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark max-w-md'>
                        <div className='line-clamp-3'>{msg.message}</div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                        {msg.createdAt || msg.created_at
                          ? format(
                              new Date(msg.createdAt || msg.created_at || ''),
                              'MMM dd, yyyy HH:mm',
                            )
                          : 'Unknown Date'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm'>
                        {msg.status === 'unread' && (
                          <span className='inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 bg-blue-50'>
                            <EnvelopeIcon className='w-4 h-4' /> Unread
                          </span>
                        )}
                        {msg.status === 'read' && (
                          <span className='inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 bg-gray-50'>
                            <EnvelopeOpenIcon className='w-4 h-4' /> Read
                          </span>
                        )}
                        {msg.status === 'replied' && (
                          <span className='inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 bg-green-50'>
                            <CheckCircleIcon className='w-4 h-4' /> Replied
                          </span>
                        )}
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                        <div className='flex justify-end gap-2'>
                          {msg.status === 'unread' && (
                            <button
                              onClick={() => updateStatus(msg.contact_id, 'read')}
                              className='text-blue-600 hover:text-blue-900'
                            >
                              Mark Read
                            </button>
                          )}
                          {msg.status !== 'replied' && (
                            <button
                              onClick={() => updateStatus(msg.contact_id, 'replied')}
                              className='text-green-600 hover:text-green-900'
                            >
                              Mark Replied
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg.contact_id)}
                            className='text-red-600 hover:text-red-900'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr>
                      <td colSpan={5} className='py-8 text-center text-sm text-gray-500'>
                        No messages found.
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
        isOpen={!!deleteMessageId}
        onClose={() => setDeleteMessageId(null)}
        onConfirm={confirmDeleteMessage}
        title='Delete Message'
        message='Are you sure you want to delete this message? This action cannot be undone.'
        confirmText='Delete Message'
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ContactsPage;
