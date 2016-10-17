import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[nonEmptyList]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: NonEmptyListValidator, multi: true }
    ]
})
export class NonEmptyListValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = (c: FormControl) => {
            return c.value && c.value.length
                ? null
                : {
                    "selectItems" : {
                        wanted: "you need to select at least one item",
                        actual: "no items selected"
                    }
                };
        };
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}