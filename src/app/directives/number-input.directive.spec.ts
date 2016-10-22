import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NumberInputDirective } from "./number-input.directive";

describe("Breadcrumb component", () => {
    let directive: NumberInputDirective;

    beforeEach(() => {
        directive = new NumberInputDirective(null);
    });

    it("should be possible to enter number", () => {
        // arrange
        let event: any = keyDownEvent("4".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
    });

    it("should accept event without keyCode", () => {
        // arrange
        let event: any = keyDownEvent("a".charCodeAt(0));
        event.keyCode = undefined;
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("shouldn't be possible to enter not number char", () => {
        // arrange
        let event: any = keyDownEvent("a".charCodeAt(0));
        spyOn(event, "preventDefault");

        // act
        directive.onKeyPress(event);

        // assert
        expect(event.preventDefault).toHaveBeenCalled();
    });

    let keyDownEvent = function(code): any {
        let event: any = {};
        event.keyCode = code;
        event.which = code;
        event.altKey = false;
        event.preventDefault = () => console.log("prevent default");
        return event;
    };
});