/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectSortBySelector } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisSortBy extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('SortBy');
        this.instantSearchParent = instantSearchParent;
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
        this.createWidget(connectSortBySelector, { indices: this.items });
        super.ngOnInit();
    }
}
NgAisSortBy.decorators = [
    { type: Component, args: [{
                selector: 'ais-sort-by',
                template: `
    <div [class]="cx()">
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
NgAisSortBy.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisSortBy.propDecorators = {
    items: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisSortBy.prototype.items;
    /** @type {?} */
    NgAisSortBy.prototype.state;
    /** @type {?} */
    NgAisSortBy.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1ieS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInNvcnQtYnkvc29ydC1ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQXNCaEMsTUFBTSxrQkFBbUIsU0FBUSxVQUFVOzs7O0lBaUJ6QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFGVCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFaMUIsVUFBSyxHQUlSO1lBQ0YsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQU9GLENBQUM7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNsRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO2FBQ0Y7Ozs0Q0FtQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7O29CQWpCN0MsS0FBSzs7OztJQUFOLDRCQUlJOztJQUVKLDRCQVFFOztJQUdBLDBDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U29ydEJ5U2VsZWN0b3IgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtc29ydC1ieScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPHNlbGVjdFxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlbGVjdCcpXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzdGF0ZS5yZWZpbmUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdvcHRpb24nKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUub3B0aW9uc1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJpdGVtLnZhbHVlID09PSBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NvcnRCeSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGN1cnJlbnRSZWZpbmVtZW50OiBzdHJpbmcgfCBudWxsO1xuICAgIG9wdGlvbnM6IHt9W107XG4gICAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgfSA9IHtcbiAgICBjdXJyZW50UmVmaW5lbWVudDogbnVsbCxcbiAgICBvcHRpb25zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU29ydEJ5Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFNvcnRCeVNlbGVjdG9yLCB7IGluZGljZXM6IHRoaXMuaXRlbXMgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIl19