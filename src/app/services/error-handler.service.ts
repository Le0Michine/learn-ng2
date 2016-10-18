import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

@Injectable()
export class ErrorHandlerService {
    handleError(error: any, action: string) {
        console.error("error ocured when", action, error);
    }

    catch<T>(observable: Observable<T>, defaultValue: T, action: string): Observable<T> {
        return observable.catch(error => {
            this.handleError(error, action);
            return Observable.of<T>(defaultValue);
        });
    }
}