import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Beneficiary } from '../models/beneficiary.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private subject = new BehaviorSubject<Beneficiary[]>([]);
  beneficiaries$ = this.subject.asObservable();
  http = inject(HttpClient);
  addBeneficiary(beneficiary: Beneficiary): any {
    return this.http.post(`${environment.baseUrl}/beneficiaries`, beneficiary);
  }
  getBeneficiaries(): void {
    this.http
      .get<Beneficiary[]>(`${environment.baseUrl}/beneficiaries`)
      .subscribe((res) => {
        this.subject.next(res);
      });
  }
  approveBeneficiary(beneficiaryId: string): Observable<Beneficiary> {
    // For json-server, use PUT to update the whole object or PATCH for partial update
    return this.http.patch<Beneficiary>(
      `${environment.baseUrl}/beneficiaries/${beneficiaryId}`,
      { status: 'approved' }
    );
  }
  getBeneficiaryById(beneficiaryId: string): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(
      `${environment.baseUrl}/beneficiaries/${beneficiaryId}`
    );
  }
}
