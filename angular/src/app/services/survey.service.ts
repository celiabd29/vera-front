import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SurveyRow {
  [key: string]: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getResults(): Observable<SurveyRow[]> {
    return this.http.get<SurveyRow[]>(`${this.baseUrl}/survey/results`);
  }
}
