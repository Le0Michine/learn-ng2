import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from '../app.service';
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
                    this.location.setCurrentState(["Courses", course.name]);
                });
            }
            else {
                this.location.setCurrentState(["Courses", "new"]);
                this.course.authors = [];
            }
        });

        this.authorService.getAuthors().subscribe(authors => {
            for (let author of this.course.authors) {
                let i = authors.findIndex(x => x.id === author.id);
                if (i > -1) {
                    authors.splice(i, 1);
                }
            }
            this.authors = authors;
        });
    }

    save(form) {
        let formValue = form.value;
        console.info("form", form, form.valid, form.errors);
        if(!form.valid) {
            console.warn("form invalid", form.errors);
            this.showModal = true;
            return;
        }
        this.course.authors = formValue.authors;
        this.course.duration = formValue.duration;
        this.course.name = formValue.name;
        this.course.creatingDate = formValue.date;
        this.course.summary = formValue.summary;

        if (this.course.id) {
            this.courseService.updateCourse(this.course);
        }
        else {
            this.courseService.addCourse(this.course);
        }

        this.router.navigate(["courses"]);
    }

    cancel() {
        this.router.navigate(["courses"]);
    }

    onModalCancel() {
        this.showModal = false;
    }
}