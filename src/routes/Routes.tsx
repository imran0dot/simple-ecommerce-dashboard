import Login from '@/app/pages/login';
import { lazy } from 'react';

// admin Ecommerce
const OrderOverview = lazy(() => import('@/app/pages/order-overview'));
const Orders = lazy(() => import('@/app/pages/orders'));
const ProductCreate = lazy(() => import('@/app/pages/product-create'));
const ProductGrid = lazy(() => import('@/app/pages/product-grid'));
const ProductList = lazy(() => import('@/app/pages/product-list'));
const ProductOverview = lazy(() => import('@/app/pages/product-overview'));
const Sellers = lazy(() => import('@/app/pages/sellers'));
const Category = lazy(() => import('@/app/pages/category'));

// dashboard
const Ecommerce = lazy(() => import('@/app/(admin)/(dashboards)/index'));
//Other

const Error404 = lazy(() => import('@/app/pages/login/404'));
const CommingSoon = lazy(() => import('@/app/pages/coming-soon'));
const Maintenance = lazy(() => import('@/app/pages/maintenance'));
const Offline = lazy(() => import('@/app/pages/offline'));

export const layoutsRoutes = [
  { path: '/dashboard', name: 'Ecommerce', element: <Ecommerce /> },
  { path: '/order-overview', name: 'OrderOverview', element: <OrderOverview /> },
  { path: '/orders', name: 'Orders', element: <Orders /> },
  { path: '/product-create', name: 'ProductCreate', element: <ProductCreate /> },
  { path: '/product-grid', name: 'ProductGrid', element: <ProductGrid /> },
  { path: '/product-list', name: 'ProductList', element: <ProductList /> },
  { path: '/product-overview', name: 'ProductOverview', element: <ProductOverview /> },
  { path: '/sellers', name: 'Sellers', element: <Sellers /> },
  { path: '/category', name: 'Category', element: <Category /> },
];

export const singlePageRoutes = [
  { path: '/', name: 'login', element: <Login /> },
  { path: '/404', name: '404', element: <Error404 /> },
  { path: '/coming-soon', name: 'ComingSoon', element: <CommingSoon /> },
  { path: '/maintenance', name: 'Maintenance', element: <Maintenance /> },
  { path: '/offline', name: 'Offline', element: <Offline /> },
];
