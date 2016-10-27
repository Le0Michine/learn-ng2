import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

import { ErrorProcessor } from "./error-processor.service";

@Injectable()
export class ErrorHandlerService {
    constructor(private errorProcessor: ErrorProcessor) { }

    catch<T>(observable: Observable<T>, defaultValue: T, action: string): Observable<T> {
        return observable.catch(error => {
            this.errorProcessor.processError(error, action);
            return Observable.of<T>(defaultValue);
        });
    }
}