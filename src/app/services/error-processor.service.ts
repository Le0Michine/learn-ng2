import { Injectable, OpaqueToken } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
export const handleError = (action, error) => console.error("Error occured", action, error);

export interface IErrorDispatcher {
    getError(): Observable<string>;
}

export interface IErrorProcessor {
    processError(error: any, action: string): void;
}

export const ERROR_DISPATCHER = new OpaqueToken("IErrorDispatcher");
export const ERROR_PROCESSOR = new OpaqueToken("IErrorProcessor");

@Injectable()
export class ErrorProcessor implements IErrorDispatcher, IErrorProcessor {
    private onError = new BehaviorSubject<any>(null);

    processError(error, action) {
        this.onError.next(`Failed to ${action}`);
    }

    getError() {
        return this.onError;
    }
}