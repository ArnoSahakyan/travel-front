import { Navigate, useSearchParams } from 'react-router-dom';
import { useGlobalSearch } from '../../hooks';
import { CalendarIcon, MapPinIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { EmptyState, ErrorState, LoadingState } from '../../components';
import { ROUTES } from '../../shared';
import { SearchResultSection } from './components';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, isLoading, isError } = useGlobalSearch(query);

  if (!query) return <Navigate to='/' />;

  const noResults =
    data?.destinations?.length === 0 && data?.tours?.length === 0 && data?.posts?.length === 0;

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
      <div className='container mx-auto px-4 lg:px-8'>
        <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark mb-8'>
          Search results for "{query}"
        </h1>

        {isLoading ? (
          <LoadingState message='Searching...' />
        ) : isError ? (
          <ErrorState title='Search failed' description='Please try again later' />
        ) : (
          <div className='flex flex-col gap-6'>
            <SearchResultSection
              title='Destinations'
              icon={MapPinIcon}
              data={data?.destinations || []}
              linkPrefix={ROUTES.DESTINATIONS}
              linkText='Explore destination →'
            />

            <SearchResultSection
              title='Tours'
              icon={CalendarIcon}
              data={data?.tours || []}
              linkPrefix={ROUTES.TOURS}
              linkText='View tour details →'
            />

            <SearchResultSection
              title='Blog Posts'
              icon={DocumentTextIcon}
              data={data?.posts || []}
              linkPrefix={ROUTES.BLOG}
              descriptionField='excerpt'
              linkText='Read article →'
              getLinkTarget={(post) => `${ROUTES.BLOG}/${post.slug}`}
            />

            {noResults && (
              <EmptyState
                title='No results found'
                description='Try different search terms or browse our collections'
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
