/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';
var Widget = /** @class */ (function () {
    function Widget() {
    }
    return Widget;
}());
export { Widget };
if (false) {
    /** @type {?} */
    Widget.prototype.init;
    /** @type {?} */
    Widget.prototype.getConfiguration;
    /** @type {?} */
    Widget.prototype.render;
    /** @type {?} */
    Widget.prototype.dispose;
}
var BaseWidget = /** @class */ (function () {
    function BaseWidget(widgetName) {
        var _this = this;
        this.state = {};
        this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                return Promise.resolve().then(function () {
                    _this.state = state;
                });
            }
            _this.state = state;
        };
        this.cx = bem(widgetName);
    }
    /**
     * @param {?} connector
     * @param {?=} options
     * @return {?}
     */
    BaseWidget.prototype.createWidget = /**
     * @param {?} connector
     * @param {?=} options
     * @return {?}
     */
    function (connector, options) {
        if (options === void 0) { options = {}; }
        this.widget = connector(this.updateState, noop)(options);
    };
    /**
     * @return {?}
     */
    BaseWidget.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // add widget to the InstantSearch Instance
        this.instantSearchParent.addWidget(this.widget);
    };
    /**
     * @return {?}
     */
    BaseWidget.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.instantSearchParent.platformId)) {
            this.instantSearchParent.removeWidget(this.widget);
        }
    };
    // helper method for genering item list className
    // helper method for genering item list className
    /**
     * @param {?} item
     * @return {?}
     */
    BaseWidget.prototype.getItemClass = 
    // helper method for genering item list className
    /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var className = this.cx('item');
        if (item.isRefined) {
            className = className + " " + this.cx('item', 'selected');
        }
        return className;
    };
    BaseWidget.propDecorators = {
        autoHideContainer: [{ type: Input }]
    };
    return BaseWidget;
}());
export { BaseWidget };
if (false) {
    /** @type {?} */
    BaseWidget.prototype.instantSearchParent;
    /** @type {?} */
    BaseWidget.prototype.autoHideContainer;
    /** @type {?} */
    BaseWidget.prototype.widget;
    /** @type {?} */
    BaseWidget.prototype.state;
    /** @type {?} */
    BaseWidget.prototype.cx;
    /** @type {?} */
    BaseWidget.prototype.updateState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS13aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJiYXNlLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFcEM7SUFBQTtJQWtCQSxDQUFDO0lBQUQsYUFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7Ozs7SUFqQkMsc0JBQXdCOztJQUN4QixrQ0FBc0M7O0lBQ3RDLHdCQVFVOztJQUNWLHlCQUttQjs7QUFRckI7SUFTRSxvQkFBWSxVQUFrQjtRQUE5QixpQkFFQztRQUxNLFVBQUssR0FBWSxFQUFFLENBQUM7UUFzQnBCLGdCQUFXLEdBQUcsVUFDbkIsS0FBUyxFQUNULGdCQUF5QjtZQUV6QixJQUFJLGdCQUFnQixFQUFFO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBN0JBLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVNLGlDQUFZOzs7OztJQUFuQixVQUFvQixTQUFvQixFQUFFLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7O0lBRU0sNkJBQVE7OztJQUFmO1FBQ0UsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFTSxnQ0FBVzs7O0lBQWxCO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBZUQsaURBQWlEOzs7Ozs7SUFDMUMsaUNBQVk7Ozs7OztJQUFuQixVQUFvQixJQUE2Qjs7WUFDM0MsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixTQUFTLEdBQU0sU0FBUyxTQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBRyxDQUFDO1NBQzNEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7b0NBL0NBLEtBQUs7O0lBZ0RSLGlCQUFDO0NBQUEsQUFuREQsSUFtREM7U0FuRFksVUFBVTs7O0lBQ3JCLHlDQUFnQzs7SUFFaEMsdUNBQTRDOztJQUU1Qyw0QkFBdUI7O0lBQ3ZCLDJCQUEyQjs7SUFDM0Isd0JBQW9COztJQXFCcEIsaUNBV0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGJlbSwgbm9vcCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgV2lkZ2V0IHtcbiAgcHVibGljIGluaXQ6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBnZXRDb25maWd1cmF0aW9uOiAoKSA9PiBvYmplY3Q7XG4gIHB1YmxpYyByZW5kZXI6IChcbiAgICBwYXJhbXM6IHtcbiAgICAgIHRlbXBsYXRlc0NvbmZpZzogb2JqZWN0O1xuICAgICAgc3RhdGU6IG9iamVjdDtcbiAgICAgIHJlc3VsdHM6IHt9W107XG4gICAgICBjcmVhdGVVUkw6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG4gICAgICBpbnN0YW50U2VhcmNoSW5zdGFuY2U6IG9iamVjdDtcbiAgICB9XG4gICkgPT4gdm9pZDtcbiAgcHVibGljIGRpc3Bvc2U6IChcbiAgICBwYXJhbXM6IHtcbiAgICAgIGhlbHBlcjogb2JqZWN0O1xuICAgICAgc3RhdGU6IG9iamVjdDtcbiAgICB9XG4gICkgPT4gb2JqZWN0IHwgdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgQ29ubmVjdG9yID0gKFxuICByZW5kZXJGbjogKHN0YXRlOiBvYmplY3QsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHZvaWQsXG4gIHVubW91bnRGbjogKCkgPT4gdm9pZFxuKSA9PiAod2lkZ2V0T3B0aW9ucz86IG9iamVjdCkgPT4gV2lkZ2V0O1xuXG5leHBvcnQgY2xhc3MgQmFzZVdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueTtcblxuICBASW5wdXQoKSBwdWJsaWMgYXV0b0hpZGVDb250YWluZXI/OiBib29sZWFuO1xuXG4gIHB1YmxpYyB3aWRnZXQ/OiBXaWRnZXQ7XG4gIHB1YmxpYyBzdGF0ZT86IG9iamVjdCA9IHt9O1xuICBwdWJsaWMgY3g6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHdpZGdldE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY3ggPSBiZW0od2lkZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlV2lkZ2V0KGNvbm5lY3RvcjogQ29ubmVjdG9yLCBvcHRpb25zOiBvYmplY3QgPSB7fSkge1xuICAgIHRoaXMud2lkZ2V0ID0gY29ubmVjdG9yKHRoaXMudXBkYXRlU3RhdGUsIG5vb3ApKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIEluc3RhbnRTZWFyY2ggSW5zdGFuY2VcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQuYWRkV2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5pbnN0YW50U2VhcmNoUGFyZW50LnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQucmVtb3ZlV2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU3RhdGUgPSAoXG4gICAgc3RhdGU6IHt9LFxuICAgIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB8IHZvaWQgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfTtcblxuICAvLyBoZWxwZXIgbWV0aG9kIGZvciBnZW5lcmluZyBpdGVtIGxpc3QgY2xhc3NOYW1lXG4gIHB1YmxpYyBnZXRJdGVtQ2xhc3MoaXRlbTogeyBpc1JlZmluZWQ/OiBib29sZWFuIH0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnaXRlbScpO1xuXG4gICAgaWYgKGl0ZW0uaXNSZWZpbmVkKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdzZWxlY3RlZCcpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgfVxufVxuIl19