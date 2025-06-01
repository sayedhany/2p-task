import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { UserRole } from './core/enums/role.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task-app';
  authSrv = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    const user = this.authSrv.getCurrentUser();
    if (user) {
      if (user.role === UserRole.Admin) this.router.navigate(['/admin']);
      else this.router.navigate(['/beneficiary']);
    }
  }
}
