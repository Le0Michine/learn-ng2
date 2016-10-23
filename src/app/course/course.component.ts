import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

import { Course } from "../models";

@Component({
    selector: "course",
    styleUrls: [
        "./course.component.css"
    ],
    templateUrl: "course.component.html",
})
export class CourseComponent {
    @Input() course: Course;
    @Output() onRemove: EventEmitter<number> = new EventEmitter<number>();
    @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit() { }

    edit() {
        this.onEdit.emit(this.course.id);
    }

    remove() {
        this.onRemove.emit(this.course.id);
    }
}