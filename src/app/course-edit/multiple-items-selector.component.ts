import { Component, Input, EventEmitter, OnInit, forwardRef, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/catch";

import { AppState } from '../app.service';
import { User, Course } from "../models";
import { LoginService, LoacalStorageService, CourseService, NavigationService } from "../services";

export const AUTHOR_SELECTOR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleItemsSelectorComponent),
    multi: true
};

const nullCallback = (arg?: any) => {};

@Component({
    selector: "multiple-items-selector",
    styleUrls: [
        "./multiple-items-selector.component.css"
    ],
    templateUrl: "multiple-items-selector.component.html",
    providers: [AUTHOR_SELECTOR_VALUE_ACCESSOR]
})
export class MultipleItemsSelectorComponent implements ControlValueAccessor {
    private _items: any[] = [];
    @Input() itemsPool: any[] = [];

    selectedItem: number;
    selectedItemFromPool: number;

    private onTouched: () => void = nullCallback;
    private onChanged: (_: any) => void = nullCallback;

    constructor(private renderer: Renderer) { }

    get value(): any[] {
        return this._items;
    }

    set value(value: any[]) {
        this._items = value || [];
        if (this.value.length) {
            this.selectedItem = 0;
        }
        else {
            this.selectedItem = -1;
        }
        this.onChanged(value);
    }

    writeValue(value: any[]): void {
        this.value = value;
    }

    registerOnChange(callback: (_: any) => void): void {
        this.onChanged = callback;
    }

    registerOnTouched(callback: () => void): void {
        this.onTouched = callback;
    }

    selectItem(i: number) {
        this.selectedItemFromPool = -1;
        this.selectedItem = i;
    }

    selectItemFromPool(i: number) {
        this.selectedItemFromPool = i;
        this.selectedItem = -1;
    }

    moveToPool() {
        if (this.selectedItem > -1) {
            this.itemsPool.push(this.value[this.selectedItem]);
            this.value.splice(this.selectedItem, 1);
            this.onChanged(this.value);
            this.onBlur();
        }
    }

    moveToSelected() {
        if (this.selectedItemFromPool > -1) {
            this.value.push(this.itemsPool[this.selectedItemFromPool]);
            this.itemsPool.splice(this.selectedItemFromPool, 1);
            this.onChanged(this.value);
            this.onBlur();
        }
    }

    onBlur() {
        this.onTouched();
    }
}