import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { Course } from "../models";
import { CourseComponent } from "./course.component";
import { DurationPipe } from "../pipes";

describe("Course component", () => {
    let fixture: ComponentFixture<CourseComponent>;
    let component: CourseComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CourseComponent, DurationPipe ]
        });
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should display course info", () => {
        // arrange
        let course = new Course();
        course.creatingDate = new Date("2012-2-12");
        course.name = "test course";
        course.summary = "test summary";
        course.duration = 124;
        component.course = course;
        fixture.detectChanges();

        // act
        let name = fixture.debugElement.query(By.css(".course-name")).nativeElement.textContent;
        let date = fixture.debugElement.query(By.css(".course-date")).nativeElement.textContent;
        let description = fixture.debugElement.query(By.css(".course-description")).nativeElement.textContent;
        let duration = fixture.debugElement.query(By.css(".course-duration")).nativeElement.textContent;

        // assert
        expect(name).toContain(course.name);
        expect(date).toBe("02.12.2012");
        expect(description).toBe(course.summary);
        expect(duration).toBe("2h 4min");
    });

    it("should update course info", () => {
        // arrange
        let course = new Course();
        course.creatingDate = new Date("2012-2-12");
        course.name = "test course";
        course.summary = "test summary";
        course.duration = 124;
        component.course = course;
        fixture.detectChanges();
        course.summary = "new test summary";
        course.name = "new test course";
        fixture.detectChanges();

        // act
        let name = fixture.debugElement.query(By.css(".course-name")).nativeElement.textContent;
        let description = fixture.debugElement.query(By.css(".course-description")).nativeElement.textContent;

        // assert
        expect(name).toContain(course.name);
        expect(description).toBe(course.summary);
    });

    it("should rise on remove event", done => {
        // arrange
        component.course = new Course();
        fixture.detectChanges();

        let onclick = component.onRemove.subscribe(() => {
            // assert
            done();
        });

        // act
        let name = fixture.debugElement.query(By.css(".remove-course-btn")).nativeElement.click();
    });

    it("should rise on edit event", done => {
        // arrange
        component.course = new Course();
        fixture.detectChanges();

        let onclick = component.onEdit.subscribe(() => {
            // assert
            done();
        });

        // act
        let name = fixture.debugElement.query(By.css(".edit-course-btn")).nativeElement.click();
    });
});