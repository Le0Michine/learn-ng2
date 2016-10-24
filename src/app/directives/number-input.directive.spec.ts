import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NumberInputDirective } from "./number-input.directive";

@Component({
    selector: "test-component",
    template: `<input id="testInput" type="text" numberInput>`
})
class TestComponent { }

describe("NumberInput directive", () => {
    let directive: NumberInputDirective;

    beforeEach(() => {
        directive = new NumberInputDirective(null);
    });

    it("should be possible to enter number", () => {
        // arrange
        let event: any = keyPressEvent("4".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
    });

    it("should accept event without keyCode", () => {
        // arrange
        let event: any = keyPressEvent("a".charCodeAt(0));
        event.keyCode = undefined;
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("shouldn't be possible to enter not number char", () => {
        // arrange
        let event: any = keyPressEvent("a".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("should process and prevent dispatched event with no number character", () => {
        // arrange
        let inputElement = configureTestComponent();
        let event = keyPressEvent("q".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        inputElement.dispatchEvent(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("should process and NOT to prevent dispatched event with number character", () => {
        // arrange
        let inputElement = configureTestComponent();
        let event = keyPressEvent("0".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        inputElement.dispatchEvent(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
    });

    let configureTestComponent = function () {
        TestBed.configureTestingModule({
            imports: [ ],
            declarations: [ NumberInputDirective, TestComponent ]
        });
        let fixture = TestBed.createComponent(TestComponent);
        return fixture.debugElement.query(By.css("#testInput")).nativeElement;
    };

    let keyPressEvent = function(code): Event {
        let event: any = new Event("keypress");
        event.keyCode = code;
        event.which = code;
        return event;
    };
});