import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkRequest } from '../_models/WorkRequest';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {
  baseUrl = 'http://localhost:5000/api/workRequest/' // get from env

  constructor(private http: HttpClient) { }

  createWorkRequest(workRequest: any) {
    return this.http.post(this.baseUrl + 'create', workRequest);
  }

  getUserRequests(userId) {
    return this.http.get<WorkRequest[]>(this.baseUrl + 'user/' + userId);
  }
}
