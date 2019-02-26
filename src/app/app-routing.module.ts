import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path:'customers',loadChildren:'./customers/customers.module#CustomersModule'},
  { path: 'customers/:id', loadChildren: './customer/customer.module#CustomerModule' },
  {path : 'login' , loadChildren : './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
