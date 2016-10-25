import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concatMap";
import "rxjs/add/observable/of";

import { Course } from "../models";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable()
export class HttpHelperService {
    constructor(private http: Http, private errorHandler: ErrorHandlerService) { }

    get<T>(
        url: string,
        defaultValue: T = null,
        errorMessage: string = "failed to perform GET request",
        mapToModel: (x: any) => T = x => x): Observable<T> {
            return this.errorHandler.catch(this.http.get(url).map(r => r ? this.mapToJson(r) : r), defaultValue, errorMessage)
                .map(data => data ? mapToModel(data) : data);
    }

    delete<T>(
        url: string,
        options: RequestOptionsArgs = null,
        errorMessage: string = "failed to perform DELETE request"): Observable<boolean> {
            return this.errorHandler.catch(this.http.delete(url, options).map(r => r.ok ? true : false), false, errorMessage);
    }

    put<T>(
        url: string,
        body: T,
        options: RequestOptionsArgs = null,
        defaultValue: T = null,
        errorMessage: string = "failed to perform PUT request",
        mapToModel: (x: any) => T = x => x): Observable<T> {
            return this.errorHandler.catch(
                this.http.put(url, JSON.stringify(body), options).map(r => this.mapToJson(r)).map(data => mapToModel(data)),
                defaultValue,
                errorMessage);
    }

    post<T>(
        url: string,
        body: T,
        options: RequestOptionsArgs = null,
        defaultValue: T = null,
        errorMessage: string = "failed to perform POST request",
        mapToModel: (x: any) => T = x => x): Observable<T> {
            return this.errorHandler.catch(
                this.http.post(url, body, options).map(r => this.mapToJson(r)).map(data => mapToModel(data)),
                defaultValue,
                errorMessage);
    }

    private mapToJson(response: any) {
        return response && response.json ? response.json().data : response;
    }
}