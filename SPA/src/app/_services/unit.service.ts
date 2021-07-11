import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../_models/Unit';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  baseUrl = 'http://localhost:5000/api/unit/';
  constructor(private http: HttpClient) { }

  createUnit(unit: any) {
    return this.http.post(this.baseUrl, unit);
  }

  getUnits() : Observable<Unit[]> {
    return this.http.get<Unit[]>(this.baseUrl);
  }

  getUnit(unitId): Observable<Unit> {
    return this.http.get<Unit>(this.baseUrl + unitId);
  }

  addUnitMember(unitId, memberId) {
    return this.http.post(this.baseUrl + unitId + '-' + memberId, {});
  }

  getAvailableMembers() {
    return this.http.get<User[]>('http://localhost:5000/api/user/availableUM')
  }

  updateUnitMembers(unitId, members) {
    return this.http.post(this.baseUrl + 'updateUMs/' + unitId, members);
  }
  
  updateUnitName(unitId, name) {
    return this.http.post(this.baseUrl + 'updateUnitName/' + unitId + '-' + name, {});
  }

  deleteUnit(unitId) {
    return this.http.delete(this.baseUrl + unitId);
  }

}
