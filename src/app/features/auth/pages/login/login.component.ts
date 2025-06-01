import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginPayload } from '../../../../core/models/login.model';
import { User } from '../../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const payload: LoginPayload = this.loginForm.value;

    this.authService
      .login(payload)
      .pipe(map((res: User[]) => res[0]))
      .subscribe({
        next: (user: User | null) => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'Admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/beneficiary']);
            }
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: () => {
          this.errorMessage = 'Something went wrong. Please try again.';
        },
      });
  }
}
