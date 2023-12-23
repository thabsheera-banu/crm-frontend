// import { ListSubheader } from '@mui/material';
import { Title } from '@mui/icons-material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import TitleDescription from 'src/crm/Deal/TitleDescription';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Register = lazy(() => import('src/sections/register/Register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Addstudent = lazy(() => import('src/sections/user/Addstudent'));
export const Lead = lazy(() => import('src/crm/Lead'));
export const Deal = lazy(() => import('src/crm/Deal/Deal'));
export const TitleDeal = lazy(() => import('src/crm/Deal/TitleDescription'));
export const EditAll = lazy(() => import('src/crm/EditAll'));







// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'add-student', element: <Addstudent /> },
        { path: 'lead', element: <Lead /> },
        { path: 'deal', element: <Deal/> },
        { path: 'deal/titledesc/:id', element: <TitleDescription/> },
        { path: 'lead/edit/:id', element: <EditAll/> },








      ],
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
   
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
