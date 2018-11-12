/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisRefinementList = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisRefinementList, _super);
    function NgAisRefinementList(instantSearchParent) {
        var _this = _super.call(this, 'RefinementList') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more';
        _this.showLessLabel = 'Show less';
        _this.searchPlaceholder = 'Search here...';
        _this.operator = 'or';
        _this.limit = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false,
        };
        return _this;
    }
    Object.defineProperty(NgAisRefinementList.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisRefinementList.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this.transformItems === 'function'
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRefinementList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
            escapeFacetValues: true,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisRefinementList.prototype.refine = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    NgAisRefinementList.decorators = [
        { type: Component, args: [{
                    selector: 'ais-refinement-list',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <div\n        *ngIf=\"searchable\"\n        [class]=\"cx('searchBox')\"\n      >\n        <ais-facets-search\n          [search]=\"state.searchForItems\"\n          [searchPlaceholder]=\"searchPlaceholder\"\n        >\n        </ais-facets-search>\n      </div>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{item.value}}\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">\n              <ais-highlight attribute=\"highlighted\" [hit]=\"item\"></ais-highlight>\n            </span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </label>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisRefinementList.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRefinementList.propDecorators = {
        showMoreLabel: [{ type: Input }],
        showLessLabel: [{ type: Input }],
        transformItems: [{ type: Input }],
        searchable: [{ type: Input }],
        searchPlaceholder: [{ type: Input }],
        attribute: [{ type: Input }],
        operator: [{ type: Input }],
        limit: [{ type: Input }],
        showMoreLimit: [{ type: Input }],
        sortBy: [{ type: Input }]
    };
    return NgAisRefinementList;
}(BaseWidget));
export { NgAisRefinementList };
if (false) {
    /** @type {?} */
    NgAisRefinementList.prototype.showMoreLabel;
    /** @type {?} */
    NgAisRefinementList.prototype.showLessLabel;
    /** @type {?} */
    NgAisRefinementList.prototype.transformItems;
    /** @type {?} */
    NgAisRefinementList.prototype.searchable;
    /** @type {?} */
    NgAisRefinementList.prototype.searchPlaceholder;
    /** @type {?} */
    NgAisRefinementList.prototype.attribute;
    /** @type {?} */
    NgAisRefinementList.prototype.operator;
    /** @type {?} */
    NgAisRefinementList.prototype.limit;
    /** @type {?} */
    NgAisRefinementList.prototype.showMoreLimit;
    /** @type {?} */
    NgAisRefinementList.prototype.sortBy;
    /** @type {?} */
    NgAisRefinementList.prototype.state;
    /** @type {?} */
    NgAisRefinementList.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmaW5lbWVudC1saXN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsicmVmaW5lbWVudC1saXN0L3JlZmluZW1lbnQtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFjbEQ7SUFnRHlDLCtDQUFVO0lBK0JqRCw2QkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxnQkFBZ0IsQ0FBQyxTQUN4QjtRQUhRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQWhDakMsaUJBQWlCO1FBQ0QsbUJBQWEsR0FBVyxXQUFXLENBQUM7UUFDcEMsbUJBQWEsR0FBVyxXQUFXLENBQUM7UUFHcEMsdUJBQWlCLEdBQVcsZ0JBQWdCLENBQUM7UUFJN0MsY0FBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsV0FBSyxHQUFvQixFQUFFLENBQUM7UUFJckMsV0FBSyxHQUF3QjtZQUNsQyxTQUFTLEVBQUUsS0FBSztZQUNoQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUM7O0lBV0YsQ0FBQztJQVRELHNCQUFJLHlDQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2pFLENBQUM7OztPQUFBO0lBU0Qsc0JBQUksc0NBQUs7Ozs7UUFBVDtZQUNFLE9BQU8sT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7Z0JBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7Ozs7SUFFTSxzQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFO1lBQ3ZDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ25ELGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFFTSxvQ0FBTTs7Ozs7SUFBYixVQUNFLEtBQWlCLEVBQ2pCLElBQTJDO1FBRTNDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN4Qix3REFBd0Q7WUFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFakMsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7O2dCQXRIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLDh1Q0E0Q1Q7aUJBQ0Y7OztnREFpQ0ksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUM7OztnQ0E5QjdDLEtBQUs7Z0NBQ0wsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7b0NBQ0wsS0FBSzs0QkFHTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSztnQ0FDTCxLQUFLO3lCQUNMLEtBQUs7O0lBMERSLDBCQUFDO0NBQUEsQUF2SEQsQ0FnRHlDLFVBQVUsR0F1RWxEO1NBdkVZLG1CQUFtQjs7O0lBRTlCLDRDQUFvRDs7SUFDcEQsNENBQW9EOztJQUNwRCw2Q0FBMEM7O0lBQzFDLHlDQUFxQzs7SUFDckMsZ0RBQTZEOztJQUc3RCx3Q0FBa0M7O0lBQ2xDLHVDQUE4Qzs7SUFDOUMsb0NBQTRDOztJQUM1Qyw0Q0FBK0M7O0lBQy9DLHFDQUE4RDs7SUFFOUQsb0NBVUU7O0lBT0Esa0RBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25uZWN0UmVmaW5lbWVudExpc3QgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBSZWZpbmVtZW50TGlzdFN0YXRlID0ge1xuICBjYW5SZWZpbmU6IGJvb2xlYW47XG4gIGNhblRvZ2dsZVNob3dNb3JlOiBib29sZWFuO1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpc1Nob3dpbmdNb3JlOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdG9nZ2xlU2hvd01vcmU6IEZ1bmN0aW9uO1xuICBzZWFyY2hGb3JJdGVtczogRnVuY3Rpb247XG4gIGlzRm9ybVNlYXJjaDogYm9vbGVhbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yZWZpbmVtZW50LWxpc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0lmPVwic2VhcmNoYWJsZVwiXG4gICAgICAgIFtjbGFzc109XCJjeCgnc2VhcmNoQm94JylcIlxuICAgICAgPlxuICAgICAgICA8YWlzLWZhY2V0cy1zZWFyY2hcbiAgICAgICAgICBbc2VhcmNoXT1cInN0YXRlLnNlYXJjaEZvckl0ZW1zXCJcbiAgICAgICAgICBbc2VhcmNoUGxhY2Vob2xkZXJdPVwic2VhcmNoUGxhY2Vob2xkZXJcIlxuICAgICAgICA+XG4gICAgICAgIDwvYWlzLWZhY2V0cy1zZWFyY2g+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2hlY2tib3gnKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwie3tpdGVtLnZhbHVlfX1cIlxuICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmlzUmVmaW5lZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbFRleHQnKVwiPlxuICAgICAgICAgICAgICA8YWlzLWhpZ2hsaWdodCBhdHRyaWJ1dGU9XCJoaWdobGlnaHRlZFwiIFtoaXRdPVwiaXRlbVwiPjwvYWlzLWhpZ2hsaWdodD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwic2hvd01vcmVMaW1pdCAmJiBzdGF0ZS5jYW5Ub2dnbGVTaG93TW9yZVwiXG4gICAgICAgIChjbGljayk9XCJzdGF0ZS50b2dnbGVTaG93TW9yZSgpXCJcbiAgICAgID5cbiAgICAgICAge3tzdGF0ZS5pc1Nob3dpbmdNb3JlID8gc2hvd0xlc3NMYWJlbCA6IHNob3dNb3JlTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmVmaW5lbWVudExpc3QgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGFiZWw6IHN0cmluZyA9ICdTaG93IG1vcmUnO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0xlc3NMYWJlbDogc3RyaW5nID0gJ1Nob3cgbGVzcyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoYWJsZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hQbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaCBoZXJlLi4uJztcblxuICAvLyBjb25uZWN0b3JzIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgb3BlcmF0b3I6ICdvcicgfCAnYW5kJyA9ICdvcic7XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyIHwgc3RyaW5nID0gMTA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxpbWl0OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3J0Qnk6IHN0cmluZ1tdIHwgKChpdGVtOiBvYmplY3QpID0+IG51bWJlcik7XG5cbiAgcHVibGljIHN0YXRlOiBSZWZpbmVtZW50TGlzdFN0YXRlID0ge1xuICAgIGNhblJlZmluZTogZmFsc2UsXG4gICAgY2FuVG9nZ2xlU2hvd01vcmU6IGZhbHNlLFxuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpc1Nob3dpbmdNb3JlOiBmYWxzZSxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHRvZ2dsZVNob3dNb3JlOiBub29wLFxuICAgIHNlYXJjaEZvckl0ZW1zOiBub29wLFxuICAgIGlzRm9ybVNlYXJjaDogZmFsc2UsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUmVmaW5lbWVudExpc3QnKTtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLml0ZW1zKVxuICAgICAgOiB0aGlzLnN0YXRlLml0ZW1zO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RSZWZpbmVtZW50TGlzdCwge1xuICAgICAgbGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5saW1pdCksXG4gICAgICBzaG93TW9yZUxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMuc2hvd01vcmVMaW1pdCksXG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgICBlc2NhcGVGYWNldFZhbHVlczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVmaW5lKFxuICAgIGV2ZW50OiBNb3VzZUV2ZW50LFxuICAgIGl0ZW06IHsgaXNSZWZpbmVkOiBib29sZWFuOyB2YWx1ZTogc3RyaW5nIH1cbiAgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmNhblJlZmluZSkge1xuICAgICAgLy8gdXBkYXRlIFVJIGRpcmVjdGx5LCBpdCB3aWxsIHVwZGF0ZSB0aGUgY2hlY2tib3ggc3RhdGVcbiAgICAgIGl0ZW0uaXNSZWZpbmVkID0gIWl0ZW0uaXNSZWZpbmVkO1xuXG4gICAgICAvLyByZWZpbmUgdGhyb3VnaCBBbGdvbGlhIEFQSVxuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoaXRlbS52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=