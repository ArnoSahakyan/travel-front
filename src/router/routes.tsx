import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Loader, ProtectedRoute, UnprotectedRoute } from '../components';
import { ROUTES } from '../shared';
import { lazy, ReactNode, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/Home/HomePage.tsx'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage.tsx'));
const ToursPage = lazy(() => import('../pages/Tours/ToursPage.tsx'));
const DestinationsPage = lazy(() => import('../pages/Destinations/DestinationsPage.tsx'));
const AboutPage = lazy(() => import('../pages/About/AboutPage.tsx'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage.tsx'));
const FaqPage = lazy(() => import('../pages/FAQ/FaqPage.tsx'));
const LegalPage = lazy(() => import('../pages/Legal/LegalPage.tsx'));
const SignUpPage = lazy(() => import('../pages/Auth/SignUpPage'));
const SignInPage = lazy(() => import('../pages/Auth/SignInPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage.tsx'));
const Layout = lazy(() => import('../pages/Layout/Layout.tsx'));
const ProfileLayout = lazy(() => import('../pages/Profile/ProfileLayout.tsx'));
const AuthLayout = lazy(() => import('../pages/Auth/AuthLayout.tsx'));
const Account = lazy(() => import('../pages/Profile/Account.tsx'));

const withSuspense = (component: ReactNode) => (
  <Suspense fallback={<Loader />}>{component}</Suspense>
);

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: withSuspense(<Layout />),
    children: [
      { path: ROUTES.HOME, element: withSuspense(<HomePage />) },
      { path: ROUTES.BLOG, element: withSuspense(<BlogPage />) },
      { path: ROUTES.TOURS, element: withSuspense(<ToursPage />) },
      { path: ROUTES.DESTINATIONS, element: withSuspense(<DestinationsPage />) },
      { path: ROUTES.ABOUT, element: withSuspense(<AboutPage />) },
      { path: ROUTES.CONTACT, element: withSuspense(<ContactPage />) },
      { path: ROUTES.FAQ, element: withSuspense(<FaqPage />) },
      { path: ROUTES.LEGAL, element: withSuspense(<LegalPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.PROFILE,
        element: withSuspense(<ProfileLayout />),
        children: [
          { path: ROUTES.PROFILE_BOOKINGS, element: withSuspense(<Account />) },
          { path: ROUTES.PROFILE_WISHLISTS, element: withSuspense(<Account />) },
          { path: ROUTES.PROFILE_INFO, element: withSuspense(<Account />) },
        ],
      },
    ],
  },
  {
    element: <UnprotectedRoute />,
    children: [
      {
        path: ROUTES.AUTH,
        element: withSuspense(<AuthLayout />),
        children: [
          { path: ROUTES.SIGNIN.slice(1), element: withSuspense(<SignInPage />) },
          { path: ROUTES.SIGNUP.slice(1), element: withSuspense(<SignUpPage />) },
          { path: ROUTES.FORGOT_PASSWORD.slice(1), element: withSuspense(<ForgotPasswordPage />) },
        ],
      },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];

export const router = createBrowserRouter(routes);
