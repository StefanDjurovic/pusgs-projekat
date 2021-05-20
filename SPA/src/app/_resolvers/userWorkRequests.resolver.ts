import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { WorkRequest } from "../_models/WorkRequest";
import { AuthService } from "../_services/auth.service";
import { WorkRequestService } from "../_services/workRequest.service";

@Injectable()
export class UserWorkRequestsResolver implements Resolve<WorkRequest[]> {

    constructor(private workRequestService: WorkRequestService, private authService: AuthService) { }

    resolve(): Observable<WorkRequest[]> {
        console.log(`user id is : ${this.authService.getId()}`);
        
        return this.workRequestService.getUserRequests(this.authService.getId());
    }
}