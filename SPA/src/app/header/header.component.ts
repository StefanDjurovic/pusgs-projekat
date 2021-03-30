import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  auth = null;

  constructor(protected authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  loggedIn() {
    return this.authService.loggedIn();
  }


  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
