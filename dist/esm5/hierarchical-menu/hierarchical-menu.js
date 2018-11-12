/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';
var NgAisHierarchicalMenu = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisHierarchicalMenu, _super);
    function NgAisHierarchicalMenu(instantSearchParent) {
        var _this = _super.call(this, 'HierarchicalMenu') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.separator = ' > ';
        _this.limit = 10;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this.transformItems === 'function'
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisHierarchicalMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectHierarchicalMenu, {
            limit: parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy,
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisHierarchicalMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hierarchical-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list') + ' ' + cx('list', 'lvl0')\">\n        <ais-hierarchical-menu-item\n          *ngFor=\"let item of items\"\n          [item]=\"item\"\n          [createURL]=\"state.createURL\"\n          [refine]=\"state.refine\"\n        >\n        </ais-hierarchical-menu-item>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisHierarchicalMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisHierarchicalMenu.propDecorators = {
        transformItems: [{ type: Input }],
        attributes: [{ type: Input }],
        separator: [{ type: Input }],
        rootPath: [{ type: Input }],
        showParentLevel: [{ type: Input }],
        limit: [{ type: Input }],
        sortBy: [{ type: Input }]
    };
    return NgAisHierarchicalMenu;
}(BaseWidget));
export { NgAisHierarchicalMenu };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2hpY2FsLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJoaWVyYXJjaGljYWwtbWVudS9oaWVyYXJjaGljYWwtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRbEQ7SUFtQjJDLGlEQUFVO0lBNEJuRCwrQkFFUyxtQkFBd0I7UUFGakMsWUFJRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUMxQjtRQUhRLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQXhCakIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUczQixXQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUd0QyxXQUFLLEdBQTBCO1lBQ3BDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7O0lBaUJGLENBQUM7SUFmRCxzQkFBSSwyQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO2dCQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBOzs7O0lBU00sd0NBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRTtZQUN6QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7O2dCQWpFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLDJZQWVUO2lCQUNGOzs7Z0RBOEJJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7aUNBM0I3QyxLQUFLOzZCQUdMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2tDQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOztJQXFDUiw0QkFBQztDQUFBLEFBbEVELENBbUIyQyxVQUFVLEdBK0NwRDtTQS9DWSxxQkFBcUI7OztJQUVoQywrQ0FBMEM7O0lBRzFDLDJDQUFxQzs7SUFDckMsMENBQTJDOztJQUMzQyx5Q0FBa0M7O0lBQ2xDLGdEQUEwQzs7SUFDMUMsc0NBQTZDOztJQUM3Qyx1Q0FBK0Q7O0lBRS9ELHNDQUlFOztJQWFBLG9EQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0SGllcmFyY2hpY2FsTWVudSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEhpZXJhcmNoaWNhbE1lbnVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGllcmFyY2hpY2FsLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JykgKyAnICcgKyBjeCgnbGlzdCcsICdsdmwwJylcIj5cbiAgICAgICAgPGFpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgIFtjcmVhdGVVUkxdPVwic3RhdGUuY3JlYXRlVVJMXCJcbiAgICAgICAgICBbcmVmaW5lXT1cInN0YXRlLnJlZmluZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9haXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGllcmFyY2hpY2FsTWVudSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uXG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGVzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcj86IHN0cmluZyA9ICcgPiAnO1xuICBASW5wdXQoKSBwdWJsaWMgcm9vdFBhdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93UGFyZW50TGV2ZWw/OiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgbGltaXQ/OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeT86IHN0cmluZ1tdIHwgKChpdGVtOiBvYmplY3QpID0+IG51bWJlcik7XG5cbiAgcHVibGljIHN0YXRlOiBIaWVyYXJjaGljYWxNZW51U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdIaWVyYXJjaGljYWxNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEhpZXJhcmNoaWNhbE1lbnUsIHtcbiAgICAgIGxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMubGltaXQpLFxuICAgICAgYXR0cmlidXRlczogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgcm9vdFBhdGg6IHRoaXMucm9vdFBhdGgsXG4gICAgICBzZXBhcmF0b3I6IHRoaXMuc2VwYXJhdG9yLFxuICAgICAgc2hvd1BhcmVudExldmVsOiB0aGlzLnNob3dQYXJlbnRMZXZlbCxcbiAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=