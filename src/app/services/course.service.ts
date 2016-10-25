import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
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

    constructor(private http: Http, private errorHandler: ErrorHandlerService, private httpHelper: HttpHelperService) { }

    getCourses(): Observable<Course[]> {
        return this.httpHelper
            .get(this.coursesUrl, [], "get cources", (list: any[]) => list.map(x => this.toCourseModel(x)));
    }

    getById(id: number): Observable<Course> {
        let url = `${this.coursesUrl}/${id}`;
        return this.httpHelper.get(url, null, `get course with id ${id}`, x => this.toCourseModel(x)) ;
    }

    removeCourse(id: number): Observable<boolean> {
        let url = `${this.coursesUrl}/${id}`;
        return this.httpHelper.delete(url, { headers: this.headers }, `remove course with id ${id}`);
    }

    updateCourse(course: Course): Observable<Course> {
        let url = `${this.coursesUrl}/${course.id}`;
        return this.httpHelper.put(
            url,
            course,
            { headers: this.headers },
            null,
            `unable to update course ${course.name}`,
            (x: any) => this.toCourseModel(x)
        );
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