import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { User, Course, Author } from "../models";
import { LoginService, LoacalStorageService, CourseService, BreadcrumbService, AuthorService } from "../services";

@Component({
    selector: "course-edit",
    styleUrls: [
        "./course-edit.component.css"
    ],
    templateUrl: "course-edit.component.html",
})
export class CourseEditComponent implements OnInit {
    course: Course = new Course();
    authors: Author[];
    showModal: boolean = false;

    constructor(
        private loginService: LoginService,
        private storage: LoacalStorageService,
        private courseService: CourseService,
        private authorService: AuthorService,
        private location: BreadcrumbService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.loginService.isAuthorized()) {
            this.router.navigate([""]);
        }

        this.route.params.subscribe((params: any) => {
            if (params.id !== "new") {
                this.courseService.getById(+params.id).subscribe(course => {
                    this.course = course;
                    this.location.setCurrentState([{title: "Courses", navigationLink: "courses"}, {title: course.name, navigationLink: ""}]);
                });
            } else {
                this.location.setCurrentState([{title: "Courses", navigationLink: "courses"}, {title: "new", navigationLink: ""}]);
                this.course.authors = [];
            }
        });

        this.authorService.getAuthors().subscribe(authors => {
            this.authors = authors.filter(x => this.course.authors.findIndex(y => y.id === x.id) === -1);
        });
    }

    save(form) {
        let formValue = form.value;
        if (!form.valid) {
            this.showModal = true;
            return;
        }

        this.course.authors = formValue.authors;
        this.course.duration = formValue.duration;
        this.course.name = formValue.name;
        this.course.creatingDate = formValue.date;
        this.course.summary = formValue.summary;

        let o = this.course.id ? this.courseService.updateCourse(this.course) : this.courseService.addCourse(this.course);
        o.subscribe(() => this.goToCoursesList());
    }

    goToCoursesList() {
        this.router.navigate(["courses"]);
    }

    onModalCancel() {
        this.showModal = false;
    }
}