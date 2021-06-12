import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseURL = 'http://localhost:5000/api/notification/';

  constructor(private auth: AuthService, private http: HttpClient) { }

  fetchAllNotifications() {
    var userId = this.auth.getId();
    return this.http.get(this.baseURL + userId, { responseType: 'text' });
  }

  updateNotification(id) {
    var url = this.baseURL + 'update/' + id;
    return this.http.get(url);
  }
}
