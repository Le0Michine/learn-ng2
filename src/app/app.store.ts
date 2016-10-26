import { Course, Author } from "./models";

export class AppStore {
    courses: Course[];
    authors: Author[];
    course: Course;
}