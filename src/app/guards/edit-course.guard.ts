import { Injectable } from "@angular/core";
import { CanActivate, Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { CourseService } from "../services";
import { Course } from "../models";

@Injectable()
export class EditCourseResolver implements Resolve<Course | boolean> {

    constructor(private courseService: CourseService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Course | boolean> {
        let id = +route.params["id"];

        return this.courseService.getById(id).map(result => {
            if (!result) {
                this.router.navigate(["courses"]);
                return false;
            } else {
                return result;
            }
        });
    }
}