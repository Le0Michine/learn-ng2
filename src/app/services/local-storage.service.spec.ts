import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { LocalStorageService } from "./local-storage.service";

describe("LocalStorage service", () => {
    let localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ],
            providers: [
                LocalStorageService
            ]
        });
    });

    beforeEach(inject([ LocalStorageService ], (service: LocalStorageService) => {
        localStorageService = service;
    }));

    it("should be possible to set item", done => {
        // arrange
        let item = { name: "item" };
        let key = "key";

        // act
        localStorageService.set(key, item);

        // assert
        localStorageService.get(key).subscribe(result => {
            expect(result).toEqual(item);
            done();
        });
    });

    it("should be null if item doesn't exist", done => {
        // arrange
        let key = "key1";

        // act
        localStorageService.get(key).subscribe(result => {
            // assert
            expect(result).toBeNull();
            done();
        });
    });

    it("should be default value if item doesn't exist", done => {
        // arrange
        let key = "key";
        let item = { name: "item" };

        // act
        localStorageService.get(key, item).subscribe(result => {
            // assert
            expect(result).toEqual(item);
            done();
        });
    });

    it("should be possible to remove item", done => {
        // arrange
        let key = "key";
        let item = { name: "item" };
        localStorageService.set(key, item);

        // act
        localStorageService.remove(key);

        // assert
        localStorageService.get(key).subscribe(result => {
            expect(result).toBeNull();
            done();
        });
    });

});