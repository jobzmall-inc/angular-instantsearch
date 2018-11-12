/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, Inject, forwardRef, } from '@angular/core';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisInfiniteHits extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('InfiniteHits');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more results';
        // inner widget state returned from connector
        this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {},
        };
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering)
                return;
            this.state = Object.assign({}, state, { results: state.results, hits: typeof this.transformItems === 'function'
                    ? this.transformItems(state.hits)
                    : state.hits });
        };
        this.createWidget(connectInfiniteHits, { escapeHits: true });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showMore(event) {
        event.preventDefault();
        this.state.showMore();
    }
}
NgAisInfiniteHits.decorators = [
    { type: Component, args: [{
                selector: 'ais-infinite-hits',
                template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let hit of state.hits"
          >
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </li>
        </ul>
      </div>

      <button
        [class]="cx('showMore')"
        (click)="showMore($event)"
        [disabled]="state.isLastPage"
        *ngIf="!template"
      >
        {{showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisInfiniteHits.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisInfiniteHits.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    showMoreLabel: [{ type: Input }],
    transformItems: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtaGl0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImluZmluaXRlLWhpdHMvaW5maW5pdGUtaGl0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBZ0NoQyxNQUFNLHdCQUF5QixTQUFRLFVBQVU7Ozs7SUFvQi9DLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUZmLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQW5CakMsaUJBQWlCO1FBQ0Qsa0JBQWEsR0FBVyxtQkFBbUIsQ0FBQztRQUc1RCw2Q0FBNkM7UUFDdEMsVUFBSyxHQUtSO1lBQ0YsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztRQWVGLGdCQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZ0JBQXlCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLGdCQUFnQjtnQkFBRSxPQUFPO1lBRTdCLElBQUksQ0FBQyxLQUFLLHFCQUNMLEtBQUssSUFDUixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDdEIsSUFBSSxFQUNGLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO29CQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNqQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FDakIsQ0FBQztRQUNKLENBQUMsQ0FBQztRQW5CQSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFTSxRQUFRLENBQUMsS0FBaUI7UUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBN0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUO2FBQ0Y7Ozs0Q0FzQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7O3VCQXBCN0MsWUFBWSxTQUFDLFdBQVc7NEJBR3hCLEtBQUs7NkJBQ0wsS0FBSzs7OztJQUpOLHFDQUFpRDs7SUFHakQsMENBQTREOztJQUM1RCwyQ0FBMEM7O0lBRzFDLGtDQVVFOztJQWVGLHdDQVdFOztJQXZCQSxnREFDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgSW5wdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0SW5maW5pdGVIaXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWluZmluaXRlLWhpdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogc3RhdGVcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgPCEtLSBkZWZhdWx0IHJlbmRlcmluZyBpZiBubyB0ZW1wbGF0ZSBzcGVjaWZpZWQgLS0+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+XG4gICAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJylcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhpdCBvZiBzdGF0ZS5oaXRzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YWlzLWhpZ2hsaWdodCBhdHRyaWJ1dGU9XCJuYW1lXCIgW2hpdF09XCJoaXRcIj5cbiAgICAgICAgICAgIDwvYWlzLWhpZ2hsaWdodD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdzaG93TW9yZScpXCJcbiAgICAgICAgKGNsaWNrKT1cInNob3dNb3JlKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwic3RhdGUuaXNMYXN0UGFnZVwiXG4gICAgICAgICpuZ0lmPVwiIXRlbXBsYXRlXCJcbiAgICAgID5cbiAgICAgICAge3tzaG93TW9yZUxhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0luZmluaXRlSGl0cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGU/OiBhbnk7XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGFiZWw6IHN0cmluZyA9ICdTaG93IG1vcmUgcmVzdWx0cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGlubmVyIHdpZGdldCBzdGF0ZSByZXR1cm5lZCBmcm9tIGNvbm5lY3RvclxuICBwdWJsaWMgc3RhdGU6IHtcbiAgICBoaXRzOiB7fVtdO1xuICAgIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG4gICAgc2hvd01vcmU6IEZ1bmN0aW9uO1xuICAgIHJlc3VsdHM6IHt9O1xuICB9ID0ge1xuICAgIGhpdHM6IFtdLFxuICAgIGlzTGFzdFBhZ2U6IGZhbHNlLFxuICAgIHNob3dNb3JlOiBub29wLFxuICAgIHJlc3VsdHM6IHt9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0luZmluaXRlSGl0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RJbmZpbml0ZUhpdHMsIHsgZXNjYXBlSGl0czogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TW9yZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5zaG93TW9yZSgpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVzdWx0czogc3RhdGUucmVzdWx0cyxcbiAgICAgIGhpdHM6XG4gICAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHN0YXRlLmhpdHMpXG4gICAgICAgICAgOiBzdGF0ZS5oaXRzLFxuICAgIH07XG4gIH07XG59XG4iXX0=