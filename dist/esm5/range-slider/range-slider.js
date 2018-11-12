/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, Inject, forwardRef } from '@angular/core';
import { connectRange } from 'instantsearch.js/es/connectors';
import * as noUiSlider from 'nouislider';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisRangeSlider = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisRangeSlider, _super);
    function NgAisRangeSlider(instantSearchParent) {
        var _this = _super.call(this, 'RangeSlider') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.pips = true;
        _this.tooltips = true;
        _this.precision = 2;
        _this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1],
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                // create slider
                /** @type {?} */
                var config = {
                    animate: false,
                    behaviour: 'snap',
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: _this.step,
                    tooltips: _this.tooltips && [
                        { to: _this.formatTooltip },
                        { to: _this.formatTooltip },
                    ],
                };
                if (_this.pips === true || typeof _this.pips === 'undefined') {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: 'positions',
                            stepped: true,
                            values: [0, 50, 100],
                        },
                    });
                }
                else if (_this.pips !== undefined) {
                    Object.assign(config, { pips: _this.pips });
                }
                _this.slider = noUiSlider.create(_this.sliderContainer.nativeElement, config);
                // register listen events
                _this.sliderContainer.nativeElement.noUiSlider.on('change', _this.handleChange);
            }
            // update component inner state
            _this.state = state;
            // update the slider state
            var _a = state.range, min = _a.min, max = _a.max, start = state.start;
            /** @type {?} */
            var disabled = min === max;
            /** @type {?} */
            var range = disabled ? { min: min, max: max + 0.0001 } : { min: min, max: max };
            _this.slider.updateOptions({ disabled: disabled, range: range, start: start });
        };
        _this.handleChange = function (values) {
            _this.state.refine(values);
        };
        _this.formatTooltip = function (value) {
            return value.toFixed(parseNumberInput(_this.precision));
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeSlider.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            // compute step from the precision value
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
    NgAisRangeSlider.prototype.ngOnInit = /**
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
    NgAisRangeSlider.decorators = [
        { type: Component, args: [{
                    selector: 'ais-range-slider',
                    template: "\n    <div [class]=\"cx()\">\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisRangeSlider.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRangeSlider.propDecorators = {
        sliderContainer: [{ type: ViewChild, args: ['sliderContainer',] }],
        pips: [{ type: Input }],
        tooltips: [{ type: Input }],
        attribute: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        precision: [{ type: Input }]
    };
    return NgAisRangeSlider;
}(BaseWidget));
export { NgAisRangeSlider };
if (false) {
    /** @type {?} */
    NgAisRangeSlider.prototype.sliderContainer;
    /** @type {?} */
    NgAisRangeSlider.prototype.pips;
    /** @type {?} */
    NgAisRangeSlider.prototype.tooltips;
    /** @type {?} */
    NgAisRangeSlider.prototype.attribute;
    /** @type {?} */
    NgAisRangeSlider.prototype.min;
    /** @type {?} */
    NgAisRangeSlider.prototype.max;
    /** @type {?} */
    NgAisRangeSlider.prototype.precision;
    /** @type {?} */
    NgAisRangeSlider.prototype.state;
    /** @type {?} */
    NgAisRangeSlider.prototype.slider;
    /** @type {?} */
    NgAisRangeSlider.prototype.updateState;
    /** @type {?} */
    NgAisRangeSlider.prototype.handleChange;
    /** @type {?} */
    NgAisRangeSlider.prototype.formatTooltip;
    /** @type {?} */
    NgAisRangeSlider.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2xpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsicmFuZ2Utc2xpZGVyL3JhbmdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQztBQUV6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVFsRDtJQVVzQyw0Q0FBVTtJQTJCOUMsMEJBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sYUFBYSxDQUFDLFNBQ3JCO1FBSFEseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBMUJqQyxpQkFBaUI7UUFDRCxVQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFNekIsZUFBUyxHQUFvQixDQUFDLENBQUM7UUFFeEMsV0FBSyxHQUFxQjtZQUMvQixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDekIsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2QsQ0FBQztRQTRCSyxpQkFBVyxHQUFHLFVBQUMsS0FBSyxFQUFFLGdCQUF5QjtZQUNwRCxJQUFJLGdCQUFnQixFQUFFOzs7b0JBRWQsTUFBTSxHQUFHO29CQUNiLE9BQU8sRUFBRSxLQUFLO29CQUNk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SUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOztnQkFyREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxzSUFNVDtpQkFDRjs7O2dEQTZCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7O2tDQTNCN0MsU0FBUyxTQUFDLGlCQUFpQjt1QkFHM0IsS0FBSzsyQkFDTCxLQUFLOzRCQUdMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBaUdSLHVCQUFDO0NBQUEsQUF0SEQsQ0FVc0MsVUFBVSxHQTRHL0M7U0E1R1ksZ0JBQWdCOzs7SUFDM0IsMkNBQTBEOztJQUcxRCxnQ0FBcUM7O0lBQ3JDLG9DQUF5Qzs7SUFHekMscUNBQWtDOztJQUNsQywrQkFBc0M7O0lBQ3RDLCtCQUFzQzs7SUFDdEMscUNBQStDOztJQUUvQyxpQ0FJRTs7SUFFRixrQ0FBb0I7O0lBMEJwQix1Q0FzREU7O0lBRUYsd0NBRUU7O0lBRUYseUNBRUU7O0lBL0VBLCtDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RSYW5nZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgKiBhcyBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xuXG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJhbmdlU2xpZGVyU3RhdGUgPSB7XG4gIHJhbmdlOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlciB9O1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICBzdGFydDogbnVtYmVyW107XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcmFuZ2Utc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8ZGl2IFtjbGFzc109XCJjeCgnYm9keScpXCI+XG4gICAgICAgIDxkaXYgI3NsaWRlckNvbnRhaW5lcj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlU2xpZGVyIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBWaWV3Q2hpbGQoJ3NsaWRlckNvbnRhaW5lcicpIHB1YmxpYyBzbGlkZXJDb250YWluZXI6IGFueTtcblxuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgcGlwczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwczogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWluPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWF4PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcHJlY2lzaW9uOiBudW1iZXIgfCBzdHJpbmcgPSAyO1xuXG4gIHB1YmxpYyBzdGF0ZTogUmFuZ2VTbGlkZXJTdGF0ZSA9IHtcbiAgICByYW5nZTogeyBtaW46IDAsIG1heDogMSB9LFxuICAgIHJlZmluZTogbm9vcCxcbiAgICBzdGFydDogWzAsIDFdLFxuICB9O1xuXG4gIHByaXZhdGUgc2xpZGVyOiBhbnk7XG5cbiAgZ2V0IHN0ZXAoKSB7XG4gICAgLy8gY29tcHV0ZSBzdGVwIGZyb20gdGhlIHByZWNpc2lvbiB2YWx1ZVxuICAgIGNvbnN0IHByZWNpc2lvbiA9IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pIHx8IDI7XG4gICAgcmV0dXJuIDEgLyBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1JhbmdlU2xpZGVyJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFJhbmdlLCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG1heDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1heCksXG4gICAgICBtaW46IHBhcnNlTnVtYmVySW5wdXQodGhpcy5taW4pLFxuICAgICAgcHJlY2lzaW9uOiBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykge1xuICAgICAgLy8gY3JlYXRlIHNsaWRlclxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICBhbmltYXRlOiBmYWxzZSxcbiAgICAgICAgYmVoYXZpb3VyOiAnc25hcCcsXG4gICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgIHJhbmdlOiB7IG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICAgIHN0YXJ0OiBbMCwgMV0sXG4gICAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcbiAgICAgICAgdG9vbHRpcHM6IHRoaXMudG9vbHRpcHMgJiYgW1xuICAgICAgICAgIHsgdG86IHRoaXMuZm9ybWF0VG9vbHRpcCB9LFxuICAgICAgICAgIHsgdG86IHRoaXMuZm9ybWF0VG9vbHRpcCB9LFxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMucGlwcyA9PT0gdHJ1ZSB8fCB0eXBlb2YgdGhpcy5waXBzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywge1xuICAgICAgICAgIHBpcHM6IHtcbiAgICAgICAgICAgIGRlbnNpdHk6IDMsXG4gICAgICAgICAgICBtb2RlOiAncG9zaXRpb25zJyxcbiAgICAgICAgICAgIHN0ZXBwZWQ6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZXM6IFswLCA1MCwgMTAwXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5waXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHsgcGlwczogdGhpcy5waXBzIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNsaWRlciA9IG5vVWlTbGlkZXIuY3JlYXRlKFxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG5cbiAgICAgIC8vIHJlZ2lzdGVyIGxpc3RlbiBldmVudHNcbiAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQubm9VaVNsaWRlci5vbihcbiAgICAgICAgJ2NoYW5nZScsXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBjb21wb25lbnQgaW5uZXIgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHNsaWRlciBzdGF0ZVxuICAgIGNvbnN0IHtcbiAgICAgIHJhbmdlOiB7IG1pbiwgbWF4IH0sXG4gICAgICBzdGFydCxcbiAgICB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBkaXNhYmxlZCA9IG1pbiA9PT0gbWF4O1xuICAgIGNvbnN0IHJhbmdlID0gZGlzYWJsZWQgPyB7IG1pbiwgbWF4OiBtYXggKyAwLjAwMDEgfSA6IHsgbWluLCBtYXggfTtcblxuICAgIHRoaXMuc2xpZGVyLnVwZGF0ZU9wdGlvbnMoeyBkaXNhYmxlZCwgcmFuZ2UsIHN0YXJ0IH0pO1xuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UgPSAodmFsdWVzOiBzdHJpbmdbXSB8IG51bWJlcltdKSA9PiB7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUodmFsdWVzKTtcbiAgfTtcblxuICBwdWJsaWMgZm9ybWF0VG9vbHRpcCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQocGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbikpO1xuICB9O1xufVxuIl19