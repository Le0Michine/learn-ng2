import { Routes, RouterModule } from "@angular/router";
import { NoContent } from "./no-content";
import { LoginComponent } from "./login";
import { CoursesListComponent } from "./courses";
import { CourseEditComponent } from "./course-edit";
import { AuthGuard, EditCourseResolver } from "./guards";

import { DataResolver } from "./app.resolver";

export const ROUTES: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: "courses", component:
    CoursesListComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: "courses/:id",
    component: CourseEditComponent,
    canActivate: [ AuthGuard ],
    resolve: { course: EditCourseResolver }
  },
  {
    path: "**",
    component: NoContent
  }
];
