import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[userName]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: UserNameValidator, multi: true }
    ]
})
export class UserNameValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = regExValidator(/^[a-zA-Z]+$/, "userName", "latin letters only"); 
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}