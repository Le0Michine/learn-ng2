import { Component, animate, style, trigger, transition, state } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/Operator/catch";
import "rxjs/add/Operator/debounceTime";
import "rxjs/add/Operator/distinctUntilChanged";
import "rxjs/add/Operator/switchMap";

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
    onSearch: BehaviorSubject<string> = new BehaviorSubject("");
    user: User = new User();
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

    ngOnInit() {
        if (!this.loginService.isAuthorized()) {
            this.router.navigate([""]);
        }
        this.location.setCurrentState([{title: "Courses", navigationLink: "courses"}]);
        this.search("");
        this.subscribeOnCourses(this.onSearch
            .debounceTime(300)
            .switchMap(term => term ? this.courseService.searchByName(term) : this.courseService.getCourses()));
    }

    search(term: string) {
        this.onSearch.next(term);
    }

    subscribeOnCourses(observable: Observable<Course[]>) {
        observable.subscribe(courses => this.courses = courses);
    }

    add() {
        this.router.navigate(["courses/new"]);
    }

    remove(id: number) {
        this.courseService.removeCourse(id).subscribe(r => {
            if (r) {
                let i = this.courses.findIndex(x => x.id === id);
                this.courses.splice(i, 1);
            }
        });
    }
}