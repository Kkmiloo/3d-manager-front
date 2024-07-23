import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Root } from '../Root';
import { ProductsPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <h1>Dashboard</h1>,
          },

          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'material',
            element: <ProductsPage />,
          },

          {
            path: 'quoter',
            element: <h1>quoter</h1>,
          },
          {
            path: 'printing',
            element: <h1>printing</h1>,
          },
          {
            path: 'accumulated',
            element: <h1>accumulated</h1>,
          },
        ],
      },
      {
        path: 'auth',
        element: <h1>AuthLayout</h1>,
        children: [
          {
            path: 'login',
            element: <h1>Login</h1>,
          },
          {
            path: 'register',
            element: <h1>Register</h1>,
          },
        ],
      },
    ],
  },
]);
