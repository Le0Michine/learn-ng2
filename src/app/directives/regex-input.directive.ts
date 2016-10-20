import { Directive, ElementRef, HostListener, Renderer, Input, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: "[regexInput]"
})
export class RegexInputDirective {
    _regex: RegExp;

    @Input("regexInput")
    set regex(value: RegExp | string) {
        if (typeof(value) === "string") {
            this._regex = new RegExp(value);
        } else {
            this._regex = value;
        }
    }

    constructor(private host: ElementRef, private renderer: Renderer) {
        if (!("value" in host.nativeElement)) {
            throw new Error("Directive RegexInput is compatibale with input elements only");
        }
    }

    @HostListener("keypress", ["$event"]) onInput($event: KeyboardEvent) {
        let char = String.fromCharCode($event.keyCode || $event.which);
        let currentValue = this.host.nativeElement.value;
        if (!this._regex.test(currentValue + char)) {
            event.preventDefault();
        }
    }
}