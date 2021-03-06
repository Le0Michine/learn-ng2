import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Store, combineReducers, Action } from "@ngrx/Store";

import { AppState } from "./app.service";
import { BreadcrumbService, LoginService } from "./services";
import { User } from "./models";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "./app.component.css"
  ],
  templateUrl: "app.component.html"
})
export class App {
  title: string = "Logo";
  place: Observable<string>;
  currentUser: Observable<string>;
  onError: Observable<string>;

  constructor(
    private store: Store<any>,
    public appState: AppState,
    public loginService: LoginService,
    private location: BreadcrumbService,
    private router: Router) { }

  ngOnInit() {
    this.place = this.location.getCurrentState().map(x => x.join("/"));
    this.currentUser = this.loginService.onSuccessLogin().map(user => user ? user.name : "");
    this.onError = this.store.select<string>("error");
  }

  logoff() {
    this.loginService.logoff();
    this.router.navigate([""]);
  }
}