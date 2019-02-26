import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CanActivateGuard } from './guards/can-activate.guard';

const routes:Routes=[
  {
    path:'',
    component:CustomerComponent,
    children:[
      {path : 'details',component:CustomerDetailsComponent},
      {path : 'orders',component:CustomerOrdersComponent},
      {
        path : 'edit',
        component:CustomerEditComponent,
        canActivate:[CanActivateGuard]
      }
    ]

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule],
  providers:[CanActivateGuard]
})
export class CustomerRoutingModule {
  static components = [CustomerComponent,CustomerDetailsComponent,CustomerOrdersComponent,CustomerEditComponent]
 }
