import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../_models/User";
import { UnitService } from "../_services/unit.service";

@Injectable()
export class AvailableMembersResolver implements Resolve<User[]> {

    constructor(private unitService: UnitService) { }

    resolve(): Observable<User[]> {
        return this.unitService.getAvailableMembers();
    }
}