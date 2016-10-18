import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { BreadcrumbItem } from "../models";

@Injectable()
export class BreadcrumbService {
    private currentState: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject([]);

    public setCurrentState(place: BreadcrumbItem[]): void {
        this.currentState.next(place);
    }

    public getCurrentState(): Observable<BreadcrumbItem[]> {
        return this.currentState;
    }
}