import { Injectable } from "@angular/core";
import { CanActivate, Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/Store";

import { CourseService } from "../services";
import { Course } from "../models";
import { AppStore } from "../app.store";

@Injectable()
export class EditCourseResolver implements Resolve<Course | boolean> {

    constructor(private store: Store<AppStore>, private courseService: CourseService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Course | boolean> {
        let id = route.params["id"];
        if (id === "new") {
            return Observable.of(new Course());
        }
        this.courseService.getById(+id);

        return this.store.select<Course>("course").map(result => {
            if (!result) {
                this.router.navigate(["courses"]);
                return false;
            } else {
                return result;
            }
        }).first();
    }
}