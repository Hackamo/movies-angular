import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [MatCardModule],
  exports: [MovieComponent],
  declarations: [MovieComponent],
  providers: [],
})
export class MovieModule { }
