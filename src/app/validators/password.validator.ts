import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { regExValidator } from "./functions";

@Directive({
    selector: "[password]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
    ]
})
export class PasswordValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    constructor() {
        this.validator = regExValidator(/^[0-9a-zA-Z]+$/, "password", "latin letters or digits only", false); 
    }

    validate(control: FormControl): {[key: string]: any} {
        return this.validator(control);
    }
}