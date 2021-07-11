import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
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

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private socialAuth: SocialAuthService) { }

  wrongCredMessage = false;

  ngOnInit() {

  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(next => {
        console.log('Logged in successfully');
        this.alertify.success('logged in!');
        this.router.navigate([''])
      }, error => {
        console.log('Failed to login');
        this.alertify.error(error);
        this.wrongCredMessage = true;
      });
    }
  }

  loginWithGoogle() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data);
      this.authService.socialLogin(data).subscribe(next => {
        this.alertify.success('logged in!');
        this.router.navigate([''])
      }, error => {
        this.alertify.error(error)        
      });
    })
    
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  redirectToRegister() {
    this.router.navigate(['register'])
  }
}
