import { Component } from '@angular/core';
import { Movie } from './models/movie';
import { ApiService } from './services/movies.service';

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
