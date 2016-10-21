import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { AuthorService } from "./author.service";
import { Author } from "../models";
import { InMemoryDataService } from "./in-memory-data.service";

describe("Author service", () => {
    let authorService: AuthorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                InMemoryWebApiModule.forRoot(InMemoryDataService)
            ],
            providers: [
                AuthorService
            ]
        });
    });

    beforeEach(inject([ AuthorService ], (service: AuthorService) => {
        authorService = service;
    }));

    it("should be possible to get all authors", done => {
        // arrange
        let authorsCout = 12;

        // act
        authorService.getAuthors()
            .subscribe(result => {
                // assert
                expect(result.length).toBe(authorsCout);
                result.forEach(x => validateAuthor(x));
                done();
            });
    });

    it("should be possible to get author by id", done => {
        // arrange
        authorService.getAuthors().subscribe(result => {
            let authorToGet = result[0];
            // act
            authorService.getById(authorToGet.id).subscribe(author => {
                // assert
                expect(author).toEqual(authorToGet);
                done();
            });
        });
    });

    let validateAuthor = (author: Author) => {
        expect(author.id).toBeGreaterThan(0);
        expect(author.name.length).toBeGreaterThan(0);
    };
});