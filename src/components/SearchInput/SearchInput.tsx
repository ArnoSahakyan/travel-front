import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useDebounce } from '../../hooks'; // adjust the import path as needed

interface SearchInputProps {
  onSearch: (value: string) => void;
  initialValue?: string;
  placeholder?: string;
  debounceDelay?: number;
  className?: string;
  onFocus?: () => void;
}

export const SearchInput = ({
  onSearch,
  initialValue = '',
  placeholder = 'Search...',
  debounceDelay = 500,
  className = '',
  onFocus,
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, debounceDelay);

  // Trigger callback when debounced value changes
  useEffect(() => {
    if (debouncedValue !== initialValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, initialValue, onSearch]);

  return (
    <div className='relative w-full'>
      <p className='text-white'>{value}</p>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value.trimStart())}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`form-input pl-10 pr-4 py-2 w-full rounded-lg ${className}`}
      />
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon
          aria-hidden='true'
          className='h-5 w-5 text-secondary-light dark:text-secondary-dark'
        />
      </div>
    </div>
  );
};
