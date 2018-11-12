/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Inject, forwardRef } from '@angular/core';
import { connectRange } from 'instantsearch.js/es/connectors';
import * as noUiSlider from 'nouislider';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
export class NgAisRangeSlider extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RangeSlider');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.pips = true;
        this.tooltips = true;
        this.precision = 2;
        this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1],
        };
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering) {
                // create slider
                /** @type {?} */
                const config = {
                    animate: false,
                    behaviour: 'snap',
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: this.step,
                    tooltips: this.tooltips && [
                        { to: this.formatTooltip },
                        { to: this.formatTooltip },
                    ],
                };
                if (this.pips === true || typeof this.pips === 'undefined') {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: 'positions',
                            stepped: true,
                            values: [0, 50, 100],
                        },
                    });
                }
                else if (this.pips !== undefined) {
                    Object.assign(config, { pips: this.pips });
                }
                this.slider = noUiSlider.create(this.sliderContainer.nativeElement, config);
                // register listen events
                this.sliderContainer.nativeElement.noUiSlider.on('change', this.handleChange);
            }
            // update component inner state
            this.state = state;
            // update the slider state
            const { range: { min, max }, start, } = state;
            /** @type {?} */
            const disabled = min === max;
            /** @type {?} */
            const range = disabled ? { min, max: max + 0.0001 } : { min, max };
            this.slider.updateOptions({ disabled, range, start });
        };
        this.handleChange = (values) => {
            this.state.refine(values);
        };
        this.formatTooltip = (value) => {
            return value.toFixed(parseNumberInput(this.precision));
        };
    }
    /**
     * @return {?}
     */
    get step() {
        // compute step from the precision value
        /** @type {?} */
        const precision = parseNumberInput(this.precision) || 2;
        return 1 / Math.pow(10, precision);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        super.ngOnInit();
    }
}
NgAisRangeSlider.decorators = [
    { type: Component, args: [{
                selector: 'ais-range-slider',
                template: `
    <div [class]="cx()">
      <div [class]="cx('body')">
        <div #sliderContainer></div>
      </div>
    </div>
  `,
            },] },
];
NgAisRangeSlider.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRangeSlider.propDecorators = {
    sliderContainer: [{ type: ViewChild, args: ['sliderContainer',] }],
    pips: [{ type: Input }],
    tooltips: [{ type: Input }],
    attribute: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    precision: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2xpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsicmFuZ2Utc2xpZGVyL3JhbmdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sS0FBSyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBa0JsRCxNQUFNLHVCQUF3QixTQUFRLFVBQVU7Ozs7SUEyQjlDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUZkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQTFCakMsaUJBQWlCO1FBQ0QsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBTXpCLGNBQVMsR0FBb0IsQ0FBQyxDQUFDO1FBRXhDLFVBQUssR0FBcUI7WUFDL0IsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNkLENBQUM7UUE0QkssZ0JBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBeUIsRUFBRSxFQUFFO1lBQ3hELElBQUksZ0JBQWdCLEVBQUU7OztzQkFFZCxNQUFNLEdBQUc7b0JBQ2Is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Z0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQy9CLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQy9CLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7WUFyREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7YUFDRjs7OzRDQTZCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOzs7OEJBM0I3QyxTQUFTLFNBQUMsaUJBQWlCO21CQUczQixLQUFLO3VCQUNMLEtBQUs7d0JBR0wsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7OztJQVZOLDJDQUEwRDs7SUFHMUQsZ0NBQXFDOztJQUNyQyxvQ0FBeUM7O0lBR3pDLHFDQUFrQzs7SUFDbEMsK0JBQXNDOztJQUN0QywrQkFBc0M7O0lBQ3RDLHFDQUErQzs7SUFFL0MsaUNBSUU7O0lBRUYsa0NBQW9COztJQTBCcEIsdUNBc0RFOztJQUVGLHdDQUVFOztJQUVGLHlDQUVFOztJQS9FQSwrQ0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0UmFuZ2UgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcblxuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBSYW5nZVNsaWRlclN0YXRlID0ge1xuICByYW5nZTogeyBtaW46IG51bWJlcjsgbWF4OiBudW1iZXIgfTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgc3RhcnQ6IG51bWJlcltdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJhbmdlLXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPGRpdiBbY2xhc3NdPVwiY3goJ2JvZHknKVwiPlxuICAgICAgICA8ZGl2ICNzbGlkZXJDb250YWluZXI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYW5nZVNsaWRlciBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBAVmlld0NoaWxkKCdzbGlkZXJDb250YWluZXInKSBwdWJsaWMgc2xpZGVyQ29udGFpbmVyOiBhbnk7XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHBpcHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1pbj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHByZWNpc2lvbjogbnVtYmVyIHwgc3RyaW5nID0gMjtcblxuICBwdWJsaWMgc3RhdGU6IFJhbmdlU2xpZGVyU3RhdGUgPSB7XG4gICAgcmFuZ2U6IHsgbWluOiAwLCBtYXg6IDEgfSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgc3RhcnQ6IFswLCAxXSxcbiAgfTtcblxuICBwcml2YXRlIHNsaWRlcjogYW55O1xuXG4gIGdldCBzdGVwKCkge1xuICAgIC8vIGNvbXB1dGUgc3RlcCBmcm9tIHRoZSBwcmVjaXNpb24gdmFsdWVcbiAgICBjb25zdCBwcmVjaXNpb24gPSBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSB8fCAyO1xuICAgIHJldHVybiAxIC8gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYW5nZVNsaWRlcicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RSYW5nZSwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBtYXg6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5tYXgpLFxuICAgICAgbWluOiBwYXJzZU51bWJlcklucHV0KHRoaXMubWluKSxcbiAgICAgIHByZWNpc2lvbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbiksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVN0YXRlID0gKHN0YXRlLCBpc0ZpcnN0UmVuZGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgaWYgKGlzRmlyc3RSZW5kZXJpbmcpIHtcbiAgICAgIC8vIGNyZWF0ZSBzbGlkZXJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgYW5pbWF0ZTogZmFsc2UsXG4gICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICByYW5nZTogeyBtaW46IDAsIG1heDogMSB9LFxuICAgICAgICBzdGFydDogWzAsIDFdLFxuICAgICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzICYmIFtcbiAgICAgICAgICB7IHRvOiB0aGlzLmZvcm1hdFRvb2x0aXAgfSxcbiAgICAgICAgICB7IHRvOiB0aGlzLmZvcm1hdFRvb2x0aXAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLnBpcHMgPT09IHRydWUgfHwgdHlwZW9mIHRoaXMucGlwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHtcbiAgICAgICAgICBwaXBzOiB7XG4gICAgICAgICAgICBkZW5zaXR5OiAzLFxuICAgICAgICAgICAgbW9kZTogJ3Bvc2l0aW9ucycsXG4gICAgICAgICAgICBzdGVwcGVkOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWVzOiBbMCwgNTAsIDEwMF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGlwcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB7IHBpcHM6IHRoaXMucGlwcyB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuXG4gICAgICAvLyByZWdpc3RlciBsaXN0ZW4gZXZlbnRzXG4gICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm5vVWlTbGlkZXIub24oXG4gICAgICAgICdjaGFuZ2UnLFxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgY29tcG9uZW50IGlubmVyIHN0YXRlXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBzbGlkZXIgc3RhdGVcbiAgICBjb25zdCB7XG4gICAgICByYW5nZTogeyBtaW4sIG1heCB9LFxuICAgICAgc3RhcnQsXG4gICAgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZGlzYWJsZWQgPSBtaW4gPT09IG1heDtcbiAgICBjb25zdCByYW5nZSA9IGRpc2FibGVkID8geyBtaW4sIG1heDogbWF4ICsgMC4wMDAxIH0gOiB7IG1pbiwgbWF4IH07XG5cbiAgICB0aGlzLnNsaWRlci51cGRhdGVPcHRpb25zKHsgZGlzYWJsZWQsIHJhbmdlLCBzdGFydCB9KTtcbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlQ2hhbmdlID0gKHZhbHVlczogc3RyaW5nW10gfCBudW1iZXJbXSkgPT4ge1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlcyk7XG4gIH07XG5cbiAgcHVibGljIGZvcm1hdFRvb2x0aXAgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pKTtcbiAgfTtcbn1cbiJdfQ==