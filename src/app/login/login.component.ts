import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { User } from "../models";
import { LoginService, LoacalStorageService, BreadcrumbService } from "../services";

@Component({
  selector: "login",
  styleUrls: [
    "./login.component.css"
  ],
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  user: User = new User();
  showErrorMessage: boolean = false;
  errorMessage: string = "";

  constructor(
    private loginService: LoginService,
    private storage: LoacalStorageService,
    private location: BreadcrumbService,
    private router: Router) { }

  private showLoginRequiredHint: boolean = false;
  private showPasswordRequiredHint: boolean = false;

  ngOnInit() {
    this.loginService.logoff();
    this.location.setCurrentState([]);
  }

  login(formValue: any) {
    this.loginService.login(formValue.login, formValue.password)
      .catch(error => {
        this.errorMessage = error.message;
        this.showErrorMessage = true;
        this.user.password = "";
        return Observable.of(null);
      })
      .subscribe(user => {
        if (user) {
          this.showErrorMessage = false;
          this.storage.set("currentUser", user);
          this.router.navigate(["courses"]);
        }
      });
  }
}