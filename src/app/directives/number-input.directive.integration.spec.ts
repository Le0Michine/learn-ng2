import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { BreadcrumbItem } from "../models";
import { NumberInputDirective } from "./number-input.directive";

@Component({
    selector: "test-component",
    template: `<input id="testInput" type="text" numberInput>`
})
class TestComponent { }

describe("Breadcrumb component", () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ],
            declarations: [ NumberInputDirective, TestComponent ]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit("should be possible to enter number", done => {
        // arrange
        let inputElement = fixture.debugElement.query(By.css("#testInput")).nativeElement;
        inputElement.focus();

        // act
        inputElement.dispatchEvent(keyDownEvent("4".charCodeAt(0)));
        fixture.detectChanges();

        // assert
        setTimeout(() => {
            expect(inputElement.value).toBe("3");
            done();
        }, 100);
    });

    let keyDownEvent = function(code) {
        let event: any = document.createEvent("Event");
        Object.defineProperty(event, "keyCode", {
            get : () => this.codeValue
        });
        Object.defineProperty(event, "which", {
            get : () => this.codeValue
        });
        event.codeValue = code;

        if (event.initKeyboardEvent) {
            event.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, code, code);
        } else {
            event.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, code, 0);
        }

        return event;
    };
});