import { Component, animate, style, trigger, transition, state } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from '../app.service';
import { User, Course } from "../models";
import { LoginService, LoacalStorageService, CourseService, BreadcrumbService } from "../services";

@Component({
    selector: "courses-list",
    styleUrls: [
        "./courses-list.component.css"
    ],
    templateUrl: "courses-list.component.html",
})
export class CoursesListComponent {
    user : User = new User();
    showErrorMessage: boolean = false;
    errorMessage: string = "";
    courses: Course[] = [];

    constructor(
        private loginService: LoginService,
        private storage: LoacalStorageService,
        private courseService: CourseService,
        private location: BreadcrumbService,
        private router: Router) {
    }

    private showLoginRequiredHint: boolean = false;
    private showPasswordRequiredHint: boolean = false;

    ngOnInit() {
        if (!this.loginService.isAuthorized()) {
            this.router.navigate([""]);
        }
        this.location.setCurrentState(["Courses"]);
        this.getCourses();
    }

    getCourses(): void {
        this.courseService.getCourses().subscribe(courses => this.courses = courses);
    }

    add() {
        this.router.navigate(["courses/new"]);
    }

    remove(id: number) {
        this.courseService.removeCourse(id).subscribe(r => {
            this.getCourses();
        });
    }
}