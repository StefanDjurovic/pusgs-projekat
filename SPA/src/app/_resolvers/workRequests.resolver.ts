import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { WorkRequest } from "../_models/WorkRequest";
import { AuthService } from "../_services/auth.service";
import { WorkRequestService } from "../_services/workRequest.service";

@Injectable()
export class WorkRequestsResolver implements Resolve<WorkRequest[]> {

    constructor(private workRequestService: WorkRequestService) { }

    resolve(): Observable<WorkRequest[]> {
        return this.workRequestService.getWorkRequests();
    }
}