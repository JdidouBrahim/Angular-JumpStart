import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/ibook';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksUrl :string = 'https://www.googleapis.com/books/v1/volumes';
  books : IBook[];
  constructor(private http:HttpClient) { }

  getBooks() : Observable<IBook[]>{
      const params = new HttpParams().set('q','quilting');
      return this.http.get(this.booksUrl,{params:params}).pipe(map(res => this.mapDataFromApi(res)));
  }

  getBook(id:string):Observable<IBook>{
    const params = new HttpParams().set('q','quilting');
    return this.http.get(this.booksUrl+'/'+id,{params:params}).pipe(map(res => this.mapSingleDataFromApi(res)));
  }

  mapDataFromApi(response :any) : IBook[]{
    console.log('mapping data from api')
     const books :IBook[]=[];
     for(let i = 0;i<response.items.length;i++){
       let book :IBook = <IBook>{} ;
       console.log(response.items[i])
       book.id=response.items[i].id;
       const authors :string []= [];
       for(let j =0;j<response.items[i].volumeInfo.authors.length;j++){
         authors.push(response.items[i].volumeInfo.authors[j]);
       }
       book.authors=authors;
       book.title=response.items[i].volumeInfo.title;
       book.description=response.items[i].volumeInfo.description;
       book.book_image=response.items[i].volumeInfo.imageLinks.thumbnail;
       books.push(book);
     }
     return books;
  }

  mapSingleDataFromApi(response :any) : IBook{
    console.log(response.id)
       let book :IBook = <IBook>{} ;
       book.id=response.id;
       const authors :string []= [];
       for(let j =0;j<response.volumeInfo.authors.length;j++){
         authors.push(response.volumeInfo.authors[j]);
       }
       book.authors=authors;
       book.title=response.volumeInfo.title;
       book.description=response.volumeInfo.description;
       book.book_image=response.volumeInfo.imageLinks.smallThumbnail
     return book;
  }
}
