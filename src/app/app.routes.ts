import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
        title: 'Home',
      },
      {
        path: 'jobs',
        loadComponent: () => import('./features/jobs/jobs').then((m) => m.Jobs),
        title: 'Jobs',
      },
      {
        path: 'jobs/:id',
        loadComponent: () =>
          import('./features/job-details/job-details').then((m) => m.JobDetails),
        title: 'Job Details',
      },
      {
        path: 'apply/:id',
        loadComponent: () => import('./features/apply/apply').then((m) => m.Apply),
        title: 'Apply',
      },
      {
        path: 'thank-you',
        loadComponent: () =>
          import('./features/thank-you/thank-you').then((m) => m.ThankYou),
        title: 'Thank You',
      },
      {
        path: '404',
        loadComponent: () =>
          import('./features/not-found/not-found').then((m) => m.NotFound),
        title: 'Not Found',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
