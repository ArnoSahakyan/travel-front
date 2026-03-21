import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import { Loader, ProtectedRoute, UnprotectedRoute } from '../components';
import { AdminRoute } from '../admin/components';
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
const ProfileLayout = lazy(() => import('../pages/Profile/ProfileLayout.tsx'));
const ProfileHomePage = lazy(() => import('../pages/Profile/ProfileHomePage.tsx'));
const Account = lazy(() => import('../pages/Profile/Account.tsx'));
const FavoritesPage = lazy(() => import('../pages/Profile/FavoritesPage.tsx'));
const MyReviewsPage = lazy(() => import('../pages/Profile/MyReviewsPage.tsx'));
const SecurityPage = lazy(() => import('../pages/Profile/SecurityPage.tsx'));
const Layout = lazy(() => import('../pages/Layout/Layout.tsx'));
const AuthLayout = lazy(() => import('../pages/Auth/AuthLayout.tsx'));
const AdminLayout = lazy(() => import('../admin/pages/AdminLayout.tsx'));

const AdminHomePage = lazy(() => import('../admin/pages/AdminHome/AdminHomePage.tsx'));
const AdminUsersPage = lazy(() => import('../admin/pages/Users/UsersPage.tsx'));
const AdminBookingsPage = lazy(() => import('../admin/pages/Bookings/AdminBookingsPage.tsx'));
const AdminReviewsPage = lazy(() => import('../admin/pages/Reviews/AdminReviewsPage.tsx'));
const AdminCategoriesPage = lazy(() => import('../admin/pages/Categories/CategoriesPage.tsx'));
const AdminNewsletterPage = lazy(() => import('../admin/pages/Newsletter/NewsletterPage.tsx'));
const AdminDestinationsPage = lazy(
  () => import('../admin/pages/Destinations/DestinationsPage.tsx'),
);
const AdminDestinationCreatePage = lazy(
  () => import('../admin/pages/Destinations/DestinationCreatePage.tsx'),
);
const AdminDestinationUpdatePage = lazy(
  () => import('../admin/pages/Destinations/DestinationUpdatePage.tsx'),
);
const AdminToursPage = lazy(() => import('../admin/pages/Tours/ToursPage.tsx'));
const AdminTourCreatePage = lazy(() => import('../admin/pages/Tours/ToursCreatePage.tsx'));
const AdminTourUpdatePage = lazy(() => import('../admin/pages/Tours/ToursUpdatePage.tsx'));

const AdminBlogPage = lazy(() => import('../admin/pages/Blogs/BlogsPage.tsx'));
const AdminBlogCreatePage = lazy(() => import('../admin/pages/Blogs/BlogCreatePage.tsx'));
const AdminBlogUpdatePage = lazy(() => import('../admin/pages/Blogs/BlogUpdatePage.tsx'));

const AdminContactsPage = lazy(() => import('../admin/pages/Contact/ContactsPage.tsx'));

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
          { index: true, element: <Navigate to={ROUTES.PROFILE_DASHBOARD} replace /> },
          {
            path: ROUTES.PROFILE_DASHBOARD.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<ProfileHomePage />),
          },
          {
            path: ROUTES.PROFILE_INFO.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<Account />),
          },
          {
            path: ROUTES.PROFILE_BOOKINGS.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<BookingsPage />),
          },
          {
            path: `${ROUTES.PROFILE_BOOKINGS.replace(ROUTES.PROFILE + '/', '')}/:bookingId`,
            element: withSuspense(<BookingDetailPage />),
          },
          {
            path: ROUTES.PROFILE_FAVORITES.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<FavoritesPage />),
          },
          {
            path: ROUTES.PROFILE_REVIEWS.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<MyReviewsPage />),
          },
          {
            path: ROUTES.PROFILE_SECURITY.replace(ROUTES.PROFILE + '/', ''),
            element: withSuspense(<SecurityPage />),
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: ROUTES.ADMIN,
        element: withSuspense(<AdminLayout />),
        children: [
          { path: '', element: withSuspense(<AdminHomePage />) },
          {
            path: ROUTES.ADMIN_DASHBOARD.replace(ROUTES.ADMIN + '/', ''),
            element: withSuspense(<AdminHomePage />),
          },
          { path: ROUTES.ADMIN_USERS, element: withSuspense(<AdminUsersPage />) },
          { path: ROUTES.ADMIN_CATEGORIES, element: withSuspense(<AdminCategoriesPage />) },
          { path: ROUTES.ADMIN_DESTINATIONS, element: withSuspense(<AdminDestinationsPage />) },
          {
            path: `${ROUTES.ADMIN_DESTINATIONS}/:destinationId`,
            element: withSuspense(<AdminDestinationUpdatePage />),
          },
          {
            path: ROUTES.ADMIN_DESTINATIONS_NEW,
            element: withSuspense(<AdminDestinationCreatePage />),
          },
          { path: ROUTES.ADMIN_TOURS, element: withSuspense(<AdminToursPage />) },
          {
            path: `${ROUTES.ADMIN_TOURS}/:tourId`,
            element: withSuspense(<AdminTourUpdatePage />),
          },
          {
            path: ROUTES.ADMIN_TOURS_NEW,
            element: withSuspense(<AdminTourCreatePage />),
          },
          { path: ROUTES.ADMIN_NEWSLETTER, element: withSuspense(<AdminNewsletterPage />) },
          { path: ROUTES.ADMIN_BLOG, element: withSuspense(<AdminBlogPage />) },
          {
            path: ROUTES.ADMIN_BLOG_NEW,
            element: withSuspense(<AdminBlogCreatePage />),
          },
          {
            path: `${ROUTES.ADMIN_BLOG}/:slug`,
            element: withSuspense(<AdminBlogUpdatePage />),
          },
          { path: ROUTES.ADMIN_BOOKINGS, element: withSuspense(<AdminBookingsPage />) },
          { path: ROUTES.ADMIN_REVIEWS, element: withSuspense(<AdminReviewsPage />) },
          { path: ROUTES.ADMIN_CONTACTS, element: withSuspense(<AdminContactsPage />) },
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
