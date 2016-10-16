import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { LoginComponent } from "./login";
import { CoursesListComponent } from "./courses";
import { CourseEditComponent } from "./course-edit";

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: "",        component: LoginComponent },
  { path: "login",   component: LoginComponent },
  { path: "courses", component: CoursesListComponent },
  { path: "courses/:id", component: CourseEditComponent },
  { path: '**',      component: NoContent },
];
