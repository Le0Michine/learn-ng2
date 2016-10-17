import { Component, Input, EventEmitter, OnInit, forwardRef, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from '../app.service';
import { User, Course } from "../models";
import { LoginService, LoacalStorageService, CourseService, NavigationService } from "../services";

export const DURATION_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationInputComponent),
    multi: true
};

const nullCallback = (arg?: any) => {};

@Component({
    selector: "duration-input",
    templateUrl: "duration-input.component.html",
    providers: [DURATION_INPUT_VALUE_ACCESSOR]
})
export class DurationInputComponent implements ControlValueAccessor {
    @ViewChild("dateInput") input: ElementRef;
    private _value: string;

    private onTouched: () => void = nullCallback;
    private onChanged: (_: any) => void = nullCallback;

    constructor(private renderer: Renderer) { }

    get value(): string {
        return "" + this._value;
    }

    set value(value: string) {
        if (value !== this._value && (!value || value.toString().match(/^\d{0,15}$/g))) {
            this._value = value;
            this.onChanged(this.value);
        }
        else {
            this.updateInput();
        }
    }

    updateInput() {
        this.renderer.setElementProperty(this.input.nativeElement, "value", this.value);
    }

    writeValue(value: string): void {
        if (!value || value !== this.value || value.toString() !== this.value.toString()) {
            this.value = value || "0";
        }
    }

    registerOnChange(callback: (_: any) => void): void {
        this.onChanged = callback;
    }

    registerOnTouched(callback: () => void): void {
        this.onTouched = callback;
    }

    onBlur() {
        this.onTouched();
    }
}