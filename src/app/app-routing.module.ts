import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  
  {  path:'books',
     component:BooksComponent
  },
  {  path:'books/:id',
     component:BookComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
