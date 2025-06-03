import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Beneficiary } from '../models/beneficiary.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

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
      { status: 'Approved' }
    );
  }
  getBeneficiaryById(beneficiaryId: string): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(
      `${environment.baseUrl}/beneficiaries/${beneficiaryId}`
    );
  }
  addRatingToBeneficiary(
    beneficiaryId: string,
    rating: { ratingsrId: string; ratingsdId: string; score: number }
  ): Observable<Beneficiary> {
    return this.getBeneficiaryById(beneficiaryId).pipe(
      switchMap((beneficiary) => {
        let updatedRatings;
        if (Array.isArray(beneficiary.ratings)) {
          const existingIndex = beneficiary.ratings.findIndex(
            (r) => String(r.ratingsrId) === rating.ratingsrId
          );
          if (existingIndex !== -1) {
            // Override the score for the existing rating
            updatedRatings = beneficiary.ratings.map((r, idx) =>
              idx === existingIndex ? { ...r, score: rating.score } : r
            );
          } else {
            // Add new rating
            updatedRatings = [...beneficiary.ratings, rating];
          }
        } else {
          updatedRatings = [rating];
        }
        return this.http.patch<Beneficiary>(
          `${environment.baseUrl}/beneficiaries/${beneficiaryId}`,
          { ratings: updatedRatings }
        );
      })
    );
  }
}
