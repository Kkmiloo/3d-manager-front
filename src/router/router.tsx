import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Root } from '../Root';
import { MaterialPage, ProductsPage } from '../pages';
import { CalculatorPage } from '../pages/calculator/CalculatorPage';

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
            element: <MaterialPage />,
          },

          {
            path: 'quoter',
            element: <CalculatorPage />,
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
