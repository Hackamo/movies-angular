import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MediaService } from '../services/media.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  standalone: false,
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
    private DomSanitizer: DomSanitizer,
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
        for (const genre of this.mediaDetails.genres) {
          this.genres.push(genre.name);
        }
      });

    this.mediaService
      .getVideo(this.mediaType, this.mediaId)
      .subscribe((data: any) => {
        this.videoKey = data.results[0].key;
        this.isVideoLoaded = true;
        console.log(this.videoKey);
        this.videoSafeUrl = this.DomSanitizer.bypassSecurityTrustResourceUrl(
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
