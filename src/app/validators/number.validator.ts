import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[number]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: NumberValidator, multi: true }
    ]
})
export class NumberValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = regExValidator(/^\d+$/g, "number", "digits only"); 
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}