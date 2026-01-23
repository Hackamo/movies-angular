import { Routes } from '@angular/router'
import { MediaPageComponent } from './media-page/media-page.component'
import { MediaComponent } from './media-details/media.component'
import { PersonComponent } from './person/person.component'

export const routes: Routes = [
	{ path: '', redirectTo: 'movies', pathMatch: 'full' },
	{ path: 'movies', component: MediaPageComponent, data: { type: 'movie' } },
	{ path: 'series', component: MediaPageComponent, data: { type: 'serie' } },
	{
		path: 'release',
		component: MediaPageComponent,
		data: { type: 'movie', filter: 'release' },
	},
	{
		path: 'release-series',
		component: MediaPageComponent,
		data: { type: 'serie', filter: 'release' },
	},
	{ path: 'movie/:id', component: MediaComponent },
	{ path: 'serie/:id', component: MediaComponent },
	{ path: 'person/:id', component: PersonComponent },
]
