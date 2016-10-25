import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

import { ERROR_PROCESSOR, IErrorProcessor } from "./error-processor.service";

@Injectable()
export class ErrorHandlerService {
    constructor(@Inject(ERROR_PROCESSOR) private errorProcessor: IErrorProcessor) { }

    catch<T>(observable: Observable<T>, defaultValue: T, action: string): Observable<T> {
        return observable.catch(error => {
            this.errorProcessor.processError(error, action);
            return Observable.of<T>(defaultValue);
        });
    }
}