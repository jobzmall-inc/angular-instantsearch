/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectNumericSelector } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisNumericSelector = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisNumericSelector, _super);
    function NgAisNumericSelector(instantSearchParent) {
        var _this = _super.call(this, 'NumericSelector') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.operator = '=';
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisNumericSelector.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attribute,
            operator: this.operator,
            options: this.items,
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericSelector.decorators = [
        { type: Component, args: [{
                    selector: 'ais-numeric-selector',
                    template: "\n    <div [class]=\"cx('')\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisNumericSelector.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisNumericSelector.propDecorators = {
        attribute: [{ type: Input }],
        operator: [{ type: Input }],
        items: [{ type: Input }]
    };
    return NgAisNumericSelector;
}(BaseWidget));
export { NgAisNumericSelector };
if (false) {
    /** @type {?} */
    NgAisNumericSelector.prototype.attribute;
    /** @type {?} */
    NgAisNumericSelector.prototype.operator;
    /** @type {?} */
    NgAisNumericSelector.prototype.items;
    /** @type {?} */
    NgAisNumericSelector.prototype.state;
    /** @type {?} */
    NgAisNumericSelector.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1zZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbIm51bWVyaWMtc2VsZWN0b3IvbnVtZXJpYy1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRaEM7SUFvQjBDLGdEQUFVO0lBZ0JsRCw4QkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxpQkFBaUIsQ0FBQyxTQUN6QjtRQUhRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQWZqQixjQUFRLEdBQXlDLEdBQUcsQ0FBQztRQU85RCxXQUFLLEdBQXlCO1lBQ25DLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7O0lBT0YsQ0FBQzs7OztJQUVNLHVDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUU7WUFDeEMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDbkIsQ0FBQzs7Z0JBbERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsbWJBZ0JUO2lCQUNGOzs7Z0RBa0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7NEJBZjdDLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLOztJQTJCUiwyQkFBQztDQUFBLEFBbkRELENBb0IwQyxVQUFVLEdBK0JuRDtTQS9CWSxvQkFBb0I7OztJQUUvQix5Q0FBa0M7O0lBQ2xDLHdDQUFxRTs7SUFDckUscUNBSUk7O0lBRUoscUNBSUU7O0lBR0EsbURBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3ROdW1lcmljU2VsZWN0b3IgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljU2VsZWN0b3JTdGF0ZSA9IHtcbiAgY3VycmVudFJlZmluZW1lbnQ/OiBzdHJpbmcgfCBudWxsO1xuICBvcHRpb25zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLW51bWVyaWMtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KCcnKVwiPlxuICAgICAgPHNlbGVjdFxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlbGVjdCcpXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzdGF0ZS5yZWZpbmUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdvcHRpb24nKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUub3B0aW9uc1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJpdGVtLnZhbHVlID09PSBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNTZWxlY3RvciBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcGVyYXRvcjogJzwnIHwgJzw9JyB8ICc9JyB8ICc+PScgfCAnPicgfCAnIT0nID0gJz0nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IE51bWVyaWNTZWxlY3RvclN0YXRlID0ge1xuICAgIGN1cnJlbnRSZWZpbmVtZW50OiBudWxsLFxuICAgIG9wdGlvbnM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdOdW1lcmljU2VsZWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0TnVtZXJpY1NlbGVjdG9yLCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLFxuICAgICAgb3B0aW9uczogdGhpcy5pdGVtcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=