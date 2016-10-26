import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Store, combineReducers, Action } from "@ngrx/Store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/of";

import { Course } from "../models";
import { HttpHelperService } from "./http-helper.service";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable()
export class CourseService {
    private headers = new Headers({"Content-Type": "application/json"});
    private coursesUrl = "/app/courses";

    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpHelperService,
        private store: Store<any>) { }

    getCourses(): void {
        this.http
            .get(this.coursesUrl, [], "get cources", (list: any[]) => list.map(x => this.toCourseModel(x)))
            .subscribe(courses => this.store.dispatch({ type: "COURSES_LOADED", payload: courses }));
    }

    getById(id: number): void {
        let url = `${this.coursesUrl}/${id}`;
        this.http.get(url, null, `get course with id ${id}`, x => this.toCourseModel(x))
            .subscribe(course => this.store.dispatch({ type: "COURSE_LOADED", payload: course }));
    }

    removeCourse(id: number): void {
        let url = `${this.coursesUrl}/${id}`;
        this.http.delete(url, { headers: this.headers }, `remove course with id ${id}`)
            .subscribe(r => {
                if (r) {
                    this.store.dispatch({ type: "DELETE_COURSE", payload: { id: id } });
                }
            });
    }

    updateCourse(course: Course): void {
        let url = `${this.coursesUrl}/${course.id}`;
        this.http.put(
            url,
            course,
            { headers: this.headers },
            null,
            `update course ${course.name}`,
            (x: any) => this.toCourseModel(x)
        )
        .subscribe(c => {
            if (c) {
                this.store.dispatch({ type: "UPDATE_COURSE", payload: c });
            }
        });
    }

    addCourse(course: Course): void {
        this.http.post(
            this.coursesUrl,
            course,
            { headers: this.headers },
            null,
            `add course ${JSON.stringify(course)}`,
            r => this.toCourseModel(r)
        )
        .subscribe(c => this.store.dispatch({ type: "ADD_COURSE", payload: c }));
    }

    searchByName(term: string): void {
        this.http.get(
            `${this.coursesUrl}?name=${term}`,
            [],
            `search course by name ${term}`,
            (list: any) => list.map(x => this.toCourseModel(x))
        )
        .subscribe(courses => this.store.dispatch({ type: "COURSES_LOADED", payload: courses }));
    }

    private toCourseModel(json) {
        let course = new Course();
        course.authors = json.authors;
        course.id = +json.id;
        course.creatingDate = new Date(json.creatingDate);
        course.duration = +json.duration;
        course.name = json.name;
        course.summary = json.summary;
        return course;
    }
}