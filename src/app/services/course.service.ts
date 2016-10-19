import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/of";

import { Course } from "../models";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable()
export class CourseService {
    private headers = new Headers({"Content-Type": "application/json"});
    private coursesUrl = "/app/courses";

    constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

    getCourses(): Observable<Course[]> {
        return this.http.get(this.coursesUrl).map(response => response.json().data as Course[]);
    }

    getById(id: number) {
        let url = `${this.coursesUrl}/${id}`;
        return this.errorHandler.catch(this.http.get(url)
            .map(response => response.json().data), [], `get by id ${id}`);
    }

    removeCourse(id: number) {
        let url = `${this.coursesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers }).concatMap(response => {
            if (response.ok) {
                return Observable.of(null);
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

    addCourse(course: Course) {
        return this.errorHandler
            .catch(this.http.post(this.coursesUrl, JSON.stringify(course), {headers: this.headers})
                .map(r => r.json().data), [], `add course ${JSON.stringify(course)}`);
    }

    searchByName(term: string): Observable<Course[]> {
        return this.errorHandler.catch(this.http.get(`${this.coursesUrl}?name=${term}`)
            .map(r => r.json().data), [], `search course by name ${term}`);
    }

    searchByDate(term: string): Observable<Course[]> {
        return this.errorHandler.catch(this.http.get(`${this.coursesUrl}?date=${term}`)
            .map(r => r.json().data), [], `search course by date ${term}`);
    }
}