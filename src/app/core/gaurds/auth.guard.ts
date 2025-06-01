import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../enums/role.enum';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(private authService: AuthService, private router: Router) {}

  canDeactivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user) {
      if (user.role === UserRole.Admin) {
        this.router.navigate(['/admin']);
      } else if (user.role === UserRole.Beneficiary) {
        this.router.navigate(['/beneficiary']);
      }
      return false;
    } else {
      this.router.navigate(['/auth/login']);

      return false;
    }
  }
}
