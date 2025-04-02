import { useThemeStore } from '../../store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white rounded-xl'
    >
      {theme === 'light' ? (
        <SunIcon className='block size-6 text-black' />
      ) : (
        <MoonIcon className='block size-6 text-white' />
      )}
    </button>
  );
};
