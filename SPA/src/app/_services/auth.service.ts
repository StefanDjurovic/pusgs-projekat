import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);

          }
        })
      );
  }


  socialLogin(data: SocialUser) {
    return this.http.post(this.baseUrl + 'socialLogin', data)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);

          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  updateToken(token: any) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  getUsername(): string {
    if (this.loggedIn()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('token')).unique_name;
    }
  }

  getId(): number {
    if (this.loggedIn()) {      
      return this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
    } else {
      return -1;
    }
  }
}
