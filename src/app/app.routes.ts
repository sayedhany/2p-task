import { Routes } from '@angular/router';
import { AdminGuard } from './core/gaurds/admin.guard';
import { AuthGuard } from './core/gaurds/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (e) => e.DashboardComponent
          ),
        data: { title: 'Dashboard' },
      },
      {
        path: 'add-beneficiary',
        canActivate: [AdminGuard],
        loadComponent: () =>
          import('./features/add-beneficiary/add-beneficiary.component').then(
            (e) => e.AddBeneficiaryComponent
          ),
        data: { title: 'Add Beneficiary' },
      },
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (e) => e.ProfileComponent
          ),
        data: { title: 'Profile' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
