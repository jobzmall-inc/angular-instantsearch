/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectClearAll } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisClearRefinements extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('ClearRefinements');
        this.instantSearchParent = instantSearchParent;
        this.buttonLabel = 'Clear refinements';
        this.clearsQuery = false;
        this.excludeAttributes = [];
        this.state = {
            hasRefinements: false,
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return !this.state.hasRefinements && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    }
}
NgAisClearRefinements.decorators = [
    { type: Component, args: [{
                selector: 'ais-clear-refinements',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')"
        (click)="handleClick($event)"
        [disabled]="!state.hasRefinements"
      >
        {{buttonLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisClearRefinements.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisClearRefinements.propDecorators = {
    buttonLabel: [{ type: Input }],
    clearsQuery: [{ type: Input }],
    excludeAttributes: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItcmVmaW5lbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJjbGVhci1yZWZpbmVtZW50cy9jbGVhci1yZWZpbmVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFtQmhDLE1BQU0sNEJBQTZCLFNBQVEsVUFBVTs7OztJQWNuRCxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUZuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFmakIsZ0JBQVcsR0FBVyxtQkFBbUIsQ0FBQztRQUMxQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFFMUMsVUFBSyxHQUFHO1lBQ2IsY0FBYyxFQUFFLEtBQUs7WUFDckIsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0lBV0YsQ0FBQzs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDOUQsQ0FBQzs7OztJQVNNLFFBQVE7UUFDYiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDMUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQWlCO1FBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO2FBQ0Y7Ozs0Q0FnQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7OzBCQWQ3QyxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs7OztJQUZOLDRDQUEwRDs7SUFDMUQsNENBQTZDOztJQUM3QyxrREFBaUQ7O0lBRWpELHNDQUdFOztJQU9BLG9EQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdENsZWFyQWxsIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNsZWFyLXJlZmluZW1lbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ2J1dHRvbicpICsgKCFzdGF0ZS5oYXNSZWZpbmVtZW50cyA/ICgnICcgKyBjeCgnYnV0dG9uJywgJ2Rpc2FibGVkJykpIDogJycpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIXN0YXRlLmhhc1JlZmluZW1lbnRzXCJcbiAgICAgID5cbiAgICAgICAge3tidXR0b25MYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDbGVhclJlZmluZW1lbnRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBidXR0b25MYWJlbDogc3RyaW5nID0gJ0NsZWFyIHJlZmluZW1lbnRzJztcbiAgQElucHV0KCkgcHVibGljIGNsZWFyc1F1ZXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlQXR0cmlidXRlczogc3RyaW5nW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgaGFzUmVmaW5lbWVudHM6IGZhbHNlLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlLmhhc1JlZmluZW1lbnRzICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDbGVhclJlZmluZW1lbnRzJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gd2UgbmVlZCB0byBgY3JlYXRlV2lkZ2V0YCBmcm9tIGBuZ09uSW5pdGAgdG8gaGF2ZSBgQElucHV0KClgIGludGlhbGl6ZWRcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q2xlYXJBbGwsIHtcbiAgICAgIGNsZWFyc1F1ZXJ5OiB0aGlzLmNsZWFyc1F1ZXJ5LFxuICAgICAgZXhjbHVkZUF0dHJpYnV0ZXM6IHRoaXMuZXhjbHVkZUF0dHJpYnV0ZXMsXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmhhc1JlZmluZW1lbnRzKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZSgpO1xuICAgIH1cbiAgfVxufVxuIl19