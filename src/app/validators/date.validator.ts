import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[date]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: DateValidator, multi: true }
    ]
})
export class DateValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = (c: FormControl) => {
            return !c.value || !c.value.getFullYear || isNaN(c.value.getFullYear()) || c.value.getFullYear() < 1000
                ? {
                    "date": {
                        wanted: "date should has format dd.mm.yyyy",
                    }
                }
                : null;
        };
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}