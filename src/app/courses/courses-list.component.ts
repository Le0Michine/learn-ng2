import { Component, animate, style, trigger, transition, state, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { Store, combineReducers, Action } from "@ngrx/Store";
import "rxjs/add/operator/first";
import "rxjs/add/operator/catch";

import { AppStore } from "../app.store";
import { User, Course } from "../models";
import { LoginService, LocalStorageService, CourseService, BreadcrumbService } from "../services";

@Component({
    selector: "courses-list",
    styleUrls: [
        "./courses-list.component.css"
    ],
    templateUrl: "courses-list.component.html",
})
export class CoursesListComponent implements OnInit {
    user: User = new User();
    errorMessage: string = "";
    courses: Observable<Course[]>;
    subscriptions: Subscription[] = [];

    removeDetails: Observable<string[]>;
    removeDialogClose: Subject<boolean> = new Subject<boolean>();
    removeDialogShow: boolean = false;

    constructor(
        private store: Store<AppStore>,
        private loginService: LoginService,
        private storage: LocalStorageService,
        private courseService: CourseService,
        private location: BreadcrumbService,
        private router: Router) {
    }

    ngOnInit() {
        this.location.setCurrentState([{title: "Courses", navigationLink: "courses"}]);
        this.courseService.getCourses();
        this.courses = this.store.select<Course[]>("courses");
    }

    ngOnDestroy() {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    search(term: string) {
        this.courseService.searchByName(term);
    }

    add() {
        this.router.navigate(["courses/new"]);
    }

    remove(id: number) {
        this.removeDetails = this.courses.map(x => x.filter(c => c.id === id).map(c => c.name));
        this.removeDialogShow = true;
        this.removeDialogClose.first().subscribe(remove => {
            if (remove) {
                this.onRemoveAccept(id);
            }
            this.removeDialogShow = false;
        });
    }

    onRemoveAccept(id: number) {
        this.courseService.removeCourse(id);
    }

    edit(id: number) {
        this.router.navigate(["courses", id]);
    }

    onKeyDown(event: KeyboardEvent, inputValue: string) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            this.search(inputValue);
        }
    }
}