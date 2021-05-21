import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkRequest } from '../_models/WorkRequest';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {
  baseUrl = 'http://localhost:5000/api/WorkRequest/' // get from env

  constructor(private http: HttpClient, private authService: AuthService) { }

  createWorkRequest(workRequest: any) {
    return this.http.post(this.baseUrl + 'create', workRequest);
  }

  getUserRequests(userId) {
    return this.http.get<WorkRequest[]>(this.baseUrl + 'user/' + userId);
  }

  fetchWorkRequests(pageNumber, pageSize) {
    //var url = this.baseUrl + 'user/' + this.authService.getId() + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return this.http.get(this.baseUrl + 'user/' + this.authService.getId() + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize, { responseType: 'text' });
  }
}
