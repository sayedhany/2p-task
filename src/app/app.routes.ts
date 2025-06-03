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
  // 🔓 Public Routes (No Authentication Needed)
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'beneficiaries', component: PublicBeneficiaryListComponent },
  // { path: 'unauthorized', component: UnauthorizedComponent },

  // // 🔐 Authenticated Routes

  // // 👤 Beneficiary Role Routes
  // { path: 'dashboard', component: BeneficiaryDashboardComponent, canActivate: [AuthGuard] },
  // { path: 'profile/:id', component: BeneficiaryProfileComponent, canActivate: [AuthGuard] },
  // { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  // { path: 'beneficiaries/rate/:id', component: RateBeneficiaryComponent, canActivate: [AuthGuard] },
  // { path: 'agency-overview', component: AgencyBeneficiariesComponent, canActivate: [AuthGuard] },

  // // 🛠️ Admin Role Routes
  // { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  // { path: 'admin/beneficiaries/pending', component: PendingApprovalsComponent, canActivate: [AuthGuard, AdminGuard] },
  // { path: 'admin/beneficiaries/add', component: AddBeneficiaryComponent, canActivate: [AuthGuard, AdminGuard] },
  // { path: 'admin/beneficiaries', component: AdminBeneficiariesListComponent, canActivate: [AuthGuard, AdminGuard] },
  // { path: 'admin/beneficiaries/edit/:id', component: EditBeneficiaryComponent, canActivate: [AuthGuard, AdminGuard] },
];
