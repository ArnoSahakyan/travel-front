import { useState, useEffect, ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useDebounce } from '../../hooks'; // adjust the import path as needed

interface SearchInputProps {
  value?: string;
  initialValue?: string;
  onChange?: (val: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
  className?: string;
  onFocus?: () => void;
}

export const SearchInput = ({
  value,
  initialValue = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceDelay = 500,
  className = '',
  onFocus,
}: SearchInputProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(initialValue);

  const effectiveValue = isControlled ? value! : internalValue;
  const debouncedValue = useDebounce(effectiveValue, debounceDelay);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trimStart();
    if (isControlled) {
      onChange?.(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <div className='relative w-full'>
      <input
        type='text'
        value={effectiveValue}
        onChange={handleChange}
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
