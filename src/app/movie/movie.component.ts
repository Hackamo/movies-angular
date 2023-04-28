import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { NgStyle } from '@angular/common';
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

  getNoteColor() {
    if (this.movieInfos.vote_average) {
      if (Number(this.movieInfos.vote_average) > 7) {
        return {
          color: 'rgb(137, 220, 52)',
        };
      }
      if (this.movieInfos.vote_average) {
        if (Number(this.movieInfos.vote_average) > 6) {
          return {
            color: 'orange',
          };
        } else {
          return {
            color: 'rgb(225, 0, 0)',
          };
        }
      }
    }
    return {
      color: 'lakeblue',
    };
  }
}
