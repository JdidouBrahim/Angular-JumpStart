import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUserLogin } from 'src/app/interfaces/iuser-login';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseAuthUrl: string = '/api/auth';
  isAuthenticated: boolean = false;
  redirectUrl: string;
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  login(user: IUserLogin): Observable<boolean> {
    return this.http.post<boolean>(this.baseAuthUrl + '/login', user)
      .pipe(
        map(loggedIn => {
          this.isAuthenticated = loggedIn;
          this.userAuthChanged(loggedIn);
          return loggedIn;
        }),
        catchError(err => this.handleError)
      );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userAuthChanged(this.isAuthenticated);
  }

  private userAuthChanged(status:boolean){
    this.authChanged.emit(status);
  }
  private handleError(error: HttpErrorResponse){
  console.log(error);
}
}
