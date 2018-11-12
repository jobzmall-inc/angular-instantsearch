/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisMenu = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisMenu, _super);
    function NgAisMenu(instantSearchParent) {
        var _this = _super.call(this, 'Menu') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more';
        _this.showLessLabel = 'Show less';
        _this.limit = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "showMoreClass", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var className = this.cx('showMore');
            if (!this.state.canToggleShowMore) {
                className = className + " " + this.cx('showMore', 'disabled');
            }
            return className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "items", {
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
    NgAisMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    NgAisMenu.prototype.handleClick = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <span [class]=\"cx('label')\">{{item.label}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n        [class]=\"showMoreClass\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisMenu.propDecorators = {
        showMoreLabel: [{ type: Input }],
        showLessLabel: [{ type: Input }],
        transformItems: [{ type: Input }],
        attribute: [{ type: Input }],
        limit: [{ type: Input }],
        showMoreLimit: [{ type: Input }],
        sortBy: [{ type: Input }]
    };
    return NgAisMenu;
}(BaseWidget));
export { NgAisMenu };
if (false) {
    /** @type {?} */
    NgAisMenu.prototype.showMoreLabel;
    /** @type {?} */
    NgAisMenu.prototype.showLessLabel;
    /** @type {?} */
    NgAisMenu.prototype.transformItems;
    /** @type {?} */
    NgAisMenu.prototype.attribute;
    /** @type {?} */
    NgAisMenu.prototype.limit;
    /** @type {?} */
    NgAisMenu.prototype.showMoreLimit;
    /** @type {?} */
    NgAisMenu.prototype.sortBy;
    /** @type {?} */
    NgAisMenu.prototype.state;
    /** @type {?} */
    NgAisMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbIm1lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBWWxEO0lBa0MrQixxQ0FBVTtJQTBDdkMsbUJBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sTUFBTSxDQUFDLFNBQ2Q7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUEzQ2pDLGlCQUFpQjtRQUNELG1CQUFhLEdBQVcsV0FBVyxDQUFDO1FBQ3BDLG1CQUFhLEdBQVcsV0FBVyxDQUFDO1FBS3BDLFdBQUssR0FBcUIsRUFBRSxDQUFDO1FBSXRDLFdBQUssR0FBYztZQUN4QixTQUFTLEVBQUUsS0FBSztZQUNoQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7O0lBMkJGLENBQUM7SUF6QkQsc0JBQUksK0JBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBYTs7OztRQUFqQjs7Z0JBQ00sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO2dCQUNqQyxTQUFTLEdBQU0sU0FBUyxTQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBRyxDQUFDO2FBQy9EO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0QkFBSzs7OztRQUFUO1lBQ0UsT0FBTyxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtnQkFDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7T0FBQTs7OztJQVNNLDRCQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzdCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ25ELGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBRUgsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRUQsK0JBQVc7Ozs7O0lBQVgsVUFBWSxLQUFpQixFQUFFLEtBQWE7UUFDMUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOztnQkFuR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsNjJCQThCVDtpQkFDRjs7O2dEQTRDSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7O2dDQXpDN0MsS0FBSztnQ0FDTCxLQUFLO2lDQUNMLEtBQUs7NEJBR0wsS0FBSzt3QkFDTCxLQUFLO2dDQUNMLEtBQUs7eUJBQ0wsS0FBSzs7SUF3RFIsZ0JBQUM7Q0FBQSxBQXBHRCxDQWtDK0IsVUFBVSxHQWtFeEM7U0FsRVksU0FBUzs7O0lBRXBCLGtDQUFvRDs7SUFDcEQsa0NBQW9EOztJQUNwRCxtQ0FBMEM7O0lBRzFDLDhCQUFrQzs7SUFDbEMsMEJBQTZDOztJQUM3QyxrQ0FBZ0Q7O0lBQ2hELDJCQUErRDs7SUFFL0QsMEJBUUU7O0lBdUJBLHdDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0TWVudSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE1lbnVTdGF0ZSA9IHtcbiAgY2FuUmVmaW5lOiBib29sZWFuO1xuICBjYW5Ub2dnbGVTaG93TW9yZTogYm9vbGVhbjtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXNTaG93aW5nTW9yZTogYm9vbGVhbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHRvZ2dsZVNob3dNb3JlOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cInt7c3RhdGUuY3JlYXRlVVJMKGl0ZW0udmFsdWUpfX1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICAqbmdJZj1cInNob3dNb3JlTGltaXQgJiYgc3RhdGUuY2FuVG9nZ2xlU2hvd01vcmVcIlxuICAgICAgICAoY2xpY2spPVwic3RhdGUudG9nZ2xlU2hvd01vcmUoKVwiXG4gICAgICAgIFtjbGFzc109XCJzaG93TW9yZUNsYXNzXCJcbiAgICAgID5cbiAgICAgICAge3tzdGF0ZS5pc1Nob3dpbmdNb3JlID8gc2hvd0xlc3NMYWJlbCA6IHNob3dNb3JlTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTWVudSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TGVzc0xhYmVsOiBzdHJpbmcgPSAnU2hvdyBsZXNzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG5cbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbGltaXQ/OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGltaXQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3J0Qnk/OiBzdHJpbmdbXSB8ICgoaXRlbTogb2JqZWN0KSA9PiBudW1iZXIpO1xuXG4gIHB1YmxpYyBzdGF0ZTogTWVudVN0YXRlID0ge1xuICAgIGNhblJlZmluZTogZmFsc2UsXG4gICAgY2FuVG9nZ2xlU2hvd01vcmU6IGZhbHNlLFxuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpc1Nob3dpbmdNb3JlOiBmYWxzZSxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHRvZ2dsZVNob3dNb3JlOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGdldCBzaG93TW9yZUNsYXNzKCkge1xuICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmN4KCdzaG93TW9yZScpO1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlLmNhblRvZ2dsZVNob3dNb3JlKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnc2hvd01vcmUnLCAnZGlzYWJsZWQnKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc05hbWU7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXModGhpcy5zdGF0ZS5pdGVtcylcbiAgICAgIDogdGhpcy5zdGF0ZS5pdGVtcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ01lbnUnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0TWVudSwge1xuICAgICAgbGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5saW1pdCksXG4gICAgICBzaG93TW9yZUxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMuc2hvd01vcmVMaW1pdCksXG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUodmFsdWUpO1xuICB9XG59XG4iXX0=