import { MoviesPageComponent } from './movies-page/movies-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

const routes: Routes = [
  { path: '', component: MoviesPageComponent },
  { path: 'movie', component: MoviePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
