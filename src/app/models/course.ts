import { Author } from "./author";

export class Course {
    id: number;
    name: string = "new";
    summary: string;
    creatingDate: Date;
    duration: number;
    authors: number[] = [];
}