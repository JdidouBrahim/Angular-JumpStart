import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icustomer } from '../interfaces/customer/icustomer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getCustomers():Observable<Icustomer[]>{
    return this.http.get<Icustomer[]>('/api/customers').pipe(map(customers=>{
      console.log('customers '+customers)
      return customers;
    }));
  }
}
