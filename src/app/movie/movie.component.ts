import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movies.service';
import { detailsMovies } from './../models/detailsmovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  @ViewChild('iframe') iframe!: ElementRef;

  movieInfos!: Movie;
  movieId!: string;
  detailsMovies!: detailsMovies;
  isLoaded = false;
  isVideoLoaded = false;
  isPhonePortrait!: boolean;
  genres: string[] = [];
  videoKey!: string;
  videoSafeUrl!: SafeResourceUrl;
  videoUrl = 'https://www.youtube.com/embed/';
  objectKeys = Object.keys;

  constructor(
    private httpClient: MovieService,
    private responsive: BreakpointObserver,
    private DomSanitizer: DomSanitizer
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
      this.videoKey = data.results[0].key;
      this.isVideoLoaded = true;
      console.log(this.videoKey);
      this.videoSafeUrl = this.DomSanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + this.videoKey
      );
    });
  }
}
