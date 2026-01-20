import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../models/media';
import { MediaService } from '../services/media.service';
import { MediaCardComponent } from '../media-card/media-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss'],
  imports: [MediaCardComponent, InfiniteScrollModule],
  standalone: true,
})
export class MediaPageComponent implements OnInit {
  medias: Media[] = [];
  pagination = 0;
  mediaType: 'movie' | 'serie' = 'movie';
  searchQuery: string | null = null;
  filter: string = 'popular';

  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    combineLatest([this.route.data, this.route.queryParams]).subscribe(
      ([data, params]) => {
        this.mediaType = data['type'] || 'movie';
        this.filter = data['filter'] || 'popular';
        this.searchQuery = params['q'];
        this.medias = [];
        this.pagination = 0;
        this.getMedias();
      },
    );
  }

  onScroll() {
    this.getMedias();
  }

  getMedias() {
    this.pagination++;
    if (this.searchQuery) {
      this.mediaService
        .searchMedia(this.mediaType, this.searchQuery, this.pagination)
        .subscribe((data) => {
          this.medias.push(
            ...data.results.filter((media: any) => media.poster_path),
          );
        });
    } else if (this.filter === 'release') {
      this.mediaService
        .getReleaseMedia(this.mediaType, this.pagination)
        .subscribe((data) => {
          this.medias.push(
            ...data.results.filter((media: any) => media.poster_path),
          );
        });
    } else {
      this.mediaService
        .getPopular(this.mediaType, this.pagination)
        .subscribe((data) => {
          this.medias.push(
            ...data.results.filter((media: any) => media.poster_path),
          );
        });
    }
  }
}
