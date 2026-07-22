import { Routes } from '@angular/router';

import { layoutRoutes } from './core/routing/layout.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: layoutRoutes,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
