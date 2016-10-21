import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[notEmpty]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: NotEmptyValidator, multi: true }
    ]
})
export class NotEmptyValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = regExValidator(/^.+$/, "notEmpty", "field shouldn't be empty", true); 
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}