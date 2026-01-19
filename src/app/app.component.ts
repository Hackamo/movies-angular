import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MediaService } from './services/media.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'movies-angular';

  constructor(
    private location: Location,
    public mediaService: MediaService,
  ) {}

  goBack() {
    this.location.back();
  }

  switchLanguage() {
    const newLang = this.mediaService.language === 'fr' ? 'en' : 'fr';
    this.mediaService.language = newLang;
    localStorage.setItem('language', newLang);
    window.location.reload();
  }
}
