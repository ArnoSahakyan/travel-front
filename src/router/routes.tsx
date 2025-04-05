import { createBrowserRouter, RouteObject } from 'react-router-dom';
import {
  AboutPage,
  ContactPage,
  DestinationsPage,
  FaqPage,
  HomePage,
  Layout,
  LegalPage,
  NotFoundPage,
  ToursPage,
} from '../pages';
import { ROUTES } from '../shared';

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.TOURS, element: <ToursPage /> },
      { path: ROUTES.DESTINATIONS, element: <DestinationsPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.FAQ, element: <FaqPage /> },
      { path: ROUTES.LEGAL, element: <LegalPage /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
export const router = createBrowserRouter(routes);
