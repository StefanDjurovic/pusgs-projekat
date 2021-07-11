import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Unit } from "../_models/Unit";
import { AuthService } from "../_services/auth.service";
import { UnitService } from "../_services/unit.service";

@Injectable()
export class UnitDetailsResolver implements Resolve<Unit> {

    constructor(private unitService: UnitService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Unit> {
        return this.unitService.getUnit(route.params['id'])
    }
}