import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  standalone: true,
})
export class MediaComponent implements OnInit, OnDestroy {
  imageLoadingStates: boolean[] = [];

  mediaId!: string;
  mediaType: 'movie' | 'serie' = 'movie';
  mediaDetails: any;
  isLoaded = false;
  isVideoLoaded = false;
  isPhonePortrait!: boolean;
  genres: string[] = [];
  videoKey!: string;
  videoSafeUrl!: SafeResourceUrl;
  videoUrl = 'https://www.youtube.com/embed/';
  castingList!: any[];
  private subs = new Subscription();

  constructor(
    private mediaService: MediaService,
    private responsive: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subs.add(
      this.responsive
        .observe(Breakpoints.HandsetPortrait)
        .subscribe((result) => {
          this.isPhonePortrait = result.matches;
        }),
    );

    this.mediaId = this.route.snapshot.paramMap.get('id') || '';
    this.mediaType =
      this.route.snapshot.url[0].path === 'serie' ? 'serie' : 'movie';

    this.subs.add(
      this.mediaService
        .getDetails(this.mediaType, this.mediaId)
        .subscribe((data: any) => {
          this.isLoaded = true;
          this.mediaDetails = data;
          this.genres = this.mediaDetails.genres.map(
            (genre: any) => genre.name,
          );
        }),
    );

    this.subs.add(
      this.mediaService
        .getVideo(this.mediaType, this.mediaId)
        .subscribe((data: any) => {
          this.videoKey = data.results[0].key;
          this.isVideoLoaded = true;
          this.videoSafeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
            this.videoUrl + this.videoKey,
          );
        }),
    );

    this.subs.add(
      this.mediaService
        .getCast(this.mediaType, this.mediaId)
        .subscribe((data: any) => {
          this.castingList = data.cast
            .filter((cast: any) => cast.profile_path != null)
            .slice(0, 24);
        }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
