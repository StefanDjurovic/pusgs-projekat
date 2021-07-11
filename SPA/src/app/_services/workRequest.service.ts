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

  getWorkRequest(workRequestId) {
    return this.http.get<WorkRequest>(this.baseUrl + workRequestId);
  }

  getWorkRequests() {
    return this.http.get<WorkRequest[]>(this.baseUrl);
  }

  getWorkRequestsWithParams(page, numberOfResults) {
    return this.http.get<WorkRequest[]>(this.baseUrl + 'withParams' + '?page=' + page + '&numberOfResults=' + numberOfResults);
  }

  updateWorkRequest(workRequest) {
    return this.http.put(this.baseUrl, workRequest);
  }

  uploadAttachmnet(workRequestId, attachment) {
    return this.http.post('http://localhost:5000/api/upload/' + 'multimedia-attach/' + workRequestId, attachment,  { reportProgress: true, observe: 'events' });
  }

  downloadAttachment(workRequestId, attachId) {
    return this.http.get('http://localhost:5000/api/upload/' + 'download-attach/' + workRequestId + '-' + attachId, { responseType: 'blob' })
  }

  deleteAttachment(workRequestId, attachId) {
    return this.http.post('http://localhost:5000/api/upload/' + 'delete-attach/' + workRequestId + '-' + attachId, {});
  }

  delete(workRequestId) {
    return this.http.delete(this.baseUrl + workRequestId);
  }
}
