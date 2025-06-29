import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce, useGlobalSearch } from '../../hooks';

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGlobalSearch(debouncedQuery, 3);
  const navigate = useNavigate();

  const shouldShowDropdown = query && isDropdownOpen && isFocused && data;

  const handleFullSearch = () => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='w-3/5 flex justify-center px-2 lg:ml-6 lg:justify-end relative'>
      <div className='relative w-full max-w-lg'>
        <input
          type='text'
          value={query}
          onChange={(e) => {
            const val = e.target.value.trimStart();
            setQuery(val);
            setIsDropdownOpen(val.length > 0);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim().length > 0) setIsDropdownOpen(true);
          }}
          placeholder='Search'
          className='form-input pl-10 pr-4 py-2 w-full rounded-lg'
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <MagnifyingGlassIcon
            aria-hidden='true'
            className='h-5 w-5 text-secondary-light dark:text-secondary-dark'
          />
        </div>
      </div>

      {shouldShowDropdown && (
        <div
          ref={dropdownRef}
          className='absolute top-14 w-full max-w-lg rounded-md bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 shadow-lg z-50'
        >
          <div className='p-4 space-y-3'>
            {isLoading ? (
              <p className='text-sm text-secondary-light dark:text-secondary-dark'>Searching...</p>
            ) : (
              <>
                {data.destinations?.length > 0 && (
                  <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>
                      Destinations
                    </p>
                    {data.destinations.map((d) => (
                      <Link
                        key={d.id}
                        to={`/destinations/${d.id}`}
                        onClick={() => {
                          setQuery('');
                          setIsDropdownOpen(false);
                          setIsFocused(false);
                        }}
                        className='block text-sm hover:underline text-text-light dark:text-text-dark'
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
                {data.tours?.length > 0 && (
                  <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>Tours</p>
                    {data.tours.map((t) => (
                      <Link
                        key={t.id}
                        to={`/tours/${t.id}`}
                        onClick={() => {
                          setQuery('');
                          setIsDropdownOpen(false);
                          setIsFocused(false);
                        }}
                        className='block text-sm hover:underline text-text-light dark:text-text-dark'
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                )}
                {data.posts?.length > 0 && (
                  <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase mb-1'>Blog Posts</p>
                    {data.posts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/blog/${p.slug}`}
                        onClick={() => {
                          setQuery('');
                          setIsDropdownOpen(false);
                          setIsFocused(false);
                        }}
                        className='block text-sm hover:underline text-text-light dark:text-text-dark'
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
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
                      setQuery('');
                      setIsDropdownOpen(false);
                      setIsFocused(false);
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
