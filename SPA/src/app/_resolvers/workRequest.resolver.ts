import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { WorkRequest } from "../_models/WorkRequest";
import { AuthService } from "../_services/auth.service";
import { WorkRequestService } from "../_services/workRequest.service";

@Injectable()
export class WorkRequestResolver implements Resolve<WorkRequest> {

    constructor(private workRequestService: WorkRequestService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<WorkRequest> {
        return this.workRequestService.getWorkRequest(route.params['id']);
    }
}