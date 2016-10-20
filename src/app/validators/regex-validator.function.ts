import { FormControl } from "@angular/forms";

export const regExValidator = (regExp: RegExp, name: string, message: string, nonEmptyString: boolean = false) => (c: string | FormControl) => {
    let error = {};
    let value = typeof(c) !== "string" ? "" + c.value : "" + c;
    error[name] = {
        wanted: message,
        actual: value
    };
    return regExp.test(value) && !nonEmptyString ? null : error;
}