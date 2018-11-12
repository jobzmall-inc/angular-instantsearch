/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectToggle } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisToggle = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisToggle, _super);
    function NgAisToggle(instantSearchParent) {
        var _this = _super.call(this, 'ToggleRefinement') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.values = { on: true, off: undefined };
        _this.state = {
            createURL: noop,
            refine: noop,
            value: {},
        };
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectToggle, {
            attributeName: this.attribute,
            label: this.label,
            values: this.values,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisToggle.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    };
    NgAisToggle.decorators = [
        { type: Component, args: [{
                    selector: 'ais-toggle',
                    template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"cx('item')\"\n          (click)=\"handleClick($event)\">\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{state.value.name}}\"\n              [checked]=\"state.value.isRefined\"\n            />\n\n            <span [class]=\"cx('labelText')\">\n              {{label || state.value.name}}\n            </span>\n\n            <span [class]=\"cx('count')\">{{state.value.count}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisToggle.propDecorators = {
        attribute: [{ type: Input }],
        label: [{ type: Input }],
        values: [{ type: Input }]
    };
    return NgAisToggle;
}(BaseWidget));
export { NgAisToggle };
if (false) {
    /** @type {?} */
    NgAisToggle.prototype.attribute;
    /** @type {?} */
    NgAisToggle.prototype.label;
    /** @type {?} */
    NgAisToggle.prototype.values;
    /** @type {?} */
    NgAisToggle.prototype.state;
    /** @type {?} */
    NgAisToggle.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsidG9nZ2xlL3RvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBWWhDO0lBMkJpQyx1Q0FBVTtJQWF6QyxxQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUMxQjtRQUhRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQVYxQixZQUFNLEdBQW9DLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFFdkUsV0FBSyxHQUFnQjtZQUMxQixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDOztJQU9GLENBQUM7Ozs7SUFFTSw4QkFBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtZQUMvQixhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFDSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVNLGlDQUFXOzs7O0lBQWxCLFVBQW1CLEtBQWlCO1FBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkE1REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUscXBCQXVCVDtpQkFDRjs7O2dEQWVJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7NEJBWjdDLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOztJQThCUixrQkFBQztDQUFBLEFBN0RELENBMkJpQyxVQUFVLEdBa0MxQztTQWxDWSxXQUFXOzs7SUFFdEIsZ0NBQWtDOztJQUNsQyw0QkFBOEI7O0lBQzlCLDZCQUM4RTs7SUFFOUUsNEJBSUU7O0lBR0EsMENBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RUb2dnbGUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBUb2dnbGVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdmFsdWU6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNvdW50PzogbnVtYmVyO1xuICAgIGlzUmVmaW5lZD86IGJvb2xlYW47XG4gIH07XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJylcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2hlY2tib3gnKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwie3tzdGF0ZS52YWx1ZS5uYW1lfX1cIlxuICAgICAgICAgICAgICBbY2hlY2tlZF09XCJzdGF0ZS52YWx1ZS5pc1JlZmluZWRcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbFRleHQnKVwiPlxuICAgICAgICAgICAgICB7e2xhYmVsIHx8IHN0YXRlLnZhbHVlLm5hbWV9fVxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e3N0YXRlLnZhbHVlLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzVG9nZ2xlIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB2YWx1ZXM6IHsgb24/OiBib29sZWFuOyBvZmY/OiBib29sZWFuIH0gPSB7IG9uOiB0cnVlLCBvZmY6IHVuZGVmaW5lZCB9O1xuXG4gIHB1YmxpYyBzdGF0ZTogVG9nZ2xlU3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB2YWx1ZToge30sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignVG9nZ2xlUmVmaW5lbWVudCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RUb2dnbGUsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHRoaXMuc3RhdGUudmFsdWUpO1xuICB9XG59XG4iXX0=