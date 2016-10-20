import { Component, Input, EventEmitter, OnInit, AfterViewInit, forwardRef, ViewChild, Renderer, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from "../app.service";
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
    @Input() minYear: number = 1000;

    private _value: Date;
    private _stringValue: string;
    private regex = /^\d{0,2}(\.\d{0,2})?(\.\d{0,4})?$/;

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
        if (value !== this._stringValue) {
            this._stringValue = value;
            this.value = this.dateFromString(value);
            this.onChanged(this.value);
        }
    }

    writeValue(value: Date): void {
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
        let dd: number|string =  date.getDate();
        dd = dd < 10 ? "0" + dd : dd;
        let yyyy: number = date.getFullYear();
        return `${MM}.${dd}.${yyyy}`;
    }

    dateFromString(str: string) {
        if (!str) return null;
        let MM = +str.split(".")[0] || null;
        let dd = +str.split(".")[1] || null;
        let yyyy = +str.split(".")[2] || null;
        //return yyyy && yyyy > 999 && dd && MM ? new Date(`${yyyy}-${MM}-${dd}`) : new Date("Invalid date");
        return new Date(Date.parse(str));
    }
}