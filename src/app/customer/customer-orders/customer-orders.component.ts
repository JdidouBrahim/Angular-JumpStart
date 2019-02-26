import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/interfaces/customer/iorder';
import { CustomersService } from 'src/app/core/services/customers.service';
import { Icustomer } from 'src/app/core/interfaces/customer/icustomer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  orders : IOrder[];
  customer : Icustomer

  constructor(private customerService:CustomersService,private route:ActivatedRoute) { }

  ngOnInit() {
    const id  = this.route.parent.snapshot.params["id"];
    if(id){
      this.getCustomerOrders(id);
    }
    console.log("orders"+this.orders);
  }

  getCustomerOrders(id:number):void{
    this.customerService.getCustomer(id).subscribe((customer : Icustomer)=>{
       this.customer=customer;
       this.orders=customer.orders;
    })
  }

  


}
