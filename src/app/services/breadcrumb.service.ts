import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
export class BreadcrumbService {
    private currentState: BehaviorSubject<string[]> = new BehaviorSubject([]);

    public setCurrentState(place: string[]): void {
        this.currentState.next(place);
    }

    public getCurrentState(): Observable<string[]> {
        return this.currentState;
    }
}