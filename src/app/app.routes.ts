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
        loadComponent: () =>
          import('../app/tasks/task-table.component').then((m) => m.TaskTableComponent),
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./tasks/manage-task/manage-task.component').then((m) => m.ManageTaskComponent),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
