import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserRole } from '../enums/role.enum';
import { LoginPayload } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginPayload): Observable<User> {
    return this.http
      .post<User>('/api/login', credentials)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentRole(): UserRole | null {
    return this.currentUserSubject.value?.role || null;
  }

  isAdmin(): boolean {
    return this.currentRole === UserRole.Admin;
  }

  isBeneficiary(): boolean {
    return this.currentRole === UserRole.Beneficiary;
  }
}
