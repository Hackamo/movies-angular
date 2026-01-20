import { MediaPageComponent } from './media-page/media-page.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { MediaComponent } from './media-details/media.component'

const routes: Routes = [
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
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
