/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Input, TemplateRef, Inject, forwardRef, } from '@angular/core';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisInfiniteHits = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisInfiniteHits, _super);
    function NgAisInfiniteHits(instantSearchParent) {
        var _this = _super.call(this, 'InfiniteHits') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more results';
        // inner widget state returned from connector
        _this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {},
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = tslib_1.__assign({}, state, { results: state.results, hits: typeof _this.transformItems === 'function'
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectInfiniteHits, { escapeHits: true });
        return _this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisInfiniteHits.prototype.showMore = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.state.showMore();
    };
    NgAisInfiniteHits.decorators = [
        { type: Component, args: [{
                    selector: 'ais-infinite-hits',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n\n      <button\n        [class]=\"cx('showMore')\"\n        (click)=\"showMore($event)\"\n        [disabled]=\"state.isLastPage\"\n        *ngIf=\"!template\"\n      >\n        {{showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisInfiniteHits.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisInfiniteHits.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        showMoreLabel: [{ type: Input }],
        transformItems: [{ type: Input }]
    };
    return NgAisInfiniteHits;
}(BaseWidget));
export { NgAisInfiniteHits };
if (false) {
    /** @type {?} */
    NgAisInfiniteHits.prototype.template;
    /** @type {?} */
    NgAisInfiniteHits.prototype.showMoreLabel;
    /** @type {?} */
    NgAisInfiniteHits.prototype.transformItems;
    /** @type {?} */
    NgAisInfiniteHits.prototype.state;
    /** @type {?} */
    NgAisInfiniteHits.prototype.updateState;
    /** @type {?} */
    NgAisInfiniteHits.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtaGl0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImluZmluaXRlLWhpdHMvaW5maW5pdGUtaGl0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVoQztJQThCdUMsNkNBQVU7SUFvQi9DLDJCQUVTLG1CQUF3QjtRQUZqQyxZQUlFLGtCQUFNLGNBQWMsQ0FBQyxTQUV0QjtRQUpRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQW5CakMsaUJBQWlCO1FBQ0QsbUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztRQUc1RCw2Q0FBNkM7UUFDdEMsV0FBSyxHQUtSO1lBQ0YsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztRQWVGLGlCQUFXLEdBQUcsVUFBQyxLQUFLLEVBQUUsZ0JBQXlCO1lBQzdDLElBQUksZ0JBQWdCO2dCQUFFLE9BQU87WUFFN0IsS0FBSSxDQUFDLEtBQUssd0JBQ0wsS0FBSyxJQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUN0QixJQUFJLEVBQ0YsT0FBTyxLQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7b0JBQ3ZDLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUNqQixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBbkJBLEtBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQzs7Ozs7SUFFTSxvQ0FBUTs7OztJQUFmLFVBQWdCLEtBQWlCO1FBQy9CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dCQTdERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLG10QkEwQlQ7aUJBQ0Y7OztnREFzQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUM7OzsyQkFwQjdDLFlBQVksU0FBQyxXQUFXO2dDQUd4QixLQUFLO2lDQUNMLEtBQUs7O0lBd0NSLHdCQUFDO0NBQUEsQUEzRUQsQ0E4QnVDLFVBQVUsR0E2Q2hEO1NBN0NZLGlCQUFpQjs7O0lBQzVCLHFDQUFpRDs7SUFHakQsMENBQTREOztJQUM1RCwyQ0FBMEM7O0lBRzFDLGtDQVVFOztJQWVGLHdDQVdFOztJQXZCQSxnREFDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgSW5wdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0SW5maW5pdGVIaXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWluZmluaXRlLWhpdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogc3RhdGVcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgPCEtLSBkZWZhdWx0IHJlbmRlcmluZyBpZiBubyB0ZW1wbGF0ZSBzcGVjaWZpZWQgLS0+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+XG4gICAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJylcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhpdCBvZiBzdGF0ZS5oaXRzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YWlzLWhpZ2hsaWdodCBhdHRyaWJ1dGU9XCJuYW1lXCIgW2hpdF09XCJoaXRcIj5cbiAgICAgICAgICAgIDwvYWlzLWhpZ2hsaWdodD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdzaG93TW9yZScpXCJcbiAgICAgICAgKGNsaWNrKT1cInNob3dNb3JlKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwic3RhdGUuaXNMYXN0UGFnZVwiXG4gICAgICAgICpuZ0lmPVwiIXRlbXBsYXRlXCJcbiAgICAgID5cbiAgICAgICAge3tzaG93TW9yZUxhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0luZmluaXRlSGl0cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGU/OiBhbnk7XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGFiZWw6IHN0cmluZyA9ICdTaG93IG1vcmUgcmVzdWx0cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGlubmVyIHdpZGdldCBzdGF0ZSByZXR1cm5lZCBmcm9tIGNvbm5lY3RvclxuICBwdWJsaWMgc3RhdGU6IHtcbiAgICBoaXRzOiB7fVtdO1xuICAgIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG4gICAgc2hvd01vcmU6IEZ1bmN0aW9uO1xuICAgIHJlc3VsdHM6IHt9O1xuICB9ID0ge1xuICAgIGhpdHM6IFtdLFxuICAgIGlzTGFzdFBhZ2U6IGZhbHNlLFxuICAgIHNob3dNb3JlOiBub29wLFxuICAgIHJlc3VsdHM6IHt9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0luZmluaXRlSGl0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RJbmZpbml0ZUhpdHMsIHsgZXNjYXBlSGl0czogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TW9yZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5zaG93TW9yZSgpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVzdWx0czogc3RhdGUucmVzdWx0cyxcbiAgICAgIGhpdHM6XG4gICAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHN0YXRlLmhpdHMpXG4gICAgICAgICAgOiBzdGF0ZS5oaXRzLFxuICAgIH07XG4gIH07XG59XG4iXX0=