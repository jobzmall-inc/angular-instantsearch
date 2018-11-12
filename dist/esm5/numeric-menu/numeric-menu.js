/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectNumericRefinementList } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisNumericMenu = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisNumericMenu, _super);
    function NgAisNumericMenu(instantSearchParent) {
        var _this = _super.call(this, 'NumericMenu') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisNumericMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisNumericMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attribute,
            options: this.items,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisNumericMenu.prototype.refine = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    };
    NgAisNumericMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-numeric-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of state.items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('radio')\"\n              type=\"radio\"\n              name=\"NumericMenu\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">{{item.label}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisNumericMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisNumericMenu.propDecorators = {
        attribute: [{ type: Input }],
        items: [{ type: Input }]
    };
    return NgAisNumericMenu;
}(BaseWidget));
export { NgAisNumericMenu };
if (false) {
    /** @type {?} */
    NgAisNumericMenu.prototype.attribute;
    /** @type {?} */
    NgAisNumericMenu.prototype.items;
    /** @type {?} */
    NgAisNumericMenu.prototype.state;
    /** @type {?} */
    NgAisNumericMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1tZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsibnVtZXJpYy1tZW51L251bWVyaWMtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRaEM7SUEyQnNDLDRDQUFVO0lBbUI5QywwQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxhQUFhLENBQUMsU0FDckI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFaMUIsV0FBSyxHQUErQjtZQUN6QyxTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDOztJQVdGLENBQUM7SUFURCxzQkFBSSxzQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQVNNLG1DQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUU7WUFDOUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7UUFDSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFFTSxpQ0FBTTs7Ozs7SUFBYixVQUFjLEtBQWlCLEVBQUUsSUFBdUI7UUFDdEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsOG1CQXVCVDtpQkFDRjs7O2dEQXFCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7OzRCQW5CN0MsS0FBSzt3QkFDTCxLQUFLOztJQXFDUix1QkFBQztDQUFBLEFBbEVELENBMkJzQyxVQUFVLEdBdUMvQztTQXZDWSxnQkFBZ0I7OztJQUMzQixxQ0FBa0M7O0lBQ2xDLGlDQUtJOztJQUVKLGlDQUlFOztJQU9BLCtDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0TnVtZXJpY1JlZmluZW1lbnRMaXN0IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgTnVtZXJpY1JlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLW51bWVyaWMtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5pdGVtc1wiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBbY2xhc3NdPVwiY3goJ3JhZGlvJylcIlxuICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICBuYW1lPVwiTnVtZXJpY01lbnVcIlxuICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmlzUmVmaW5lZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbFRleHQnKVwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHN0YXJ0PzogbnVtYmVyO1xuICAgIGVuZD86IG51bWJlcjtcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogTnVtZXJpY1JlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignTnVtZXJpY01lbnUnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0TnVtZXJpY1JlZmluZW1lbnRMaXN0LCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG9wdGlvbnM6IHRoaXMuaXRlbXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IHsgdmFsdWU6IHN0cmluZyB9KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN0YXRlLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgfVxufVxuIl19