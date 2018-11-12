/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectNumericRefinementList } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisNumericMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('NumericMenu');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            createURL: noop,
            items: [],
            refine: noop,
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
    ngOnInit() {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attribute,
            options: this.items,
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
        this.state.refine(item.value);
    }
}
NgAisNumericMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-numeric-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('radio')"
              type="radio"
              name="NumericMenu"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">{{item.label}}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisNumericMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisNumericMenu.propDecorators = {
    attribute: [{ type: Input }],
    items: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisNumericMenu.prototype.attribute;
    /** @type {?} */
    NgAisNumericMenu.prototype.items;
    /** @type {?} */
    NgAisNumericMenu.prototype.state;
    /** @type {?} */
    NgAisNumericMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1tZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsibnVtZXJpYy1tZW51L251bWVyaWMtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQW1DaEMsTUFBTSx1QkFBd0IsU0FBUSxVQUFVOzs7O0lBbUI5QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFGZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFaMUIsVUFBSyxHQUErQjtZQUN6QyxTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0lBV0YsQ0FBQzs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDakUsQ0FBQzs7OztJQVNNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFO1lBQzlDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLE1BQU0sQ0FBQyxLQUFpQixFQUFFLElBQXVCO1FBQ3RELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7NENBcUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozt3QkFuQjdDLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUROLHFDQUFrQzs7SUFDbEMsaUNBS0k7O0lBRUosaUNBSUU7O0lBT0EsK0NBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbnVtZXJpYy1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgncmFkaW8nKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgIG5hbWU9XCJOdW1lcmljTWVudVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3RhcnQ/OiBudW1iZXI7XG4gICAgZW5kPzogbnVtYmVyO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdOdW1lcmljTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgb3B0aW9uczogdGhpcy5pdGVtcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHJlZmluZShldmVudDogTW91c2VFdmVudCwgaXRlbTogeyB2YWx1ZTogc3RyaW5nIH0pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICB9XG59XG4iXX0=