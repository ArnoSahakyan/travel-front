import { create } from 'zustand';
import { ThemeState } from '../shared';

export const useThemeStore = create<ThemeState>((set) => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.classList.add(initialTheme);

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);

        return { theme: newTheme };
      }),
  };
});
