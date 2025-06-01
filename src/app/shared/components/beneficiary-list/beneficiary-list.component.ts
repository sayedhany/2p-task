import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
interface Beneficiary {
  id: string;
  name: string;
  budget: number;
  age: number;
  gender: string;
  contact: string;
}
@Component({
  selector: 'app-beneficiary-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './beneficiary-list.component.html',
  styleUrl: './beneficiary-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiaryListComponent {
  // Signals
  private _beneficiaries = signal<Beneficiary[]>([
    {
      id: '1',
      name: 'John Doe',
      budget: 5000,
      age: 30,
      gender: 'Male',
      contact: 'john@example.com',
    },
    {
      id: '2',
      name: 'Anna Smith',
      budget: 7000,
      age: 28,
      gender: 'Female',
      contact: 'anna@example.com',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      budget: 6000,
      age: 35,
      gender: 'Male',
      contact: 'mike@example.com',
    },
  ]);

  searchTerm = signal('');
  sortField = signal<'name' | 'budget'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed: Sorted and Filtered List
  filteredList = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const field = this.sortField();
    const direction = this.sortDirection();

    let filtered = this._beneficiaries().filter((b) =>
      b.name.toLowerCase().includes(search)
    );

    return filtered.sort((a, b) => {
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
}
