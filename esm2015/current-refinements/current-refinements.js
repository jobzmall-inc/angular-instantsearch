/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectCurrentRefinedValues } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop, capitalize } from '../utils';
export class NgAisCurrentRefinements extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('CurrentRefinements');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.clearRefinements = 'after';
        this.clearRefinementsLabel = 'Clear refinements';
        // connector options
        this.onlyListedAttributes = false;
        this.clearsQuery = false;
        this.attributes = [];
        this.state = {
            attributes: {},
            clearAllClick: noop,
            clearAllURL: noop,
            createURL: noop,
            refine: noop,
            refinements: [],
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.refinements.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get refinements() {
        /** @type {?} */
        const items = typeof this.transformItems === 'function'
            ? this.transformItems(this.state.refinements)
            : this.state.refinements;
        // group refinements by category? (attributeName && type)
        return items.reduce((res, _a) => {
            var { type, attributeName } = _a, refinement = tslib_1.__rest(_a, ["type", "attributeName"]);
            /** @type {?} */
            const match = res.find(r => r.attributeName === attributeName && r.type === type);
            if (match) {
                match.items.push(Object.assign({ type, attributeName }, refinement));
            }
            else {
                res.push({
                    type,
                    attributeName,
                    label: capitalize(attributeName),
                    items: [Object.assign({ type, attributeName }, refinement)],
                });
            }
            return res;
        }, []);
    }
    /**
     * @return {?}
     */
    get json() {
        return JSON.stringify(this.refinements, null, 4);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} refinement
     * @return {?}
     */
    handleClick(event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClearAllClick(event) {
        event.preventDefault();
        this.state.clearAllClick();
    }
}
NgAisCurrentRefinements.decorators = [
    { type: Component, args: [{
                selector: 'ais-current-refinements',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'before' || clearRefinements === true">
        {{clearRefinementsLabel}}
      </button>

      <ul
        [class]="cx('list')"
        *ngFor="let refinement of refinements"
      >
        <li [class]="cx('item')">
          <span [class]="cx('label')">{{refinement.label}}:</span>

          <span
            [class]="cx('category')"
            *ngFor="let item of refinement.items"
          >
            <span [class]="cx('categoryLabel')">{{item.name}}</span>
            <button [class]="cx('delete')" (click)="handleClick($event, item)">✕</button>
          </span>
        </li>
      </ul>

      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'after'">
        {{clearRefinementsLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisCurrentRefinements.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisCurrentRefinements.propDecorators = {
    clearRefinements: [{ type: Input }],
    clearRefinementsLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    onlyListedAttributes: [{ type: Input }],
    clearsQuery: [{ type: Input }],
    attributes: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearRefinements;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearRefinementsLabel;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.transformItems;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.onlyListedAttributes;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearsQuery;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.attributes;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.state;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1yZWZpbmVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImN1cnJlbnQtcmVmaW5lbWVudHMvY3VycmVudC1yZWZpbmVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBbUQ1QyxNQUFNLDhCQUErQixTQUFRLFVBQVU7Ozs7SUF5RHJELFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRnJCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQTFEakMsaUJBQWlCO1FBQ0QscUJBQWdCLEdBQWlDLE9BQU8sQ0FBQztRQUN6RCwwQkFBcUIsR0FBVyxtQkFBbUIsQ0FBQztRQUdwRSxvQkFBb0I7UUFDSix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFDdEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFdEMsZUFBVSxHQUdYLEVBQUUsQ0FBQztRQUVGLFVBQUssR0FBNEI7WUFDdEMsVUFBVSxFQUFFLEVBQUU7WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFXLEVBQUUsSUFBSTtZQUNqQixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJO1lBQ1osV0FBVyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztJQXdDRixDQUFDOzs7O0lBdENELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVELElBQUksV0FBVzs7Y0FDUCxLQUFLLEdBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztRQUU1Qix5REFBeUQ7UUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQXNDLEVBQUUsRUFBRTtnQkFBMUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxPQUFpQixFQUFmLDBEQUFhOztrQkFDdEQsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxhQUFhLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQzFEO1lBQ0QsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLGlCQUFHLElBQUksRUFBRSxhQUFhLElBQUssVUFBVSxFQUFHLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxJQUFJO29CQUNKLGFBQWE7b0JBQ2IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUM7b0JBQ2hDLEtBQUssRUFBRSxpQkFBRyxJQUFJLEVBQUUsYUFBYSxJQUFLLFVBQVUsRUFBRztpQkFDaEQsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQVNNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFO1lBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0Isb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtTQUNoRCxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQWlCLEVBQUUsVUFBYztRQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFTSxtQkFBbUIsQ0FBQyxLQUFpQjtRQUMxQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7WUF6SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUO2FBQ0Y7Ozs0Q0EyREksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7OytCQXhEN0MsS0FBSztvQ0FDTCxLQUFLOzZCQUNMLEtBQUs7bUNBR0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7Ozs7SUFQTixtREFBeUU7O0lBQ3pFLHdEQUFvRTs7SUFDcEUsaURBQTBDOztJQUcxQyx1REFBc0Q7O0lBQ3RELDhDQUE2Qzs7SUFDN0MsNkNBSVM7O0lBRVQsd0NBT0U7O0lBb0NBLHNEQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDdXJyZW50UmVmaW5lbWVudHNTdGF0ZSA9IHtcbiAgYXR0cmlidXRlczoge307XG4gIGNsZWFyQWxsQ2xpY2s6IEZ1bmN0aW9uO1xuICBjbGVhckFsbFVSTDogRnVuY3Rpb247XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHJlZmluZW1lbnRzOiB7fVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWN1cnJlbnQtcmVmaW5lbWVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGVhckFsbENsaWNrKCRldmVudClcIlxuICAgICAgICAqbmdJZj1cImNsZWFyUmVmaW5lbWVudHMgPT09ICdiZWZvcmUnIHx8IGNsZWFyUmVmaW5lbWVudHMgPT09IHRydWVcIj5cbiAgICAgICAge3tjbGVhclJlZmluZW1lbnRzTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDx1bFxuICAgICAgICBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCByZWZpbmVtZW50IG9mIHJlZmluZW1lbnRzXCJcbiAgICAgID5cbiAgICAgICAgPGxpIFtjbGFzc109XCJjeCgnaXRlbScpXCI+XG4gICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tyZWZpbmVtZW50LmxhYmVsfX06PC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2F0ZWdvcnknKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiByZWZpbmVtZW50Lml0ZW1zXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NhdGVnb3J5TGFiZWwnKVwiPnt7aXRlbS5uYW1lfX08L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIFtjbGFzc109XCJjeCgnZGVsZXRlJylcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiPuKclTwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsZWFyQWxsQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICpuZ0lmPVwiY2xlYXJSZWZpbmVtZW50cyA9PT0gJ2FmdGVyJ1wiPlxuICAgICAgICB7e2NsZWFyUmVmaW5lbWVudHNMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDdXJyZW50UmVmaW5lbWVudHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGNsZWFyUmVmaW5lbWVudHM6ICdiZWZvcmUnIHwgJ2FmdGVyJyB8IGJvb2xlYW4gPSAnYWZ0ZXInO1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJSZWZpbmVtZW50c0xhYmVsOiBzdHJpbmcgPSAnQ2xlYXIgcmVmaW5lbWVudHMnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgb25seUxpc3RlZEF0dHJpYnV0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGNsZWFyc1F1ZXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhdHRyaWJ1dGVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogQ3VycmVudFJlZmluZW1lbnRzU3RhdGUgPSB7XG4gICAgYXR0cmlidXRlczoge30sXG4gICAgY2xlYXJBbGxDbGljazogbm9vcCxcbiAgICBjbGVhckFsbFVSTDogbm9vcCxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHJlZmluZW1lbnRzOiBbXSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucmVmaW5lbWVudHMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgcmVmaW5lbWVudHMoKSB7XG4gICAgY29uc3QgaXRlbXMgPVxuICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUucmVmaW5lbWVudHMpXG4gICAgICAgIDogdGhpcy5zdGF0ZS5yZWZpbmVtZW50cztcblxuICAgIC8vIGdyb3VwIHJlZmluZW1lbnRzIGJ5IGNhdGVnb3J5PyAoYXR0cmlidXRlTmFtZSAmJiB0eXBlKVxuICAgIHJldHVybiBpdGVtcy5yZWR1Y2UoKHJlcywgeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCAuLi5yZWZpbmVtZW50IH0pID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gcmVzLmZpbmQoXG4gICAgICAgIHIgPT4gci5hdHRyaWJ1dGVOYW1lID09PSBhdHRyaWJ1dGVOYW1lICYmIHIudHlwZSA9PT0gdHlwZVxuICAgICAgKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pdGVtcy5wdXNoKHsgdHlwZSwgYXR0cmlidXRlTmFtZSwgLi4ucmVmaW5lbWVudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgbGFiZWw6IGNhcGl0YWxpemUoYXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgaXRlbXM6IFt7IHR5cGUsIGF0dHJpYnV0ZU5hbWUsIC4uLnJlZmluZW1lbnQgfV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXQganNvbigpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yZWZpbmVtZW50cywgbnVsbCwgNCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDdXJyZW50UmVmaW5lbWVudHMnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIGNsZWFyc1F1ZXJ5OiB0aGlzLmNsZWFyc1F1ZXJ5LFxuICAgICAgb25seUxpc3RlZEF0dHJpYnV0ZXM6IHRoaXMub25seUxpc3RlZEF0dHJpYnV0ZXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgcmVmaW5lbWVudDoge30pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHJlZmluZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsZWFyQWxsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuY2xlYXJBbGxDbGljaygpO1xuICB9XG59XG4iXX0=