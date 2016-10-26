import { ActionReducer, Action } from "@ngrx/Store";

import { Author } from "../models";

export const authorsReducer: ActionReducer<Author[]> = function (state: Author[] = [], action: Action): Author[] {
    switch (action.type) {
        case "AUTHORS_LOADED":
            return action.payload;
        default:
            return state;
    };
};