// src/app/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moviesData from '../../assets/response.json';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  data = moviesData;

  constructor(private http: HttpClient) {}

  getMovies(pagination: number): Observable<any> {
    return of(this.data);
  }
}
