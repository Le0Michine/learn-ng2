import { Directive } from "@angular/core";
import { Validator, Validators, FormControl, NG_VALIDATORS, ValidatorFn, NgForm, FormGroup } from "@angular/forms";

@Directive({
    selector: "[errors]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: ErrorsValidator, multi: true }
    ]
})
export class ErrorsValidator implements Validator {
    validator: (c: FormControl) => any = Validators.nullValidator;

    validate(form: FormGroup): any {
        let errors = [];
        for (let i in form.controls) {
            if (form.controls.hasOwnProperty(i)) {
                let control = form.controls[i];
                if (control.errors) {
                    errors.push({ controlName: i, errors: control.errors });
                }
            }
        }
        return !errors.length
            ? null
            : { errorsCollection: errors };
    }
}