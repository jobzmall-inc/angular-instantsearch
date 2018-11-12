/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Input, Component, ContentChild, TemplateRef, forwardRef, } from '@angular/core';
import { connectHits } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
var NgAisHits = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisHits, _super);
    function NgAisHits(instantSearchParent) {
        var _this = _super.call(this, 'Hits') || this;
        _this.instantSearchParent = instantSearchParent;
        // inner widget state returned from connector
        _this.state = { hits: [], results: {} };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = tslib_1.__assign({}, state, { results: state.results, hits: typeof _this.transformItems === 'function'
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectHits, { escapeHits: true });
        return _this;
    }
    NgAisHits.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hits',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisHits.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisHits.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        transformItems: [{ type: Input }]
    };
    return NgAisHits;
}(BaseWidget));
export { NgAisHits };
if (false) {
    /** @type {?} */
    NgAisHits.prototype.template;
    /** @type {?} */
    NgAisHits.prototype.transformItems;
    /** @type {?} */
    NgAisHits.prototype.state;
    /** @type {?} */
    NgAisHits.prototype.updateState;
    /** @type {?} */
    NgAisHits.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImhpdHMvaGl0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXBFO0lBcUIrQixxQ0FBVTtJQVN2QyxtQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxNQUFNLENBQUMsU0FFZDtRQUpRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQUxqQyw2Q0FBNkM7UUFDdEMsV0FBSyxHQUFnQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBVXRFLGlCQUFXLEdBQUcsVUFBQyxLQUFLLEVBQUUsZ0JBQXlCO1lBQzdDLElBQUksZ0JBQWdCO2dCQUFFLE9BQU87WUFFN0IsS0FBSSxDQUFDLEtBQUssd0JBQ0wsS0FBSyxJQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUN0QixJQUFJLEVBQ0YsT0FBTyxLQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7b0JBQ3ZDLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUNqQixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBZEEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7SUFDdkQsQ0FBQzs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLDZmQWlCVDtpQkFDRjs7O2dEQVdJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7MkJBVDdDLFlBQVksU0FBQyxXQUFXO2lDQUd4QixLQUFLOztJQXlCUixnQkFBQztDQUFBLEFBbERELENBcUIrQixVQUFVLEdBNkJ4QztTQTdCWSxTQUFTOzs7SUFDcEIsNkJBQThEOztJQUc5RCxtQ0FBbUM7O0lBR25DLDBCQUFzRTs7SUFVdEUsZ0NBV0U7O0lBbEJBLHdDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RIaXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGl0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBzdGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIGRlZmF1bHQgcmVuZGVyaW5nIGlmIG5vIHRlbXBsYXRlIHNwZWNpZmllZCAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaGl0IG9mIHN0YXRlLmhpdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cIm5hbWVcIiBbaGl0XT1cImhpdFwiPlxuICAgICAgICAgICAgPC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBpbm5lciB3aWRnZXQgc3RhdGUgcmV0dXJuZWQgZnJvbSBjb25uZWN0b3JcbiAgcHVibGljIHN0YXRlOiB7IGhpdHM6IHt9W107IHJlc3VsdHM6IHt9IH0gPSB7IGhpdHM6IFtdLCByZXN1bHRzOiB7fSB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0hpdHMnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGl0cywgeyBlc2NhcGVIaXRzOiB0cnVlIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVzdWx0czogc3RhdGUucmVzdWx0cyxcbiAgICAgIGhpdHM6XG4gICAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHN0YXRlLmhpdHMpXG4gICAgICAgICAgOiBzdGF0ZS5oaXRzLFxuICAgIH07XG4gIH07XG59XG4iXX0=