/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class NgAisPanel {
}
NgAisPanel.decorators = [
    { type: Component, args: [{
                selector: 'ais-panel',
                template: `
    <div class="ais-Panel">
      <div *ngIf="header" class="ais-Panel-header">
        {{header}}
      </div>

      <div class="ais-Panel-body">
        <ng-content></ng-content>
      </div>

      <div *ngIf="footer" class="ais-Panel-footer">
        {{footer}}
      </div>
    </div>
  `,
            },] },
];
NgAisPanel.propDecorators = {
    header: [{ type: Input }],
    footer: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisPanel.prototype.header;
    /** @type {?} */
    NgAisPanel.prototype.footer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJwYW5lbC9wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFvQmpELE1BQU07OztZQWxCTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDthQUNGOzs7cUJBRUUsS0FBSztxQkFDTCxLQUFLOzs7O0lBRE4sNEJBQWdDOztJQUNoQyw0QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1wYW5lbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFpcy1QYW5lbFwiPlxuICAgICAgPGRpdiAqbmdJZj1cImhlYWRlclwiIGNsYXNzPVwiYWlzLVBhbmVsLWhlYWRlclwiPlxuICAgICAgICB7e2hlYWRlcn19XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImFpcy1QYW5lbC1ib2R5XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9vdGVyXCIgY2xhc3M9XCJhaXMtUGFuZWwtZm9vdGVyXCI+XG4gICAgICAgIHt7Zm9vdGVyfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1BhbmVsIHtcbiAgQElucHV0KCkgcHVibGljIGhlYWRlcj86IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGZvb3Rlcj86IHN0cmluZztcbn1cbiJdfQ==