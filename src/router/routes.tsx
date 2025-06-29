import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Loader, ProtectedRoute, UnprotectedRoute } from '../components';
import { ROUTES } from '../shared';
import { lazy, ReactNode, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/Home/HomePage.tsx'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage.tsx'));
const BlogDetailsPage = lazy(() => import('../pages/Blog/BlogDetailsPage.tsx'));
const BookingsPage = lazy(() => import('../pages/Bookings/BookingsPage.tsx'));
const BookingDetailPage = lazy(() => import('../pages/Bookings/BookingDetailsPage.tsx'));
const ToursPage = lazy(() => import('../pages/Tours/ToursPage.tsx'));
const TourDetailsPage = lazy(() => import('../pages/Tours/TourDetailsPage.tsx'));
const DestinationsPage = lazy(() => import('../pages/Destinations/DestinationsPage.tsx'));
const DestinationDetailsPage = lazy(
  () => import('../pages/Destinations/DestinationDetailsPage.tsx'),
);
const AboutPage = lazy(() => import('../pages/About/AboutPage.tsx'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage.tsx'));
const FaqPage = lazy(() => import('../pages/FAQ/FaqPage.tsx'));
const LegalPage = lazy(() => import('../pages/Legal/LegalPage.tsx'));
const NewsletterConfirmPage = lazy(
  () => import('../pages/Newsletter/NewsletterConfirmationPage.tsx'),
);
const SearchResultsPage = lazy(() => import('../pages/Search/SearchResultsPage'));
const SignUpPage = lazy(() => import('../pages/Auth/SignUpPage'));
const SignInPage = lazy(() => import('../pages/Auth/SignInPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPasswordPage.tsx'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage.tsx'));
const Layout = lazy(() => import('../pages/Layout/Layout.tsx'));
const ProfileLayout = lazy(() => import('../pages/Profile/ProfileLayout.tsx'));
const AuthLayout = lazy(() => import('../pages/Auth/AuthLayout.tsx'));
const Account = lazy(() => import('../pages/Profile/Account.tsx'));
const FavoritesPage = lazy(() => import('../pages/Profile/FavoritesPage.tsx'));

const withSuspense = (component: ReactNode) => (
  <Suspense fallback={<Loader />}>{component}</Suspense>
);

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: withSuspense(<Layout />),
    children: [
      { path: ROUTES.HOME, element: withSuspense(<HomePage />) },
      { path: `${ROUTES.BLOG}/:slug`, element: withSuspense(<BlogDetailsPage />) },
      { path: ROUTES.BLOG, element: withSuspense(<BlogPage />) },
      { path: ROUTES.TOURS, element: withSuspense(<ToursPage />) },
      {
        path: `${ROUTES.TOURS}/:tourId`,
        element: withSuspense(<TourDetailsPage />),
      },
      { path: ROUTES.DESTINATIONS, element: withSuspense(<DestinationsPage />) },
      {
        path: `${ROUTES.DESTINATIONS}/:destinationId`,
        element: withSuspense(<DestinationDetailsPage />),
      },
      { path: ROUTES.ABOUT, element: withSuspense(<AboutPage />) },
      { path: ROUTES.CONTACT, element: withSuspense(<ContactPage />) },
      { path: ROUTES.FAQ, element: withSuspense(<FaqPage />) },
      { path: ROUTES.LEGAL, element: withSuspense(<LegalPage />) },
      { path: ROUTES.NEWSLETTER_CONFIRM, element: withSuspense(<NewsletterConfirmPage />) },
      { path: ROUTES.SEARCH, element: withSuspense(<SearchResultsPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.PROFILE,
        element: withSuspense(<ProfileLayout />),
        children: [
          { path: ROUTES.PROFILE_INFO, element: withSuspense(<Account />) },
          { path: ROUTES.PROFILE_BOOKINGS, element: withSuspense(<BookingsPage />) },
          {
            path: `${ROUTES.PROFILE_BOOKINGS}/:bookingId`,
            element: withSuspense(<BookingDetailPage />),
          },
          { path: ROUTES.PROFILE_FAVORITES, element: withSuspense(<FavoritesPage />) },
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
          { path: ROUTES.RESET_PASSWORD.slice(1), element: withSuspense(<ResetPasswordPage />) },
        ],
      },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];

export const router = createBrowserRouter(routes);
