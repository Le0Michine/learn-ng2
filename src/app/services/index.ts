export * from "./login.service"
export * from "./local-storage.service"
export * from "./in-memory-data.service"
export * from "./course.service"
export * from "./author.service"
export * from "./breadcrumb.service"
export * from "./error-handler.service"
export * from "./http-helper.service"
export * from "./error-processor.service"

import { LoginService } from "./login.service";
import { LocalStorageService } from "./local-storage.service";
import { CourseService } from "./course.service";
import { AuthorService } from "./author.service";
import { BreadcrumbService } from "./breadcrumb.service";
import { ErrorHandlerService } from "./error-handler.service";
import { HttpHelperService } from "./http-helper.service";

export const SERVICES = [
    LoginService,
    LocalStorageService,
    CourseService,
    AuthorService,
    BreadcrumbService,
    ErrorHandlerService,
    HttpHelperService
];