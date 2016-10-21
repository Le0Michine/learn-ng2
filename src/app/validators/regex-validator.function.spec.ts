import { inject, TestBed } from "@angular/core/testing";
import { regExValidator } from "./regex-validator.function";

describe("Regex validator", () => {
    it("should return null on valid value", () => {
        // arrange
        let validator = regExValidator(/./, "", "");
        let control: any = {};
        control.value = "str";

        // act
        let result = validator(control);

        // assert
        expect(result).toBe(null);
    });

    it("should return proper error on invalid value", () => {
        // arrange
        let validator = regExValidator(/^\d$/, "errorName", "some message");
        let control: any = {};
        control.value = "A";
        let expectedError = createError("A");

        // act
        let result = validator(control);

        // assert
        expect(result).toEqual(expectedError);
    });

    it("shouldn't accept undefined value for regex /.+/", () => {
        // arrange
        let validator = regExValidator(/^.+$/, "errorName", "some message");
        let control: any = {};
        control.value = undefined;
        let expectedError = createError(undefined);

        // act
        let result = validator(control);

        // assert
        expect(result).toEqual(expectedError);
    });

    it("shouldn't accept null value for regex /.+/", () => {
        // arrange
        let validator = regExValidator(/^.+$/, "errorName", "some message");
        let control: any = {};
        control.value = null;
        let expectedError = createError(null);

        // act
        let result = validator(control);

        // assert
        expect(result).toEqual(expectedError);
    });

    let createError = function (actual, name = "errorName", message = "some message") {
        let error = {};
        error[name] = {
            wanted: message,
            actual: actual
        };
        return error;
    }
});
