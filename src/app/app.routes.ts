import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'table',
    loadComponent: () => import('../app/table/table.component').then((m) => m.TableComponent),
    canActivate: [AuthGuard],
  },
];
