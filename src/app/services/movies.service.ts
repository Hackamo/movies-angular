import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  api_key = '399af3fea42fd17a119ef910e475a6c5';
  api_url = 'https://api.themoviedb.org/3';
  api_popularity =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
  api_search = '/search/movie?&api_key=' + this.api_key + '&query=';
  api_vote =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=vote_count.desc&include_adult=false&include_video=false&page=';
  api_release =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=release_date.desc&include_adult=false&include_video=false&page=';
  api_revenue =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=revenue.desc&include_adult=false&include_video=false&page=';
  api_genre_fr = '/genre/movie/list?api_key=' + this.api_key + '';
  video_key = '';

  ngOnInit() {}

  getMovies(pagination: number): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url + this.api_popularity + pagination
    );
  }
}
