import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpHelperService } from "./http-helper.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/of";

import { Course } from "../models";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable()
export class CourseService {
    private headers = new Headers({"Content-Type": "application/json"});
    private coursesUrl = "/app/courses";

    constructor(private http: Http, private errorHandler: ErrorHandlerService, private httpHelper: HttpHelperService) { }

    getCourses(): Observable<Course[]> {
        return this.httpHelper.get(this.coursesUrl).map(items => items.map(x => this.toCourseModel(x)));
    }

    getById(id: number) {
        let url = `${this.coursesUrl}/${id}`;
        return this.errorHandler.catch(this.httpHelper.get(url)
            .map(x => this.toCourseModel(x)), null, `get by id ${id}`);
    }

    removeCourse(id: number) {
        let url = `${this.coursesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers }).catch(error => Observable.of(error)).concatMap(response => {
            if (response.ok) {
                return Observable.of(true);
            } else {
                return Observable.throw({
                    type: "bad-response",
                    message: `unable to remove course ${id}, response status: ${response.status} ${response.statusText}`
                });
            }
        });
    }

    updateCourse(course: Course) {
        let url = `${this.coursesUrl}/${course.id}`;
        return this.http.put(url, JSON.stringify(course), {headers: this.headers})
            .map(response => course);
    }

    addCourse(course: Course): Observable<Course> {
        return this.errorHandler
            .catch(this.http.post(this.coursesUrl, JSON.stringify(course), {headers: this.headers})
                .map(r => this.toCourseModel(r.json().data)), null, `add course ${JSON.stringify(course)}`);
    }

    searchByName(term: string): Observable<Course[]> {
        return this.errorHandler.catch(this.http.get(`${this.coursesUrl}?name=${term}`)
            .map(r => r.json().data.map(x => this.toCourseModel(x))), [], `search course by name ${term}`);
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