/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
export class NgAisRefinementList extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RefinementList');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more';
        this.showLessLabel = 'Show less';
        this.searchPlaceholder = 'Search here...';
        this.operator = 'or';
        this.limit = 10;
        this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get items() {
        return typeof this.transformItems === 'function'
            ? this.transformItems(this.state.items)
            : this.state.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
            escapeFacetValues: true,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    refine(event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    }
}
NgAisRefinementList.decorators = [
    { type: Component, args: [{
                selector: 'ais-refinement-list',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <div
        *ngIf="searchable"
        [class]="cx('searchBox')"
      >
        <ais-facets-search
          [search]="state.searchForItems"
          [searchPlaceholder]="searchPlaceholder"
        >
        </ais-facets-search>
      </div>

      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('checkbox')"
              type="checkbox"
              value="{{item.value}}"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">
              <ais-highlight attribute="highlighted" [hit]="item"></ais-highlight>
            </span>
            <span [class]="cx('count')">{{item.count}}</span>
          </label>
        </li>
      </ul>

      <button
        *ngIf="showMoreLimit && state.canToggleShowMore"
        (click)="state.toggleShowMore()"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisRefinementList.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRefinementList.propDecorators = {
    showMoreLabel: [{ type: Input }],
    showLessLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    searchable: [{ type: Input }],
    searchPlaceholder: [{ type: Input }],
    attribute: [{ type: Input }],
    operator: [{ type: Input }],
    limit: [{ type: Input }],
    showMoreLimit: [{ type: Input }],
    sortBy: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisRefinementList.prototype.showMoreLabel;
    /** @type {?} */
    NgAisRefinementList.prototype.showLessLabel;
    /** @type {?} */
    NgAisRefinementList.prototype.transformItems;
    /** @type {?} */
    NgAisRefinementList.prototype.searchable;
    /** @type {?} */
    NgAisRefinementList.prototype.searchPlaceholder;
    /** @type {?} */
    NgAisRefinementList.prototype.attribute;
    /** @type {?} */
    NgAisRefinementList.prototype.operator;
    /** @type {?} */
    NgAisRefinementList.prototype.limit;
    /** @type {?} */
    NgAisRefinementList.prototype.showMoreLimit;
    /** @type {?} */
    NgAisRefinementList.prototype.sortBy;
    /** @type {?} */
    NgAisRefinementList.prototype.state;
    /** @type {?} */
    NgAisRefinementList.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmaW5lbWVudC1saXN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsicmVmaW5lbWVudC1saXN0L3JlZmluZW1lbnQtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQThEbEQsTUFBTSwwQkFBMkIsU0FBUSxVQUFVOzs7O0lBK0JqRCxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUZqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFoQ2pDLGlCQUFpQjtRQUNELGtCQUFhLEdBQVcsV0FBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQVcsV0FBVyxDQUFDO1FBR3BDLHNCQUFpQixHQUFXLGdCQUFnQixDQUFDO1FBSTdDLGFBQVEsR0FBaUIsSUFBSSxDQUFDO1FBQzlCLFVBQUssR0FBb0IsRUFBRSxDQUFDO1FBSXJDLFVBQUssR0FBd0I7WUFDbEMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDO0lBV0YsQ0FBQzs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDakUsQ0FBQzs7OztJQVNELElBQUksS0FBSztRQUNQLE9BQU8sT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7WUFDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNuRCxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLE1BQU0sQ0FDWCxLQUFpQixFQUNqQixJQUEyQztRQUUzQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDeEIsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWpDLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7WUF0SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7YUFDRjs7OzRDQWlDSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOzs7NEJBOUI3QyxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7d0JBR0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBWE4sNENBQW9EOztJQUNwRCw0Q0FBb0Q7O0lBQ3BELDZDQUEwQzs7SUFDMUMseUNBQXFDOztJQUNyQyxnREFBNkQ7O0lBRzdELHdDQUFrQzs7SUFDbEMsdUNBQThDOztJQUM5QyxvQ0FBNEM7O0lBQzVDLDRDQUErQzs7SUFDL0MscUNBQThEOztJQUU5RCxvQ0FVRTs7SUFPQSxrREFDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RSZWZpbmVtZW50TGlzdCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gIGNhblJlZmluZTogYm9vbGVhbjtcbiAgY2FuVG9nZ2xlU2hvd01vcmU6IGJvb2xlYW47XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGlzU2hvd2luZ01vcmU6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB0b2dnbGVTaG93TW9yZTogRnVuY3Rpb247XG4gIHNlYXJjaEZvckl0ZW1zOiBGdW5jdGlvbjtcbiAgaXNGb3JtU2VhcmNoOiBib29sZWFuO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJlZmluZW1lbnQtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJzZWFyY2hhYmxlXCJcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWFyY2hCb3gnKVwiXG4gICAgICA+XG4gICAgICAgIDxhaXMtZmFjZXRzLXNlYXJjaFxuICAgICAgICAgIFtzZWFyY2hdPVwic3RhdGUuc2VhcmNoRm9ySXRlbXNcIlxuICAgICAgICAgIFtzZWFyY2hQbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICAgID5cbiAgICAgICAgPC9haXMtZmFjZXRzLXNlYXJjaD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdjaGVja2JveCcpXCJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+XG4gICAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cImhpZ2hsaWdodGVkXCIgW2hpdF09XCJpdGVtXCI+PC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJzaG93TW9yZUxpbWl0ICYmIHN0YXRlLmNhblRvZ2dsZVNob3dNb3JlXCJcbiAgICAgICAgKGNsaWNrKT1cInN0YXRlLnRvZ2dsZVNob3dNb3JlKClcIlxuICAgICAgPlxuICAgICAgICB7e3N0YXRlLmlzU2hvd2luZ01vcmUgPyBzaG93TGVzc0xhYmVsIDogc2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSZWZpbmVtZW50TGlzdCBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TGVzc0xhYmVsOiBzdHJpbmcgPSAnU2hvdyBsZXNzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hhYmxlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VhcmNoIGhlcmUuLi4nO1xuXG4gIC8vIGNvbm5lY3RvcnMgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcGVyYXRvcjogJ29yJyB8ICdhbmQnID0gJ29yJztcbiAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGltaXQ6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeTogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gICAgY2FuUmVmaW5lOiBmYWxzZSxcbiAgICBjYW5Ub2dnbGVTaG93TW9yZTogZmFsc2UsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGlzU2hvd2luZ01vcmU6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgdG9nZ2xlU2hvd01vcmU6IG5vb3AsXG4gICAgc2VhcmNoRm9ySXRlbXM6IG5vb3AsXG4gICAgaXNGb3JtU2VhcmNoOiBmYWxzZSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSZWZpbmVtZW50TGlzdCcpO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFJlZmluZW1lbnRMaXN0LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIHNob3dNb3JlTGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5zaG93TW9yZUxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICAgIGVzY2FwZUZhY2V0VmFsdWVzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoXG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQsXG4gICAgaXRlbTogeyBpc1JlZmluZWQ6IGJvb2xlYW47IHZhbHVlOiBzdHJpbmcgfVxuICApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuY2FuUmVmaW5lKSB7XG4gICAgICAvLyB1cGRhdGUgVUkgZGlyZWN0bHksIGl0IHdpbGwgdXBkYXRlIHRoZSBjaGVja2JveCBzdGF0ZVxuICAgICAgaXRlbS5pc1JlZmluZWQgPSAhaXRlbS5pc1JlZmluZWQ7XG5cbiAgICAgIC8vIHJlZmluZSB0aHJvdWdoIEFsZ29saWEgQVBJXG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==