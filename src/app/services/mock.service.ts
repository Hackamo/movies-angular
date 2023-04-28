// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as moviesData from '../../assets/response.json';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  data = moviesData;

  constructor(private http: HttpClient) {}

  getMoviesMock(): any {
    return of(this.data);
  }
}
