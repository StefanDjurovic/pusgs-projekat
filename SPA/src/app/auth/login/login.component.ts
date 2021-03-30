import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(next => {
        console.log('Logged in successfully');
      }, error => {
        console.log('Failed to login');
      });
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
