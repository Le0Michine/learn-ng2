import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable()
export class LocalStorageService {
    set(key: string, obj: any) {
        window.localStorage.setItem(key, JSON.stringify(obj));
    }

    get(key: string, defaultValue: any = null): Observable<any> {
        return Observable.of(JSON.parse(window.localStorage.getItem(key)) || defaultValue);
    }

    remove(key: string): void {
        window.localStorage.removeItem(key);
    }
}