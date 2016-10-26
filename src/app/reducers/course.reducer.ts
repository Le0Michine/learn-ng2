import { ActionReducer, Action } from "@ngrx/Store";

import { Course } from "../models";

export const courseReducer: ActionReducer<Course> = function (state: Course = {} as Course, action: Action): Course {
    switch (action.type) {
        case "COURSE_LOADED":
            return action.payload;
        case "UPDATE_COURSE":
            return action.payload;
        default:
            return state;
    };
};