import { Component, Input, EventEmitter, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/Operator/catch";

import { User, Course, Author } from "../models";
import { LoginService, LocalStorageService, CourseService, BreadcrumbService, AuthorService } from "../services";

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
    showFormErrorsModal: boolean = false;
    showCancelFormConfirmationModal: boolean = false;
    cancelConfirmation: Subject<boolean> = new Subject();
    errors: any[] = [];

    constructor(
        private loginService: LoginService,
        private storage: LocalStorageService,
        private courseService: CourseService,
        private authorService: AuthorService,
        private location: BreadcrumbService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
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
            console.log(form.errors);
            this.collectErrors(form.errors);
            this.showFormErrorsModal = true;
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

    cancel(form: NgForm) {
        if (form.dirty) {
            this.showCancelFormConfirmationModal = true;
            this.cancelConfirmation.first().subscribe(cancel => {
                if (cancel) {
                    this.goToCoursesList();
                } else {
                    this.showCancelFormConfirmationModal = false;
                }
            });
        } else {
            this.goToCoursesList();
        }
    }

    goToCoursesList() {
        this.router.navigate(["courses"]);
    }

    onModalCancel() {
        this.showFormErrorsModal = false;
    }

    collectErrors(formErrors: any): void {
        this.errors = [];
        for (let error of formErrors.errorsCollection) {
            switch (error.controlName) {
                case "name":
                    this.errors.push("name shouldn't be empty");
                    break;
                case "summary":
                    this.errors.push("summary shouldn't be empty");
                    break;
                case "date":
                    this.errors.push("date should have format mm.dd.yyyy");
                    break;
                case "duration":
                    this.errors.push("duration shouldn't be empty");
                    break;
                case "authors":
                    this.errors.push("at least one author should be selected");
                    break;
                default:
                    throw new Error(`unexpected form control name "${error.controlName}"`);
            }
        }
    }
}