import { inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Observable } from "rxjs/Rx";

import { LocalStorageService } from "./local-storage.service";
import { LoginService } from "./login.service";

describe("Login service", () => {
    let loginService: LoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ],
            providers: [
                LocalStorageService,
                LoginService
            ]
        });
    });

    beforeEach(inject([ LoginService ], (service: LoginService) => {
        loginService = service;
    }));

    it("should be possible to login with proper credentials", done => {
        // arrange
        let userName = "q";
        let password = "q";

        // act
        loginService.login(userName, password).subscribe(user => {
            // assert
            expect(user.name).toBe(userName);
            expect(user.password).toBe(password);
            expect(loginService.isAuthorized()).toBe(true);
            done();
        });
    });

    it("should return false authorized status if unauthorized", () => {
        // arrange
        // act
        let status = loginService.isAuthorized();

        // assert
        expect(status).toBe(false);
    });

    it("should be possible to log off", done => {
        // arrange
        loginService.login("q", "q").subscribe(user => {
            // act
            loginService.logoff();
            let status = loginService.isAuthorized();

            // assert
            expect(status).toBe(false);
            done();
        });
    });

    it("shouldn't be possible to login with wrong credentials", done => {
        // arrange
        // act
        loginService.login("wrong", "data").catch(error => Observable.of(false)).subscribe(result => {
            let status = loginService.isAuthorized();
            // assert
            expect(status).toBe(false);
            expect(result).toBe(false);
            done();
        });
    });

    it("should be fired success login event", done => {
        // arrange
        // act
        loginService.login("q", "q").catch(error => Observable.of(false)).subscribe(result => { });

        loginService.onSuccessLogin().filter(x => x !== null).subscribe(user => {
            // assert
            expect(user.name).toBe("q");
            expect(user.password).toBe("q");
            done();
        });
    });

});