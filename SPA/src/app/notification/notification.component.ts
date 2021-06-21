import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications_type = [
    { name: 'All', color: '' },
    { name: 'Unread', color: '' },
    { name: 'Info', color: "information" },
    { name: 'Errors', color: 'error' },
    { name: 'Success', color: 'check_circle' },
    { name: 'Warnings', color: 'warning' },
  ];

  notifications = []
  shownNotifications = []

  public filterData: any = {};
  public resultData = [];
  _notificationType: String;

  constructor(private notificationService: NotificationService, public datepipe: DatePipe, private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getNotifications();
    this.shownNotifications = this.notifications;
    console.log(this.notifications);
    this.showUnread();
  }

  showNotifications(notificationType: String) {
    this._notificationType = notificationType;
    if (notificationType === "All")
      this.shownNotifications = this.showAll();
    else if (notificationType === "Unread")
      this.showUnread();
    else {
      switch (notificationType) {
        case 'Info':
          this.shownNotifications = this.showCertainNotification('information');
          this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Errors':
          this.shownNotifications = this.showCertainNotification('error');
          this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Warnings':
          this.shownNotifications = this.showCertainNotification('warning');
          this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Success':
          this.shownNotifications = this.showCertainNotification('check_circle');
          this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
      }
    }
    this.resultData = [];
    let data = new Set(this.shownNotifications.map(item => item.creationDate))
    data.forEach((creationDate) => {
      this.resultData.push({
        date: creationDate,
        notifications: this.shownNotifications.filter(i => i.creationDate === creationDate)
      })
      console.log(this.resultData);
    });
  }

  showAll() {
    return this.notifications;
  }

  showUnread() {
    this.shownNotifications = this.notifications.filter(i => i.read === false);
    this.resultData = [];
    let data = new Set(this.shownNotifications.map(item => item.creationDate))
    data.forEach((creationDate) => {
      this.resultData.push({
        date: creationDate,
        notifications: this.shownNotifications.filter(i => i.creationDate === creationDate)
      })
      console.log(this.resultData);
    });
  }

  showCertainNotification(notificationType) {
    var _type = this.translateNotificationTypeToInt(notificationType);
    console.log(_type);
    return this.notifications.filter(i => i.type === _type);
  }

  markAsReadNotification(notification) {
    this.notificationService.updateNotification(notification.id).subscribe(response => {
      if (response === true) {
        this.notificationService.fetchAllNotifications().subscribe(response => {
          var responseJSON = JSON.parse(response);
          this.notifications = responseJSON;

          this.resultData = [];
          let data = new Set(this.notifications.map(item => item.creationDate))
          data.forEach((creationDate) => {
            this.resultData.push({
              date: creationDate,
              notifications: this.notifications.filter(i => i.creationDate === creationDate)
            })
            console.log(this.resultData);
          });

          this.showNotifications(this._notificationType);
        });
      }
    });
  }

  translateNotificationTypeToString(notificationType) {
    if (notificationType === 0) {
      return 'information';
    } else if (notificationType === 1) {
      return 'warning';
    } else if (notificationType === 2) {
      return 'error';
    } else {
      return 'check_circle';
    }
  }

  translateNotificationTypeToInt(notificationType) {
    if (notificationType === 'information') {
      return 0;
    } else if (notificationType === 'warning') {
      return 1;
    } else if (notificationType === 'error') {
      return 2;
    } else {
      return 3;
    }
  }

  getNotifications() {
    this.notificationService.fetchAllNotifications().subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.notifications = responseJSON;
      console.log(this.notifications);

      this.resultData = [];
      let data = new Set(this.notifications.map(item => item.creationDate))
      data.forEach((creationDate) => {
        this.resultData.push({
          date: creationDate,
          notifications: this.notifications.filter(i => i.creationDate.getDate() === creationDate.getDate())
        })
        console.log(this.resultData);
      });

    });
  }

  deleteNotifications() {
    var id = this.authService.decodedToken.nameid;
    var url = 'http://localhost:5000/api/notification/delete-all/' + id;
    this.http.get(url).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }

  markAsReadNotifications() {
    var id = this.authService.decodedToken.nameid;
    var url = 'http://localhost:5000/api/notification/mark-all/' + id;
    this.http.get(url).subscribe(response => {
      window.location.reload();
    });
  }
}
