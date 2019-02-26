import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginRoutingModule.components],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
