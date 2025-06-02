import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Beneficiary } from '../models/beneficiary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  http = inject(HttpClient);
  addBeneficiary(beneficiary: Beneficiary): any {
    return this.http.post(`${environment.baseUrl}/beneficiaries`, beneficiary);
  }
  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.baseUrl}/beneficiaries`);
  }
}
