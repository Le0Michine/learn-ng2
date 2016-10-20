import { Injectable, Inject } from "@angular/core";
import { CanActivate } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";

import { LoacalStorageService } from "./local-storage.service";
import { User } from "../models";

@Injectable()
export class LoginService implements CanActivate {
    private user: User;
    private onLogin: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private storage: LoacalStorageService) {
        this.user = new User();
        this.user.id = 1;
        this.user.name = "q";
        this.user.password = "q";

        storage.get("currentUser").subscribe((u: User) => this.onLogin.next(u));
    }

    public login(userName: string, password: string): Observable<User> {
        if (this.user.name === userName && this.user.password === password) {
            this.onLogin.next(this.user);
            return Observable.of(this.user);
        } else {
            return Observable.throw({ type: "authorization_failed", message: "Wrong Login or Password" });
        }
    }

    public onSuccessLogin(): Observable<User> {
        return this.onLogin;
    }

    public isAuthorized(): boolean {
        return this.onLogin.value ? true : false;
    }

    public canActivate(): boolean {
        return this.onLogin.value ? true : false;
    }

    public logoff(): void {
        this.onLogin.next(null);
        this.storage.remove("currentUser");
    }
}