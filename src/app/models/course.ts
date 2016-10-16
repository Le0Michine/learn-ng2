import { Author } from "./author";

export class Course {
    id: number;
    name: string;
    summary: string;
    creatingDate: Date;
    duration: number;
    authors: Author[];
}