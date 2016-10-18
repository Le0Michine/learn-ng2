import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Course, Author } from "../models";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let authors = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'},
      {id: 21, name: "Mr. O!"},
      {id: 22, name: "Tomato"},
    ];
    let courses: Course[] = [
      { id: 11, name: "JS-1", summary: loremIpsum, duration: 45, creatingDate: new Date("2012-03-04"), authors: [authors[2], authors[1]] },
      { id: 12, name: "JS-2", summary: loremIpsum, duration: 425, creatingDate: new Date("2010-01-15"), authors: [authors[6]] },
      { id: 13, name: "JS-3", summary: loremIpsum, duration: 320, creatingDate: new Date("2015-05-24"), authors: [authors[0], authors[3], authors[6]] },
      { id: 14, name: "JS-4", summary: loremIpsum, duration: 120, creatingDate: new Date("2016-09-13"), authors: [authors[0], authors[3], authors[6]] },
      { id: 14, name: ".net", summary: loremIpsum, duration: 520, creatingDate: new Date("2016-09-13"), authors: [authors[0], authors[3], authors[6]] },
      { id: 14, name: "angularjs", summary: loremIpsum, duration: 720, creatingDate: new Date("2016-09-13"), authors: [authors[0]] },
      { id: 14, name: "angular 2", summary: loremIpsum, duration: 20, creatingDate: new Date("2016-09-13"), authors: [authors[0], authors[3]] }
    ];
    return { courses, authors };
  }
}

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";