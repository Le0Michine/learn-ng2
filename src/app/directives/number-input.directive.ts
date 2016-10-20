import { Directive, ElementRef, HostListener, Renderer, Input, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: "[numberInput]"
})
export class NumberInputDirective {

    constructor(private host: ElementRef) { }

    @HostListener("keypress", ["$event"]) onKeyPress($event: KeyboardEvent) {
        let key = $event.keyCode || $event.which;
        if (!/\d/g.test(String.fromCharCode(key))) {
            $event.preventDefault();
        }
    }
}