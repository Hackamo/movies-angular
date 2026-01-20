import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { MediaService } from './services/media.service'
import { Router } from '@angular/router'
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false,
})
export class AppComponent {
	title = 'movies-angular'
	searchType: 'movie' | 'serie' = (localStorage.getItem('searchType') as 'movie' | 'serie') || 'movie'
	preSearchResults: any[] = []

	constructor(
		private location: Location,
		public mediaService: MediaService,
		private router: Router,
	) {}

	goBack() {
		this.location.back()
	}
	goForward() {
		this.location.forward()
	}

	switchLanguage() {
		const newLang = this.mediaService.language === 'fr' ? 'en' : 'fr'
		this.mediaService.language = newLang
		localStorage.setItem('language', newLang)
		window.location.reload()
	}

	// toggleProviders() {
	// 	this.mediaService.filterByProviders = !this.mediaService.filterByProviders
	// 	localStorage.setItem('filterByProviders', String(this.mediaService.filterByProviders))
	// 	window.location.reload()
	// }

	toggleSearchType() {
		this.searchType = this.searchType === 'movie' ? 'serie' : 'movie'
		localStorage.setItem('searchType', this.searchType)
	}

	preSearch(value: string) {
		if (this.searchType === 'movie') {
			this.mediaService.searchMovies(value, 1).subscribe((response: any) => {
				this.preSearchResults = response.results
			})
		} else {
			this.mediaService.searchSeries(value, 1).subscribe((response: any) => {
				this.preSearchResults = response.results
			})
		}
	}

	search(query: string) {
		if (query.trim()) {
			const path = this.searchType === 'movie' ? '/movies' : '/series'
			this.router.navigate([path], { queryParams: { q: query } })
		}
	}

	goToSelectedMedia(option: any) {
		if (option.id) {
			const path = this.searchType === 'movie' ? `/movie/${option.id}` : `/serie/${option.id}`
			this.router.navigate([path])
		}
	}

	getNoteColor(vote: number) {
		if (vote > 7) {
			return {
				background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
				color: 'white',
			}
		}
		if (vote > 5) {
			return {
				background: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
				color: 'white',
			}
		}
		if (vote > 0) {
			return {
				background: 'linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)',
				color: 'white',
			}
		}
		return {
			background: 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
			color: 'white',
		}
	}
}
