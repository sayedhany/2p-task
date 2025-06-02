import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BeneficiaryService } from '../../../../shared/services/beneficiary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-beneficiary',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBeneficiaryComponent {
  form: FormGroup;
  submitted = false;
  beneficiarySrv = inject(BeneficiaryService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      budget: [null, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) return;

    const newBeneficiary = { ...this.form.value, role: 'Beneficiary' };

    // TODO: Send to backend service
    console.log('✅ Beneficiary saved:', newBeneficiary);
    this.beneficiarySrv.addBeneficiary(newBeneficiary).subscribe((res: any) => {
      this.router.navigate(['/admin']);
    });

    this.form.reset();
    this.submitted = false;
  }
}
