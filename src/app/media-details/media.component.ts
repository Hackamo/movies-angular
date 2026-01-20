import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Subscription } from 'rxjs'
import { MediaService } from '../services/media.service'

@Component({
	selector: 'app-media',
	templateUrl: './media.component.html',
	styleUrls: ['./media.component.scss'],
	imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule, RouterModule],
	standalone: true,
})
export class MediaComponent implements OnInit, OnDestroy {
	imageLoadingStates: boolean[] = []

	mediaId!: string
	mediaType: 'movie' | 'serie' = 'movie'
	mediaDetails: any
	isLoaded = false
	isVideoLoaded1 = false
	isVideoLoaded2 = false
	isPhonePortrait!: boolean
	isTablet!: boolean
	genres: string[] = []
	productionCompanies: string[] = []
	productionCountries: string[] = []
	spokenLanguages: string[] = []
	videoKey1!: string
	videoKey2!: string
	videoSafeUrl1!: SafeResourceUrl
	videoSafeUrl2!: SafeResourceUrl
	videoUrl = 'https://www.youtube.com/embed/'
	castingList!: any[]
	private subs = new Subscription()
	public showAllCast = false

	constructor(
		private mediaService: MediaService,
		private responsive: BreakpointObserver,
		private domSanitizer: DomSanitizer,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.subs.add(
			this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.Tablet]).subscribe((result) => {
				this.isPhonePortrait = result.breakpoints[Breakpoints.HandsetPortrait]
				this.isTablet = result.breakpoints[Breakpoints.Tablet]
			}),
		)

		this.mediaId = this.route.snapshot.paramMap.get('id') || ''
		this.mediaType = this.route.snapshot.url[0].path === 'serie' ? 'serie' : 'movie'

		this.subs.add(
			this.mediaService.getDetails(this.mediaType, this.mediaId).subscribe((data: any) => {
				this.isLoaded = true
				this.mediaDetails = data
				this.genres = this.mediaDetails.genres.map((genre: any) => genre.name)
				this.productionCompanies = this.mediaDetails.production_companies.map((company: any) => company.name)
				this.productionCountries = this.mediaDetails.production_countries.map((country: any) => country.name)
				this.spokenLanguages = this.mediaDetails.spoken_languages.map((language: any) => language.name)
			}),
		)

		this.subs.add(
			this.mediaService.getVideo(this.mediaType, this.mediaId).subscribe((data: any) => {
				data.filtersedResults = data.results.filter(
					(video: any) => video.site === 'YouTube' && video.type === 'Trailer',
				)
				this.videoKey1 = data.filtersedResults[0].key
				this.videoKey2 = data.filtersedResults[1].key

				this.isVideoLoaded1 = true
				this.isVideoLoaded2 = true
				this.videoSafeUrl1 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl + this.videoKey1)
				this.videoSafeUrl2 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl + this.videoKey2)
			}),
		)

		this.subs.add(
			this.mediaService.getCast(this.mediaType, this.mediaId).subscribe((data: any) => {
				this.castingList = data.cast.filter((cast: any) => cast.profile_path != null).slice(0, 24)
			}),
		)
	}

	ngOnDestroy() {
		this.subs.unsubscribe()
	}

	public toggleCast(): void {
		this.showAllCast = !this.showAllCast
	}
}
