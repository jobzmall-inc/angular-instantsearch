/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef, KeyValueDiffers, } from '@angular/core';
import { connectConfigure } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch, } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisConfigure extends BaseWidget {
    /**
     * @param {?} differs
     * @param {?} instantSearchParent
     */
    constructor(differs, instantSearchParent) {
        super('Configure');
        this.differs = differs;
        this.instantSearchParent = instantSearchParent;
        this.state = {
            refine: noop,
        };
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set searchParameters(values) {
        this.internalSearchParameters = values;
        if (!this.differ && values) {
            this.differ = this.differs.find(values).create();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectConfigure, {
            searchParameters: this.internalSearchParameters,
        });
        super.ngOnInit();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.differ) {
            /** @type {?} */
            const changes = this.differ.diff(this.internalSearchParameters);
            if (changes) {
                this.state.refine(this.internalSearchParameters);
            }
        }
    }
}
NgAisConfigure.decorators = [
    { type: Component, args: [{
                selector: 'ais-configure',
                template: '',
            },] },
];
NgAisConfigure.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisConfigure.propDecorators = {
    searchParameters: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsiY29uZmlndXJlL2NvbmZpZ3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFFVixlQUFlLEdBRWhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQ0wsa0JBQWtCLEdBRW5CLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQU1oQyxNQUFNLHFCQUFzQixTQUFRLFVBQVU7Ozs7O0lBUTVDLFlBQ1UsT0FBd0IsRUFFekIsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpYLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBRXpCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQVAxQixVQUFLLEdBQXlCO1lBQ25DLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQVFGLENBQUM7Ozs7O0lBRUQsSUFDSSxnQkFBZ0IsQ0FBQyxNQUF3QjtRQUMzQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyx3QkFBd0I7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztrQkFDVCxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBQy9ELElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0Y7SUFDSCxDQUFDOzs7WUExQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsRUFBRTthQUNiOzs7WUFmQyxlQUFlOzRDQTBCWixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOzs7K0JBTTdDLEtBQUs7Ozs7SUFmTixrREFBbUQ7O0lBQ25ELGdDQUE0Qzs7SUFFNUMsK0JBRUU7O0lBR0EsaUNBQWdDOztJQUNoQyw2Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIFRlc3RhYmlsaXR5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdENvbmZpZ3VyZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHtcbiAgTmdBaXNJbnN0YW50U2VhcmNoLFxuICBTZWFyY2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNvbmZpZ3VyZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDb25maWd1cmUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgcHJpdmF0ZSBpbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnM6IFNlYXJjaFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47IC8vIFNlYXJjaFBhcmFtZXRlcnMgKEkgZG9uJ3Qga25vdyBob3cgdG8gZ2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHR5cGUpXG5cbiAgcHVibGljIHN0YXRlOiB7IHJlZmluZTogRnVuY3Rpb24gfSA9IHtcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ29uZmlndXJlJyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2VhcmNoUGFyYW1ldGVycyh2YWx1ZXM6IFNlYXJjaFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyA9IHZhbHVlcztcbiAgICBpZiAoIXRoaXMuZGlmZmVyICYmIHZhbHVlcykge1xuICAgICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZXMpLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q29uZmlndXJlLCB7XG4gICAgICBzZWFyY2hQYXJhbWV0ZXJzOiB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19