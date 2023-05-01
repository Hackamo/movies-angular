import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movieInfos!: Movie;

  isPhonePortrait!: boolean;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
  }

  saveId() {
    sessionStorage.setItem('movieId', this.movieInfos.id);
  }

  getNoteColor() {
    if (this.movieInfos.vote_average) {
      if (Number(this.movieInfos.vote_average) > 7) {
        return {
          color: 'rgb(135, 220, 50)',
        };
      }
      if (this.movieInfos.vote_average) {
        if (Number(this.movieInfos.vote_average) > 5) {
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
