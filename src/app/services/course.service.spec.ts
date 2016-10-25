import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { CourseService } from "./course.service";
import { Course } from "../models";
import { SERVICES, ERROR_PROCESSOR, IErrorProcessor } from "./";
import { InMemoryDataService } from "./in-memory-data.service";

class Mock implements IErrorProcessor {
    processError(error, action) {}
}

describe("Course service", () => {
    let courseService: CourseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                InMemoryWebApiModule.forRoot(InMemoryDataService)
            ],
            providers: [
                ...SERVICES,
                { provide: ERROR_PROCESSOR, useClass: Mock }
            ]
        });
    });

    beforeEach(inject([ CourseService ], (service: CourseService) => {
        courseService = service;
    }));

    it("should be possible to get all courses", done => {
        // arrange
        let coursesCout = 7;

        // act
        courseService.getCourses()
            .subscribe(result => {
                // assert
                expect(result.length).toBe(coursesCout);
                result.forEach(x => validateCourse(x));
                done();
            });
    });

    it("should be possible to get course by id", done => {
        // arrange
        courseService.getCourses().subscribe(courses => {
            // act
            courseService.getById(courses[0].id).subscribe(course => {
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
        courseService.getById(123241342).subscribe(course => {
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
        courseService.addCourse(course).subscribe(createdCourse => {
            course.id = createdCourse.id;
            // assert
            validateCourse(createdCourse);
            expect(createdCourse).toEqual(course);
            done();
        });
    });

    it("should be possible to update course", done => {
        // arrange
        courseService.getById(11).subscribe(course => {
            course.duration = 12342;
            course.name = "updated name";
            course.summary = "updated description";
            // act
            courseService.updateCourse(course).subscribe(() => {
                courseService.getById(11).subscribe(updatedCourse => {
                    // assert
                    validateCourse(updatedCourse);
                    expect(updatedCourse).toEqual(course);
                    done();
                });
            });
        });
    });

    it("should be possible to remove course", done => {
        // arrange
        courseService.getCourses().map(courses => courses.length).subscribe(oldCount => {
            // act
            courseService.removeCourse(11).subscribe(result => {
                courseService.getCourses().map(courses => courses.length).subscribe(count => {
                    // assert
                    expect(count).toBe(oldCount - 1);
                    expect(result).toBe(true);
                    done();
                });
            });
        });
    });

    it("shouldn't be possible to remove course by wrong id", done => {
        // arrange
        courseService.getCourses().map(courses => courses.length).subscribe(oldCount => {
            // act
            courseService.removeCourse(0).subscribe(
                result => {
                    courseService.getCourses().map(courses => courses.length).subscribe(count => {
                        // assert
                        expect(count).toBe(oldCount);
                        expect(result).toBe(false);
                        done();
                    },
                    error => {
                        fail("shouldn't get here");
                    });
                }
            );
        });
    });

    it("should be possible to search course by name", done => {
        // arrange
        // act
        courseService.searchByName(".net").map(courses => courses[0]).subscribe(foundCourse => {
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