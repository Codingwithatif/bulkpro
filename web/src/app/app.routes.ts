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
      import('./pages/auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
 
  {
    path: '',
    children: ADMIN_ROUTES,
  },
];