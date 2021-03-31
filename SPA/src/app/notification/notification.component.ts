import { Component, OnInit } from '@angular/core';


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

  notifications_mock = [
    { 'type': 'information', 'read': false, 'content': 'content example of notifications', 'date': new Date().toLocaleDateString() },
    { 'type': 'warning', 'read': true, 'content': 'content example of notifications', 'date': new Date().toLocaleDateString() },
    { 'type': 'error', 'read': true, 'content': 'content example of notifications', 'date': new Date().toLocaleDateString() },
    { 'type': 'check_circle', 'read': false, 'content': 'content example of notifications', 'date': new Date().toLocaleDateString() },
  ]

  show_notifications = []

  constructor() { }

  ngOnInit(): void {
    this.show_notifications = this.showAll();
  }

  showNotifications(notificationType: String) {
    if (notificationType === "All")
      this.show_notifications = this.showAll();
    else if (notificationType === "Unread")
      this.show_notifications = this.showUnread();
    else {
      switch (notificationType) {
        case 'Info':
          this.show_notifications = this.showCertainNotification('information');
          break;
        case 'Errors':
          this.show_notifications = this.showCertainNotification('error');
          break;
        case 'Warnings':
          this.show_notifications = this.showCertainNotification('warning');
          break;
        case 'Success':
          this.show_notifications = this.showCertainNotification('check_circle');
          break;
      }
    }
  }

  showAll() {
    return this.notifications_mock;
  }

  showUnread() {
    return this.notifications_mock.filter(i => i['read'] === false);
  }

  showCertainNotification(notificationType: String) {
    console.log(notificationType);
    return this.notifications_mock.filter(i => i['type'] === notificationType);
  }

  markAsReadNotification(notification) {
    notification.read = true;
  }

}
