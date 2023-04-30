import { detailsMovies } from './../models/detailsmovie';
import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movies.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  movieInfos!: Movie;
  movieId!: string;
  detailsMovies!: detailsMovies;
  isLoaded = false;
  isVideoLoaded = false;
  isPhonePortrait!: boolean;
  genres: string[] = [];
  videoKey!: string;
  videoSafeUrl!: SafeResourceUrl;

  objectKeys = Object.keys;

  constructor(
    private httpClient: MovieService,
    private responsive: BreakpointObserver,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
    this.movieId = sessionStorage.getItem('movieId')!;
    this.httpClient.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.isLoaded = true;
      this.detailsMovies = data;
      console.log(data);
      for (let i of this.objectKeys(this.detailsMovies.genres)) {
        this.genres.push(this.detailsMovies.genres[i].name);
      }
    });
    this.httpClient.getYoutubeVideo(this.movieId).subscribe((data: any) => {
      console.log(data.results[0].key);
      this.videoKey = data.results[0].key;
      this.isVideoLoaded = true;
    });
  }

  getIframeSource() {
    this.videoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoKey
    );
  }
}
