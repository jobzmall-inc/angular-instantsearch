/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var NgAisPanel = /** @class */ (function () {
    function NgAisPanel() {
    }
    NgAisPanel.decorators = [
        { type: Component, args: [{
                    selector: 'ais-panel',
                    template: "\n    <div class=\"ais-Panel\">\n      <div *ngIf=\"header\" class=\"ais-Panel-header\">\n        {{header}}\n      </div>\n\n      <div class=\"ais-Panel-body\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"footer\" class=\"ais-Panel-footer\">\n        {{footer}}\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisPanel.propDecorators = {
        header: [{ type: Input }],
        footer: [{ type: Input }]
    };
    return NgAisPanel;
}());
export { NgAisPanel };
if (false) {
    /** @type {?} */
    NgAisPanel.prototype.header;
    /** @type {?} */
    NgAisPanel.prototype.footer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJwYW5lbC9wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUFBQTtJQXFCQSxDQUFDOztnQkFyQkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsa1VBY1Q7aUJBQ0Y7Ozt5QkFFRSxLQUFLO3lCQUNMLEtBQUs7O0lBQ1IsaUJBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQUhZLFVBQVU7OztJQUNyQiw0QkFBZ0M7O0lBQ2hDLDRCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGVhZGVyXCIgY2xhc3M9XCJhaXMtUGFuZWwtaGVhZGVyXCI+XG4gICAgICAgIHt7aGVhZGVyfX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsLWJvZHlcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cImFpcy1QYW5lbC1mb290ZXJcIj5cbiAgICAgICAge3tmb290ZXJ9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFuZWwge1xuICBASW5wdXQoKSBwdWJsaWMgaGVhZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZm9vdGVyPzogc3RyaW5nO1xufVxuIl19