// src/app/services/experiences.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the shape of an Experience
export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  tech: string[];
  highlights: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {
  // Point to your local API
  private apiUrl = 'http://localhost:3001/experiences';

  constructor(private http: HttpClient) {}

  // GET all experiences
  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  // GET one experience by ID
  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`);
  }

  // POST new experience
  addExperience(exp: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, exp);
  }

  // PATCH existing experience
  updateExperience(id: number, updates: Partial<Experience>): Observable<Experience> {
    return this.http.patch<Experience>(`${this.apiUrl}/${id}`, updates);
  }

  // DELETE experience
  deleteExperience(id: number): Observable<Experience> {
    return this.http.delete<Experience>(`${this.apiUrl}/${id}`);
  }
}