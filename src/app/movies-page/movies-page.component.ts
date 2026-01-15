import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from './../services/movies.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  standalone: false,
})
export class MoviesPageComponent {
  movies: Movie[] = [];
  pagination: number = 0;

  constructor(private httpClient: MovieService) {}

  ngOnInit() {
    // TODO : later for optimize nb api calls
    // if (!sessionStorage.getItem('movieId')) {}
    this.getMovies();
  }

  onScroll() {
    this.getMovies();
  }

  getMovies() {
    this.pagination += 1;
    this.httpClient.getMovies(this.pagination).subscribe((data) => {
      for (const movie of data.results) {
        this.movies.push(movie);
      }
    });
  }
}
