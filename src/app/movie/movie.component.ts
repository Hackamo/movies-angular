import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  @Input() movieInfos!: Movie;

  ngOnInit() {
    // console.log(this.movieInfos.title)
  }
}
