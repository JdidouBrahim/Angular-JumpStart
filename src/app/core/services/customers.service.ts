import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icustomer } from '../interfaces/customer/icustomer';
import { map, catchError } from 'rxjs/operators';
import { IOrder } from '../interfaces/customer/iorder';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { IApiResponse } from '../interfaces/iapi-response';
import { restoreView } from '@angular/core/src/render3';

const apiBaseUrl = '/api/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getCustomers():Observable<Icustomer[]>{
    return this.http.get<Icustomer[]>('/api/customers').pipe(map(customers=>{
      return customers;
    }));
  }

  getCustomer(id:number):Observable<Icustomer>{
    return this.http.get<Icustomer>('/api/customers/'+id).
    pipe(
      map(customer=>{
                     this.calculateCustomersOrderTotals([customer]);
                     return customer;
                     }
          )
        );
  }

  deleteCustomer(id:number):Observable<boolean>{
    return this.http.delete<IApiResponse>(apiBaseUrl+id)
    .pipe(
           map(res => {return res.status}),
           catchError(err => this.handleError)
          );
  }

  insertCustomer(customer :Icustomer):Observable<Icustomer>{
    return this.http.post<Icustomer>(apiBaseUrl,customer)
    .pipe(
      catchError(err=>this.handleError)
    );
  }

  updateCustomer(customer:Icustomer):Observable<boolean>{
    return this.http.put<IApiResponse>(apiBaseUrl,customer)
    .pipe(
       map(res => {return res.status}),
       catchError(err => this.handleError)
    );
  }

  private handleError (error : HttpErrorResponse){
    console.log(error);
  }
  private calculateCustomersOrderTotals (customers : Icustomer[])  {
    for (const customer of customers){
      let total =0;
     if(customer && customer.orders){
       console.log("teeeeest")
       for (const order of customer.orders){
        total+=order.itemCost;
      }
      customer.orderTotal=total;
     }
      
    }
}

}
