/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectNumericSelector } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisNumericSelector extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('NumericSelector');
        this.instantSearchParent = instantSearchParent;
        this.operator = '=';
        this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attribute,
            operator: this.operator,
            options: this.items,
        });
        super.ngOnInit();
    }
}
NgAisNumericSelector.decorators = [
    { type: Component, args: [{
                selector: 'ais-numeric-selector',
                template: `
    <div [class]="cx('')">
      <select
        [class]="cx('select')"
        (change)="state.refine($event.target.value)"
      >
        <option
          [class]="cx('option')"
          *ngFor="let item of state.options"
          [value]="item.value"
          [selected]="item.value === state.currentRefinement"
        >
          {{item.label}}
        </option>
      </select>
    </div>
  `,
            },] },
];
NgAisNumericSelector.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisNumericSelector.propDecorators = {
    attribute: [{ type: Input }],
    operator: [{ type: Input }],
    items: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1zZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbIm51bWVyaWMtc2VsZWN0b3IvbnVtZXJpYy1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQTRCaEMsTUFBTSwyQkFBNEIsU0FBUSxVQUFVOzs7O0lBZ0JsRCxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUZsQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFmakIsYUFBUSxHQUF5QyxHQUFHLENBQUM7UUFPOUQsVUFBSyxHQUF5QjtZQUNuQyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0lBT0YsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFO1lBQ3hDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7WUFsREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDthQUNGOzs7NENBa0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozt3QkFmN0MsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7Ozs7SUFGTix5Q0FBa0M7O0lBQ2xDLHdDQUFxRTs7SUFDckUscUNBSUk7O0lBRUoscUNBSUU7O0lBR0EsbURBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3ROdW1lcmljU2VsZWN0b3IgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljU2VsZWN0b3JTdGF0ZSA9IHtcbiAgY3VycmVudFJlZmluZW1lbnQ/OiBzdHJpbmcgfCBudWxsO1xuICBvcHRpb25zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLW51bWVyaWMtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KCcnKVwiPlxuICAgICAgPHNlbGVjdFxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlbGVjdCcpXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzdGF0ZS5yZWZpbmUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdvcHRpb24nKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUub3B0aW9uc1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJpdGVtLnZhbHVlID09PSBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNTZWxlY3RvciBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcGVyYXRvcjogJzwnIHwgJzw9JyB8ICc9JyB8ICc+PScgfCAnPicgfCAnIT0nID0gJz0nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IE51bWVyaWNTZWxlY3RvclN0YXRlID0ge1xuICAgIGN1cnJlbnRSZWZpbmVtZW50OiBudWxsLFxuICAgIG9wdGlvbnM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdOdW1lcmljU2VsZWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0TnVtZXJpY1NlbGVjdG9yLCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLFxuICAgICAgb3B0aW9uczogdGhpcy5pdGVtcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=