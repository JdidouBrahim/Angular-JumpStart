import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../core/services/validation.service';
import { IUserLogin } from '../interfaces/iuser-login';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  redirectUrl: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  submit({ value, valid }: { value: IUserLogin, valid: boolean }) {
    this.authService.login(value).subscribe(loggedIn => {
      if (loggedIn) {
        if (this.authService.redirectUrl) {
          this.redirectUrl=this.authService.redirectUrl;
          this.authService.redirectUrl='';
          this.router.navigate([this.redirectUrl]);
        }
        else {
          this.router.navigate(['/customers']);
        }
      }
    });
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

}
