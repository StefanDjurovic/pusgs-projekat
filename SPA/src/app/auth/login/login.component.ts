import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
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

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(next => {
        console.log('Logged in successfully');
        this.alertify.success('logged in!');
        this.router.navigate(['profile'])
      }, error => {
        console.log('Failed to login');
        this.alertify.error(error);
      });
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
