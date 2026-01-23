import { HttpClient } from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core'
import { Observable } from 'rxjs'
import { CreditsResult, MediaDetails, MediaItem, PagedResult, VideoResult } from './tmdb.models'

@Injectable({ providedIn: 'root' })
export class MediaService {
	private httpClient = inject(HttpClient)

	api_key = '399af3fea42fd17a119ef910e475a6c5'
	api_url = 'https://api.themoviedb.org/3'
	api_movie = '/movie/'
	api_serie = '/tv/'
	api_genre_fr = '/genre/movie/list?api_key=' + this.api_key + ''
	video_key = ''
	language = signal(localStorage.getItem('language') || 'fr')
	// filterByProviders = localStorage.getItem('filterByProviders') !== 'false'
	api_popularity_movie =
		'/discover/movie?api_key=' + this.api_key + '&sort_by=popularity.desc&include_adult=false&include_video=false'
	api_popularity_serie =
		'/discover/tv?api_key=' + this.api_key + '&sort_by=popularity.desc&include_adult=false&include_video=false'
	api_search = '/search/movie?&api_key=' + this.api_key + '&query='
	api_search_serie = '/search/tv?&api_key=' + this.api_key + '&query='
	api_vote =
		'/discover/movie?api_key=' + this.api_key + '&sort_by=vote_count.desc&include_adult=false&include_video=false&page='
	movie_release =
		'/discover/movie?api_key=' +
		this.api_key +
		'&sort_by=release_date.desc&include_adult=false&include_video=false&page='
	serie_release =
		'/discover/tv?api_key=' +
		this.api_key +
		'&sort_by=first_air_date.desc&include_adult=false&include_video=false&page='
	api_revenue =
		'/discover/movie?api_key=' + this.api_key + '&sort_by=revenue.desc&include_adult=false&include_video=false&page='

	updateLanguage(lang: string) {
		this.language.set(lang)
		localStorage.setItem('language', lang)
	}

	getDetails(type: 'movie' | 'serie', id: string): Observable<MediaDetails> {
		const endpoint = type === 'movie' ? this.api_movie : this.api_serie
		return this.httpClient.get<MediaDetails>(
			`${this.api_url}${endpoint}${id}?api_key=${this.api_key}&language=${this.language()}`,
		)
	}

	getVideo(type: 'movie' | 'serie', id: string): Observable<VideoResult> {
		const endpoint = type === 'movie' ? this.api_movie : this.api_serie
		return this.httpClient.get<VideoResult>(
			`${this.api_url}${endpoint}${id}/videos?api_key=${this.api_key}&language=${this.language()}`,
		)
	}

	getCast(type: 'movie' | 'serie', id: string): Observable<CreditsResult> {
		const endpoint = type === 'movie' ? this.api_movie : this.api_serie
		return this.httpClient.get<CreditsResult>(
			`${this.api_url}${endpoint}${id}/credits?api_key=${this.api_key}&language=${this.language()}`,
		)
	}

	getPopular(type: 'movie' | 'serie', pagination: number): Observable<PagedResult<MediaItem>> {
		let endpoint = type === 'movie' ? this.api_popularity_movie : this.api_popularity_serie
		// if (this.filterByProviders) {
		// 	endpoint += '&with_watch_providers=8%7C337%7C119%7C350%7C283&watch_region=' + this.language.toUpperCase()
		// }
		return this.httpClient.get<PagedResult<MediaItem>>(
			this.api_url + endpoint + '&page=' + pagination + '&language=' + this.language(),
		)
	}

	searchMovies(query: string, pagination: number): Observable<PagedResult<MediaItem>> {
		return this.httpClient.get<PagedResult<MediaItem>>(
			this.api_url + this.api_search + query + '&language=' + this.language() + '&page=' + pagination,
		)
	}

	searchSeries(query: string, pagination: number): Observable<PagedResult<MediaItem>> {
		return this.httpClient.get<PagedResult<MediaItem>>(
			this.api_url + this.api_search_serie + query + '&language=' + this.language() + '&page=' + pagination,
		)
	}

	searchMedia(type: 'movie' | 'serie', query: string, pagination: number): Observable<PagedResult<MediaItem>> {
		return type === 'movie' ? this.searchMovies(query, pagination) : this.searchSeries(query, pagination)
	}

	getReleaseMedia(type: 'movie' | 'serie', pagination: number): Observable<PagedResult<MediaItem>> {
		const endpoint = type === 'movie' ? this.movie_release : this.serie_release
		return this.httpClient.get<PagedResult<MediaItem>>(
			this.api_url + endpoint + pagination + '&language=' + this.language(),
		)
	}

	getMovies(pagination: number): Observable<PagedResult<MediaItem>> {
		return this.getPopular('movie', pagination)
	}

	getMovieDetails(movieId: string): Observable<MediaDetails> {
		return this.getDetails('movie', movieId)
	}

	getMovieYoutubeVideo(movieId: string): Observable<VideoResult> {
		return this.getVideo('movie', movieId)
	}

	getCastingMovie(movieId: string): Observable<CreditsResult> {
		return this.getCast('movie', movieId)
	}

	getSeries(pagination: number): Observable<PagedResult<MediaItem>> {
		return this.getPopular('serie', pagination)
	}

	getSeriesDetails(serieId: string): Observable<MediaDetails> {
		return this.getDetails('serie', serieId)
	}

	getSeriesYoutubeVideo(serieId: string): Observable<VideoResult> {
		return this.getVideo('serie', serieId)
	}

	getCastingSeries(serieId: string): Observable<CreditsResult> {
		return this.getCast('serie', serieId)
	}
}
