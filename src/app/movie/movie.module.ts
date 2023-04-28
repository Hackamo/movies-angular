import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [MatCardModule, MatButtonModule],
  exports: [MovieComponent],
  declarations: [MovieComponent],
  providers: [],
})
export class MovieModule { }
