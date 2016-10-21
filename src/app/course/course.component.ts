import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { Course } from "../models";
import { LoginService, LocalStorageService, CourseService } from "../services";

@Component({
    selector: "course",
    styleUrls: [
        "./course.component.css"
    ],
    templateUrl: "course.component.html",
})
export class CourseComponent {
    @Input() course: Course;
    @Output() onRemove: EventEmitter<number> = new EventEmitter();
    @Output() onEdit: EventEmitter<number> = new EventEmitter();

    constructor(
        private loginService: LoginService,
        private courseService: CourseService,
        private storage: LocalStorageService,
        private router: Router) {
    }

    ngOnInit() { }

    edit() {
        this.onEdit.emit(this.course.id);
    }

    remove() {
        this.onRemove.emit(this.course.id);
    }
}