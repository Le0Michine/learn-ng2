import { ActionReducer, Action } from "@ngrx/Store";

export const errorReducer: ActionReducer<string> = function (state: string, action: Action): string {
    switch (action.type) {
        case "ERROR":
            return action.payload;
        default:
            return state;
    };
};