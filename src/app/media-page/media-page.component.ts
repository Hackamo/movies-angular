import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core'
import { ActivatedRoute, Scroll } from '@angular/router'
import { MediaItem } from '../services/tmdb.models'
import { MediaService } from '../services/media.service'
import { MediaCardComponent } from '../media-card/media-card.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ViewportScroller } from '@angular/common'
import { combineLatest } from 'rxjs'

@Component({
	selector: 'app-media-page',
	templateUrl: './media-page.component.html',
	styleUrls: ['./media-page.component.scss'],
	imports: [MediaCardComponent, InfiniteScrollModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(window:scroll)': 'onWindowScroll()',
	},
})
export class MediaPageComponent implements OnInit {
	medias = signal<MediaItem[]>([])
	pagination = 0
	mediaType: 'movie' | 'serie' = 'movie'
	searchQuery: string | null = null
	filter: string = 'popular'
	showScrollButton = signal(false)

	private mediaService = inject(MediaService)
	private route = inject(ActivatedRoute)
	private viewportScroller = inject(ViewportScroller)
	private cd = inject(ChangeDetectorRef)

	ngOnInit() {
		combineLatest([this.route.data, this.route.queryParams]).subscribe(([data, params]) => {
			this.mediaType = data['type'] || 'movie'
			this.filter = data['filter'] || 'popular'
			this.searchQuery = params['q']
			this.medias.set([])
			this.pagination = 0
			this.getMedias()
		})
	}

	onWindowScroll() {
		// Show button when scrolled down 500px
		this.showScrollButton.set(window.scrollY > 500)
	}

	scrollToTop() {
		this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' })
	}

	onScroll() {
		this.getMedias()
	}

	getMedias() {
		this.pagination++
		const processData = (data: any) => {
			const newMedias = data.results.filter((media: any) => media.poster_path)
			this.medias.update((current) => [...current, ...newMedias])
			this.cd.markForCheck()
		}

		if (this.searchQuery) {
			this.mediaService.searchMedia(this.mediaType, this.searchQuery, this.pagination).subscribe(processData)
		} else if (this.filter === 'release') {
			this.mediaService.getReleaseMedia(this.mediaType, this.pagination).subscribe(processData)
		} else {
			this.mediaService.getPopular(this.mediaType, this.pagination).subscribe(processData)
		}
	}
}
