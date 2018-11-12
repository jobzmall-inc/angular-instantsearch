/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as algoliasearchProxy from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';
import { VERSION } from '../version';
/** @type {?} */
const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
/**
 * @record
 */
export function SearchRequestParameters() { }
if (false) {
    /** @type {?} */
    SearchRequestParameters.prototype.query;
}
/**
 * @record
 */
export function SearchForFacetValuesRequestParameters() { }
if (false) {
    /** @type {?} */
    SearchForFacetValuesRequestParameters.prototype.facetQuery;
    /** @type {?} */
    SearchForFacetValuesRequestParameters.prototype.facetName;
}
export class InstantSearchInstance {
}
if (false) {
    /** @type {?} */
    InstantSearchInstance.prototype.start;
    /** @type {?} */
    InstantSearchInstance.prototype.addWidget;
    /** @type {?} */
    InstantSearchInstance.prototype.addWidgets;
    /** @type {?} */
    InstantSearchInstance.prototype.removeWidget;
    /** @type {?} */
    InstantSearchInstance.prototype.removeWidgets;
    /** @type {?} */
    InstantSearchInstance.prototype.on;
    /** @type {?} */
    InstantSearchInstance.prototype.removeListener;
    /** @type {?} */
    InstantSearchInstance.prototype.helper;
    /** @type {?} */
    InstantSearchInstance.prototype.refresh;
    /** @type {?} */
    InstantSearchInstance.prototype.dispose;
}
export class NgAisInstantSearch {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
        this.instanceName = 'default';
        this.change = new EventEmitter();
        this.onRender = () => {
            this.change.emit({
                results: this.instantSearchInstance.helper.lastResults,
                state: this.instantSearchInstance.helper.state,
            });
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createInstantSearchInstance(this.config);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.instantSearchInstance.start();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.instantSearchInstance.removeListener('render', this.onRender);
        this.instantSearchInstance.dispose();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    createInstantSearchInstance(config) {
        // add default searchParameters with highlighting config
        if (!config.searchParameters)
            config.searchParameters = {};
        Object.assign(config.searchParameters, {
            highlightPreTag: '__ais-highlight__',
            highlightPostTag: '__/ais-highlight__',
        });
        // remove URLSync widget if on SSR
        if (!isPlatformBrowser(this.platformId)) {
            if (typeof config.urlSync !== 'undefined')
                delete config.urlSync;
            if (typeof config.routing !== 'undefined')
                delete config.routing;
        }
        // custom algolia client agent
        if (!config.searchClient && !config.createAlgoliaClient) {
            /** @type {?} */
            const client = algoliasearch(config.appId, config.apiKey);
            client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);
            config.searchClient = client;
            config.appId = undefined;
            config.apiKey = undefined;
        }
        this.instantSearchInstance = instantsearch(config);
        this.instantSearchInstance.on('render', this.onRender);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    addWidget(widget) {
        this.instantSearchInstance.addWidget(widget);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    removeWidget(widget) {
        this.instantSearchInstance.removeWidget(widget);
    }
    /**
     * @return {?}
     */
    refresh() {
        this.instantSearchInstance.refresh();
    }
}
NgAisInstantSearch.decorators = [
    { type: Component, args: [{
                selector: 'ais-instantsearch',
                template: `<ng-content></ng-content>`,
            },] },
];
NgAisInstantSearch.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NgAisInstantSearch.propDecorators = {
    config: [{ type: Input }],
    instanceName: [{ type: Input }],
    change: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgAisInstantSearch.prototype.config;
    /** @type {?} */
    NgAisInstantSearch.prototype.instanceName;
    /** @type {?} */
    NgAisInstantSearch.prototype.change;
    /** @type {?} */
    NgAisInstantSearch.prototype.instantSearchInstance;
    /** @type {?} */
    NgAisInstantSearch.prototype.onRender;
    /** @type {?} */
    NgAisInstantSearch.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudHNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImluc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sS0FBSyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUtoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDOztNQUUvQixhQUFhLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxJQUFJLGtCQUFrQjs7OztBQTBGdEUsNkNBRUM7OztJQURDLHdDQUFjOzs7OztBQUdoQiwyREFJQzs7O0lBRkMsMkRBQW1COztJQUNuQiwwREFBa0I7O0FBc0VwQixNQUFNO0NBb0JMOzs7SUFuQkMsc0NBQXlCOztJQUV6QiwwQ0FBMkM7O0lBQzNDLDJDQUErQzs7SUFFL0MsNkNBQThDOztJQUM5Qyw4Q0FBa0Q7O0lBR2xELG1DQUEyRDs7SUFDM0QsK0NBQXVFOztJQUV2RSx1Q0FHRTs7SUFFRix3Q0FBMkI7O0lBQzNCLHdDQUEyQjs7QUFPN0IsTUFBTTs7OztJQVlKLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFWM0MsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFHakQsV0FBTSxHQUE2QyxJQUFJLFlBQVksRUFHL0QsQ0FBQztRQTJETCxhQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FB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bXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCAqIGFzIGFsZ29saWFzZWFyY2hQcm94eSBmcm9tICdhbGdvbGlhc2VhcmNoL2xpdGUnO1xuXG5pbXBvcnQgaW5zdGFudHNlYXJjaCBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzJztcblxuaW1wb3J0IHsgQWxnb2xpYVNlYXJjaEhlbHBlciB9IGZyb20gJ2FsZ29saWFzZWFyY2gtaGVscGVyJztcblxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL3ZlcnNpb24nO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYXNlYXJjaFByb3h5LmRlZmF1bHQgfHwgYWxnb2xpYXNlYXJjaFByb3h5O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hSZXF1ZXN0ID0ge1xuICBpbmRleE5hbWU6IHN0cmluZztcbiAgcGFyYW1zOiBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdCA9IHtcbiAgaW5kZXhOYW1lOiBzdHJpbmc7XG4gIHBhcmFtczogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbi8vIERvY3VtZW50YXRpb246IGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9hcGktcmVmZXJlbmNlL3NlYXJjaC1hcGktcGFyYW1ldGVycy9cbmV4cG9ydCB0eXBlIFNlYXJjaFBhcmFtZXRlcnMgPSB7XG4gIC8vIEF0dHJpYnV0ZXNcbiAgYXR0cmlidXRlc1RvUmV0cmlldmU/OiBzdHJpbmdbXTtcbiAgcmVzdHJpY3RTZWFyY2hhYmxlQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEZpbHRlcmluZ1xuICBmaWx0ZXJzPzogc3RyaW5nO1xuICBmYWNldEZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgb3B0aW9uYWxGaWx0ZXJzPzogc3RyaW5nW107XG4gIG51bWVyaWNGaWx0ZXJzPzogc3RyaW5nW107XG4gIHN1bU9yRmlsdGVyc1Njb3Jlcz86IGJvb2xlYW47XG5cbiAgLy8gRmFjZXRpbmdcbiAgZmFjZXRzPzogc3RyaW5nW107XG4gIG1heFZhbHVlc1BlckZhY2V0PzogbnVtYmVyO1xuICBmYWNldGluZ0FmdGVyRGlzdGluY3Q/OiBib29sZWFuO1xuICBzb3J0RmFjZXRWYWx1ZXNCeT86IHN0cmluZztcblxuICAvLyBIaWdobGlnaHRpbmcgLyBTbmlwcGV0aW5nXG4gIGF0dHJpYnV0ZXNUb0hpZ2hsaWdodD86IHN0cmluZ1tdO1xuICBhdHRyaWJ1dGVzVG9TbmlwcGV0Pzogc3RyaW5nW107XG4gIGhpZ2hsaWdodFByZVRhZz86IHN0cmluZztcbiAgaGlnaGxpZ2h0UG9zdFRhZz86IHN0cmluZztcbiAgc25pcHBldEVsbGlwc2lzVGV4dD86IHN0cmluZztcbiAgcmVzdHJpY3RIaWdobGlnaHRBbmRTbmlwcGV0QXJyYXlzPzogYm9vbGVhbjtcblxuICAvLyBQYWdpbmF0aW9uXG4gIHBhZ2U/OiBudW1iZXI7XG4gIGhpdHNQZXJQYWdlPzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIGxlbmd0aD86IG51bWJlcjtcblxuICAvLyBUeXBvc1xuICBtaW5Xb3JkU2l6ZWZvcjFUeXBvPzogbnVtYmVyO1xuICBtaW5Xb3JkU2l6ZWZvcjJUeXBvcz86IG51bWJlcjtcbiAgdHlwb1RvbGVyYW5jZT86IHN0cmluZyB8IGJvb2xlYW47XG4gIGFsbG93VHlwb3NPbk51bWVyaWNUb2tlbnM/OiBib29sZWFuO1xuICBpZ25vcmVQbHVyYWxzPzogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBkaXNhYmxlVHlwb1RvbGVyYW5jZU9uQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEdlby1TZWFyY2hcbiAgYXJvdW5kTGF0TG5nPzogc3RyaW5nO1xuICBhcm91bmRMYXRMbmdWaWFJUD86IGJvb2xlYW47XG4gIGFyb3VuZFJhZGl1cz86IG51bWJlciB8ICdhbGwnO1xuICBhcm91bmRQcmVjaXNpb24/OiBudW1iZXI7XG4gIG1pbmltdW1Bcm91bmRSYWRpdXM/OiBudW1iZXI7XG4gIGluc2lkZUJvdW5kaW5nQm94PzogR2VvUmVjdGFuZ2xlIHwgR2VvUmVjdGFuZ2xlW107XG4gIGluc2lkZVBvbHlnb24/OiBHZW9Qb2x5Z29uIHwgR2VvUG9seWdvbltdO1xuXG4gIC8vIFF1ZXJ5IFN0cmF0ZWd5XG4gIHF1ZXJ5VHlwZT86IHN0cmluZztcbiAgcmVtb3ZlV29yZHNJZk5vUmVzdWx0cz86IHN0cmluZztcbiAgYWR2YW5jZWRTeW50YXg/OiBib29sZWFuO1xuICBvcHRpb25hbFdvcmRzPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHJlbW92ZVN0b3BXb3Jkcz86IGJvb2xlYW4gfCBzdHJpbmdbXTtcbiAgZGlzYWJsZUV4YWN0T25BdHRyaWJ1dGVzPzogc3RyaW5nW107XG4gIGV4YWN0T25TaW5nbGVXb3JkUXVlcnk/OiBzdHJpbmc7XG4gIGFsdGVybmF0aXZlc0FzRXhhY3Q/OiBzdHJpbmdbXTtcblxuICAvLyBRdWVyeSBSdWxlc1xuICBlbmFibGVSdWxlcz86IGJvb2xlYW47XG4gIHJ1bGVDb250ZXh0cz86IHN0cmluZ1tdO1xuXG4gIC8vIEFkdmFuY2VkXG4gIG1pblByb3hpbWl0eT86IG51bWJlcjtcbiAgcmVzcG9uc2VGaWVsZHM/OiBzdHJpbmdbXTtcbiAgbWF4RmFjZXRIaXRzPzogbnVtYmVyO1xuICBwZXJjZW50aWxlQ29tcHV0YXRpb24/OiBib29sZWFuO1xuICBkaXN0aW5jdD86IG51bWJlciB8IGJvb2xlYW47XG4gIGdldFJhbmtpbmdJbmZvPzogYm9vbGVhbjtcbiAgY2xpY2tBbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3NUYWdzPzogc3RyaW5nW107XG4gIHN5bm9ueW1zPzogYm9vbGVhbjtcbiAgcmVwbGFjZVN5bm9ueW1zSW5IaWdobGlnaHQ/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycyBleHRlbmRzIFNlYXJjaFBhcmFtZXRlcnMge1xuICBxdWVyeTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBTZWFyY2hQYXJhbWV0ZXJzIHtcbiAgZmFjZXRRdWVyeTogc3RyaW5nO1xuICBmYWNldE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2VvUmVjdGFuZ2xlID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5leHBvcnQgdHlwZSBHZW9Qb2x5Z29uID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4vLyBEb2N1bWVudGF0aW9uOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoLz9sYW5ndWFnZT1qYXZhc2NyaXB0I3NlYXJjaC1tdWx0aXBsZS1pbmRleGVzXG5leHBvcnQgdHlwZSBTZWFyY2hSZXNwb25zZSA9IHtcbiAgaGl0czogSGl0W107XG4gIHBhZ2U/OiBudW1iZXI7XG4gIG5iSGl0cz86IG51bWJlcjtcbiAgbmJQYWdlcz86IG51bWJlcjtcbiAgaGl0c1BlclBhZ2U/OiBudW1iZXI7XG4gIHByb2Nlc3NpbmdUaW1lTVM/OiBudW1iZXI7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBwYXJhbXM/OiBzdHJpbmc7XG4gIGluZGV4Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgSGl0ID0ge1xuICBfaGlnaGxpZ2h0UmVzdWx0Pzogb2JqZWN0O1xufTtcblxuLy8gRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3QtYXBpL3NlYXJjaC8/bGFuZ3VhZ2U9amF2YXNjcmlwdCNzZWFyY2gtZm9yLWZhY2V0LXZhbHVlc1xuZXhwb3J0IHR5cGUgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmc7XG4gIGNvdW50PzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoQ2xpZW50ID0ge1xuICBzZWFyY2g6IChyZXF1ZXN0czogU2VhcmNoUmVxdWVzdFtdKSA9PiBQcm9taXNlPHsgcmVzdWx0czogU2VhcmNoUmVzcG9uc2VbXSB9PjtcbiAgc2VhcmNoRm9yRmFjZXRWYWx1ZXM/OiAoXG4gICAgcmVxdWVzdHM6IFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFtdXG4gICkgPT4gUHJvbWlzZTx7IGZhY2V0SGl0czogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZVtdIH1bXT47XG59O1xuXG5leHBvcnQgdHlwZSBJbnN0YW50U2VhcmNoQ29uZmlnID0ge1xuICBhcHBJZD86IHN0cmluZztcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBpbmRleE5hbWU6IHN0cmluZztcblxuICBudW1iZXJMb2NhbGU/OiBzdHJpbmc7XG4gIHNlYXJjaEZ1bmN0aW9uPzogKGhlbHBlcjogYW55KSA9PiB2b2lkO1xuICBjcmVhdGVBbGdvbGlhQ2xpZW50PzogKFxuICAgIGFsZ29saWFzZWFyY2g6IEZ1bmN0aW9uLFxuICAgIGFwcElkOiBzdHJpbmcsXG4gICAgYXBpS2V5OiBzdHJpbmdcbiAgKSA9PiBvYmplY3Q7XG4gIHNlYXJjaENsaWVudD86IFNlYXJjaENsaWVudDtcbiAgc2VhcmNoUGFyYW1ldGVycz86IFNlYXJjaFBhcmFtZXRlcnMgfCB2b2lkO1xuICB1cmxTeW5jPzpcbiAgICB8IGJvb2xlYW5cbiAgICB8IHtcbiAgICAgICAgbWFwcGluZz86IG9iamVjdDtcbiAgICAgICAgdGhyZXNob2xkPzogbnVtYmVyO1xuICAgICAgICB0cmFja2VkUGFyYW1ldGVycz86IHN0cmluZ1tdO1xuICAgICAgICB1c2VIYXNoPzogYm9vbGVhbjtcbiAgICAgICAgZ2V0SGlzdG9yeVN0YXRlPzogKCkgPT4gb2JqZWN0O1xuICAgICAgfTtcbiAgcm91dGluZz86XG4gICAgfCBib29sZWFuXG4gICAgfCB7XG4gICAgICAgIHN0YXRlTWFwcGluZz86IHtcbiAgICAgICAgICBzdGF0ZVRvUm91dGUob2JqZWN0KTogb2JqZWN0O1xuICAgICAgICAgIHJvdXRlVG9TdGF0ZShvYmplY3QpOiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbnRTZWFyY2hJbnN0YW5jZSB7XG4gIHB1YmxpYyBzdGFydDogKCkgPT4gdm9pZDtcblxuICBwdWJsaWMgYWRkV2lkZ2V0OiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWQ7XG4gIHB1YmxpYyBhZGRXaWRnZXRzOiAod2lkZ2V0czogV2lkZ2V0W10pID0+IHZvaWQ7XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldDogKHdpZGdldDogV2lkZ2V0KSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0czogKHdpZGdldHM6IFdpZGdldFtdKSA9PiB2b2lkO1xuXG4gIC8vIEV2ZW50RW1taXRlclxuICBwdWJsaWMgb246IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuXG4gIHB1YmxpYyBoZWxwZXI6IHtcbiAgICBsYXN0UmVzdWx0czogT2JqZWN0O1xuICAgIHN0YXRlOiBPYmplY3Q7XG4gIH07XG5cbiAgcHVibGljIHJlZnJlc2g6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBkaXNwb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaW5zdGFudHNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5zdGFudFNlYXJjaCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZzogSW5zdGFudFNlYXJjaENvbmZpZztcbiAgQElucHV0KCkgcHVibGljIGluc3RhbmNlTmFtZTogc3RyaW5nID0gJ2RlZmF1bHQnO1xuXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjx7IHJlc3VsdHM6IHt9OyBzdGF0ZToge30gfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICByZXN1bHRzOiB7fTtcbiAgICBzdGF0ZToge307XG4gIH0+KCk7XG5cbiAgcHVibGljIGluc3RhbnRTZWFyY2hJbnN0YW5jZTogSW5zdGFudFNlYXJjaEluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUluc3RhbnRTZWFyY2hJbnN0YW5jZSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnN0YXJ0KCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVtb3ZlTGlzdGVuZXIoJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVJbnN0YW50U2VhcmNoSW5zdGFuY2UoY29uZmlnOiBJbnN0YW50U2VhcmNoQ29uZmlnKSB7XG4gICAgLy8gYWRkIGRlZmF1bHQgc2VhcmNoUGFyYW1ldGVycyB3aXRoIGhpZ2hsaWdodGluZyBjb25maWdcbiAgICBpZiAoIWNvbmZpZy5zZWFyY2hQYXJhbWV0ZXJzKSBjb25maWcuc2VhcmNoUGFyYW1ldGVycyA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLnNlYXJjaFBhcmFtZXRlcnMsIHtcbiAgICAgIGhpZ2hsaWdodFByZVRhZzogJ19fYWlzLWhpZ2hsaWdodF9fJyxcbiAgICAgIGhpZ2hsaWdodFBvc3RUYWc6ICdfXy9haXMtaGlnaGxpZ2h0X18nLFxuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIFVSTFN5bmMgd2lkZ2V0IGlmIG9uIFNTUlxuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcudXJsU3luYyAhPT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBjb25maWcudXJsU3luYztcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJvdXRpbmcgIT09ICd1bmRlZmluZWQnKSBkZWxldGUgY29uZmlnLnJvdXRpbmc7XG4gICAgfVxuXG4gICAgLy8gY3VzdG9tIGFsZ29saWEgY2xpZW50IGFnZW50XG4gICAgaWYgKCFjb25maWcuc2VhcmNoQ2xpZW50ICYmICFjb25maWcuY3JlYXRlQWxnb2xpYUNsaWVudCkge1xuICAgICAgY29uc3QgY2xpZW50ID0gYWxnb2xpYXNlYXJjaChjb25maWcuYXBwSWQsIGNvbmZpZy5hcGlLZXkpO1xuICAgICAgY2xpZW50LmFkZEFsZ29saWFBZ2VudChgYW5ndWxhci1pbnN0YW50c2VhcmNoICR7VkVSU0lPTn1gKTtcblxuICAgICAgY29uZmlnLnNlYXJjaENsaWVudCA9IGNsaWVudDtcbiAgICAgIGNvbmZpZy5hcHBJZCA9IHVuZGVmaW5lZDtcbiAgICAgIGNvbmZpZy5hcGlLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UgPSBpbnN0YW50c2VhcmNoKGNvbmZpZyk7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2Uub24oJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmFkZFdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnJlbW92ZVdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVmcmVzaCgpO1xuICB9XG5cbiAgb25SZW5kZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICByZXN1bHRzOiB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5oZWxwZXIubGFzdFJlc3VsdHMsXG4gICAgICBzdGF0ZTogdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuaGVscGVyLnN0YXRlLFxuICAgIH0pO1xuICB9O1xufVxuIl19