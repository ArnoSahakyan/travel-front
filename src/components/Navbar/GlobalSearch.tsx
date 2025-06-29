import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce, useGlobalSearch } from '../../hooks';
import { SearchInput } from '../SearchInput';
import { GLOBAL_SEARCH_LIMIT } from '../../shared';

interface ResultGroupProps {
  title: string;
  items: { id: number; name: string; url: string }[];
  onItemClick: () => void;
}

const ResultGroup = ({ title, items, onItemClick }: ResultGroupProps) => {
  if (!items.length) return null;

  return (
    <div>
      <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>{title}</p>
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.url}
          onClick={onItemClick}
          className='block text-sm hover:underline text-text-light dark:text-text-dark'
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGlobalSearch(debouncedQuery, GLOBAL_SEARCH_LIMIT);
  const navigate = useNavigate();

  const shouldShowDropdown = query && isDropdownOpen && isFocused && data;

  const handleFullSearch = () => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleClearAndClose = useCallback(() => {
    setQuery('');
    setIsDropdownOpen(false);
    setIsFocused(false);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className='w-3/5 flex justify-center px-2 lg:ml-6 lg:justify-end relative'>
      <SearchInput
        value={query}
        onChange={(val) => {
          setQuery(val);
          setIsDropdownOpen(val.length > 0);
        }}
        onFocus={() => {
          setIsFocused(true);
          if (query.trim().length > 0) setIsDropdownOpen(true);
        }}
        placeholder='Search...'
        debounceDelay={400}
      />

      {shouldShowDropdown && (
        <div
          ref={dropdownRef}
          className='absolute top-12 w-full max-w-lg rounded-md bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 shadow-lg z-50'
        >
          <div className='p-4 space-y-3'>
            {isLoading ? (
              <p className='text-sm text-secondary-light dark:text-secondary-dark'>Searching...</p>
            ) : (
              <>
                <ResultGroup
                  title='Destinations'
                  items={
                    data.destinations?.map((d) => ({
                      id: d.id,
                      name: d.name,
                      url: `/destinations/${d.id}`,
                    })) || []
                  }
                  onItemClick={handleClearAndClose}
                />
                <ResultGroup
                  title='Tours'
                  items={
                    data.tours?.map((t) => ({
                      id: t.id,
                      name: t.name,
                      url: `/tours/${t.id}`,
                    })) || []
                  }
                  onItemClick={handleClearAndClose}
                />
                <ResultGroup
                  title='Blog Posts'
                  items={
                    data.posts?.map((p) => ({
                      id: p.id,
                      name: p.name,
                      url: `/blog/${p.slug}`,
                    })) || []
                  }
                  onItemClick={handleClearAndClose}
                />

                {data.destinations?.length === 0 &&
                  data.tours?.length === 0 &&
                  data.posts?.length === 0 && (
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      No results found.
                    </p>
                  )}

                {(data.destinations?.length || data.tours?.length || data.posts?.length) > 0 && (
                  <button
                    onClick={() => {
                      handleClearAndClose();
                      handleFullSearch();
                    }}
                    className='mt-4 text-sm font-medium text-primary-light hover:underline'
                  >
                    See all results
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
