/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
var NgAisHierarchicalMenuItem = /** @class */ (function () {
    function NgAisHierarchicalMenuItem() {
        this.lvl = 1;
        this.cx = bem('HierarchicalMenu');
    }
    /**
     * @param {?} item
     * @return {?}
     */
    NgAisHierarchicalMenuItem.prototype.getItemClass = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var className = this.cx('item');
        if (item.isRefined) {
            className = className + " " + this.cx('item', 'selected');
        }
        if (this.isArray(item.data) && item.data.length > 0) {
            className = className + " " + this.cx('item', 'parent');
        }
        return className;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgAisHierarchicalMenuItem.prototype.getListClass = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.cx('list') + " " + this.cx('list', 'child') + " " + this.cx('list', "lvl" + this.lvl);
    };
    /**
     * @param {?} potentialArray
     * @return {?}
     */
    NgAisHierarchicalMenuItem.prototype.isArray = /**
     * @param {?} potentialArray
     * @return {?}
     */
    function (potentialArray) {
        return Array.isArray(potentialArray);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisHierarchicalMenuItem.prototype.handleClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.refine(item.value);
    };
    NgAisHierarchicalMenuItem.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hierarchical-menu-item',
                    template: "\n    <li\n      [class]=\"getItemClass(item)\"\n      (click)=\"handleClick($event, item)\"\n    >\n      <a\n        [class]=\"cx('link')\"\n        href=\"{{createURL(item.value)}}\"\n        (click)=\"handleClick($event, item)\"\n      >\n        <span [class]=\"cx('label')\">{{item.label}}</span>\n        <span [class]=\"cx('count')\">{{item.count}}</span>\n      </a>\n\n      <ul\n        [class]=\"getListClass(item)\"\n        *ngIf=\"item.isRefined && isArray(item.data) && item.data.length > 0\"\n      >\n        <ais-hierarchical-menu-item\n          *ngFor=\"let child of item.data\"\n          [item]=\"child\"\n          [createURL]=\"createURL\"\n          [refine]=\"refine\"\n          [lvl]=\"lvl + 1\"\n        >\n        </ais-hierarchical-menu-item>\n      </ul>\n    </li>\n  ",
                },] },
    ];
    NgAisHierarchicalMenuItem.propDecorators = {
        lvl: [{ type: Input }],
        refine: [{ type: Input }],
        createURL: [{ type: Input }],
        item: [{ type: Input }]
    };
    return NgAisHierarchicalMenuItem;
}());
export { NgAisHierarchicalMenuItem };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2hpY2FsLW1lbnUtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImhpZXJhcmNoaWNhbC1tZW51L2hpZXJhcmNoaWNhbC1tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFVL0I7SUFBQTtRQWlDa0IsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUt6QixPQUFFLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFpQ3RDLENBQUM7Ozs7O0lBL0JRLGdEQUFZOzs7O0lBQW5CLFVBQW9CLElBQUk7O1lBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsU0FBUyxHQUFNLFNBQVMsU0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUcsQ0FBQztTQUMzRDtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELFNBQVMsR0FBTSxTQUFTLFNBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFHLENBQUM7U0FDekQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVNLGdEQUFZOzs7O0lBQW5CLFVBQW9CLElBQUk7UUFDdEIsT0FBVSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFJLElBQUksQ0FBQyxFQUFFLENBQzlELE1BQU0sRUFDTixRQUFNLElBQUksQ0FBQyxHQUFLLENBQ2YsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU0sMkNBQU87Ozs7SUFBZCxVQUFlLGNBQW1CO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFTSwrQ0FBVzs7Ozs7SUFBbEIsVUFBbUIsS0FBaUIsRUFBRSxJQUEwQjtRQUM5RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQXRFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLG95QkE0QlQ7aUJBQ0Y7OztzQkFFRSxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOztJQW1DUixnQ0FBQztDQUFBLEFBdkVELElBdUVDO1NBdkNZLHlCQUF5Qjs7O0lBQ3BDLHdDQUFnQzs7SUFDaEMsMkNBQXlDOztJQUN6Qyw4Q0FBOEM7O0lBQzlDLHlDQUEyQzs7SUFFM0MsdUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBIaWVyYXJjaGljYWxNZW51SXRlbSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbiAgaXNSZWZpbmVkOiBib29sZWFuO1xuICBkYXRhOiBIaWVyYXJjaGljYWxNZW51SXRlbVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaVxuICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgPlxuICAgICAgPGFcbiAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICBocmVmPVwie3tjcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgPC9hPlxuXG4gICAgICA8dWxcbiAgICAgICAgW2NsYXNzXT1cImdldExpc3RDbGFzcyhpdGVtKVwiXG4gICAgICAgICpuZ0lmPVwiaXRlbS5pc1JlZmluZWQgJiYgaXNBcnJheShpdGVtLmRhdGEpICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwXCJcbiAgICAgID5cbiAgICAgICAgPGFpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNoaWxkIG9mIGl0ZW0uZGF0YVwiXG4gICAgICAgICAgW2l0ZW1dPVwiY2hpbGRcIlxuICAgICAgICAgIFtjcmVhdGVVUkxdPVwiY3JlYXRlVVJMXCJcbiAgICAgICAgICBbcmVmaW5lXT1cInJlZmluZVwiXG4gICAgICAgICAgW2x2bF09XCJsdmwgKyAxXCJcbiAgICAgICAgPlxuICAgICAgICA8L2Fpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtPlxuICAgICAgPC91bD5cbiAgICA8L2xpPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVJdGVtIHtcbiAgQElucHV0KCkgcHVibGljIGx2bDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgcHVibGljIHJlZmluZTogKHN0cmluZykgPT4gdm9pZDtcbiAgQElucHV0KCkgcHVibGljIGNyZWF0ZVVSTDogKHN0cmluZykgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaXRlbTogSGllcmFyY2hpY2FsTWVudUl0ZW07XG5cbiAgcHVibGljIGN4ID0gYmVtKCdIaWVyYXJjaGljYWxNZW51Jyk7XG5cbiAgcHVibGljIGdldEl0ZW1DbGFzcyhpdGVtKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ2l0ZW0nKTtcblxuICAgIGlmIChpdGVtLmlzUmVmaW5lZCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKX1gO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQXJyYXkoaXRlbS5kYXRhKSAmJiBpdGVtLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAncGFyZW50Jyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldExpc3RDbGFzcyhpdGVtKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuY3goJ2xpc3QnKX0gJHt0aGlzLmN4KCdsaXN0JywgJ2NoaWxkJyl9ICR7dGhpcy5jeChcbiAgICAgICdsaXN0JyxcbiAgICAgIGBsdmwke3RoaXMubHZsfWBcbiAgICApfWA7XG4gIH1cblxuICBwdWJsaWMgaXNBcnJheShwb3RlbnRpYWxBcnJheTogYW55KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocG90ZW50aWFsQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBIaWVyYXJjaGljYWxNZW51SXRlbSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgfVxufVxuIl19