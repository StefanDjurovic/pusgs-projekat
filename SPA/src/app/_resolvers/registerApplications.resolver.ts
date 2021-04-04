import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { User } from '../_models/User';
import { UserService } from "../_services/user.service";

@Injectable()
export class RegisterApplicationsResolver implements Resolve<User[]> {


    constructor(private userService: UserService) { }

    resolve(): Observable<User[]> {
        return this.userService.getRegisterApplications();
    }
}