import { Component, OnInit } from '@angular/core';
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

  notifications = [];
  shownNotifications = [];

  public filterData: any = {};
  public resultData = [];
  _notificationType: String;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
    this.shownNotifications = this.notifications;
    // console.log(this.notifications);
  }

  getNotifications() {
    this.notificationService.fetchAllNotifications().subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.notifications = responseJSON;
      console.log(this.notifications);
    });
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
          //this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Errors':
          this.shownNotifications = this.showCertainNotification('error');
          //this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Warnings':
          this.shownNotifications = this.showCertainNotification('warning');
          //this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
        case 'Success':
          this.shownNotifications = this.showCertainNotification('check_circle');
          //this.shownNotifications = this.shownNotifications.filter(i => i.read === false);
          break;
      }
    }
  }

  showAll() {
    return this.notifications;
  }

  showUnread() {
    this.shownNotifications = this.notifications.filter(i => i.read === false);
  }

  showCertainNotification(notificationType) {
    var _type = this.translateNotificationTypeToInt(notificationType);
    console.log(_type);
    return this.notifications.filter(i => i.type === _type);
  }

  markAsReadNotification(notification) {
    debugger
    this.notificationService.updateNotification(notification.id).subscribe(response => {
      if (response === true) {
        this.notificationService.fetchAllNotifications().subscribe(response => {
          var responseJSON = JSON.parse(response);
          this.notifications = responseJSON;
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

  // todo : OLD NOTIFICATION LOGIC ...

  // ngOnInit(): void {
  //   this.getNotifications();
  //   this.shownNotifications = this.notifications;
  //   console.log(this.notifications);
  //   this.showUnread();
  // }

  // showNotifications(notificationType: String) {
  //   if (notificationType === "All")
  //     this.shownNotifications = this.showAll();
  //   else if (notificationType === "Unread")
  //     this.showUnread();
  //   else {
  //     switch (notificationType) {
  //       case 'Info':
  //         this.shownNotifications = this.showCertainNotification('information');
  //         break;
  //       case 'Errors':
  //         this.shownNotifications = this.showCertainNotification('error');
  //         break;
  //       case 'Warnings':
  //         this.shownNotifications = this.showCertainNotification('warning');
  //         break;
  //       case 'Success':
  //         this.shownNotifications = this.showCertainNotification('check_circle');
  //         break;
  //     }
  //   }
  // }

  // showAll() {
  //   return this.notifications;
  // }

  // showUnread() {
  //   this.shownNotifications = this.notifications.filter(i => i.read === false);
  // }

  // showCertainNotification(notificationType) {
  //   var _type = this.translateNotificationTypeToInt(notificationType);
  //   console.log(_type);
  //   return this.notifications.filter(i => i.type === _type);
  // }

  // markAsReadNotification(notification) {
  //   this.notificationService.updateNotification(notification.id).subscribe(response => {
  //     if (response === true) {
  //       this.getNotifications();
  //       this.showUnread();
  //       console.log('Notification Selected as Read!');
  //     }
  //   });
  // }

  // translateNotificationTypeToString(notificationType) {
  //   if (notificationType === 0) {
  //     return 'information';
  //   } else if (notificationType === 1) {
  //     return 'warning';
  //   } else if (notificationType === 2) {
  //     return 'error';
  //   } else {
  //     return 'check_circle';
  //   }
  // }

  // translateNotificationTypeToInt(notificationType) {
  //   if (notificationType === 'information') {
  //     return 0;
  //   } else if (notificationType === 'warning') {
  //     return 1;
  //   } else if (notificationType === 'error') {
  //     return 2;
  //   } else {
  //     return 3;
  //   }
  // }

  // getNotifications() {
  //   this.notificationService.fetchAllNotifications().subscribe(response => {
  //     var responseJSON = JSON.parse(response);
  //     this.notifications = responseJSON;
  //   });
  // }
}
