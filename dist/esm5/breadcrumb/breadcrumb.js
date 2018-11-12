/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectBreadcrumb } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisBreadcrumb = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisBreadcrumb, _super);
    function NgAisBreadcrumb(instantSearchParent) {
        var _this = _super.call(this, 'Breadcrumb') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisBreadcrumb.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisBreadcrumb.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.state.items.map(function (item, idx) { return (tslib_1.__assign({}, item, { separator: idx !== 0, isLast: idx === _this.state.items.length - 1 })); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisBreadcrumb.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisBreadcrumb.prototype.handleClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    };
    NgAisBreadcrumb.decorators = [
        { type: Component, args: [{
                    selector: 'ais-breadcrumb',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of items\"\n          [class]=\"cx('item', item.isLast ? 'selected' : undefined)\"\n          (click)=\"handleClick($event, item)\"\n        >\n          <span\n            *ngIf=\"item.separator\"\n            [class]=\"cx('separator')\"\n            aria-hidden=\"true\"\n          >\n            >\n          </span>\n          <a\n            [class]=\"cx('link')\"\n            href=\"{{state.createURL(item.value)}}\"\n            *ngIf=\"!item.isLast\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.name}}\n          </a>\n\n          <span *ngIf=\"item.isLast\">\n            {{item.name}}\n          </span>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisBreadcrumb.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisBreadcrumb.propDecorators = {
        attributes: [{ type: Input }],
        rootPath: [{ type: Input }]
    };
    return NgAisBreadcrumb;
}(BaseWidget));
export { NgAisBreadcrumb };
if (false) {
    /** @type {?} */
    NgAisBreadcrumb.prototype.attributes;
    /** @type {?} */
    NgAisBreadcrumb.prototype.rootPath;
    /** @type {?} */
    NgAisBreadcrumb.prototype.state;
    /** @type {?} */
    NgAisBreadcrumb.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImJyZWFkY3J1bWIvYnJlYWRjcnVtYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFhaEM7SUFxQ3FDLDJDQUFVO0lBdUI3Qyx5QkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxZQUFZLENBQUMsU0FDcEI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFSMUIsV0FBSyxHQUFvQjtZQUM5QixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDOztJQU9GLENBQUM7SUF2QkQsc0JBQUkscUNBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBSzs7OztRQUFUO1lBQUEsaUJBTUM7WUFMQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxHQUFHLElBQUssT0FBQSxzQkFDdEMsSUFBSSxJQUNQLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUNwQixNQUFNLEVBQUUsR0FBRyxLQUFLLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQzNDLEVBSnlDLENBSXpDLENBQUMsQ0FBQztRQUNOLENBQUM7OztPQUFBOzs7O0lBZU0sa0NBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUMsQ0FBQztRQUVILGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLHFDQUFXOzs7OztJQUFsQixVQUFtQixLQUFpQixFQUFFLElBQW9CO1FBQ3hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Z0JBbkZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsODBCQWlDVDtpQkFDRjs7O2dEQXlCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7OzZCQXRCN0MsS0FBSzsyQkFDTCxLQUFLOztJQTRDUixzQkFBQztDQUFBLEFBcEZELENBcUNxQyxVQUFVLEdBK0M5QztTQS9DWSxlQUFlOzs7SUFFMUIscUNBQXFDOztJQUNyQyxtQ0FBa0M7O0lBY2xDLGdDQUlFOztJQUdBLDhDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdEJyZWFkY3J1bWIgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBCcmVhZGNydW1iU3RhdGUgPSB7XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuZXhwb3J0IHR5cGUgQnJlYWRjcnVtYkl0ZW0gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nLCBpdGVtLmlzTGFzdCA/ICdzZWxlY3RlZCcgOiB1bmRlZmluZWQpXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nSWY9XCJpdGVtLnNlcGFyYXRvclwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ3NlcGFyYXRvcicpXCJcbiAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgaHJlZj1cInt7c3RhdGUuY3JlYXRlVVJMKGl0ZW0udmFsdWUpfX1cIlxuICAgICAgICAgICAgKm5nSWY9XCIhaXRlbS5pc0xhc3RcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7aXRlbS5uYW1lfX1cbiAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaXNMYXN0XCI+XG4gICAgICAgICAgICB7e2l0ZW0ubmFtZX19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNCcmVhZGNydW1iIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGVzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgcHVibGljIHJvb3RQYXRoPzogc3RyaW5nO1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5tYXAoKGl0ZW0sIGlkeCkgPT4gKHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICBzZXBhcmF0b3I6IGlkeCAhPT0gMCxcbiAgICAgIGlzTGFzdDogaWR4ID09PSB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAtIDEsXG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRlOiBCcmVhZGNydW1iU3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQnJlYWRjcnVtYicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RCcmVhZGNydW1iLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICByb290UGF0aDogdGhpcy5yb290UGF0aCxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEJyZWFkY3J1bWJJdGVtKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmIChpdGVtLnZhbHVlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==