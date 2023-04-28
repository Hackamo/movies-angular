import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
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
