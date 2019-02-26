import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../core/interfaces/ibook';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksService } from '../core/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book : IBook;
  constructor(private route:ActivatedRoute,private booksService:BooksService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    let id=this.route.snapshot.paramMap.get("id");
      if (id) {
        this.booksService.getBook(id)
        .subscribe((book:IBook)=>{
          console.log(book.title)
          this.book=book;
        })
      }
  }

}
