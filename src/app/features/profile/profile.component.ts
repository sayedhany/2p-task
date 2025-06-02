import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BeneficiaryService } from '../../shared/services/beneficiary.service';
import { Beneficiary } from '../../shared/models/beneficiary.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import Swal from '../../core/swal';
import { User } from '../../core/models/user.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  beneficiarySrv = inject(BeneficiaryService);
  public authSrv = inject(AuthService);
  router = inject(Router);
  details = signal<Beneficiary | null>(null);
  // constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    const viewProfile = this.route.snapshot.queryParamMap.get('viewProfile');
    if (viewProfile) {
      this.details.set(this.authSrv.getCurrentUser() as any);
    } else {
      this.beneficiarySrv
        .getBeneficiaryById(id)
        .subscribe((beneficiary: Beneficiary) => {
          this.details.set(beneficiary);
        });
    }
  }
  async rateBeneficiary(id: string | null) {
    const { value: rating } = await Swal.fire({
      title: 'Rate Beneficiary',
      input: 'range',
      inputLabel: 'Your rating (1-5)',
      inputAttributes: {
        min: '1',
        max: '5',
        step: '1',
      },
      inputValue: 3,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a rating!';
        }
        return null;
      },
    });

    if (rating) {
      // You can now use the rating value, e.g., send to API
      // Example: this.beneficiarySrv.rateBeneficiary(id, rating).subscribe(...)
      const newRating = {
        score: +rating as number,
        ratingsrId: String(this.authSrv.getCurrentUser()?.id), // Assuming you have a way to get the current user's ID
        ratingsdId: String(id),
      };
      this.beneficiarySrv
        .addRatingToBeneficiary(id as string, newRating)
        .subscribe(() => {
          Swal.fire('Thank you!', `You rated: ${rating}`, 'success').then(() =>
            this.router.navigate(['/dashboard'])
          );
        });
    }
  }
}
