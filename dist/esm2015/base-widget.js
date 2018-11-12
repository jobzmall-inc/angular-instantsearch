/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';
export class Widget {
}
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
export class BaseWidget {
    /**
     * @param {?} widgetName
     */
    constructor(widgetName) {
        this.state = {};
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering) {
                return Promise.resolve().then(() => {
                    this.state = state;
                });
            }
            this.state = state;
        };
        this.cx = bem(widgetName);
    }
    /**
     * @param {?} connector
     * @param {?=} options
     * @return {?}
     */
    createWidget(connector, options = {}) {
        this.widget = connector(this.updateState, noop)(options);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // add widget to the InstantSearch Instance
        this.instantSearchParent.addWidget(this.widget);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.instantSearchParent.platformId)) {
            this.instantSearchParent.removeWidget(this.widget);
        }
    }
    // helper method for genering item list className
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
        return className;
    }
}
BaseWidget.propDecorators = {
    autoHideContainer: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS13aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJiYXNlLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFcEMsTUFBTTtDQWtCTDs7O0lBakJDLHNCQUF3Qjs7SUFDeEIsa0NBQXNDOztJQUN0Qyx3QkFRVTs7SUFDVix5QkFLbUI7O0FBUXJCLE1BQU07Ozs7SUFTSixZQUFZLFVBQWtCO1FBSHZCLFVBQUssR0FBWSxFQUFFLENBQUM7UUFzQnBCLGdCQUFXLEdBQUcsQ0FDbkIsS0FBUyxFQUNULGdCQUF5QixFQUNILEVBQUU7WUFDeEIsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUM7UUE3QkEsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRU0sWUFBWSxDQUFDLFNBQW9CLEVBQUUsVUFBa0IsRUFBRTtRQUM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7SUFFTSxRQUFRO1FBQ2IsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7Ozs7O0lBZ0JNLFlBQVksQ0FBQyxJQUE2Qjs7WUFDM0MsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixTQUFTLEdBQUcsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztTQUMzRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OztnQ0EvQ0EsS0FBSzs7OztJQUZOLHlDQUFnQzs7SUFFaEMsdUNBQTRDOztJQUU1Qyw0QkFBdUI7O0lBQ3ZCLDJCQUEyQjs7SUFDM0Isd0JBQW9COztJQXFCcEIsaUNBV0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGJlbSwgbm9vcCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgV2lkZ2V0IHtcbiAgcHVibGljIGluaXQ6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBnZXRDb25maWd1cmF0aW9uOiAoKSA9PiBvYmplY3Q7XG4gIHB1YmxpYyByZW5kZXI6IChcbiAgICBwYXJhbXM6IHtcbiAgICAgIHRlbXBsYXRlc0NvbmZpZzogb2JqZWN0O1xuICAgICAgc3RhdGU6IG9iamVjdDtcbiAgICAgIHJlc3VsdHM6IHt9W107XG4gICAgICBjcmVhdGVVUkw6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG4gICAgICBpbnN0YW50U2VhcmNoSW5zdGFuY2U6IG9iamVjdDtcbiAgICB9XG4gICkgPT4gdm9pZDtcbiAgcHVibGljIGRpc3Bvc2U6IChcbiAgICBwYXJhbXM6IHtcbiAgICAgIGhlbHBlcjogb2JqZWN0O1xuICAgICAgc3RhdGU6IG9iamVjdDtcbiAgICB9XG4gICkgPT4gb2JqZWN0IHwgdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgQ29ubmVjdG9yID0gKFxuICByZW5kZXJGbjogKHN0YXRlOiBvYmplY3QsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHZvaWQsXG4gIHVubW91bnRGbjogKCkgPT4gdm9pZFxuKSA9PiAod2lkZ2V0T3B0aW9ucz86IG9iamVjdCkgPT4gV2lkZ2V0O1xuXG5leHBvcnQgY2xhc3MgQmFzZVdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueTtcblxuICBASW5wdXQoKSBwdWJsaWMgYXV0b0hpZGVDb250YWluZXI/OiBib29sZWFuO1xuXG4gIHB1YmxpYyB3aWRnZXQ/OiBXaWRnZXQ7XG4gIHB1YmxpYyBzdGF0ZT86IG9iamVjdCA9IHt9O1xuICBwdWJsaWMgY3g6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHdpZGdldE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY3ggPSBiZW0od2lkZ2V0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlV2lkZ2V0KGNvbm5lY3RvcjogQ29ubmVjdG9yLCBvcHRpb25zOiBvYmplY3QgPSB7fSkge1xuICAgIHRoaXMud2lkZ2V0ID0gY29ubmVjdG9yKHRoaXMudXBkYXRlU3RhdGUsIG5vb3ApKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIEluc3RhbnRTZWFyY2ggSW5zdGFuY2VcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQuYWRkV2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5pbnN0YW50U2VhcmNoUGFyZW50LnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQucmVtb3ZlV2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU3RhdGUgPSAoXG4gICAgc3RhdGU6IHt9LFxuICAgIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB8IHZvaWQgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfTtcblxuICAvLyBoZWxwZXIgbWV0aG9kIGZvciBnZW5lcmluZyBpdGVtIGxpc3QgY2xhc3NOYW1lXG4gIHB1YmxpYyBnZXRJdGVtQ2xhc3MoaXRlbTogeyBpc1JlZmluZWQ/OiBib29sZWFuIH0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnaXRlbScpO1xuXG4gICAgaWYgKGl0ZW0uaXNSZWZpbmVkKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdzZWxlY3RlZCcpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgfVxufVxuIl19