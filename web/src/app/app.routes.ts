import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/pages/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/pages/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: 'company-dashboard',
    loadComponent: () =>
      import('../app/pages/company-dashboard/company-dashboard.component').then(
        (mod) => mod.CompanyDashboardComponent
      ),
    children: [
      {
        path: 'category', // Path for managing categories
        loadComponent: () =>
          import('../app/pages/company-dashboard/company-category/category/category.component').then(
            (mod) => mod.CategoryComponent
          ),
      },
      {
        path: 'product', // Path for managing products
        loadComponent: () =>
          import('../app/pages/company-dashboard/company-category/product/product.component').then(
            (mod) => mod.ProductComponent
          ),
      },
      // Add other child routes for the company dashboard as needed
    ],
  },
  {
    path: '',
    children: ADMIN_ROUTES,
  },
];