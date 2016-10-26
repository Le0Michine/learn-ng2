import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";
import { StoreModule, Store, combineReducers, Action, provideStore } from "@ngrx/Store";

import { AuthorService } from "./author.service";
import { Author } from "../models";
import { ERROR_PROCESSOR, IErrorProcessor } from "./error-processor.service";
import { ErrorHandlerService } from "./error-handler.service";
import { InMemoryDataService } from "./in-memory-data.service";
import { HttpHelperService } from "./http-helper.service";
import { coursesReducer, courseReducer, authorsReducer } from "../reducers";

class Mock implements IErrorProcessor {
    processError(error, action) {}
}

describe("Author service", () => {
    let authorService: AuthorService;
    let appStore: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                InMemoryWebApiModule.forRoot(InMemoryDataService),
                StoreModule.provideStore({ courses: coursesReducer, authors: authorsReducer, course: courseReducer })
            ],
            providers: [
                AuthorService,
                HttpHelperService,
                ErrorHandlerService,
                { provide: ERROR_PROCESSOR, useClass: Mock }
            ]
        });
    });

    beforeEach(inject([ AuthorService, Store ], (service: AuthorService, store: Store<any>) => {
        authorService = service;
        appStore = store;
    }));

    it("should be possible to get all authors", done => {
        // arrange
        let authorsCout = 12;

        // act
        authorService.getAuthors();
        appStore.select<Author[]>("authors").first()
            .subscribe(result => {
                // assert
                expect(result.length).toBe(authorsCout);
                result.forEach(x => validateAuthor(x));
                done();
            });
    });

    it("should be possible to get author by id", done => {
        // arrange
        authorService.getAuthors();
        appStore.select<Author[]>("authors").first().subscribe(result => {
            let authorToGet = result[0];
            // act
            authorService.getById(authorToGet.id).subscribe(author => {
                // assert
                expect(author).toEqual(authorToGet);
                done();
            });
        });
    });

    it("should return null if id is incorrect", done => {
        // arrange
        // act
        authorService.getById(1232342).subscribe(author => {
            // assert
            expect(author).toBeNull();
            done();
        });
    });

    let validateAuthor = (author: Author) => {
        expect(author.id).toBeGreaterThan(0);
        expect(author.name.length).toBeGreaterThan(0);
    };
});