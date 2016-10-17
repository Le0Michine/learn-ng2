import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "modal-dialog",
    templateUrl: "modal-dialog.component.html",
    styleUrls: [
        "./modal-dialog.component.css"
    ]
})
export class ModalDialogComponent {
    @Input() okButtonText;
    @Input() cancelButtonText;
    @Input("width") _width;
    @Input("height") _height;
    @Input() hideOkButton;
    @Input() hideCancelButton;
    @Output() onOkButtonClick = new EventEmitter();
    @Output() onCancelButtonClick = new EventEmitter();

    get width() {
        return (this._width || 400) + "px";
    }

    get height() {
        return (this._height || 300) + "px";
    }

    get left() {
        return `calc(50% - ${this._width || 300 / 2}px)`;
    }

    get top() {
        return `calc(50% - ${this._height || 400 / 2}px)`;
    }

    clickOk() {
        this.onOkButtonClick.emit();
    }

    clickCancel() {
        this.onCancelButtonClick.emit();
    }
}