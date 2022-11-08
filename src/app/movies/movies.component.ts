import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies = ['Mary', 'Tom', 'Jack', 'Jill'];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const req = this.http
      .get(
        'https://api.themoviedb.org/3/discover/movie?api_key=399af3fea42fd17a119ef910e475a6c5&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&language=fr'
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: (data: any) => console.log(data),
            error: (error: any) => console.log(error),
          }
        )
      );
    console.log(req);
  }
}
