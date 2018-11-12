/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectSortBySelector } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisSortBy = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisSortBy, _super);
    function NgAisSortBy(instantSearchParent) {
        var _this = _super.call(this, 'SortBy') || this;
        _this.instantSearchParent = instantSearchParent;
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
    NgAisSortBy.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectSortBySelector, { indices: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisSortBy.decorators = [
        { type: Component, args: [{
                    selector: 'ais-sort-by',
                    template: "\n    <div [class]=\"cx()\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisSortBy.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisSortBy.propDecorators = {
        items: [{ type: Input }]
    };
    return NgAisSortBy;
}(BaseWidget));
export { NgAisSortBy };
if (false) {
    /** @type {?} */
    NgAisSortBy.prototype.items;
    /** @type {?} */
    NgAisSortBy.prototype.state;
    /** @type {?} */
    NgAisSortBy.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1ieS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInNvcnQtYnkvc29ydC1ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEM7SUFvQmlDLHVDQUFVO0lBaUJ6QyxxQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxRQUFRLENBQUMsU0FDaEI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFaMUIsV0FBSyxHQUlSO1lBQ0YsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQzs7SUFPRixDQUFDOzs7O0lBRU0sOEJBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOztnQkEvQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsaWJBZ0JUO2lCQUNGOzs7Z0RBbUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7d0JBakI3QyxLQUFLOztJQTJCUixrQkFBQztDQUFBLEFBaERELENBb0JpQyxVQUFVLEdBNEIxQztTQTVCWSxXQUFXOzs7SUFDdEIsNEJBSUk7O0lBRUosNEJBUUU7O0lBR0EsMENBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RTb3J0QnlTZWxlY3RvciB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1zb3J0LWJ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8c2VsZWN0XG4gICAgICAgIFtjbGFzc109XCJjeCgnc2VsZWN0JylcIlxuICAgICAgICAoY2hhbmdlKT1cInN0YXRlLnJlZmluZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ29wdGlvbicpXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5vcHRpb25zXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW0udmFsdWUgPT09IHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU29ydEJ5IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpdGVtczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiB7XG4gICAgY3VycmVudFJlZmluZW1lbnQ6IHN0cmluZyB8IG51bGw7XG4gICAgb3B0aW9uczoge31bXTtcbiAgICByZWZpbmU6IEZ1bmN0aW9uO1xuICB9ID0ge1xuICAgIGN1cnJlbnRSZWZpbmVtZW50OiBudWxsLFxuICAgIG9wdGlvbnM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTb3J0QnknKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0U29ydEJ5U2VsZWN0b3IsIHsgaW5kaWNlczogdGhpcy5pdGVtcyB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=