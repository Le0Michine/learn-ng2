import { Directive, ElementRef, HostListener, Renderer, Input, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: "[dateInput]"
})
export class DateInputDirective {
    @Output("onEvent") event = new EventEmitter();
    @Input("initialValue") private lastValidValue: string = "";

    constructor(private host: ElementRef, private renderer: Renderer) {
        this.lastValidValue = "";
    }

    @HostListener("input") onInput(event) {
        this.updateValue();
    }

    private updateValue() {
        if (!this.checkValue(this.host.nativeElement.value)) {
            this.resetToValidValue();
        }
    }

    private checkValue(value: string) {
        if (!value || value.match(/^\d{0,2}(\.\d{0,2})?(\.\d{0,4})?$/g)) {
            this.lastValidValue = value;
            return true;
        }
        return false;
    }

    private resetToValidValue() {
        this.renderer.setElementProperty(this.host.nativeElement, "value", this.lastValidValue);
        this.event.emit("reset to " + this.lastValidValue);
    }
}