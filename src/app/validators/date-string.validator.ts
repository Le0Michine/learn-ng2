import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[dateString]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: DateStringValidator, multi: true }
    ]
})
export class DateStringValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = regExValidator(/^\d\d.\d\d.\d\d\d\d$/g, "date", "date should has format dd.mm.yyyy");
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}