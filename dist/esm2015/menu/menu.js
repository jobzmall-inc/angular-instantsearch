/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
export class NgAisMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Menu');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more';
        this.showLessLabel = 'Show less';
        this.limit = 10;
        this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
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
    get showMoreClass() {
        /** @type {?} */
        let className = this.cx('showMore');
        if (!this.state.canToggleShowMore) {
            className = `${className} ${this.cx('showMore', 'disabled')}`;
        }
        return className;
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
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    handleClick(event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    }
}
NgAisMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of items"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <span [class]="cx('label')">{{item.label}}</span>
            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>

      <button
        *ngIf="showMoreLimit && state.canToggleShowMore"
        (click)="state.toggleShowMore()"
        [class]="showMoreClass"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisMenu.propDecorators = {
    showMoreLabel: [{ type: Input }],
    showLessLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    attribute: [{ type: Input }],
    limit: [{ type: Input }],
    showMoreLimit: [{ type: Input }],
    sortBy: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisMenu.prototype.showMoreLabel;
    /** @type {?} */
    NgAisMenu.prototype.showLessLabel;
    /** @type {?} */
    NgAisMenu.prototype.transformItems;
    /** @type {?} */
    NgAisMenu.prototype.attribute;
    /** @type {?} */
    NgAisMenu.prototype.limit;
    /** @type {?} */
    NgAisMenu.prototype.showMoreLimit;
    /** @type {?} */
    NgAisMenu.prototype.sortBy;
    /** @type {?} */
    NgAisMenu.prototype.state;
    /** @type {?} */
    NgAisMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbIm1lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUE4Q2xELE1BQU0sZ0JBQWlCLFNBQVEsVUFBVTs7OztJQTBDdkMsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRlAsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBM0NqQyxpQkFBaUI7UUFDRCxrQkFBYSxHQUFXLFdBQVcsQ0FBQztRQUNwQyxrQkFBYSxHQUFXLFdBQVcsQ0FBQztRQUtwQyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUl0QyxVQUFLLEdBQWM7WUFDeEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFDO0lBMkJGLENBQUM7Ozs7SUF6QkQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsSUFBSSxhQUFhOztZQUNYLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxTQUFTLEdBQUcsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztTQUMvRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO1lBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzdCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ25ELGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxLQUFpQixFQUFFLEtBQWE7UUFDMUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUFuR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDthQUNGOzs7NENBNENJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozs0QkF6QzdDLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUdMLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7Ozs7SUFSTixrQ0FBb0Q7O0lBQ3BELGtDQUFvRDs7SUFDcEQsbUNBQTBDOztJQUcxQyw4QkFBa0M7O0lBQ2xDLDBCQUE2Qzs7SUFDN0Msa0NBQWdEOztJQUNoRCwyQkFBK0Q7O0lBRS9ELDBCQVFFOztJQXVCQSx3Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdE1lbnUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBNZW51U3RhdGUgPSB7XG4gIGNhblJlZmluZTogYm9vbGVhbjtcbiAgY2FuVG9nZ2xlU2hvd01vcmU6IGJvb2xlYW47XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGlzU2hvd2luZ01vcmU6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB0b2dnbGVTaG93TW9yZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCJ7e3N0YXRlLmNyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJzaG93TW9yZUxpbWl0ICYmIHN0YXRlLmNhblRvZ2dsZVNob3dNb3JlXCJcbiAgICAgICAgKGNsaWNrKT1cInN0YXRlLnRvZ2dsZVNob3dNb3JlKClcIlxuICAgICAgICBbY2xhc3NdPVwic2hvd01vcmVDbGFzc1wiXG4gICAgICA+XG4gICAgICAgIHt7c3RhdGUuaXNTaG93aW5nTW9yZSA/IHNob3dMZXNzTGFiZWwgOiBzaG93TW9yZUxhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGFiZWw6IHN0cmluZyA9ICdTaG93IG1vcmUnO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0xlc3NMYWJlbDogc3RyaW5nID0gJ1Nob3cgbGVzcyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGxpbWl0PzogbnVtYmVyIHwgc3RyaW5nID0gMTA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxpbWl0PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc29ydEJ5Pzogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IE1lbnVTdGF0ZSA9IHtcbiAgICBjYW5SZWZpbmU6IGZhbHNlLFxuICAgIGNhblRvZ2dsZVNob3dNb3JlOiBmYWxzZSxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXNTaG93aW5nTW9yZTogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB0b2dnbGVTaG93TW9yZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgc2hvd01vcmVDbGFzcygpIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnc2hvd01vcmUnKTtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5jYW5Ub2dnbGVTaG93TW9yZSkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ3Nob3dNb3JlJywgJ2Rpc2FibGVkJyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdE1lbnUsIHtcbiAgICAgIGxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMubGltaXQpLFxuICAgICAgc2hvd01vcmVMaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnNob3dNb3JlTGltaXQpLFxuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlKTtcbiAgfVxufVxuIl19