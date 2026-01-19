import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class MediaService {
  constructor(private httpClient: HttpClient) {}

  api_key = '399af3fea42fd17a119ef910e475a6c5';
  api_url = 'https://api.themoviedb.org/3';
  api_movie = '/movie/';
  api_serie = '/tv/';
  api_genre_fr = '/genre/movie/list?api_key=' + this.api_key + '';
  video_key = '';
  language = localStorage.getItem('language') || 'fr';
  api_popularity_movie =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_providers=8%7C337%7C119%7C350%7C283&watch_region=' +
    this.language.toUpperCase() +
    '&page=';
  api_popularity_serie =
    '/discover/tv?api_key=' +
    this.api_key +
    '&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_providers=8%7C337%7C119%7C350%7C283&watch_region=' +
    this.language.toUpperCase() +
    '&page=';
  api_search = '/search/movie?&api_key=' + this.api_key + '&query=';
  api_vote =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=vote_count.desc&include_adult=false&include_video=false&page=';
  movie_release =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=release_date.desc&include_adult=false&include_video=false&page=';
  serie_release =
    '/discover/tv?api_key=' +
    this.api_key +
    '&sort_by=first_air_date.desc&include_adult=false&include_video=false&page=';
  api_revenue =
    '/discover/movie?api_key=' +
    this.api_key +
    '&sort_by=revenue.desc&include_adult=false&include_video=false&page=';

  getDetails(type: 'movie' | 'serie', id: string): Observable<any> {
    const endpoint = type === 'movie' ? this.api_movie : this.api_serie;
    return this.httpClient.get<any>(
      `${this.api_url}${endpoint}${id}?api_key=${this.api_key}&language=${this.language}`,
    );
  }

  getVideo(type: 'movie' | 'serie', id: string): Observable<any> {
    const endpoint = type === 'movie' ? this.api_movie : this.api_serie;
    return this.httpClient.get<any>(
      `${this.api_url}${endpoint}${id}/videos?api_key=${this.api_key}&language=${this.language}`,
    );
  }

  getCast(type: 'movie' | 'serie', id: string): Observable<any> {
    const endpoint = type === 'movie' ? this.api_movie : this.api_serie;
    return this.httpClient.get<any>(
      `${this.api_url}${endpoint}${id}/credits?api_key=${this.api_key}&language=${this.language}`,
    );
  }

  getPopular(type: 'movie' | 'serie', pagination: number): Observable<any> {
    const endpoint =
      type === 'movie' ? this.api_popularity_movie : this.api_popularity_serie;
    return this.httpClient.get<any>(
      this.api_url + endpoint + pagination + '&language=' + this.language,
    );
  }

  searchMovies(query: string, pagination: number): Observable<any> {
    return this.httpClient.get<any>(
      this.api_url +
        this.api_search +
        query +
        '&language=' +
        this.language +
        '&page=' +
        pagination,
    );
  }

  getReleaseMedia(
    type: 'movie' | 'serie',
    pagination: number,
  ): Observable<any> {
    const endpoint = type === 'movie' ? this.movie_release : this.serie_release;
    return this.httpClient.get<any>(
      this.api_url + endpoint + pagination + '&language=' + this.language,
    );
  }

  getMovies(pagination: number): Observable<any> {
    return this.getPopular('movie', pagination);
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.getDetails('movie', movieId);
  }

  getMovieYoutubeVideo(movieId: string): Observable<any> {
    return this.getVideo('movie', movieId);
  }

  getCastingMovie(movieId: string): Observable<any> {
    return this.getCast('movie', movieId);
  }

  getSeries(pagination: number): Observable<any> {
    return this.getPopular('serie', pagination);
  }

  getSeriesDetails(serieId: string): Observable<any> {
    return this.getDetails('serie', serieId);
  }

  getSeriesYoutubeVideo(serieId: string): Observable<any> {
    return this.getVideo('serie', serieId);
  }

  getCastingSeries(serieId: string): Observable<any> {
    return this.getCast('serie', serieId);
  }
}
