import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Beneficiary } from '../../models/beneficiary.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AuthService } from '../../../core/auth/auth.service';
import Swal from '../../../core/swal';
@Component({
  selector: 'app-beneficiary-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './beneficiary-list.component.html',
  styleUrl: './beneficiary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiaryListComponent implements OnInit {
  // Signals
  public beneficiarySrv = inject(BeneficiaryService);
  private _beneficiaries = toSignal(this.beneficiarySrv.beneficiaries$);
  public authSrv = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    this.beneficiarySrv.getBeneficiaries();
  }
  searchTerm = signal('');
  sortField = signal<'name' | 'budget'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed: Sorted and Filtered List
  filteredList = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const field = this.sortField();
    const direction = this.sortDirection();

    let filtered = this._beneficiaries()?.filter((b) =>
      b.name.toLowerCase().includes(search)
    );

    return filtered?.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (field === 'name') {
        // Both are strings
        return direction === 'asc'
          ? (valueA as string).localeCompare(valueB as string)
          : (valueB as string).localeCompare(valueA as string);
      } else if (field === 'budget') {
        // Both are numbers
        return direction === 'asc'
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      } else {
        return 0;
      }
    });
  });

  changeSort(field: 'name' | 'budget') {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
  approveBeneficiary(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.beneficiarySrv.approveBeneficiary(id).subscribe({
          next: () => {
            Swal.fire(
              'Approved!',
              'The beneficiary has been approved.',
              'success'
            ).then(() => {
              this.beneficiarySrv.getBeneficiaries();
            });
          },
          error: () => {
            Swal.fire('Error', 'An error occurred while approving.', 'error');
          },
        });
      }
    });
  }
  getStatusStyles(status: string): { color: string; background: string } {
    switch (status) {
      case 'Approved':
        return { color: '#155724', background: '#d4edda' };
      case 'Pending':
        return { color: '#856404', background: '#fff3cd' };
      case 'Rejected':
        return { color: '#721c24', background: '#f8d7da' };
      default:
        return { color: '#6c757d', background: '#e2e3e5' };
    }
  }
  viewBeneficiary(id: string) {
    if (this.authSrv.isLoggedIn()) {
      this.router.navigate(['/profile', id]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You must be logged in to view beneficiary details.',
      }).then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }
  async rateBeneficiary(id: string) {
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
        .addRatingToBeneficiary(id, newRating)
        .subscribe(() => {
          Swal.fire('Thank you!', `You rated: ${rating}`, 'success');
        });
    }
  }
}
