import { useThemeStore } from '../../store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className='p-2 cursor-pointer text-background-light hover:text-primary-light hover:bg-background-light dark:text-background-light dark:hover:bg-secondary-light rounded-xl'
    >
      {theme === 'light' ? (
        <SunIcon className='block size-6' />
      ) : (
        <MoonIcon className='block size-6' />
      )}
    </button>
  );
};
