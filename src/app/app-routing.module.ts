import { MoviesPageComponent } from './movies-page/movies-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { SerieComponent } from './serie/serie.component';

const routes: Routes = [
  { path: '', component: MoviesPageComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'series', component: SeriesPageComponent },
  { path: 'series/serie', component: SerieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
