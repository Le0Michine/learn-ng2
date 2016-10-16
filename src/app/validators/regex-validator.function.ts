import { FormControl } from "@angular/forms";

export const regExValidator = (regExp: RegExp, name: string, message: string) => (c: string | FormControl) => {
    let error = {};
    let value = typeof(c) !== "string" ? "" + c.value : "" + c;
    error[name] = {
        wanted: message,
        actual: value
    };
    return value && value.match(regExp)
        ? null
        : error;
}