import { Movie } from '../models/movie';
import { MovieService } from './../services/movies.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss'],
})
export class SeriesPageComponent {
  series: Movie[] = [];
  pagination: number = 0;

  constructor(private httpClient: MovieService) {}

  ngOnInit() {
    // TODO : later for optimize nb api calls
    // if (!sessionStorage.getItem('movieId')) {}
    this.getSeries();
  }

  onScroll() {
    console.log('scrolled!!');
    // this.getseries()
  }

  getSeriesMock() {
    this.pagination += 1;
    this.httpClient.getSeries(this.pagination).subscribe((data: Movie[]) => {
      for (let i = 0; i < data.length; i++) {
        this.series.push(data[i]);
      }
    });
  }

  getSeries() {
    this.pagination += 1;
    this.httpClient.getSeries(this.pagination).subscribe((data) => {
      for (const movie of data.results) {
        this.series.push(movie);
      }
    });
  }
}
