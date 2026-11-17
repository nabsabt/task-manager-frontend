import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        loadComponent: () => import('../app/table/table.component').then((m) => m.TableComponent),
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../app/table/task/task.component').then((m) => m.TaskComponent),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
