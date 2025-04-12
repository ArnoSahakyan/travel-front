import { createBrowserRouter, RouteObject } from 'react-router-dom';
import {
  AboutPage,
  BlogPage,
  ContactPage,
  DestinationsPage,
  FaqPage,
  HomePage,
  Layout,
  LegalPage,
  NotFoundPage,
  ToursPage,
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  ProfileLayout,
  Account,
  AuthLayout,
} from '../pages';
import { ROUTES } from '../shared';

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.BLOG, element: <BlogPage /> },
      { path: ROUTES.TOURS, element: <ToursPage /> },
      { path: ROUTES.DESTINATIONS, element: <DestinationsPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.FAQ, element: <FaqPage /> },
      { path: ROUTES.LEGAL, element: <LegalPage /> },
    ],
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfileLayout />,
    children: [
      { path: ROUTES.PROFILE_BOOKINGS, element: <Account /> },
      { path: ROUTES.PROFILE_WISHLISTS, element: <Account /> },
      { path: ROUTES.PROFILE_INFO, element: <Account /> },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      { path: ROUTES.SIGNIN.slice(1), element: <SignInPage /> },
      { path: ROUTES.SIGNUP.slice(1), element: <SignUpPage /> },
      { path: ROUTES.FORGOT_PASSWORD.slice(1), element: <ForgotPasswordPage /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
export const router = createBrowserRouter(routes);
