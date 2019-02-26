import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../core/services/customers.service';
import { Icustomer } from '../core/interfaces/customer/icustomer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers  : Icustomer[];
  constructor(private customersService:CustomersService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
      this.customersService.getCustomers().subscribe(customers=>{
        this.customers=customers;
      })
  }
}
