import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavbarLayout from './layouts/NavbarLayout';
import RegisterPage from './pages/RegisterPage';
import ListingPage from './pages/ListingPage';
import PublicListingsPage from './pages/PublicListingsPage';
import HostedListingsPage from './pages/HostedListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListingPage from './pages/EditListingPage';
import LoginPage from './pages/LoginPage';
import BookingRequestsPage from './pages/BookingRequestsPage';
import ProtectedRoute from './layouts/ProtectedRoute';
import ReviewSummaryPage from './pages/ReviewSummaryPage';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/listings/public" />
    },
    {
      path: '/auth',
      element: <NavbarLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="login" />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        }
      ]
    },
    {
      path: '/listings',
      element: <NavbarLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="public" />,
        },
        {
          path: 'public',
          children: [
            {
              index: true,
              element: <PublicListingsPage />
            },
            {
              path: ':listingId',
              children: [
                {
                  index: true,
                  element: <ListingPage />,
                },
                {
                  path: 'review-summary/:rating',
                  element: <ReviewSummaryPage />
                }
              ]
            }
          ]
        },
        {
          path: 'hosted',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <HostedListingsPage />
            },
            {
              path: 'create',
              element: <CreateListingPage />
            },
            {
              path: ':listingId',
              children: [
                {
                  path: 'edit',
                  element: <EditListingPage />
                },
                {
                  path: 'bookings',
                  element: <BookingRequestsPage />
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={router} />;
}

export default Routes;
