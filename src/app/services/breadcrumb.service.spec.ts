import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { BreadcrumbService } from "./breadcrumb.service";
import { BreadcrumbItem } from "../models";
import { InMemoryDataService } from "./in-memory-data.service";

describe("Breadcrumb service", () => {
    let breadcrumbService: BreadcrumbService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                InMemoryWebApiModule.forRoot(InMemoryDataService)
            ],
            providers: [
                BreadcrumbService
            ]
        });
    });

    beforeEach(inject([ BreadcrumbService ], (service: BreadcrumbService) => {
        breadcrumbService = service;
    }));

    it("should be possible to set current state", done => {
        // arrange
        let state: BreadcrumbItem[] = [{ navigationLink: "", title: "newState" }];

        // act
        breadcrumbService.setCurrentState(state);

        breadcrumbService.getCurrentState().subscribe(newState => {
            // assert
            expect(newState).toEqual(state);
            done();
        });

    });
});