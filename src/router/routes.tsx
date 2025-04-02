import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { About, Home, Layout, NotFoundPage, Tours } from '../pages';
import { ROUTES } from '../shared';

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.TOURS, element: <Tours /> },
      { path: ROUTES.ABOUT, element: <About /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
export const router = createBrowserRouter(routes);
