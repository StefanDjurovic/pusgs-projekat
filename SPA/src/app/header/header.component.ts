import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  model: any = {};

  notificationCount = 0;

  constructor(protected authService: AuthService, private alertify: AlertifyService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadNotifications();



  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate([''])
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  loadNotifications() {
    this.notificationService.fetchAllNotifications().subscribe(response => {
      var responseJSON = JSON.parse(response);
      console.log(responseJSON);
      // this.notificationCount = responseJSON.size();

      //localStorage.setItem('notificationCount', responseJSON.size().toString());
      //console.log(localStorage.notificationCount);

    });
  }
}
