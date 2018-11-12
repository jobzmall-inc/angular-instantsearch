/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
export class NgAisHierarchicalMenuItem {
    constructor() {
        this.lvl = 1;
        this.cx = bem('HierarchicalMenu');
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getItemClass(item) {
        /** @type {?} */
        let className = this.cx('item');
        if (item.isRefined) {
            className = `${className} ${this.cx('item', 'selected')}`;
        }
        if (this.isArray(item.data) && item.data.length > 0) {
            className = `${className} ${this.cx('item', 'parent')}`;
        }
        return className;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getListClass(item) {
        return `${this.cx('list')} ${this.cx('list', 'child')} ${this.cx('list', `lvl${this.lvl}`)}`;
    }
    /**
     * @param {?} potentialArray
     * @return {?}
     */
    isArray(potentialArray) {
        return Array.isArray(potentialArray);
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    handleClick(event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.refine(item.value);
    }
}
NgAisHierarchicalMenuItem.decorators = [
    { type: Component, args: [{
                selector: 'ais-hierarchical-menu-item',
                template: `
    <li
      [class]="getItemClass(item)"
      (click)="handleClick($event, item)"
    >
      <a
        [class]="cx('link')"
        href="{{createURL(item.value)}}"
        (click)="handleClick($event, item)"
      >
        <span [class]="cx('label')">{{item.label}}</span>
        <span [class]="cx('count')">{{item.count}}</span>
      </a>

      <ul
        [class]="getListClass(item)"
        *ngIf="item.isRefined && isArray(item.data) && item.data.length > 0"
      >
        <ais-hierarchical-menu-item
          *ngFor="let child of item.data"
          [item]="child"
          [createURL]="createURL"
          [refine]="refine"
          [lvl]="lvl + 1"
        >
        </ais-hierarchical-menu-item>
      </ul>
    </li>
  `,
            },] },
];
NgAisHierarchicalMenuItem.propDecorators = {
    lvl: [{ type: Input }],
    refine: [{ type: Input }],
    createURL: [{ type: Input }],
    item: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAisHierarchicalMenuItem.prototype.lvl;
    /** @type {?} */
    NgAisHierarchicalMenuItem.prototype.refine;
    /** @type {?} */
    NgAisHierarchicalMenuItem.prototype.createURL;
    /** @type {?} */
    NgAisHierarchicalMenuItem.prototype.item;
    /** @type {?} */
    NgAisHierarchicalMenuItem.prototype.cx;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2hpY2FsLW1lbnUtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImhpZXJhcmNoaWNhbC1tZW51L2hpZXJhcmNoaWNhbC1tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUEwQy9CLE1BQU07SUFoQ047UUFpQ2tCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFLekIsT0FBRSxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBaUN0QyxDQUFDOzs7OztJQS9CUSxZQUFZLENBQUMsSUFBSTs7WUFDbEIsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixTQUFTLEdBQUcsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztTQUMzRDtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELFNBQVMsR0FBRyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ3pEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsSUFBSTtRQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUM5RCxNQUFNLEVBQ04sTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQ2pCLEVBQUUsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU0sT0FBTyxDQUFDLGNBQW1CO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBaUIsRUFBRSxJQUEwQjtRQUM5RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7OztZQXRFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2FBQ0Y7OztrQkFFRSxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLOzs7O0lBSE4sd0NBQWdDOztJQUNoQywyQ0FBeUM7O0lBQ3pDLDhDQUE4Qzs7SUFDOUMseUNBQTJDOztJQUUzQyx1Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBiZW0gfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEhpZXJhcmNoaWNhbE1lbnVJdGVtID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xuICBpc1JlZmluZWQ6IGJvb2xlYW47XG4gIGRhdGE6IEhpZXJhcmNoaWNhbE1lbnVJdGVtW107XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpXG4gICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICA+XG4gICAgICA8YVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgIGhyZWY9XCJ7e2NyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICA8L2E+XG5cbiAgICAgIDx1bFxuICAgICAgICBbY2xhc3NdPVwiZ2V0TGlzdENsYXNzKGl0ZW0pXCJcbiAgICAgICAgKm5nSWY9XCJpdGVtLmlzUmVmaW5lZCAmJiBpc0FycmF5KGl0ZW0uZGF0YSkgJiYgaXRlbS5kYXRhLmxlbmd0aCA+IDBcIlxuICAgICAgPlxuICAgICAgICA8YWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgaXRlbS5kYXRhXCJcbiAgICAgICAgICBbaXRlbV09XCJjaGlsZFwiXG4gICAgICAgICAgW2NyZWF0ZVVSTF09XCJjcmVhdGVVUkxcIlxuICAgICAgICAgIFtyZWZpbmVdPVwicmVmaW5lXCJcbiAgICAgICAgICBbbHZsXT1cImx2bCArIDFcIlxuICAgICAgICA+XG4gICAgICAgIDwvYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0+XG4gICAgICA8L3VsPlxuICAgIDwvbGk+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGllcmFyY2hpY2FsTWVudUl0ZW0ge1xuICBASW5wdXQoKSBwdWJsaWMgbHZsOiBudW1iZXIgPSAxO1xuICBASW5wdXQoKSBwdWJsaWMgcmVmaW5lOiAoc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwdWJsaWMgY3JlYXRlVVJMOiAoc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpdGVtOiBIaWVyYXJjaGljYWxNZW51SXRlbTtcblxuICBwdWJsaWMgY3ggPSBiZW0oJ0hpZXJhcmNoaWNhbE1lbnUnKTtcblxuICBwdWJsaWMgZ2V0SXRlbUNsYXNzKGl0ZW0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnaXRlbScpO1xuXG4gICAgaWYgKGl0ZW0uaXNSZWZpbmVkKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdzZWxlY3RlZCcpfWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBcnJheShpdGVtLmRhdGEpICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdwYXJlbnQnKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc05hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlzdENsYXNzKGl0ZW0pIHtcbiAgICByZXR1cm4gYCR7dGhpcy5jeCgnbGlzdCcpfSAke3RoaXMuY3goJ2xpc3QnLCAnY2hpbGQnKX0gJHt0aGlzLmN4KFxuICAgICAgJ2xpc3QnLFxuICAgICAgYGx2bCR7dGhpcy5sdmx9YFxuICAgICl9YDtcbiAgfVxuXG4gIHB1YmxpYyBpc0FycmF5KHBvdGVudGlhbEFycmF5OiBhbnkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwb3RlbnRpYWxBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEhpZXJhcmNoaWNhbE1lbnVJdGVtKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMucmVmaW5lKGl0ZW0udmFsdWUpO1xuICB9XG59XG4iXX0=