import { Injectable, OpaqueToken } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Store } from "@ngrx/Store";

import { AppStore } from "../app.store";

export interface IErrorProcessor {
    processError(error: any, action: string): void;
}

export const ERROR_PROCESSOR = new OpaqueToken("IErrorProcessor");

@Injectable()
export class ErrorProcessor implements IErrorProcessor {
    constructor(private store: Store<AppStore>) {}

    processError(error, action) {
        this.store.dispatch({ type: "ERROR", payload: `Failed to ${action}` });
    }
}