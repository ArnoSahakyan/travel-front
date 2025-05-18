import { FC, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
}

export const StarRating: FC<StarRatingProps> = ({ value, onChange, max = 5, disabled = false }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isActive = hovered !== null ? starValue <= hovered : starValue <= value;

        return (
          <button
            key={starValue}
            type='button'
            className={clsx('p-0.5', disabled && 'cursor-not-allowed')}
            onMouseEnter={() => !disabled && setHovered(starValue)}
            onMouseLeave={() => !disabled && setHovered(null)}
            onClick={() => !disabled && onChange(starValue)}
            disabled={disabled}
          >
            {isActive ? (
              <StarIcon className='w-8 h-8 text-yellow-400 transition-colors duration-150' />
            ) : (
              <StarIconOutline className='w-8 h-8 text-yellow-400 transition-colors duration-150' />
            )}
          </button>
        );
      })}
    </div>
  );
};
