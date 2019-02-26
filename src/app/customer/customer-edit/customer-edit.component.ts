import { Component, OnInit, ViewChild } from '@angular/core';
import { Icustomer } from 'src/app/core/interfaces/customer/icustomer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer: Icustomer =
    {
      id: 0,
      firstName: "",
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      },
     orders: [],
     orderTotal: 0
    };
    operationText :string ="";
    errorMessage : string ;
    deleteMessageEnabled : boolean;
    @ViewChild('customerForm') customerForm: NgForm;
    
  constructor(private route:ActivatedRoute,
              private customerService:CustomersService,
              private router:Router) { }

  ngOnInit() {
    const id = this.route.parent.snapshot.params["id"];
    if(id !== 0){
      this.operationText="Update"
       this.getCustomer(id);
    }
  }

  getCustomer(id:number){
    this.customerService.getCustomer(id).subscribe((customer:Icustomer)=>{
      this.customer=customer;
    })
  }

  submit(){
    if(this.customer.id === 0){
       this.insertCustomer();
    }
    else{
        this.updateCustomer();
    }
  }

  private updateCustomer() {
    this.customerService.updateCustomer(this.customer)
      .subscribe(status => {
        if (status) {
          this.customerForm.form.markAsPristine();
        }
        else {
          this.errorMessage = "Unable to update Customer";
        }
      });
  }

  private insertCustomer() {
    this.customerService.insertCustomer(this.customer).subscribe(insertedCustomer => {
      if (insertedCustomer) {
        this.customerForm.form.markAsPristine();
        this.router.navigate(['/customers/' + this.customer.id]);
      }
      else{
        this.errorMessage="Unable to insert customer";
      }
    });
  }

  delete (event :Event) {
    //preventDefault prevent the from from being submited
    event.preventDefault();
    this.customerService.deleteCustomer(this.customer.id)
    .subscribe(
      status=>{
         if(status){
            this.router.navigate(['/customers']);
         }
         else{
           this.errorMessage="Unable to delete Customer"
         }
      },
      (err)  => {console.log(err)}
   )}
}
