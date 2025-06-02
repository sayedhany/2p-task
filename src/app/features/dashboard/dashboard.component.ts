import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BeneficiaryListComponent } from '../../shared/components/beneficiary-list/beneficiary-list.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BeneficiaryListComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public authSrv = inject(AuthService);
}
