import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'test-component', component: TestComponent },
  { path: 'page-component', component: MoviePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
