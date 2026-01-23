import { CommonModule, Location } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterModule } from '@angular/router'
import { SearchBarComponent } from './search-bar/search-bar.component'
import { MediaService } from './services/media.service'
import { SafePipe } from './services/pipe'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatAutocompleteModule,
		MatCardModule,
		MatGridListModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
		SearchBarComponent,
	],
})
export class AppComponent {
	title = 'movies-angular'
	searchType = signal<'movie' | 'serie'>((localStorage.getItem('searchType') as 'movie' | 'serie') || 'movie')

	private location = inject(Location)
	public mediaService = inject(MediaService)

	goBack() {
		this.location.back()
	}
	goForward() {
		this.location.forward()
	}

	switchLanguage() {
		const newLang = this.mediaService.language() === 'fr' ? 'en' : 'fr'
		this.mediaService.updateLanguage(newLang)
		window.location.reload()
	}

	// toggleProviders() {
	// 	this.mediaService.filterByProviders = !this.mediaService.filterByProviders
	// 	localStorage.setItem('filterByProviders', String(this.mediaService.filterByProviders))
	// 	window.location.reload()
	// }

	toggleSearchType() {
		const newType = this.searchType() === 'movie' ? 'serie' : 'movie'
		this.searchType.set(newType)
		localStorage.setItem('searchType', newType)
	}
}
