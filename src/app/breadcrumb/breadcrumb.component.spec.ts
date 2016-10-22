import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, ApplicationRef, Directive, Input } from "@angular/core";

import { BreadcrumbItem } from "../models";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { BreadcrumbService } from "../services";

@Directive({selector: "[routerLink]"})
class RouterLinkDirective {
    @Input("routerLink") link: string;
}

describe("Breadcrumb component", () => {
    let fixture: ComponentFixture<BreadcrumbComponent>;
    let component: BreadcrumbComponent;
    let service: BreadcrumbService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BreadcrumbComponent, RouterLinkDirective ],
            providers: [
                BreadcrumbService
            ]
        });
        fixture = TestBed.createComponent(BreadcrumbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([ BreadcrumbService ], (breadcrumbService: BreadcrumbService) => {
        service = breadcrumbService;
    }));

    it("should display simple text bredcrumbs", () => {
        // arrange
        let item1 = createBreadcrumbItem("item1");
        let item2 = createBreadcrumbItem("item2");
        service.setCurrentState([item1, item2]);
        fixture.detectChanges();

        // act
        let breadcrumbs = fixture.debugElement.queryAll(By.css(".breadcrumb-item-title")).map(x => x.nativeElement.textContent);
        let routerLiks = fixture.debugElement.queryAll(By.css("a[routerLik]"));
        let clickable = fixture.debugElement.queryAll(By.css(".clickable"));

        // assert
        expect(routerLiks.length).toBe(0);
        expect(clickable.length).toBe(0);
        expect(breadcrumbs[0]).toBe(item1.title);
        expect(breadcrumbs[1]).toBe(item2.title);
    });

    it("should display bredcrumbs with router links", () => {
        // arrange
        let item1 = createBreadcrumbItem("item1", "linkTo");
        let item2 = createBreadcrumbItem("item2");
        service.setCurrentState([item1, item2]);
        fixture.detectChanges();

        // act
        let routerLiks = fixture.debugElement.queryAll(By.css("a[ng-reflect-link]")).map(x => x.nativeElement.attributes["ng-reflect-link"].value);
        let clickable = fixture.debugElement.queryAll(By.css(".clickable"));

        // assert
        expect(clickable.length).toBe(1);
        expect(routerLiks.length).toBe(1);
        expect(routerLiks[0]).toBe(item1.navigationLink);
    });

    let createBreadcrumbItem = function (title: string, link: string = "") {
        let item = new BreadcrumbItem();
        item.title = title;
        item.navigationLink = link;
        return item;
    };
});