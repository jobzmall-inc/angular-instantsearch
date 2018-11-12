/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectStarRating } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisRatingMenu = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisRatingMenu, _super);
    function NgAisRatingMenu(instantSearchParent) {
        var _this = _super.call(this, 'RatingMenu') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.andUpLabel = '& Up';
        _this.max = 5;
        _this.state = {
            createURL: noop,
            hasNoResults: false,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisRatingMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRatingMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectStarRating, {
            attributeName: this.attribute,
            max: this.max,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    NgAisRatingMenu.prototype.handleClick = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisRatingMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-rating-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <svg style=\"display:none;\">\n        <symbol\n          id=\"ais-StarRating-starSymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n        </symbol>\n        <symbol\n          id=\"ais-StarRating-starEmptySymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n        </symbol>\n      </svg>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of state.items\"\n          [class]=\"getItemClass(item)\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <svg\n              *ngFor=\"let star of item.stars\"\n              [ngClass]=\"cx('starIcon')\"\n              aria-hidden=\"true\"\n            >\n              <use\n                *ngIf=\"star\"\n                xlink:href=\"#ais-StarRating-starSymbol\"\n              >\n              </use>\n\n              <use\n                *ngIf=\"!star\"\n                xlink:href=\"#ais-StarRating-starEmptySymbol\"\n              >\n              </use>\n            </svg>\n\n            <span [class]=\"cx('label')\" aria-hidden=\"true\">{{andUpLabel}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisRatingMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRatingMenu.propDecorators = {
        andUpLabel: [{ type: Input }],
        attribute: [{ type: Input }],
        max: [{ type: Input }]
    };
    return NgAisRatingMenu;
}(BaseWidget));
export { NgAisRatingMenu };
if (false) {
    /** @type {?} */
    NgAisRatingMenu.prototype.andUpLabel;
    /** @type {?} */
    NgAisRatingMenu.prototype.attribute;
    /** @type {?} */
    NgAisRatingMenu.prototype.max;
    /** @type {?} */
    NgAisRatingMenu.prototype.state;
    /** @type {?} */
    NgAisRatingMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJyYXRpbmctbWVudS9yYXRpbmctbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFTaEM7SUErRHFDLDJDQUFVO0lBbUI3Qyx5QkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxZQUFZLENBQUMsU0FDcEI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFwQmpDLGlCQUFpQjtRQUNELGdCQUFVLEdBQVcsTUFBTSxDQUFDO1FBSTVCLFNBQUcsR0FBWSxDQUFDLENBQUM7UUFFMUIsV0FBSyxHQUFvQjtZQUM5QixTQUFTLEVBQUUsSUFBSTtZQUNmLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDOztJQVdGLENBQUM7SUFURCxzQkFBSSxxQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQVNNLGtDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUU7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNkLENBQUMsQ0FBQztRQUNILGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLHFDQUFXOzs7OztJQUFsQixVQUFtQixLQUFpQixFQUFFLEtBQWE7UUFDakQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOztnQkF0R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw2NURBMkRUO2lCQUNGOzs7Z0RBcUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7NkJBbEI3QyxLQUFLOzRCQUdMLEtBQUs7c0JBQ0wsS0FBSzs7SUFrQ1Isc0JBQUM7Q0FBQSxBQXZHRCxDQStEcUMsVUFBVSxHQXdDOUM7U0F4Q1ksZUFBZTs7O0lBRTFCLHFDQUE0Qzs7SUFHNUMsb0NBQWtDOztJQUNsQyw4QkFBaUM7O0lBRWpDLGdDQUtFOztJQU9BLDhDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhclJhdGluZyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJhdGluZ01lbnVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaGFzTm9SZXN1bHRzOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYXRpbmctbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxzdmcgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XG4gICAgICAgIDxzeW1ib2xcbiAgICAgICAgICBpZD1cImFpcy1TdGFyUmF0aW5nLXN0YXJTeW1ib2xcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgLjI4OGwyLjgzMyA4LjcxOGg5LjE2N2wtNy40MTcgNS4zODkgMi44MzMgOC43MTgtNy40MTYtNS4zODgtNy40MTcgNS4zODggMi44MzMtOC43MTgtNy40MTYtNS4zODloOS4xNjd6XCIvPlxuICAgICAgICA8L3N5bWJvbD5cbiAgICAgICAgPHN5bWJvbFxuICAgICAgICAgIGlkPVwiYWlzLVN0YXJSYXRpbmctc3RhckVtcHR5U3ltYm9sXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgID5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDYuNzZsMS4zNzkgNC4yNDZoNC40NjVsLTMuNjEyIDIuNjI1IDEuMzc5IDQuMjQ2LTMuNjExLTIuNjI1LTMuNjEyIDIuNjI1IDEuMzc5LTQuMjQ2LTMuNjEyLTIuNjI1aDQuNDY1bDEuMzgtNC4yNDZ6bTAtNi40NzJsLTIuODMzIDguNzE4aC05LjE2N2w3LjQxNiA1LjM4OS0yLjgzMyA4LjcxOCA3LjQxNy01LjM4OCA3LjQxNiA1LjM4OC0yLjgzMy04LjcxOCA3LjQxNy01LjM4OWgtOS4xNjdsLTIuODMzLTguNzE4elwiLz5cbiAgICAgICAgPC9zeW1ib2w+XG4gICAgICA8L3N2Zz5cblxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cInt7c3RhdGUuY3JlYXRlVVJMKGl0ZW0udmFsdWUpfX1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHN0YXIgb2YgaXRlbS5zdGFyc1wiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdGFySWNvbicpXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHVzZVxuICAgICAgICAgICAgICAgICpuZ0lmPVwic3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyU3ltYm9sXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L3VzZT5cblxuICAgICAgICAgICAgICA8dXNlXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhc3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyRW1wdHlTeW1ib2xcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvdXNlPlxuICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7YW5kVXBMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYXRpbmdNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmRVcExhYmVsOiBzdHJpbmcgPSAnJiBVcCc7XG5cbiAgLy8gY29ubmVjdG9ycyBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciA9IDU7XG5cbiAgcHVibGljIHN0YXRlOiBSYXRpbmdNZW51U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGhhc05vUmVzdWx0czogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYXRpbmdNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFN0YXJSYXRpbmcsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlKTtcbiAgfVxufVxuIl19