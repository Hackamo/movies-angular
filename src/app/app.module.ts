import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviePageComponent } from './movie/movie.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import {LayoutModule} from '@angular/cdk/layout';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatDialogModule,
    LayoutModule
  ],
  declarations: [AppComponent, MoviePageComponent, MoviesPageComponent, MovieCardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// ng deploy --base-href=https://Hackamo.github.io//movies-angular/

platformBrowserDynamic().bootstrapModule(AppModule);

