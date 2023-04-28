import { Component } from '@angular/core';
import { Movie } from './models/movie';
import { MockService } from './services/mock.service';
import { MovieService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movies-angular';
  movies: Movie[] = [];
  pagination: number = 0;

  constructor(private httpClient: MovieService) {}

  ngOnInit() {
    this.getMovies()
  }

  onScroll() {
    console.log("scrolled!!");
  }

  getMovies() {
    this.pagination += 1;
    this.httpClient.getMovies(this.pagination).subscribe((data: Movie[]) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        this.movies.push(data[i]);
      }
    });
  }
}
