import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from './services/movies.service';
import { MovieComponent } from './movie/movie.component';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movies-angular';
  movies: Movie[] = [];
  pagination: number = 0;

  constructor(private httpClient: ApiService) {}

  ngOnInit() {
    // this.refreshMovies()
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
