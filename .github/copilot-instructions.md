# MoviesAngular Copilot Instructions

## Architecture Overview
This Angular 15 application displays movies and TV series using The Movie Database (TMDB) API. Key components:
- **MoviesPageComponent**: Lists movies with infinite scroll pagination
- **MovieCardComponent**: Displays individual movie/series cards with responsive design
- **MovieComponent/SerieComponent**: Detail views for movies and series
- **MovieService**: Handles TMDB API calls (movies, series, details, videos, credits)

Data flows from services → page components → card components. Uses Angular Material for UI and ngx-infinite-scroll for pagination.

## Key Patterns & Conventions

### Model Classes
Models use private fields with explicit getters/setters (Java-style), unlike typical TypeScript public properties:
```typescript
// src/app/models/movie.ts
private _title: string;
public get title(): string { return this._title; }
public set title(value: string) { this._title = value; }
```

### API Integration
- TMDB API calls are hardcoded in `MovieService` (not using environment files)
- API key: `399af3fea42fd17a119ef910e475a6c5`
- Language: French (`&language=fr`)
- Proxy configured in `src/proxyFAKE.conf.json` for development

### Navigation & State
- Uses hash routing (`{useHash: true}` in routing module)
- Movie/series IDs stored in `sessionStorage` for detail navigation
- Router type determined by presence of `title` vs `name` property

### Responsive Design
Components check `Breakpoints.HandsetPortrait` for mobile layout:
```typescript
this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
  this.isPhonePortrait = result.matches;
});
```

### Data Handling
- Pagination starts at 0, increments on each API call
- API responses accessed via `data.results` array
- Vote averages colored: >7 green, >5 orange, else red

### Testing & Mocking
- `MockService` returns data from `src/assets/response.json` for offline testing
- Switch between real API and mock by changing service injection

### Security & Sanitization
- `SafePipe` bypasses Angular's security for YouTube video embeds:
```html
<iframe [src]="videoUrl | safe:'resourceUrl'"></iframe>
```

## Development Workflows

### Running the App
```bash
npm start  # ng serve with hot reload
```

### Building
```bash
npm run build  # Production build to dist/
ng build --watch --configuration development  # Dev watch mode
```

### Testing
```bash
npm test  # Karma unit tests
```

### Component Generation
```bash
ng generate component component-name  # Creates with SCSS styles
```

## Common Tasks
- Add new movie fields: Update `Movie` model with private field + getter/setter
- New API endpoint: Add method to `MovieService` following existing pattern
- Responsive feature: Check `isPhonePortrait` in component logic
- Infinite scroll: Implement `onScroll()` method in page components</content>
<parameter name="filePath">c:\Users\coren\Documents\git\movies-angular\.github\copilot-instructions.md