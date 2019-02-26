import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';

@NgModule({
  declarations: [CapitalizePipe],
  exports : [CapitalizePipe,FormsModule],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
