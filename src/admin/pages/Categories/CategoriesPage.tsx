import { FormEvent, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../../../hooks';
import { EmptyState, ErrorState, LoadingState } from '../../../components';

interface ICategory {
  category_id: number;
  name: string;
}

export default function CategoriesPage() {
  const [formName, setFormName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const { data: categories = [], isLoading, isError, error } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editId !== null) {
      updateCategory.mutate({ id: editId, name: formName });
    } else {
      createCategory.mutate({ name: formName });
    }

    setFormName('');
    setEditId(null);
  };

  const handleEdit = (category: { category_id: number; name: string }) => {
    setFormName(category.name);
    setEditId(category.category_id);
  };

  const handleDelete = (id: number) => {
    deleteCategory.mutate(id);
  };

  return (
    <div className='bg-background-light dark:bg-background-dark pt-10'>
      <h2 className='text-2xl font-bold text-primary-light dark:text-text-dark mb-6'>Categories</h2>

      <form
        onSubmit={handleSubmit}
        className='mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-end'
      >
        <div className='w-full sm:w-auto'>
          <label htmlFor='category-name' className='form-label mb-1'>
            Category Name
          </label>
          <input
            id='category-name'
            type='text'
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder='Enter category name'
            className='form-input w-full sm:w-64'
          />
        </div>
        <div className='flex gap-3 w-full sm:w-auto'>
          <button type='submit' className='form-button px-6 py-2 w-full sm:w-auto'>
            {editId !== null ? 'Update' : 'Create'}
          </button>
          {editId !== null && (
            <button
              type='button'
              onClick={() => {
                setFormName('');
                setEditId(null);
              }}
              className='form-button-secondary px-6 py-2 w-full sm:w-auto'
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {isLoading ? (
        <LoadingState message='Loading categories...' />
      ) : isError ? (
        <ErrorState description={error && (error as Error).message} />
      ) : categories?.length === 0 ? (
        <EmptyState title='No categories available' description="We couldn't find any categories" />
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-sm border-b border-gray-300 dark:border-gray-700'>
                <th className='pl-3 pb-3 text-secondary-light dark:text-text-dark font-semibold'>
                  Name
                </th>
                <th className='pr-4 pb-3 text-secondary-light dark:text-text-dark font-semibold text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: ICategory) => (
                <tr
                  key={category.category_id}
                  className='border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <td className='pl-3 py-4 text-secondary-light dark:text-text-dark'>
                    {category.name}
                  </td>
                  <td className='py-4 text-right'>
                    <div className='flex justify-end gap-3'>
                      <button
                        onClick={() => handleEdit(category)}
                        className='p-2 rounded-md text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors'
                        title='Edit'
                      >
                        <PencilIcon className='w-5 h-5' />
                      </button>
                      <button
                        onClick={() => handleDelete(category.category_id)}
                        className='p-2 rounded-md text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors'
                        title='Delete'
                      >
                        <TrashIcon className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
