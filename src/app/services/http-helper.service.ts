import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/of";

import { Course } from "../models";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable()
export class HttpHelperService {
    constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

    get(url: string) {
        return this.http.get(url).map(r => r.json().data);
    }
}