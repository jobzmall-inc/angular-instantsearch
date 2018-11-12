/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Component, Input, forwardRef } from '@angular/core';
import { connectRange } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisRangeInput = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisRangeInput, _super);
    function NgAisRangeInput(instantSearchParent) {
        var _this = _super.call(this, 'RangeInput') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.currency = '$';
        _this.separator = 'to';
        _this.submitLabel = 'Go';
        _this.precision = 2;
        // inner state
        _this.minInputValue = '';
        _this.maxInputValue = '';
        _this.state = {
            range: { min: undefined, max: undefined },
            refine: noop,
            start: [0, 0],
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeInput.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var precision = parseNumberInput(this.precision) || 2;
            return 1 / Math.pow(10, precision);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRangeInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    NgAisRangeInput.prototype.handleChange = /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    function (event, type) {
        /** @type {?} */
        var value = parseNumberInput(event.target.value);
        if (type === 'min') {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisRangeInput.prototype.handleSubmit = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    };
    NgAisRangeInput.decorators = [
        { type: Component, args: [{
                    selector: 'ais-range-input',
                    template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'min')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.min\"\n            [value]=\"minInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'min')\"\n          />\n        </label>\n\n        <span [class]=\"cx('separator')\">{{separator}}</span>\n\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'max')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.max\"\n            [value]=\"maxInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'max')\"\n          />\n        </label>\n\n        <button\n          [class]=\"cx('submit')\"\n          (click)=\"handleSubmit($event)\"\n        >\n          {{submitLabel}}\n        </button>\n      </form>\n    </div>\n  ",
                },] },
    ];
    NgAisRangeInput.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRangeInput.propDecorators = {
        currency: [{ type: Input }],
        separator: [{ type: Input }],
        submitLabel: [{ type: Input }],
        attribute: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        precision: [{ type: Input }]
    };
    return NgAisRangeInput;
}(BaseWidget));
export { NgAisRangeInput };
if (false) {
    /** @type {?} */
    NgAisRangeInput.prototype.currency;
    /** @type {?} */
    NgAisRangeInput.prototype.separator;
    /** @type {?} */
    NgAisRangeInput.prototype.submitLabel;
    /** @type {?} */
    NgAisRangeInput.prototype.attribute;
    /** @type {?} */
    NgAisRangeInput.prototype.min;
    /** @type {?} */
    NgAisRangeInput.prototype.max;
    /** @type {?} */
    NgAisRangeInput.prototype.precision;
    /** @type {?} */
    NgAisRangeInput.prototype.minInputValue;
    /** @type {?} */
    NgAisRangeInput.prototype.maxInputValue;
    /** @type {?} */
    NgAisRangeInput.prototype.state;
    /** @type {?} */
    NgAisRangeInput.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJyYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUWxEO0lBaURxQywyQ0FBVTtJQTJCN0MseUJBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sWUFBWSxDQUFDLFNBQ3BCO1FBSFEseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBNUJqQyxpQkFBaUI7UUFDRCxjQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFNM0IsZUFBUyxHQUFvQixDQUFDLENBQUM7UUFFL0MsY0FBYztRQUNQLG1CQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUNyQyxtQkFBYSxHQUFxQixFQUFFLENBQUM7UUFPckMsV0FBSyxHQUFzQjtZQUNoQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7WUFDekMsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2QsQ0FBQzs7SUFPRixDQUFDO0lBaEJELHNCQUFJLGlDQUFJOzs7O1FBQVI7O2dCQUNRLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2RCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTs7OztJQWVNLGtDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzlCLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFFTSxzQ0FBWTs7Ozs7SUFBbkIsVUFBb0IsS0FBVSxFQUFFLElBQVk7O1lBQ3BDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVsRCxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxzQ0FBWTs7OztJQUFuQixVQUFvQixLQUFpQztRQUNuRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7O2dCQTNHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHcwQ0E2Q1Q7aUJBQ0Y7OztnREE2QkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUM7OzsyQkExQjdDLEtBQUs7NEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUdMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBaURSLHNCQUFDO0NBQUEsQUE1R0QsQ0FpRHFDLFVBQVUsR0EyRDlDO1NBM0RZLGVBQWU7OztJQUUxQixtQ0FBdUM7O0lBQ3ZDLG9DQUF5Qzs7SUFDekMsc0NBQTJDOztJQUczQyxvQ0FBa0M7O0lBQ2xDLDhCQUFzQzs7SUFDdEMsOEJBQXNDOztJQUN0QyxvQ0FBK0M7O0lBRy9DLHdDQUE0Qzs7SUFDNUMsd0NBQTRDOztJQU81QyxnQ0FJRTs7SUFHQSw4Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFJhbmdlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgTnVtZXJpY1JhbmdlU3RhdGUgPSB7XG4gIHJhbmdlOiB7IG1pbj86IG51bWJlcjsgbWF4PzogbnVtYmVyIH07XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHN0YXJ0OiBudW1iZXJbXTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYW5nZS1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPGZvcm1cbiAgICAgICAgW2NsYXNzXT1cImN4KCdmb3JtJylcIlxuICAgICAgICAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgICAgbm92YWxpZGF0ZVxuICAgICAgPlxuICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjdXJyZW5jeScpXCI+e3tjdXJyZW5jeX19PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcsICdtaW4nKVwiXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIFttaW5dPVwic3RhdGUucmFuZ2UubWluXCJcbiAgICAgICAgICAgIFttYXhdPVwic3RhdGUucmFuZ2UubWF4XCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzdGF0ZS5yYW5nZS5taW5cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm1pbklucHV0VmFsdWVcIlxuICAgICAgICAgICAgW3N0ZXBdPVwic3RlcFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQsICdtaW4nKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ3NlcGFyYXRvcicpXCI+e3tzZXBhcmF0b3J9fTwvc3Bhbj5cblxuICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjdXJyZW5jeScpXCI+e3tjdXJyZW5jeX19PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcsICdtYXgnKVwiXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIFttaW5dPVwic3RhdGUucmFuZ2UubWluXCJcbiAgICAgICAgICAgIFttYXhdPVwic3RhdGUucmFuZ2UubWF4XCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzdGF0ZS5yYW5nZS5tYXhcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm1heElucHV0VmFsdWVcIlxuICAgICAgICAgICAgW3N0ZXBdPVwic3RlcFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQsICdtYXgnKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7c3VibWl0TGFiZWx9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYW5nZUlucHV0IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBjdXJyZW5jeTogc3RyaW5nID0gJyQnO1xuICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yOiBzdHJpbmcgPSAndG8nO1xuICBASW5wdXQoKSBwdWJsaWMgc3VibWl0TGFiZWw6IHN0cmluZyA9ICdHbyc7XG5cbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWluPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWF4PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcHJlY2lzaW9uOiBudW1iZXIgfCBzdHJpbmcgPSAyO1xuXG4gIC8vIGlubmVyIHN0YXRlXG4gIHB1YmxpYyBtaW5JbnB1dFZhbHVlPzogbnVtYmVyIHwgc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBtYXhJbnB1dFZhbHVlPzogbnVtYmVyIHwgc3RyaW5nID0gJyc7XG5cbiAgZ2V0IHN0ZXAoKSB7XG4gICAgY29uc3QgcHJlY2lzaW9uID0gcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbikgfHwgMjtcbiAgICByZXR1cm4gMSAvIE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICB9XG5cbiAgcHVibGljIHN0YXRlOiBOdW1lcmljUmFuZ2VTdGF0ZSA9IHtcbiAgICByYW5nZTogeyBtaW46IHVuZGVmaW5lZCwgbWF4OiB1bmRlZmluZWQgfSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgc3RhcnQ6IFswLCAwXSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYW5nZUlucHV0Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFJhbmdlLCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG1heDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1heCksXG4gICAgICBtaW46IHBhcnNlTnVtYmVySW5wdXQodGhpcy5taW4pLFxuICAgICAgcHJlY2lzaW9uOiBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2hhbmdlKGV2ZW50OiBhbnksIHR5cGU6IHN0cmluZykge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VOdW1iZXJJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xuXG4gICAgaWYgKHR5cGUgPT09ICdtaW4nKSB7XG4gICAgICB0aGlzLm1pbklucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXhJbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZVN1Ym1pdChldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKFt0aGlzLm1pbklucHV0VmFsdWUsIHRoaXMubWF4SW5wdXRWYWx1ZV0pO1xuICB9XG59XG4iXX0=