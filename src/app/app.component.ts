import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'movies-angular';

  private location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  goBack() {
    this.location.back();
  }
  onMovieClick() {}
}
