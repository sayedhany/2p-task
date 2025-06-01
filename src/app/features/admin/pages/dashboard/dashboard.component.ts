import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BeneficiaryListComponent } from '../../../../shared/components/beneficiary-list/beneficiary-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BeneficiaryListComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
