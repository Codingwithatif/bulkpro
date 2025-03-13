import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin/consumer',
    loadComponent: () =>
      import('./consumer/admin-layout/admin-layout.component').then(
        (mod) => mod.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./consumer/pages/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent
          ),
        title: 'Dashboard',
      },
      {
        path: 'add-category',
        loadComponent: () =>
          import('./shared/add-category/add-category.component').then(
            (mod) => mod.AddCategoryComponent
          ),
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./shared/add-product/add-product.component').then(
            (mod) => mod.AddProductComponent
          ),
      },
    
    ],
  },
  {
    path: 'admin/supplier',
    loadComponent: () =>
      import('./suplier/admin-layout/admin-layout.component').then(
        (mod) => mod.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./suplier/pages/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent
          ),
        title: 'Supplier Dashboard',
      },
      {
        path: 'add-category',
        loadComponent: () =>
          import('./shared/add-category/add-category.component').then(
            (mod) => mod.AddCategoryComponent
          ),
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./shared/add-product/add-product.component').then(
            (mod) => mod.AddProductComponent
          ),
      },
    ],
  },
];
