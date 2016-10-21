import { inject, TestBed } from "@angular/core/testing";
import { ListToText } from "./list-to-text.pipe";

describe("ListToText pipe", () => {
    let listToText;

    beforeEach(() => {
        listToText = new ListToText();
    });

    it("should correctly transform list to string", () => {
        // arrange
        // act
        let result = listToText.transform(["1", "2", "3"]);

        // assert
        expect(result).toBe("1\n2\n3");
    });
});
