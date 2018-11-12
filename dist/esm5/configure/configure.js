/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef, KeyValueDiffers, } from '@angular/core';
import { connectConfigure } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch, } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisConfigure = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisConfigure, _super);
    function NgAisConfigure(differs, instantSearchParent) {
        var _this = _super.call(this, 'Configure') || this;
        _this.differs = differs;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisConfigure.prototype, "searchParameters", {
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            this.internalSearchParameters = values;
            if (!this.differ && values) {
                this.differ = this.differs.find(values).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisConfigure.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectConfigure, {
            searchParameters: this.internalSearchParameters,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @return {?}
     */
    NgAisConfigure.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.differ) {
            /** @type {?} */
            var changes = this.differ.diff(this.internalSearchParameters);
            if (changes) {
                this.state.refine(this.internalSearchParameters);
            }
        }
    };
    NgAisConfigure.decorators = [
        { type: Component, args: [{
                    selector: 'ais-configure',
                    template: '',
                },] },
    ];
    NgAisConfigure.ctorParameters = function () { return [
        { type: KeyValueDiffers },
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisConfigure.propDecorators = {
        searchParameters: [{ type: Input }]
    };
    return NgAisConfigure;
}(BaseWidget));
export { NgAisConfigure };
if (false) {
    /** @type {?} */
    NgAisConfigure.prototype.internalSearchParameters;
    /** @type {?} */
    NgAisConfigure.prototype.differ;
    /** @type {?} */
    NgAisConfigure.prototype.state;
    /** @type {?} */
    NgAisConfigure.prototype.differs;
    /** @type {?} */
    NgAisConfigure.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsiY29uZmlndXJlL2NvbmZpZ3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBRVYsZUFBZSxHQUVoQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUNMLGtCQUFrQixHQUVuQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEM7SUFJb0MsMENBQVU7SUFRNUMsd0JBQ1UsT0FBd0IsRUFFekIsbUJBQXdCO1FBSGpDLFlBS0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBTFMsYUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFFekIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBUDFCLFdBQUssR0FBeUI7WUFDbkMsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDOztJQVFGLENBQUM7SUFFRCxzQkFDSSw0Q0FBZ0I7Ozs7O1FBRHBCLFVBQ3FCLE1BQXdCO1lBQzNDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7SUFFTSxpQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyx3QkFBd0I7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELGtDQUFTOzs7SUFBVDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7Z0JBQ1QsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztZQUMvRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNsRDtTQUNGO0lBQ0gsQ0FBQzs7Z0JBMUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7OztnQkFmQyxlQUFlO2dEQTBCWixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs7O21DQU03QyxLQUFLOztJQXVCUixxQkFBQztDQUFBLEFBM0NELENBSW9DLFVBQVUsR0F1QzdDO1NBdkNZLGNBQWM7OztJQUN6QixrREFBbUQ7O0lBQ25ELGdDQUE0Qzs7SUFFNUMsK0JBRUU7O0lBR0EsaUNBQWdDOztJQUNoQyw2Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIFRlc3RhYmlsaXR5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdENvbmZpZ3VyZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHtcbiAgTmdBaXNJbnN0YW50U2VhcmNoLFxuICBTZWFyY2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNvbmZpZ3VyZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDb25maWd1cmUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgcHJpdmF0ZSBpbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnM6IFNlYXJjaFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47IC8vIFNlYXJjaFBhcmFtZXRlcnMgKEkgZG9uJ3Qga25vdyBob3cgdG8gZ2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHR5cGUpXG5cbiAgcHVibGljIHN0YXRlOiB7IHJlZmluZTogRnVuY3Rpb24gfSA9IHtcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ29uZmlndXJlJyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2VhcmNoUGFyYW1ldGVycyh2YWx1ZXM6IFNlYXJjaFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyA9IHZhbHVlcztcbiAgICBpZiAoIXRoaXMuZGlmZmVyICYmIHZhbHVlcykge1xuICAgICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZXMpLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q29uZmlndXJlLCB7XG4gICAgICBzZWFyY2hQYXJhbWV0ZXJzOiB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19