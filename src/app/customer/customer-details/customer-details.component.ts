import { Component, OnInit } from '@angular/core';
import { Icustomer } from 'src/app/core/interfaces/customer/icustomer';
import { ActivatedRoute,Params } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer : Icustomer;

  constructor(private route:ActivatedRoute,private customerService:CustomersService) { }

  ngOnInit() {
    const id = this.route.parent.snapshot.params["id"];
    if(id){
        this.customerService.getCustomer(id).subscribe((customer:Icustomer)=>{
        
          this.customer=customer;
          console.log(this.customer);
        })
      }
  }

  getCustomer():void{
    
  }
}
