import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Form, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  account = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  submitLogin(form: any): void {
    if (form.valid) {
      this.authService.login(this.account.username, this.account.password);
    }
  }
}
