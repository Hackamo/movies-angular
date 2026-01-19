import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DecimalPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Media } from '../models/media';
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
    const vote = Number(this.mediaInfos.vote_average);
    if (vote > 7) {
      return {
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        color: 'white',
      };
    }
    if (vote > 5) {
      return {
        background: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
        color: 'white',
      };
    }
    if (vote > 0) {
      return {
        background: 'linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)',
        color: 'white',
      };
    }
    return {
      background:
        'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
      color: 'white',
    };
  }
}
