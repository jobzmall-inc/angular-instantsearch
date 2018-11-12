/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisHitsPerPage = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisHitsPerPage, _super);
    function NgAisHitsPerPage(instantSearchParent) {
        var _this = _super.call(this, 'HitsPerPage') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisHitsPerPage.prototype, "isHidden", {
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
    NgAisHitsPerPage.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectHitsPerPage, { items: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisHitsPerPage.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hits-per-page',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.items\"\n          [value]=\"item.value\"\n          [selected]=\"item.isRefined\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisHitsPerPage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisHitsPerPage.propDecorators = {
        items: [{ type: Input }]
    };
    return NgAisHitsPerPage;
}(BaseWidget));
export { NgAisHitsPerPage };
if (false) {
    /** @type {?} */
    NgAisHitsPerPage.prototype.items;
    /** @type {?} */
    NgAisHitsPerPage.prototype.state;
    /** @type {?} */
    NgAisHitsPerPage.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0cy1wZXItcGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImhpdHMtcGVyLXBhZ2UvaGl0cy1wZXItcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFPaEM7SUF1QnNDLDRDQUFVO0lBaUI5QywwQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxhQUFhLENBQUMsU0FDckI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFYMUIsV0FBSyxHQUF3QjtZQUNsQyxLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQzs7SUFXRixDQUFDO0lBVEQsc0JBQUksc0NBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7Ozs7SUFTTSxtQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzdELGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLCtiQW1CVDtpQkFDRjs7O2dEQW1CSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7O3dCQWpCN0MsS0FBSzs7SUEyQlIsdUJBQUM7Q0FBQSxBQW5ERCxDQXVCc0MsVUFBVSxHQTRCL0M7U0E1QlksZ0JBQWdCOzs7SUFDM0IsaUNBS0k7O0lBRUosaUNBR0U7O0lBT0EsK0NBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RIaXRzUGVyUGFnZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJlc3VsdHNQZXJQYWdlU3RhdGUgPSB7XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpdHMtcGVyLXBhZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8c2VsZWN0XG4gICAgICAgIFtjbGFzc109XCJjeCgnc2VsZWN0JylcIlxuICAgICAgICAoY2hhbmdlKT1cInN0YXRlLnJlZmluZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ29wdGlvbicpXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5pdGVtc1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJpdGVtLmlzUmVmaW5lZFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpdHNQZXJQYWdlIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpdGVtczoge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBkZWZhdWx0PzogYm9vbGVhbjtcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogUmVzdWx0c1BlclBhZ2VTdGF0ZSA9IHtcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0hpdHNQZXJQYWdlJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEhpdHNQZXJQYWdlLCB7IGl0ZW1zOiB0aGlzLml0ZW1zIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiJdfQ==