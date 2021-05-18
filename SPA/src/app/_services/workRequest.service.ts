import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {
  baseUrl = 'http://localhost:5000/api/workRequest/' // get from env

  constructor(private http: HttpClient) { }

  createWorkRequest(workRequest: any) {
    return this.http.post(this.baseUrl + 'create', workRequest);
  }
}
