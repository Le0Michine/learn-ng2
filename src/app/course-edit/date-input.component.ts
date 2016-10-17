import { Component, Input, EventEmitter, OnInit, AfterViewInit, forwardRef, ViewChild, Renderer, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from '../app.service';
import { User, Course } from "../models";
import { LoginService, LoacalStorageService, CourseService, BreadcrumbService } from "../services";

export const DATE_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
};

const nullCallback = (arg?: any) => {};

@Component({
    selector: "date-input",
    templateUrl: "date-input.component.html",
    providers: [DATE_INPUT_VALUE_ACCESSOR]
})
export class DateInputComponent implements ControlValueAccessor {
    @ViewChild("dateInput") input: ElementRef;
    @Input() minYear: number = 1000;

    private _value: Date;
    private _stringValue: string;

    private onTouched: () => void = nullCallback;
    private onChanged: (_: any) => void = nullCallback;

    constructor(private renderer: Renderer) { }

    get value() {
        return this._value;
    }

    set value(value: Date) {
        this._value = value;
    }

    get stringValue() {
        return this._stringValue;
    }

    set stringValue(value: string) {
        if (value !== this._stringValue && (!value || value.match(/^\d{0,2}(\.\d{0,2})?(\.\d{0,4})?$/g))) {
            this._stringValue = value;
            this.value = this.dateFromString(value);
            this.onChanged(this.value);
        }
        else {
            this.updateInput();
        }
    }

    updateInput() {
        this.renderer.setElementProperty(this.input.nativeElement, "value", this.stringValue);
    }

    writeValue(value: Date|string): void {
        if (typeof(value) === "string") {
            value = new Date(value);
        }
        if (!value || value !== this.value || value.toString() !== this.value.toString()) {
            this.value = value;
            this.stringValue = this.dateToString(value);
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

    dateToString(date: Date) {
        if (!date) return "";
        let MM: number|string = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let dd: number|string =  date.getDay() + 1;
        dd = dd < 10 ? "0" + dd : dd;
        let yyyy: number = date.getFullYear();
        return `${MM}.${dd}.${yyyy}`;
    }

    dateFromString(str: string) {
        if (!str) return null;
        let MM = +str.split(".")[0] || 1;
        let dd = +str.split(".")[1] || 0;
        let yyyy = +str.split(".")[2] || 0;
        return new Date(`${yyyy}-${MM}-${dd}`);
    }
}