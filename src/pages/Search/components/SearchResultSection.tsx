import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

type IconType = typeof CalendarIcon;

interface SearchResultItem {
  id: number;
  name: string;
  image: string;
  description?: string;
  excerpt?: string;
  slug?: string;
}

interface SearchResultProps {
  title: string;
  icon: IconType;
  data: SearchResultItem[];
  linkPrefix: string;
  descriptionField?: 'description' | 'excerpt';
  linkText?: string;
  getLinkTarget?: (item: SearchResultItem) => string;
}

export const SearchResultSection: FC<SearchResultProps> = ({
  title,
  icon: Icon,
  data,
  linkPrefix,
  descriptionField = 'description',
  linkText = 'View more →',
  getLinkTarget,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      <div className='flex justify-center items-center gap-3'>
        <Icon className='h-6 w-6 text-accent-light dark:text-accent-dark' />
        <h2 className='text-2xl font-semibold text-primary-light dark:text-primary-dark'>
          {title}
        </h2>
      </div>

      {data.map((item) => (
        <div
          key={`${title.toLowerCase()}-${item.id}`}
          className='bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
        >
          <div className='flex flex-col md:flex-row'>
            <div className='lg:w-1/5 md:w-1/4'>
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-40 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none'
              />
            </div>
            <div className='p-6 md:w-3/4'>
              <h2 className='text-xl font-semibold text-primary-light dark:text-text-dark mb-2'>
                {item.name}
              </h2>
              <p className='text-secondary-light dark:text-secondary-dark mb-4 line-clamp-2'>
                {item[descriptionField]}
              </p>
              <Link
                to={getLinkTarget ? getLinkTarget(item) : `${linkPrefix}/${item.id}`}
                className='text-sm font-medium text-primary-light dark:text-primary-dark hover:underline'
              >
                {linkText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
