/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
export class NgAisHierarchicalMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('HierarchicalMenu');
        this.instantSearchParent = instantSearchParent;
        this.separator = ' > ';
        this.limit = 10;
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
        return typeof this.transformItems === 'function'
            ? this.transformItems(this.state.items)
            : this.state.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectHierarchicalMenu, {
            limit: parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy,
        });
        super.ngOnInit();
    }
}
NgAisHierarchicalMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-hierarchical-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list') + ' ' + cx('list', 'lvl0')">
        <ais-hierarchical-menu-item
          *ngFor="let item of items"
          [item]="item"
          [createURL]="state.createURL"
          [refine]="state.refine"
        >
        </ais-hierarchical-menu-item>
      </ul>
    </div>
  `,
            },] },
];
NgAisHierarchicalMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisHierarchicalMenu.propDecorators = {
    transformItems: [{ type: Input }],
    attributes: [{ type: Input }],
    separator: [{ type: Input }],
    rootPath: [{ type: Input }],
    showParentLevel: [{ type: Input }],
    limit: [{ type: Input }],
    sortBy: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.transformItems;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.attributes;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.separator;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.rootPath;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.showParentLevel;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.limit;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.sortBy;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.state;
    /** @type {?} */
    NgAisHierarchicalMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2hpY2FsLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJoaWVyYXJjaGljYWwtbWVudS9oaWVyYXJjaGljYWwtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQTJCbEQsTUFBTSw0QkFBNkIsU0FBUSxVQUFVOzs7O0lBNEJuRCxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUZuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUF4QmpCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsVUFBSyxHQUFxQixFQUFFLENBQUM7UUFHdEMsVUFBSyxHQUEwQjtZQUNwQyxTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0lBaUJGLENBQUM7Ozs7SUFmRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO1lBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUU7WUFDekMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2FBQ0Y7Ozs0Q0E4QkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7OzZCQTNCN0MsS0FBSzt5QkFHTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSzs7OztJQVJOLCtDQUEwQzs7SUFHMUMsMkNBQXFDOztJQUNyQywwQ0FBMkM7O0lBQzNDLHlDQUFrQzs7SUFDbEMsZ0RBQTBDOztJQUMxQyxzQ0FBNkM7O0lBQzdDLHVDQUErRDs7SUFFL0Qsc0NBSUU7O0lBYUEsb0RBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RIaWVyYXJjaGljYWxNZW51IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgSGllcmFyY2hpY2FsTWVudVN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1oaWVyYXJjaGljYWwtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKSArICcgJyArIGN4KCdsaXN0JywgJ2x2bDAnKVwiPlxuICAgICAgICA8YWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgW2l0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgW2NyZWF0ZVVSTF09XCJzdGF0ZS5jcmVhdGVVUkxcIlxuICAgICAgICAgIFtyZWZpbmVdPVwic3RhdGUucmVmaW5lXCJcbiAgICAgICAgPlxuICAgICAgICA8L2Fpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWVyYXJjaGljYWxNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25cbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG5cbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yPzogc3RyaW5nID0gJyA+ICc7XG4gIEBJbnB1dCgpIHB1YmxpYyByb290UGF0aD86IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNob3dQYXJlbnRMZXZlbD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdD86IG51bWJlciB8IHN0cmluZyA9IDEwO1xuICBASW5wdXQoKSBwdWJsaWMgc29ydEJ5Pzogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IEhpZXJhcmNoaWNhbE1lbnVTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXModGhpcy5zdGF0ZS5pdGVtcylcbiAgICAgIDogdGhpcy5zdGF0ZS5pdGVtcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0hpZXJhcmNoaWNhbE1lbnUnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGllcmFyY2hpY2FsTWVudSwge1xuICAgICAgbGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5saW1pdCksXG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICByb290UGF0aDogdGhpcy5yb290UGF0aCxcbiAgICAgIHNlcGFyYXRvcjogdGhpcy5zZXBhcmF0b3IsXG4gICAgICBzaG93UGFyZW50TGV2ZWw6IHRoaXMuc2hvd1BhcmVudExldmVsLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiJdfQ==