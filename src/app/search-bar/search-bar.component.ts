import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MediaService } from '../services/media.service'

@Component({
	selector: 'app-search-bar',
	standalone: true,
	imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatIconModule, MatCardModule],
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
	searchType = input.required<'movie' | 'serie'>()
	isMobile = input<boolean>(false)

	preSearchResults = signal<any[]>([])

	private mediaService = inject(MediaService)
	private router = inject(Router)

	onSearchInput(value: string) {
		if (value.length >= 3) {
			this.preSearch(value)
		} else {
			this.preSearchResults.set([])
		}
	}

	preSearch(value: string) {
		const type = this.searchType()
		if (type === 'movie') {
			this.mediaService.searchMovies(value, 1).subscribe((response: any) => {
				this.preSearchResults.set(response.results)
			})
		} else {
			this.mediaService.searchSeries(value, 1).subscribe((response: any) => {
				this.preSearchResults.set(response.results)
			})
		}
	}

	search(query: string) {
		if (query.trim()) {
			const path = this.searchType() === 'movie' ? '/movies' : '/series'
			this.router.navigate([path], { queryParams: { q: query } })
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
