import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "modal-dialog",
    templateUrl: "modal-dialog.component.html",
    styleUrls: [
        "./modal-dialog.component.css"
    ]
})
export class ModalDialogComponent {
    @Input() okButtonText: string;
    @Input() cancelButtonText: string;
    @Input() title: string;
    @Input() mainMessage: string;
    @Input() messageDetails: string[];
    @Input() severity: string;
    @Input("width") _width: number;
    @Input("height") _height: number;
    @Input() hideOkButton: boolean;
    @Input() hideCancelButton: boolean;
    @Output() onOkButtonClick = new EventEmitter();
    @Output() onCancelButtonClick = new EventEmitter();

    get okText() {
        return this.okButtonText || "OK";
    }

    get cancelText() {
        return this.cancelButtonText || "Cancel";
    }

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

    get severityClass(): any {
        switch (this.severity) {
            case "primary":
                return {"bg-primary": true};
            case "success":
                return {"bg-success": true};
            case "info":
                return {"bg-info": true};
            case "warning":
            case "warn":
                return {"bg-warning": true};
            case "danger":
            case "error":
                return {"bg-danger": true};
            default:
                return {"bg-default": true};
        }
    }

    clickOk() {
        this.onOkButtonClick.emit();
    }

    clickCancel() {
        this.onCancelButtonClick.emit();
    }
}