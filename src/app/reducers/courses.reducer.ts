import { ActionReducer, Action } from "@ngrx/Store";

import { Course } from "../models";

export const coursesReducer: ActionReducer<Course[]> = function (state: Course[] = [], action: Action): Course[] {
    switch (action.type) {
        case "COURSES_LOADED":
            return action.payload;
        case "ADD_COURSE":
            return [...state, action.payload];
        case "DELETE_COURSE":
            return state.filter(x => x.id !== action.payload.id);
        case "UPDATE_COURSE":
            return state.map(x => x.id === action.payload.id ? Object.assign({}, x, action.payload) : x);
        default:
            return state;
    };
};