import { inject, TestBed } from "@angular/core/testing";
import { DurationPipe } from "./duration.pipe";

describe("Duration pipe", () => {
    let durationPipe: DurationPipe;

    beforeEach(() => {
        durationPipe = new DurationPipe();
    });

    it("should correctly transform value less than one hour", () => {
        // arrange
        // act
        let result = durationPipe.transform(59);

        // assert
        expect(result).toBe("59min");
    });

    it("should correctly transform value more than one hour", () => {
        // arrange
        // act
        let result = durationPipe.transform(60);

        // assert
        expect(result).toBe("1h 0min");
    });

});
