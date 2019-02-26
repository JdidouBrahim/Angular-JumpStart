import { Component, OnInit } from '@angular/core';
import { IBook } from '../core/interfaces/ibook';
import { BooksService } from '../core/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books : IBook[];

  constructor(private booksService:BooksService) {
    this.getCustomers();
   }

  ngOnInit() {
    console.log(this.books)
  }

  getCustomers():void{
    this.booksService.getBooks().subscribe(
      books=> {
        console.log('books '+books.length);
        this.books=books;
      }
   );
  }

}
