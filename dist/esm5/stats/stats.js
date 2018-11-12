/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, TemplateRef, Inject, forwardRef, } from '@angular/core';
import { connectStats } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
var NgAisStats = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisStats, _super);
    function NgAisStats(instantSearchParent) {
        var _this = _super.call(this, 'Stats') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: '',
        };
        _this.createWidget(connectStats);
        return _this;
    }
    Object.defineProperty(NgAisStats.prototype, "templateContext", {
        get: /**
         * @return {?}
         */
        function () {
            return { state: this.state };
        },
        enumerable: true,
        configurable: true
    });
    NgAisStats.decorators = [
        { type: Component, args: [{
                    selector: 'ais-stats',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <span *ngIf=\"!template\" [class]=\"cx('text')\">\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </span>\n    </div>\n  ",
                },] },
    ];
    NgAisStats.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisStats.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return NgAisStats;
}(BaseWidget));
export { NgAisStats };
if (false) {
    /** @type {?} */
    NgAisStats.prototype.template;
    /** @type {?} */
    NgAisStats.prototype.state;
    /** @type {?} */
    NgAisStats.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJzdGF0cy9zdGF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFcEU7SUFhZ0Msc0NBQVU7SUFnQnhDLG9CQUVTLG1CQUF3QjtRQUZqQyxZQUlFLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBSlEseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBZjFCLFdBQUssR0FBRztZQUNiLFVBQVUsRUFBRSxDQUFDO1lBQ2IsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFXQSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUNsQyxDQUFDO0lBVkQsc0JBQUksdUNBQWU7Ozs7UUFBbkI7WUFDRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLHVTQVNUO2lCQUNGOzs7Z0RBa0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7MkJBaEI3QyxZQUFZLFNBQUMsV0FBVzs7SUFzQjNCLGlCQUFDO0NBQUEsQUFwQ0QsQ0FhZ0MsVUFBVSxHQXVCekM7U0F2QlksVUFBVTs7O0lBQ3JCLDhCQUFnRDs7SUFFaEQsMkJBT0U7O0lBT0EseUNBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuXG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXN0YXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFwiPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2NsYXNzXT1cImN4KCd0ZXh0JylcIj5cbiAgICAgICAge3tzdGF0ZS5uYkhpdHN9fSByZXN1bHRzIGZvdW5kIGluIHt7c3RhdGUucHJvY2Vzc2luZ1RpbWVNU319bXMuXG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU3RhdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBhbnk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhpdFBlclBhZ2U6IDAsXG4gICAgbmJIaXRzOiAwLFxuICAgIG5iUGFnZXM6IDAsXG4gICAgcGFnZTogMCxcbiAgICBwcm9jZXNzaW5nVGltZU1TOiAwLFxuICAgIHF1ZXJ5OiAnJyxcbiAgfTtcblxuICBnZXQgdGVtcGxhdGVDb250ZXh0KCkge1xuICAgIHJldHVybiB7IHN0YXRlOiB0aGlzLnN0YXRlIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTdGF0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTdGF0cyk7XG4gIH1cbn1cbiJdfQ==