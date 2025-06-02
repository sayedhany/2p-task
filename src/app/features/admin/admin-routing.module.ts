import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../shared/components/dashboard/dashboard.component').then(
        (e) => e.DashboardComponent
      ),
  },
  {
    path: 'add-beneficiary',
    loadComponent: () =>
      import('./pages/add-beneficiary/add-beneficiary.component').then(
        (e) => e.AddBeneficiaryComponent
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
