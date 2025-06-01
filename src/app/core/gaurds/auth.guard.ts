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
    this.authService.checkLogedIn();
    return false;
  }
}
