import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movies.service';
import { detailsMovies } from '../models/detailsmovie';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  movieInfos!: Movie;
  movieId!: string;
  detailsMovies!:detailsMovies;
  isLoaded = false;
  constructor(private httpClient: MovieService) {}

  ngOnInit() {
    this.movieId = sessionStorage.getItem('movieId')!;
    this.httpClient.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.isLoaded = true;
      this.detailsMovies = data;
    });
  }
}
