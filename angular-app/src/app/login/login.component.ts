import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Form, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import { Router } from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  account = {
    username: '',
    password: ''
  }

  loginFailed = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  login() {

  }

  submitLogin(form: any): void {
    if (form.valid) {
      this.authService.login(this.account.username, this.account.password);
    }
  }

  protected readonly localStorage = localStorage;
}
