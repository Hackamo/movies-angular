import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MediaService } from './services/media.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'movies-angular';
  searchType: 'movie' | 'serie' =
    (localStorage.getItem('searchType') as 'movie' | 'serie') || 'movie';

  constructor(
    private location: Location,
    public mediaService: MediaService,
    private router: Router,
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

  toggleProviders() {
    this.mediaService.filterByProviders = !this.mediaService.filterByProviders;
    localStorage.setItem(
      'filterByProviders',
      String(this.mediaService.filterByProviders),
    );
    window.location.reload();
  }

  toggleSearchType() {
    this.searchType = this.searchType === 'movie' ? 'serie' : 'movie';
    localStorage.setItem('searchType', this.searchType);
  }

  search(query: string) {
    if (query.trim()) {
      const path = this.searchType === 'movie' ? '/movies' : '/series';
      this.router.navigate([path], { queryParams: { q: query } });
    }
  }
}
