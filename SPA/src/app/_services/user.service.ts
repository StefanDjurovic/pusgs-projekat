import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/user/' // get from env

  constructor(private http: HttpClient) { }

  getRegisterApplications() {
    return this.http.get<User[]>(this.baseUrl + 'applications');
  }

  approveApplication(id) {
    return this.http.put(this.baseUrl + 'approve/' + id, {}, {});
  }

  declineApplication(id) {
    return this.http.put(this.baseUrl + 'decline/' + id, {}, {});
  }

  getUser(id) {
    return this.http.get(this.baseUrl + id);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getAvailableUMs() {
    return this.http.get<User[]>(this.baseUrl + 'availableUM');
  }

  getUnitMembers(unitId) {
    return this.http.get<User[]>(this.baseUrl + 'unitMembers/' + unitId);
  }
}
