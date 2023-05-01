import { Component } from '@angular/core';
import { Movie } from './models/movie';
import { MockService } from './services/mock.service';
import { MovieService } from './services/movies.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movies-angular';

  onMovieClick() {}
}
