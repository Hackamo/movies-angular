import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { NgStyle } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-movie',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movieInfos!: Movie;

  isPhonePortrait!: boolean;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit() {
    // console.log(this.movieInfos.title)
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
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
