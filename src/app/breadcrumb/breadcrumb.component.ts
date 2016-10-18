import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { BreadcrumbService } from "../services";
import { BreadcrumbItem } from "../models";

@Component({
    selector: "breadcrumb",
    templateUrl: "breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent {
    items: Observable<BreadcrumbItem[]>;

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.items = this.breadcrumbService.getCurrentState();
    }
}