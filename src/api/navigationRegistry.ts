/**
 * Global registry enabling Axios interceptors to trigger React Router DOM navigation
 * without imposing circular dependencies across the application component tree.
 */
export let globalNavigate: ((path: string) => void) | null = null;

export const setGlobalNavigate = (navigateFn: (path: string) => void) => {
  globalNavigate = navigateFn;
};
