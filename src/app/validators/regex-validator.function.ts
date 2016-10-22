import { FormControl } from "@angular/forms";

export const regExValidator = (regExp: RegExp, name: string, message: string) => (c: FormControl) => {
    let error = {};
    let value = c.value;
    error[name] = {
        wanted: message,
        actual: value
    };
    return regExp.test(value) && value ? null : error;
};