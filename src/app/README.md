# Cocoflix

Cocoflix is an Angular application designed to browse, search, and view details for Movies and TV Series. It leverages Angular Material for a responsive and modern UI and connects to the TMDB API.

## Features

- **Search**: Real-time search for movies and series with an autocomplete dropdown.
- **Discovery**: Browse "News" for the latest releases in Movies and Series.
- **Details**: Dedicated pages for Movies, Series, and People (Actors/Crew).
- **Localization**: Switch between French (FR) and English (EN).
- **Responsive Design**: Tailored views for Desktop and Mobile.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have a recent version of Node.js installed (Active LTS recommended).
- **Angular CLI**: Install globally via `npm install -g @angular/cli`.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movies-angular
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

- **`src/app`**: Main application source.
  - **`media-page`**: Displays lists of media.
  - **`media-details`**: Displays details for a specific movie or series.
  - **`person`**: Displays details for a person.
  - **`services`**: Contains `MediaService` and other core logic.
  - **`app.module.ts`**: Root module configuration.
