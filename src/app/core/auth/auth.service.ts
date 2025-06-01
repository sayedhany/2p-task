import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserRole } from '../enums/role.enum';
import { LoginPayload } from '../models/login.model';
import { Router } from '@angular/router';
const baseURL = 'http://localhost:3001';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginPayload): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${baseURL}/users?email=${credentials.email}&password=${credentials.password}&role=${credentials.role}`
      )
      .pipe(tap((user) => this.currentUserSubject.next(user[0])));
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(`${baseURL}/users`, user);
  }
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentRole(): UserRole | null {
    return this.currentUserSubject.value?.role || null;
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === UserRole.Admin;
  }

  isBeneficiary(): boolean {
    return this.currentRole === UserRole.Beneficiary;
  }
  checkLogedIn() {
    const user = this.getCurrentUser();
    if (user) {
      if (user.role === UserRole.Admin) {
        this.router.navigate(['/admin']);
      } else if (user.role === UserRole.Beneficiary) {
        this.router.navigate(['/beneficiary']);
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
