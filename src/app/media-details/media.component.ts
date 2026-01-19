import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  standalone: true,
})
export class MediaComponent {
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

  constructor(
    private mediaService: MediaService,
    private responsive: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });

    this.mediaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.route.snapshot.url[0].path === 'serie') {
      this.mediaType = 'serie';
    } else {
      this.mediaType = 'movie';
    }

    console.log('Media ID:', this.mediaId);

    this.mediaService
      .getDetails(this.mediaType, this.mediaId)
      .subscribe((data: any) => {
        this.isLoaded = true;
        this.mediaDetails = data;
        console.log(data);
        this.genres = this.mediaDetails.genres.map((genre: any) => genre.name);
      });

    this.mediaService
      .getVideo(this.mediaType, this.mediaId)
      .subscribe((data: any) => {
        this.videoKey = data.results[0].key;
        this.isVideoLoaded = true;
        console.log(this.videoKey);
        this.videoSafeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.videoUrl + this.videoKey,
        );
      });

    this.mediaService
      .getCast(this.mediaType, this.mediaId)
      .subscribe((data: any) => {
        this.castingList = data.cast;
        this.castingList = this.castingList.filter(
          (cast) => cast.profile_path != null,
        );
        this.castingList = this.castingList.slice(0, 14);
      });
  }
}
