import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BeneficiaryService } from '../../../../shared/services/beneficiary.service';
import { Beneficiary } from '../../../../shared/models/beneficiary.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  beneficiarySrv = inject(BeneficiaryService);
  beneficiaryDetails = signal<Beneficiary | null>(null);
  // constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.beneficiarySrv
      .getBeneficiaryById(id)
      .subscribe((beneficiary: Beneficiary) => {
        this.beneficiaryDetails.set(beneficiary);
      });
  }
}
