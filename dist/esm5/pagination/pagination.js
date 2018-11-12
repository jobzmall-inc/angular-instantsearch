/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** @type {?} */
var range = require('lodash/range');
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectPagination } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisPagination = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisPagination, _super);
    function NgAisPagination(instantSearchParent) {
        var _this = _super.call(this, 'Pagination') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showFirst = true;
        _this.showLast = false;
        _this.showPrevious = true;
        _this.showNext = true;
        _this.padding = 3;
        _this.state = {
            createURL: noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisPagination.prototype, "pages", {
        get: /**
         * @return {?}
         */
        function () {
            var _a = this.state, nbPages = _a.nbPages, currentRefinement = _a.currentRefinement;
            /** @type {?} */
            var pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
            /** @type {?} */
            var pagesPadding = typeof this.padding === 'string'
                ? parseInt(this.padding, 10)
                : this.padding;
            if (pagesPadding && pagesPadding > 0) {
                // should not display pages that does not exists
                if (nbPages < pagesPadding * 2 + 1) {
                    return pagesArray;
                }
                /** @type {?} */
                var minDelta = currentRefinement - pagesPadding - 1;
                /** @type {?} */
                var maxDelta = currentRefinement + pagesPadding + 1;
                if (minDelta < 0) {
                    return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
                }
                if (maxDelta > nbPages) {
                    return range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
                }
                return range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
            }
            return pagesArray;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisPagination.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectPagination, {
            maxPages: parseNumberInput(this.totalPages),
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} page
     * @return {?}
     */
    NgAisPagination.prototype.refine = /**
     * @param {?} event
     * @param {?} page
     * @return {?}
     */
    function (event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page < 0 ||
            page === this.state.currentRefinement ||
            page >= this.state.nbPages) {
            return;
        }
        this.state.refine(page);
    };
    NgAisPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ais-pagination',
                    template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngIf=\"showFirst\"\n          (click)=\"refine($event, 0)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'firstPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(0)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\u2039\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showPrevious\"\n          (click)=\"refine($event, state.currentRefinement - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'previousPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\n          </a>\n        </li>\n\n        <li\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'page') +\n            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n          \"\n          *ngFor=\"let page of pages\"\n          (click)=\"refine($event, page)\"\n        >\n          <a\n            [class]=\"cx('link')\"\n            [href]=\"state.createURL(page)\"\n          >\n            {{page + 1}}\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showNext\"\n          (click)=\"refine($event, state.currentRefinement + 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'nextPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement + 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showLast\"\n          (click)=\"refine($event, state.nbPages - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'lastPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.nbPages - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\u203A\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisPagination.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisPagination.propDecorators = {
        showFirst: [{ type: Input }],
        showLast: [{ type: Input }],
        showPrevious: [{ type: Input }],
        showNext: [{ type: Input }],
        padding: [{ type: Input }],
        totalPages: [{ type: Input }]
    };
    return NgAisPagination;
}(BaseWidget));
export { NgAisPagination };
if (false) {
    /** @type {?} */
    NgAisPagination.prototype.showFirst;
    /** @type {?} */
    NgAisPagination.prototype.showLast;
    /** @type {?} */
    NgAisPagination.prototype.showPrevious;
    /** @type {?} */
    NgAisPagination.prototype.showNext;
    /** @type {?} */
    NgAisPagination.prototype.padding;
    /** @type {?} */
    NgAisPagination.prototype.totalPages;
    /** @type {?} */
    NgAisPagination.prototype.state;
    /** @type {?} */
    NgAisPagination.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24vcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxEO0lBa0dxQywyQ0FBVTtJQTZEN0MseUJBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sWUFBWSxDQUFDLFNBQ3BCO1FBSFEseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBOURqQyxpQkFBaUI7UUFDRCxlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixhQUFPLEdBQW9CLENBQUMsQ0FBQztRQUt0QyxXQUFLLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLGlCQUFpQixFQUFFLENBQUM7WUFDcEIsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQzs7SUFpREYsQ0FBQztJQS9DRCxzQkFBSSxrQ0FBSzs7OztRQUFUO1lBQ1EsSUFBQSxlQUEyQyxFQUF6QyxvQkFBTyxFQUFFLHdDQUFpQjs7Z0JBRTVCLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDM0QsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQ1A7O2dCQUVLLFlBQVksR0FDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVE7Z0JBQzlCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUVsQixJQUFJLFlBQVksSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQyxnREFBZ0Q7Z0JBQ2hELElBQUksT0FBTyxHQUFHLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxPQUFPLFVBQVUsQ0FBQztpQkFDbkI7O29CQUVLLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsQ0FBQzs7b0JBQy9DLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsQ0FBQztnQkFFckQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDeEU7Z0JBRUQsSUFBSSxRQUFRLEdBQUcsT0FBTyxFQUFFO29CQUN0QixPQUFPLEtBQUssQ0FDVixpQkFBaUIsR0FBRyxZQUFZLEdBQUcsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEVBQ3ZELE9BQU8sQ0FDUixDQUFDO2lCQUNIO2dCQUVELE9BQU8sS0FBSyxDQUNWLGlCQUFpQixHQUFHLFlBQVksRUFDaEMsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FDckMsQ0FBQzthQUNIO1lBRUQsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7Ozs7SUFTTSxrQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFO1lBQ25DLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUNILGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLGdDQUFNOzs7OztJQUFiLFVBQWMsS0FBaUIsRUFBRSxJQUFZO1FBQzNDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFDRSxJQUFJLEdBQUcsQ0FBQztZQUNSLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtZQUNyQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQzFCO1lBQ0EsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Z0JBMUxGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsNmdGQThGVDtpQkFDRjs7O2dEQStESSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7OzRCQTVEN0MsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUdMLEtBQUs7O0lBZ0ZSLHNCQUFDO0NBQUEsQUEzTEQsQ0FrR3FDLFVBQVUsR0F5RjlDO1NBekZZLGVBQWU7OztJQUUxQixvQ0FBMEM7O0lBQzFDLG1DQUEwQzs7SUFDMUMsdUNBQTZDOztJQUM3QyxtQ0FBeUM7O0lBQ3pDLGtDQUE2Qzs7SUFHN0MscUNBQTZDOztJQUU3QyxnQ0FNRTs7SUE2Q0EsOENBQytCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmFuZ2UgPSByZXF1aXJlKCdsb2Rhc2gvcmFuZ2UnKTtcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdFBhZ2luYXRpb24gfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd0ZpcnN0XCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgMClcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ2ZpcnN0UGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gMCA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTCgwKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg4oC54oC5XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd1ByZXZpb3VzXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgc3RhdGUuY3VycmVudFJlZmluZW1lbnQgLSAxKVwiXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAncHJldmlvdXNQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ID09PSAwID8gJyAnICsgY3goJ2l0ZW0nLCAnZGlzYWJsZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50IC0gMSlcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOKAuVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICdwYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ID09PSBwYWdlID8gJyAnICsgY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgcGFnZXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBwYWdlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHBhZ2UpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7e3BhZ2UgKyAxfX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nSWY9XCJzaG93TmV4dFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ25leHRQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSA9PT0gc3RhdGUubmJQYWdlcyA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDigLpcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nSWY9XCJzaG93TGFzdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLm5iUGFnZXMgLSAxKVwiXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAnbGFzdFBhZ2UnKSArXG4gICAgICAgICAgICAoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgKyAxID09PSBzdGF0ZS5uYlBhZ2VzID8gJyAnICsgY3goJ2l0ZW0nLCAnZGlzYWJsZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHN0YXRlLm5iUGFnZXMgLSAxKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg4oC64oC6XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNQYWdpbmF0aW9uIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93Rmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0xhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNob3dQcmV2aW91czogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TmV4dDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWRkaW5nOiBudW1iZXIgfCBzdHJpbmcgPSAzO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zd1xuICBASW5wdXQoKSBwdWJsaWMgdG90YWxQYWdlcz86IG51bWJlciB8IHN0cmluZztcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGN1cnJlbnRSZWZpbmVtZW50OiAwLFxuICAgIG5iSGl0czogMCxcbiAgICBuYlBhZ2VzOiAwLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgcGFnZXMoKSB7XG4gICAgY29uc3QgeyBuYlBhZ2VzLCBjdXJyZW50UmVmaW5lbWVudCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHBhZ2VzQXJyYXkgPSBBcnJheS5hcHBseShudWxsLCB7IGxlbmd0aDogbmJQYWdlcyB9KS5tYXAoXG4gICAgICBOdW1iZXIuY2FsbCxcbiAgICAgIE51bWJlclxuICAgICk7XG5cbiAgICBjb25zdCBwYWdlc1BhZGRpbmcgPVxuICAgICAgdHlwZW9mIHRoaXMucGFkZGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBwYXJzZUludCh0aGlzLnBhZGRpbmcsIDEwKVxuICAgICAgICA6IHRoaXMucGFkZGluZztcblxuICAgIGlmIChwYWdlc1BhZGRpbmcgJiYgcGFnZXNQYWRkaW5nID4gMCkge1xuICAgICAgLy8gc2hvdWxkIG5vdCBkaXNwbGF5IHBhZ2VzIHRoYXQgZG9lcyBub3QgZXhpc3RzXG4gICAgICBpZiAobmJQYWdlcyA8IHBhZ2VzUGFkZGluZyAqIDIgKyAxKSB7XG4gICAgICAgIHJldHVybiBwYWdlc0FycmF5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtaW5EZWx0YSA9IGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nIC0gMTtcbiAgICAgIGNvbnN0IG1heERlbHRhID0gY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyAxO1xuXG4gICAgICBpZiAobWluRGVsdGEgPCAwKSB7XG4gICAgICAgIHJldHVybiByYW5nZSgwLCBjdXJyZW50UmVmaW5lbWVudCArIHBhZ2VzUGFkZGluZyArIE1hdGguYWJzKG1pbkRlbHRhKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhEZWx0YSA+IG5iUGFnZXMpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlKFxuICAgICAgICAgIGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nIC0gKG1heERlbHRhIC0gbmJQYWdlcyksXG4gICAgICAgICAgbmJQYWdlc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmFuZ2UoXG4gICAgICAgIGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nLFxuICAgICAgICBjdXJyZW50UmVmaW5lbWVudCArIHBhZ2VzUGFkZGluZyArIDFcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2VzQXJyYXk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdQYWdpbmF0aW9uJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFBhZ2luYXRpb24sIHtcbiAgICAgIG1heFBhZ2VzOiBwYXJzZU51bWJlcklucHV0KHRoaXMudG90YWxQYWdlcyksXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoZXZlbnQ6IE1vdXNlRXZlbnQsIHBhZ2U6IG51bWJlcikge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoXG4gICAgICBwYWdlIDwgMCB8fFxuICAgICAgcGFnZSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UmVmaW5lbWVudCB8fFxuICAgICAgcGFnZSA+PSB0aGlzLnN0YXRlLm5iUGFnZXNcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLnJlZmluZShwYWdlKTtcbiAgfVxufVxuIl19