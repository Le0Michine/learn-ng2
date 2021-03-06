import { inject, TestBed, async } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";
import { StoreModule, Store, combineReducers, Action, provideStore } from "@ngrx/Store";

import { CourseService } from "./course.service";
import { Course } from "../models";
import { SERVICES, ErrorProcessor, IErrorProcessor } from "./";
import { InMemoryDataService } from "./in-memory-data.service";
import { coursesReducer, courseReducer, authorsReducer } from "../reducers";

class Mock implements IErrorProcessor {
    processError(error, action) {}
}

describe("Course service", () => {
    let courseService: CourseService;
    let appStore: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                InMemoryWebApiModule.forRoot(InMemoryDataService),
                StoreModule.provideStore({ courses: coursesReducer, authors: authorsReducer, course: courseReducer })
            ],
            providers: [
                ...SERVICES,
                { provide: ErrorProcessor, useClass: Mock }
            ]
        });
    });

    beforeEach(inject([ CourseService, Store ], (service: CourseService, store: Store<any>) => {
        courseService = service;
        appStore = store;
    }));

    it("should be possible to get all courses", done => {
        // arrange
        let coursesCout = 7;

        // act
        courseService.getCourses();
        appStore.select<Course[]>("courses").first()
            .subscribe(result => {
                // assert
                expect(result.length).toBe(coursesCout);
                result.forEach(x => validateCourse(x));
                done();
            });
    });

    it("should be possible to get course by id", done => {
        // arrange
        courseService.getCourses();
            appStore.select<Course[]>("courses").first().subscribe(courses => {
            // act
            courseService.getById(courses[0].id);
            appStore.select<Course>("course").first().subscribe(course => {
                // assert
                validateCourse(course);
                expect(course).toEqual(courses[0]);
                done();
            });
        });
    });

    it("should return null if id is incorrect", done => {
        // arrange
        // act
        courseService.getById(123241342);
        appStore.select<Course>("course").first().subscribe(course => {
            // assert
            expect(course).toBeNull();
            done();
        });
    });

    it("should be possible to create new course", done => {
        // arrange
        let course = new Course();
        course.authors = [11, 12];
        course.creatingDate = new Date("2012-12-12");
        course.duration = 1000;
        course.name = "new course";
        course.summary = "course description";

        // act
        courseService.addCourse(course);
        appStore.select<Course[]>("courses").first().subscribe(courses => {
            let createdCourse = courses[courses.length - 1];
            course.id = createdCourse.id;
            // assert
            validateCourse(createdCourse);
            expect(createdCourse).toEqual(course);
            done();
        });
    });

    it("should be possible to update course", done => {
        // arrange
        courseService.getById(11);
        appStore.select<Course>("course").first().subscribe(course => {
            course.duration = 12342;
            course.name = "updated name";
            course.summary = "updated description";
            // act
            courseService.updateCourse(course);
            appStore.select<Course>("course").first().subscribe(updatedCourse => {
                // assert
                validateCourse(updatedCourse);
                expect(updatedCourse).toEqual(course);
                done();
            });
        });
    });

    it("should be possible to remove course", async(() => {
        // arrange
        courseService.getCourses();

        // act
        courseService.removeCourse(11);

        // assert
        appStore.select<Course[]>("courses").first().map(list => list.length).subscribe(count => {
            expect(count).toBe(6);
        });
    }));

    it("shouldn't be possible to remove course by wrong id", done => {
        // arrange
        courseService.getCourses();
        appStore.select<Course[]>("courses").first().map(courses => courses.length).subscribe(oldCount => {
            // act
            courseService.removeCourse(0);
            appStore.select<Course[]>("courses").first().map(courses => courses.length).subscribe(count => {
                // assert
                expect(count).toBe(oldCount);
                done();
            },
            error => {
                fail("shouldn't get here");
            });
        });
    });

    it("should be possible to search course by name", done => {
        // arrange
        // act
        courseService.searchByName(".net");
        appStore.select<Course[]>("courses").map(courses => courses[0]).subscribe(foundCourse => {
            // assert
            validateCourse(foundCourse);
            expect(foundCourse.name).toContain(".net");
            done();
        });
    });

    let validateCourse = (course: Course) => {
        expect(course.id).toBeGreaterThan(0);
        expect(course.authors.length).toBeGreaterThan(0);
        expect(course.duration).toBeGreaterThan(0);
        expect(course.name.length).toBeGreaterThan(0);
        expect(course.summary.length).toBeGreaterThan(0);
        expect(course.creatingDate instanceof Date).toBeTruthy("creatingDate should have Date type");
    };
});