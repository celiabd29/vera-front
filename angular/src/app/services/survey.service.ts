import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SurveyRow {
  [key: string]: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://127.0.0.1:8000/api/v1'; // adapter avec backend en prod

  constructor(private http: HttpClient) {}

  getResults(): Observable<SurveyRow[]> {
    return this.http.get<SurveyRow[]>(`${this.baseUrl}/survey/results`);
  }
}
