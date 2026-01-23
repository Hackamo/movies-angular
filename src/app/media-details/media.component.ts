import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Subscription } from 'rxjs'
import { MediaService } from '../services/media.service'
import { Cast, MediaDetails } from '../services/tmdb.models'

@Component({
	selector: 'app-media',
	templateUrl: './media.component.html',
	styleUrls: ['./media.component.scss'],
	imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule, RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent implements OnInit, OnDestroy {
	private mediaService = inject(MediaService)
	private responsive = inject(BreakpointObserver)
	private domSanitizer = inject(DomSanitizer)
	private route = inject(ActivatedRoute)

	mediaDetails = signal<MediaDetails | null>(null)
	castingList = signal<Cast[]>([])
	videoSafeUrl1 = signal<SafeResourceUrl | null>(null)
	videoSafeUrl2 = signal<SafeResourceUrl | null>(null)
	isPhonePortrait = signal(false)
	isTablet = signal(false)
	showAllCast = signal(false)

	isLoaded = computed(() => !!this.mediaDetails())
	isVideoLoaded1 = computed(() => !!this.videoSafeUrl1())
	isVideoLoaded2 = computed(() => !!this.videoSafeUrl2())

	genres = computed(() => this.mediaDetails()?.genres.map((g) => g.name) || [])
	productionCompanies = computed(() => this.mediaDetails()?.production_companies.map((c) => c.name) || [])
	productionCountries = computed(() => this.mediaDetails()?.production_countries.map((c) => c.name) || [])
	spokenLanguages = computed(() => this.mediaDetails()?.spoken_languages.map((l) => l.name) || [])

	private subs = new Subscription()
	private readonly videoUrl = 'https://www.youtube.com/embed/'

	ngOnInit() {
		this.subs.add(
			this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.Tablet]).subscribe((result) => {
				this.isPhonePortrait.set(result.breakpoints[Breakpoints.HandsetPortrait])
				this.isTablet.set(result.breakpoints[Breakpoints.Tablet])
			}),
		)

		this.subs.add(
			this.route.paramMap.subscribe((params) => {
				const id = params.get('id')
				// Determine type based on the URL segment (movie or serie)
				const path = this.route.snapshot.url[0]?.path
				const type = path === 'serie' ? 'serie' : 'movie'

				if (id) {
					this.loadMedia(type, id)
				}
			}),
		)
	}

	private loadMedia(type: 'movie' | 'serie', id: string) {
		this.mediaDetails.set(null)
		this.castingList.set([])
		this.videoSafeUrl1.set(null)
		this.videoSafeUrl2.set(null)

		this.subs.add(
			this.mediaService.getDetails(type, id).subscribe((data) => {
				this.mediaDetails.set(data)
			}),
		)

		this.subs.add(
			this.mediaService.getVideo(type, id).subscribe((data) => {
				const trailers = data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer')
				if (trailers.length > 0) {
					this.videoSafeUrl1.set(this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl + trailers[0].key))
				}
				if (trailers.length > 1) {
					this.videoSafeUrl2.set(this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl + trailers[1].key))
				}
			}),
		)

		this.subs.add(
			this.mediaService.getCast(type, id).subscribe((data) => {
				this.castingList.set(data.cast.filter((c) => c.profile_path != null).slice(0, 24))
			}),
		)
	}

	ngOnDestroy() {
		this.subs.unsubscribe()
	}

	toggleCast() {
		this.showAllCast.update((v) => !v)
	}
}
