import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Media } from '../models/media';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  imports: [DecimalPipe, MatCardModule, NgClass, MatCard, RouterLink],
  providers: [DecimalPipe],
  standalone: true,
})
export class MediaCardComponent {
  @Input() mediaInfos!: Media;
  routerType = '';

  isPhonePortrait!: boolean;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
    this.routerType = this.mediaInfos.title ? 'movie' : 'serie';
  }
  getNoteColor() {
    if (this.mediaInfos.vote_average) {
      if (Number(this.mediaInfos.vote_average) > 7) {
        return {
          color: 'rgb(135, 220, 50)',
        };
      }
      if (this.mediaInfos.vote_average) {
        if (Number(this.mediaInfos.vote_average) > 5) {
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
