import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  api_key = '399af3fea42fd17a119ef910e475a6c5';
  api_url = 'https://api.themoviedb.org/3';
  api_movie = '/movie/';
  api_serie = '/tv/';
  api_popularity_movie =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
  api_popularity_serie =
    '/discover/tv?api_key=' +
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
  languageFR ='fr'

  ngOnInit() {}

  getMovies(pagination: number): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url + this.api_popularity_movie + pagination
    );
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_movie + movieId + '?api_key='+ this.api_key+'&language='+this.languageFR
    );
  }

  getMovieYoutubeVideo(movieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_movie + movieId + '/videos' + '?api_key='+ this.api_key+'&language='+this.languageFR
    );
  }

  getCastingMovie(movieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_movie + movieId + '/credits' + '?api_key='+ this.api_key+'&language='+this.languageFR
    );
  }

  getSeries(pagination: number): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url + this.api_popularity_serie + pagination
    );
  }

  getSeriesDetails(serieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_serie + serieId + '?api_key='+ this.api_key+'&language='+this.languageFR
    );
  }

  getSeriesYoutubeVideo(serieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_serie + serieId + '/videos' + '?api_key='+ this.api_key
    );
  }

  getCastingSeries(serieId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url  + this.api_serie + serieId + '/credits' + '?api_key='+ this.api_key
    );
  }
}
