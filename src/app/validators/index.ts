export * from "./password.validator";
export * from "./user-name.validator";
export * from "./date.validator";
export * from "./number.validator";
export * from "./non-empty-list.validator";
export * from "./date-string.validator";
export * from "./errors.validator";
export * from "./not-empty.validator";

import { NotEmptyValidator } from "./not-empty.validator";
import { NonEmptyListValidator } from "./non-empty-list.validator";
import { ErrorsValidator } from "./errors.validator";
import { DateStringValidator } from "./date-string.validator";
import { NumberValidator } from "./number.validator";
import { DateValidator } from "./date.validator";
import { UserNameValidator } from "./user-name.validator";
import { PasswordValidator } from "./password.validator";

export const VALIDATORS = [
    NotEmptyValidator,
    NonEmptyListValidator,
    ErrorsValidator,
    DateStringValidator,
    NonEmptyListValidator,
    DateValidator,
    UserNameValidator,
    PasswordValidator,
    NumberValidator
];