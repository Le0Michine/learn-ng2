import { inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MultipleItemsSelectorComponent } from "./multiple-items-selector.component";

@Component({
    selector: "test-component",
    template: `<multiple-items-selector name="authors" [(ngModel)]="selectedItems" [itemsPool]="itemsPool"></multiple-items-selector>`
})
class TestComponent {
    itemsPool: any[];
    selectedItems: any[] = [{name: "item10"}];
}

describe("MultipleItemsSelector component", () => {
    let fixture: ComponentFixture<MultipleItemsSelectorComponent>;
    let component: MultipleItemsSelectorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ MultipleItemsSelectorComponent, TestComponent ]
        });
        fixture = TestBed.createComponent(MultipleItemsSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should render items available to select", () => {
        // arrange
        component.itemsPool = createPool();
        fixture.detectChanges();

        // act
        let itemsInPool = getItemsInPool(fixture);
        let selectedItems = getSelectedItems(fixture);

        // assert
        expect(selectedItems.length).toBe(0);
        expect(itemsInPool.length).toBe(5);
    });

    it("should point on the first item in pool if no items are selected", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue(null);
        fixture.detectChanges();

        // act
        let highlitedItems = fixture.debugElement.queryAll(By.css("div.selected"));

        // assert
        expect(highlitedItems.length).toBe(1);
        expect(highlitedItems[0].nativeElement.textContent).toBe("item1");
    });

    it("should point on the first item in selected items list", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue([{name: "item10"}]);
        fixture.detectChanges();

        // act
        let highlitedItems = fixture.debugElement.queryAll(By.css("div.selected"));

        // assert
    });

    it("should highlite item in pool by click", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue([{name: "item10"}]);
        fixture.detectChanges();

        // act
        getItemsInPool(fixture)[3].nativeElement.click();
        fixture.detectChanges();
        let highlitedItems = fixture.debugElement.queryAll(By.css("div.selected"));

        // assert
        expect(highlitedItems.length).toBe(1);
        expect(highlitedItems[0].nativeElement.textContent).toBe("item4");
    });

    it("should highlite item in selected list by click", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue([{name: "item10"}, {name: "item11"}]);
        fixture.detectChanges();

        // act
        getSelectedItems(fixture)[1].nativeElement.click();
        fixture.detectChanges();
        let highlitedItems = fixture.debugElement.queryAll(By.css("div.selected"));

        // assert
        expect(highlitedItems.length).toBe(1);
        expect(highlitedItems[0].nativeElement.textContent).toBe("item11");
    });

    it("should move item to pool by click on right arrow", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue([{name: "item10"}]);
        fixture.detectChanges();
        let button = getRightArrow(fixture);

        // act
        button.nativeElement.click();
        fixture.detectChanges();
        let itemsInPool = getItemsInPool(fixture);
        let selectedItems = getSelectedItems(fixture);

        // assert
        expect(itemsInPool.length).toBe(6);
        expect(selectedItems.length).toBe(0);
    });

    it("should move item to selected list by click on left arrow", () => {
        // arrange
        component.itemsPool = createPool();
        component.writeValue([{name: "item10"}]);
        fixture.detectChanges();
        let button = getLeftArrow(fixture);
        getItemsInPool(fixture)[0].nativeElement.click();
        fixture.detectChanges();

        // act
        button.nativeElement.click();
        fixture.detectChanges();
        let itemsInPool = getItemsInPool(fixture);
        let selectedItems = getSelectedItems(fixture);

        // assert
        expect(itemsInPool.length).toBe(4);
        expect(selectedItems.length).toBe(2);
    });

    xit("should be possible to fill component using ngModel", () => {
        // arrange
        let hostFixture = TestBed.createComponent(TestComponent);
        // hostFixture.componentInstance.selectedItems = [{name: "item10"}];
        let innerComponent = hostFixture.debugElement.query(By.css("multiple-items-selector")).nativeElement;
        hostFixture.detectChanges();

        // act
        hostFixture.componentInstance.itemsPool = createPool();
        hostFixture.detectChanges();
        let itemsPool = getItemsInPool(hostFixture);
        let selectedItems = getSelectedItems(hostFixture);

        // assert
        expect(itemsPool.length).toBe(5);
        expect(selectedItems.length).toBe(1);
    });

    let getLeftArrow = function(testFixture: ComponentFixture<TestComponent | MultipleItemsSelectorComponent>) {
        return testFixture.debugElement.queryAll(By.css("a"))[1];
    };

    let getRightArrow = function(testFixture: ComponentFixture<TestComponent | MultipleItemsSelectorComponent>) {
        return testFixture.debugElement.queryAll(By.css("a"))[0];
    };

    let getSelectedItems = function(testFixture: ComponentFixture<TestComponent | MultipleItemsSelectorComponent>) {
        return testFixture.debugElement.queryAll(By.css("div[tabindex='1']>div"));
    };

    let getItemsInPool = function(testFixture: ComponentFixture<TestComponent | MultipleItemsSelectorComponent>) {
        return testFixture.debugElement.queryAll(By.css("div[tabindex='2']>div"));
    };

    let createPool = function() {
        return [ {name: "item1"}, {name: "item2"}, {name: "item3"}, {name: "item4"}, {name: "item5"} ];
    };
});