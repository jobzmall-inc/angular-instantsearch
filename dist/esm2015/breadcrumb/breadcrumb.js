/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectBreadcrumb } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisBreadcrumb extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Breadcrumb');
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
    get items() {
        return this.state.items.map((item, idx) => (Object.assign({}, item, { separator: idx !== 0, isLast: idx === this.state.items.length - 1 })));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    handleClick(event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    }
}
NgAisBreadcrumb.decorators = [
    { type: Component, args: [{
                selector: 'ais-breadcrumb',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          *ngFor="let item of items"
          [class]="cx('item', item.isLast ? 'selected' : undefined)"
          (click)="handleClick($event, item)"
        >
          <span
            *ngIf="item.separator"
            [class]="cx('separator')"
            aria-hidden="true"
          >
            >
          </span>
          <a
            [class]="cx('link')"
            href="{{state.createURL(item.value)}}"
            *ngIf="!item.isLast"
            (click)="handleClick($event, item)"
          >
            {{item.name}}
          </a>

          <span *ngIf="item.isLast">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisBreadcrumb.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisBreadcrumb.propDecorators = {
    attributes: [{ type: Input }],
    rootPath: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisBreadcrumb.prototype.attributes;
    /** @type {?} */
    NgAisBreadcrumb.prototype.rootPath;
    /** @type {?} */
    NgAisBreadcrumb.prototype.state;
    /** @type {?} */
    NgAisBreadcrumb.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImJyZWFkY3J1bWIvYnJlYWRjcnVtYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQWtEaEMsTUFBTSxzQkFBdUIsU0FBUSxVQUFVOzs7O0lBdUI3QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFSMUIsVUFBSyxHQUFvQjtZQUM5QixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0lBT0YsQ0FBQzs7OztJQXZCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLG1CQUN0QyxJQUFJLElBQ1AsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQ3BCLE1BQU0sRUFBRSxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFDM0MsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs7OztJQWVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFO1lBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLFdBQVcsQ0FBQyxLQUFpQixFQUFFLElBQW9CO1FBQ3hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDVDthQUNGOzs7NENBeUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozt5QkF0QjdDLEtBQUs7dUJBQ0wsS0FBSzs7OztJQUROLHFDQUFxQzs7SUFDckMsbUNBQWtDOztJQWNsQyxnQ0FJRTs7SUFHQSw4Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RCcmVhZGNydW1iIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgQnJlYWRjcnVtYlN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJJdGVtID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtYnJlYWRjcnVtYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJywgaXRlbS5pc0xhc3QgPyAnc2VsZWN0ZWQnIDogdW5kZWZpbmVkKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0lmPVwiaXRlbS5zZXBhcmF0b3JcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdzZXBhcmF0b3InKVwiXG4gICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIGhyZWY9XCJ7e3N0YXRlLmNyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgICAgICpuZ0lmPVwiIWl0ZW0uaXNMYXN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7e2l0ZW0ubmFtZX19XG4gICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmlzTGFzdFwiPlxuICAgICAgICAgICAge3tpdGVtLm5hbWV9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQnJlYWRjcnVtYiBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHB1YmxpYyByb290UGF0aD86IHN0cmluZztcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubWFwKChpdGVtLCBpZHgpID0+ICh7XG4gICAgICAuLi5pdGVtLFxuICAgICAgc2VwYXJhdG9yOiBpZHggIT09IDAsXG4gICAgICBpc0xhc3Q6IGlkeCA9PT0gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLSAxLFxuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0ZTogQnJlYWRjcnVtYlN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0JyZWFkY3J1bWInKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0QnJlYWRjcnVtYiwge1xuICAgICAgYXR0cmlidXRlczogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgcm9vdFBhdGg6IHRoaXMucm9vdFBhdGgsXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBCcmVhZGNydW1iSXRlbSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoaXRlbS52YWx1ZSkge1xuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoaXRlbS52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=