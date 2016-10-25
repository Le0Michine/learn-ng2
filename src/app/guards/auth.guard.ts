import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private login: LoginService, private router: Router) { }

    canActivate() {
        let result = this.login.isAuthorized();
        if (!result) {
            this.router.navigate([""]);
        }
        return result;
    }
}