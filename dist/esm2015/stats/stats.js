/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, ContentChild, TemplateRef, Inject, forwardRef, } from '@angular/core';
import { connectStats } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
export class NgAisStats extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Stats');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: '',
        };
        this.createWidget(connectStats);
    }
    /**
     * @return {?}
     */
    get templateContext() {
        return { state: this.state };
    }
}
NgAisStats.decorators = [
    { type: Component, args: [{
                selector: 'ais-stats',
                template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: templateContext">
      </ng-container>

      <span *ngIf="!template" [class]="cx('text')">
        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.
      </span>
    </div>
  `,
            },] },
];
NgAisStats.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisStats.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
if (false) {
    /** @type {?} */
    NgAisStats.prototype.template;
    /** @type {?} */
    NgAisStats.prototype.state;
    /** @type {?} */
    NgAisStats.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJzdGF0cy9zdGF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWVwRSxNQUFNLGlCQUFrQixTQUFRLFVBQVU7Ozs7SUFnQnhDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUZSLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQWYxQixVQUFLLEdBQUc7WUFDYixVQUFVLEVBQUUsQ0FBQztZQUNiLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBV0EsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBVkQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7OzRDQWtCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOzs7dUJBaEI3QyxZQUFZLFNBQUMsV0FBVzs7OztJQUF6Qiw4QkFBZ0Q7O0lBRWhELDJCQU9FOztJQU9BLHlDQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFN0YXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcblxuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1zdGF0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB0ZW1wbGF0ZUNvbnRleHRcIj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiIFtjbGFzc109XCJjeCgndGV4dCcpXCI+XG4gICAgICAgIHt7c3RhdGUubmJIaXRzfX0gcmVzdWx0cyBmb3VuZCBpbiB7e3N0YXRlLnByb2Nlc3NpbmdUaW1lTVN9fW1zLlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1N0YXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xuXG4gIHB1YmxpYyBzdGF0ZSA9IHtcbiAgICBoaXRQZXJQYWdlOiAwLFxuICAgIG5iSGl0czogMCxcbiAgICBuYlBhZ2VzOiAwLFxuICAgIHBhZ2U6IDAsXG4gICAgcHJvY2Vzc2luZ1RpbWVNUzogMCxcbiAgICBxdWVyeTogJycsXG4gIH07XG5cbiAgZ2V0IHRlbXBsYXRlQ29udGV4dCgpIHtcbiAgICByZXR1cm4geyBzdGF0ZTogdGhpcy5zdGF0ZSB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU3RhdHMnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0U3RhdHMpO1xuICB9XG59XG4iXX0=