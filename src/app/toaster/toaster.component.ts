import { Component, Input, animate, state, style, trigger, transition } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/first";

@Component({
    selector: "toaster",
    templateUrl: "toaster.component.html",
    styleUrls: [ "toaster.component.css" ],
    animations: [
        trigger("toasterInOut", [
            transition(":enter", [
                style({ transform: "translateX(200%)" }),
                animate(200)
            ]),
            transition(":leave", [
                animate(200, style({ "opacity": 0 }))
            ])
        ])
    ]
})
export class ToasterComponent {
    @Input() showInterval: number;
    @Input() onMessage: Observable<string>;

    showMessage: boolean = false;

    ngOnInit() {
        this.onMessage.subscribe(message => {
            if (message) {
                this.showMessage = true;
                Observable.interval(this.showInterval * 1000).first().subscribe(() => { this.showMessage = false; });
            }
        });
    }
}