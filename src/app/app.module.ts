import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, NG_VALIDATORS } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { removeNgStyles, createNewHosts, createInputTransfer } from "@angularclass/hmr";
import { provideStore, StoreModule } from "@ngrx/Store";

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from "./environment";
import { ROUTES } from "./app.routes";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

// App is our top level component
import { App } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./app.service";
import { SERVICES, InMemoryDataService, ERROR_DISPATCHER, ERROR_PROCESSOR, ErrorProcessor } from "./services";
import { AuthGuard, EditCourseResolver } from "./guards";
import { handleError, HANDLE_ERROR } from "./services/error-handler.function";
import { VALIDATORS } from "./validators";
import { NumberInputDirective, RegexInputDirective } from "./directives";
import { DurationPipe, SafeStylePipe, SafeHtmlPipe } from "./pipes";
import { LoginComponent } from "./login";
import { CoursesListComponent } from "./courses";
import { CourseComponent } from "./course";
import { BreadcrumbComponent } from "./breadcrumb";
import { ModalDialogComponent } from "./modal";
import { ToasterComponent } from "./toaster";
import { CourseEditComponent, DateInputComponent, DurationInputComponent, MultipleItemsSelectorComponent } from "./course-edit";
import { NoContent } from "./no-content";
import { coursesReducer, courseReducer, authorsReducer } from "./reducers";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    LoginComponent,
    NoContent,
    CourseComponent,
    CoursesListComponent,
    CourseEditComponent,
    DurationInputComponent,
    DateInputComponent,
    MultipleItemsSelectorComponent,
    BreadcrumbComponent,
    ModalDialogComponent,
    ToasterComponent,
    ...VALIDATORS,
    DurationPipe,
    SafeStylePipe,
    SafeHtmlPipe,
    NumberInputDirective,
    RegexInputDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1000 }),
    StoreModule.provideStore({ courses: coursesReducer, authors: authorsReducer, course: courseReducer })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ErrorProcessor,
    { provide: ERROR_DISPATCHER, useExisting: ErrorProcessor },
    { provide: ERROR_PROCESSOR, useExisting: ErrorProcessor },
    AuthGuard,
    EditCourseResolver,
    ENV_PROVIDERS,
    APP_PROVIDERS,
    ...SERVICES
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log("HMR store", JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ("restoreInputValues" in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

