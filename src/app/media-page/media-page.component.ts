import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../models/media';
import { MediaService } from '../services/media.service';
import { MediaCardComponent } from '../media-card/media-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss'],
  imports: [MediaCardComponent, InfiniteScrollModule],
  providers: [MediaService],
  standalone: true,
})
export class MediaPageComponent implements OnInit {
  medias: Media[] = [];
  pagination: number = 0;
  mediaType: 'movie' | 'serie' = 'movie';

  constructor(
    private httpClient: MediaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.mediaType = data['type'] || 'movie';
      this.getMedias();
    });
  }

  onScroll() {
    this.getMedias();
  }

  getMedias() {
    this.pagination += 1;
    this.httpClient
      .getPopular(this.mediaType, this.pagination)
      .subscribe((data) => {
        for (const media of data.results) {
          this.medias.push(media);
        }
      });
  }
}
