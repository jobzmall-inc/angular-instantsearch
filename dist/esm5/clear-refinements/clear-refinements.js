/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectClearAll } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisClearRefinements = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisClearRefinements, _super);
    function NgAisClearRefinements(instantSearchParent) {
        var _this = _super.call(this, 'ClearRefinements') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.buttonLabel = 'Clear refinements';
        _this.clearsQuery = false;
        _this.excludeAttributes = [];
        _this.state = {
            hasRefinements: false,
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisClearRefinements.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.state.hasRefinements && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisClearRefinements.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisClearRefinements.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    };
    NgAisClearRefinements.decorators = [
        { type: Component, args: [{
                    selector: 'ais-clear-refinements',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n        (click)=\"handleClick($event)\"\n        [disabled]=\"!state.hasRefinements\"\n      >\n        {{buttonLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisClearRefinements.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisClearRefinements.propDecorators = {
        buttonLabel: [{ type: Input }],
        clearsQuery: [{ type: Input }],
        excludeAttributes: [{ type: Input }]
    };
    return NgAisClearRefinements;
}(BaseWidget));
export { NgAisClearRefinements };
if (false) {
    /** @type {?} */
    NgAisClearRefinements.prototype.buttonLabel;
    /** @type {?} */
    NgAisClearRefinements.prototype.clearsQuery;
    /** @type {?} */
    NgAisClearRefinements.prototype.excludeAttributes;
    /** @type {?} */
    NgAisClearRefinements.prototype.state;
    /** @type {?} */
    NgAisClearRefinements.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItcmVmaW5lbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJjbGVhci1yZWZpbmVtZW50cy9jbGVhci1yZWZpbmVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWhDO0lBaUIyQyxpREFBVTtJQWNuRCwrQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUMxQjtRQUhRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQWZqQixpQkFBVyxHQUFXLG1CQUFtQixDQUFDO1FBQzFDLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLHVCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUUxQyxXQUFLLEdBQUc7WUFDYixjQUFjLEVBQUUsS0FBSztZQUNyQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7O0lBV0YsQ0FBQztJQVRELHNCQUFJLDJDQUFROzs7O1FBQVo7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzlELENBQUM7OztPQUFBOzs7O0lBU00sd0NBQVE7OztJQUFmO1FBQ0UsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ2pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1NBQzFDLENBQUMsQ0FBQztRQUVILGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRU0sMkNBQVc7Ozs7SUFBbEIsVUFBbUIsS0FBaUI7UUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7O2dCQXRERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLG1WQWFUO2lCQUNGOzs7Z0RBZ0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7OEJBZDdDLEtBQUs7OEJBQ0wsS0FBSztvQ0FDTCxLQUFLOztJQW1DUiw0QkFBQztDQUFBLEFBdkRELENBaUIyQyxVQUFVLEdBc0NwRDtTQXRDWSxxQkFBcUI7OztJQUNoQyw0Q0FBMEQ7O0lBQzFELDRDQUE2Qzs7SUFDN0Msa0RBQWlEOztJQUVqRCxzQ0FHRTs7SUFPQSxvREFDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RDbGVhckFsbCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1jbGVhci1yZWZpbmVtZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdidXR0b24nKSArICghc3RhdGUuaGFzUmVmaW5lbWVudHMgPyAoJyAnICsgY3goJ2J1dHRvbicsICdkaXNhYmxlZCcpKSA6ICcnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFzdGF0ZS5oYXNSZWZpbmVtZW50c1wiXG4gICAgICA+XG4gICAgICAgIHt7YnV0dG9uTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ2xlYXJSZWZpbmVtZW50cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKSBwdWJsaWMgYnV0dG9uTGFiZWw6IHN0cmluZyA9ICdDbGVhciByZWZpbmVtZW50cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcnNRdWVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUF0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW107XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhhc1JlZmluZW1lbnRzOiBmYWxzZSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiAhdGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cyAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ2xlYXJSZWZpbmVtZW50cycpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIHdlIG5lZWQgdG8gYGNyZWF0ZVdpZGdldGAgZnJvbSBgbmdPbkluaXRgIHRvIGhhdmUgYEBJbnB1dCgpYCBpbnRpYWxpemVkXG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdENsZWFyQWxsLCB7XG4gICAgICBjbGVhcnNRdWVyeTogdGhpcy5jbGVhcnNRdWVyeSxcbiAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVzOiB0aGlzLmV4Y2x1ZGVBdHRyaWJ1dGVzLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cykge1xuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==