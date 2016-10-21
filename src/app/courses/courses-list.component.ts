import { Component, animate, style, trigger, transition, state } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/Operator/first";
import "rxjs/add/Operator/catch";
import "rxjs/add/Operator/debounceTime";
import "rxjs/add/Operator/distinctUntilChanged";
import "rxjs/add/Operator/switchMap";

import { User, Course } from "../models";
import { LoginService, LocalStorageService, CourseService, BreadcrumbService } from "../services";

@Component({
    selector: "courses-list",
    styleUrls: [
        "./courses-list.component.css"
    ],
    templateUrl: "courses-list.component.html",
})
export class CoursesListComponent {
    user: User = new User();
    errorMessage: string = "";
    courses: Course[] = [];

    removeDetails: string[] = [];
    removeDialogClose: Subject<boolean> = new Subject();
    removeDialogShow: boolean = false;

    constructor(
        private loginService: LoginService,
        private storage: LocalStorageService,
        private courseService: CourseService,
        private location: BreadcrumbService,
        private router: Router) {
    }

    ngOnInit() {
        this.location.setCurrentState([{title: "Courses", navigationLink: "courses"}]);
        this.courseService.getCourses().subscribe(courses => this.courses = courses);
    }

    search(term: string) {
        this.courseService.searchByName(term).subscribe(courses => this.courses = courses);
    }

    subscribeOnCourses(observable: Observable<Course[]>) {
        observable.subscribe(courses => {
            this.courses = courses;
        });
    }

    add() {
        this.router.navigate(["courses/new"]);
    }

    remove(id: number) {
        this.removeDetails = [this.courses.find(x => x.id === id).name];
        this.removeDialogShow = true;
        this.removeDialogClose.first().subscribe(remove => {
            if (remove) {
                this.onRemoveAccept(id);
            }
            this.removeDialogShow = false;
        })
    }

    onRemoveAccept(id: number) {
        this.courseService.removeCourse(id).subscribe(r => {
            if (r) {
                let i = this.courses.findIndex(x => x.id === id);
                this.courses.splice(i, 1);
            }
        });
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