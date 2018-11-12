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
var algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
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
var InstantSearchInstance = /** @class */ (function () {
    function InstantSearchInstance() {
    }
    return InstantSearchInstance;
}());
export { InstantSearchInstance };
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
var NgAisInstantSearch = /** @class */ (function () {
    function NgAisInstantSearch(platformId) {
        var _this = this;
        this.platformId = platformId;
        this.instanceName = 'default';
        this.change = new EventEmitter();
        this.onRender = function () {
            _this.change.emit({
                results: _this.instantSearchInstance.helper.lastResults,
                state: _this.instantSearchInstance.helper.state,
            });
        };
    }
    /**
     * @return {?}
     */
    NgAisInstantSearch.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createInstantSearchInstance(this.config);
    };
    /**
     * @return {?}
     */
    NgAisInstantSearch.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.instantSearchInstance.start();
    };
    /**
     * @return {?}
     */
    NgAisInstantSearch.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.instantSearchInstance.removeListener('render', this.onRender);
        this.instantSearchInstance.dispose();
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NgAisInstantSearch.prototype.createInstantSearchInstance = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
            var client = algoliasearch(config.appId, config.apiKey);
            client.addAlgoliaAgent("angular-instantsearch " + VERSION);
            config.searchClient = client;
            config.appId = undefined;
            config.apiKey = undefined;
        }
        this.instantSearchInstance = instantsearch(config);
        this.instantSearchInstance.on('render', this.onRender);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgAisInstantSearch.prototype.addWidget = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.instantSearchInstance.addWidget(widget);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgAisInstantSearch.prototype.removeWidget = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.instantSearchInstance.removeWidget(widget);
    };
    /**
     * @return {?}
     */
    NgAisInstantSearch.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.instantSearchInstance.refresh();
    };
    NgAisInstantSearch.decorators = [
        { type: Component, args: [{
                    selector: 'ais-instantsearch',
                    template: "<ng-content></ng-content>",
                },] },
    ];
    NgAisInstantSearch.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NgAisInstantSearch.propDecorators = {
        config: [{ type: Input }],
        instanceName: [{ type: Input }],
        change: [{ type: Output }]
    };
    return NgAisInstantSearch;
}());
export { NgAisInstantSearch };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudHNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImluc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sS0FBSyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUtoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDOztJQUUvQixhQUFhLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxJQUFJLGtCQUFrQjs7OztBQTBGdEUsNkNBRUM7OztJQURDLHdDQUFjOzs7OztBQUdoQiwyREFJQzs7O0lBRkMsMkRBQW1COztJQUNuQiwwREFBa0I7O0FBc0VwQjtJQUFBO0lBb0JBLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7Ozs7SUFuQkMsc0NBQXlCOztJQUV6QiwwQ0FBMkM7O0lBQzNDLDJDQUErQzs7SUFFL0MsNkNBQThDOztJQUM5Qyw4Q0FBa0Q7O0lBR2xELG1DQUEyRDs7SUFDM0QsK0NBQXVFOztJQUV2RSx1Q0FHRTs7SUFFRix3Q0FBMkI7O0lBQzNCLHdDQUEyQjs7QUFHN0I7SUFnQkUsNEJBQXlDLFVBQWtCO1FBQTNELGlCQUErRDtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBVjNDLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBR2pELFdBQU0sR0FBNkMsSUFBSSxZQUFZLEVBRy9ELENBQUM7UUEyREwsYUFBUSxHQUFHO1lBQ1QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7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QUFrQjs7O0lBQzdCLG9DQUE0Qzs7SUFDNUMsMENBQWlEOztJQUVqRCxvQ0FJSzs7SUFFTCxtREFBb0Q7O0lBeURwRCxzQ0FLRTs7SUE1RFUsd0NBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0ICogYXMgYWxnb2xpYXNlYXJjaFByb3h5IGZyb20gJ2FsZ29saWFzZWFyY2gvbGl0ZSc7XG5cbmltcG9ydCBpbnN0YW50c2VhcmNoIGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMnO1xuXG5pbXBvcnQgeyBBbGdvbGlhU2VhcmNoSGVscGVyIH0gZnJvbSAnYWxnb2xpYXNlYXJjaC1oZWxwZXInO1xuXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vdmVyc2lvbic7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhc2VhcmNoUHJveHkuZGVmYXVsdCB8fCBhbGdvbGlhc2VhcmNoUHJveHk7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaFJlcXVlc3QgPSB7XG4gIGluZGV4TmFtZTogc3RyaW5nO1xuICBwYXJhbXM6IFNlYXJjaFJlcXVlc3RQYXJhbWV0ZXJzO1xufTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0ID0ge1xuICBpbmRleE5hbWU6IHN0cmluZztcbiAgcGFyYW1zOiBTZWFyY2hGb3JGYWNldFZhbHVlc1JlcXVlc3RQYXJhbWV0ZXJzO1xufTtcblxuLy8gRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL2FwaS1yZWZlcmVuY2Uvc2VhcmNoLWFwaS1wYXJhbWV0ZXJzL1xuZXhwb3J0IHR5cGUgU2VhcmNoUGFyYW1ldGVycyA9IHtcbiAgLy8gQXR0cmlidXRlc1xuICBhdHRyaWJ1dGVzVG9SZXRyaWV2ZT86IHN0cmluZ1tdO1xuICByZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLy8gRmlsdGVyaW5nXG4gIGZpbHRlcnM/OiBzdHJpbmc7XG4gIGZhY2V0RmlsdGVycz86IHN0cmluZ1tdO1xuICBvcHRpb25hbEZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgbnVtZXJpY0ZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgc3VtT3JGaWx0ZXJzU2NvcmVzPzogYm9vbGVhbjtcblxuICAvLyBGYWNldGluZ1xuICBmYWNldHM/OiBzdHJpbmdbXTtcbiAgbWF4VmFsdWVzUGVyRmFjZXQ/OiBudW1iZXI7XG4gIGZhY2V0aW5nQWZ0ZXJEaXN0aW5jdD86IGJvb2xlYW47XG4gIHNvcnRGYWNldFZhbHVlc0J5Pzogc3RyaW5nO1xuXG4gIC8vIEhpZ2hsaWdodGluZyAvIFNuaXBwZXRpbmdcbiAgYXR0cmlidXRlc1RvSGlnaGxpZ2h0Pzogc3RyaW5nW107XG4gIGF0dHJpYnV0ZXNUb1NuaXBwZXQ/OiBzdHJpbmdbXTtcbiAgaGlnaGxpZ2h0UHJlVGFnPzogc3RyaW5nO1xuICBoaWdobGlnaHRQb3N0VGFnPzogc3RyaW5nO1xuICBzbmlwcGV0RWxsaXBzaXNUZXh0Pzogc3RyaW5nO1xuICByZXN0cmljdEhpZ2hsaWdodEFuZFNuaXBwZXRBcnJheXM/OiBib29sZWFuO1xuXG4gIC8vIFBhZ2luYXRpb25cbiAgcGFnZT86IG51bWJlcjtcbiAgaGl0c1BlclBhZ2U/OiBudW1iZXI7XG4gIG9mZnNldD86IG51bWJlcjtcbiAgbGVuZ3RoPzogbnVtYmVyO1xuXG4gIC8vIFR5cG9zXG4gIG1pbldvcmRTaXplZm9yMVR5cG8/OiBudW1iZXI7XG4gIG1pbldvcmRTaXplZm9yMlR5cG9zPzogbnVtYmVyO1xuICB0eXBvVG9sZXJhbmNlPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgYWxsb3dUeXBvc09uTnVtZXJpY1Rva2Vucz86IGJvb2xlYW47XG4gIGlnbm9yZVBsdXJhbHM/OiBib29sZWFuIHwgc3RyaW5nW107XG4gIGRpc2FibGVUeXBvVG9sZXJhbmNlT25BdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLy8gR2VvLVNlYXJjaFxuICBhcm91bmRMYXRMbmc/OiBzdHJpbmc7XG4gIGFyb3VuZExhdExuZ1ZpYUlQPzogYm9vbGVhbjtcbiAgYXJvdW5kUmFkaXVzPzogbnVtYmVyIHwgJ2FsbCc7XG4gIGFyb3VuZFByZWNpc2lvbj86IG51bWJlcjtcbiAgbWluaW11bUFyb3VuZFJhZGl1cz86IG51bWJlcjtcbiAgaW5zaWRlQm91bmRpbmdCb3g/OiBHZW9SZWN0YW5nbGUgfCBHZW9SZWN0YW5nbGVbXTtcbiAgaW5zaWRlUG9seWdvbj86IEdlb1BvbHlnb24gfCBHZW9Qb2x5Z29uW107XG5cbiAgLy8gUXVlcnkgU3RyYXRlZ3lcbiAgcXVlcnlUeXBlPzogc3RyaW5nO1xuICByZW1vdmVXb3Jkc0lmTm9SZXN1bHRzPzogc3RyaW5nO1xuICBhZHZhbmNlZFN5bnRheD86IGJvb2xlYW47XG4gIG9wdGlvbmFsV29yZHM/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgcmVtb3ZlU3RvcFdvcmRzPzogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBkaXNhYmxlRXhhY3RPbkF0dHJpYnV0ZXM/OiBzdHJpbmdbXTtcbiAgZXhhY3RPblNpbmdsZVdvcmRRdWVyeT86IHN0cmluZztcbiAgYWx0ZXJuYXRpdmVzQXNFeGFjdD86IHN0cmluZ1tdO1xuXG4gIC8vIFF1ZXJ5IFJ1bGVzXG4gIGVuYWJsZVJ1bGVzPzogYm9vbGVhbjtcbiAgcnVsZUNvbnRleHRzPzogc3RyaW5nW107XG5cbiAgLy8gQWR2YW5jZWRcbiAgbWluUHJveGltaXR5PzogbnVtYmVyO1xuICByZXNwb25zZUZpZWxkcz86IHN0cmluZ1tdO1xuICBtYXhGYWNldEhpdHM/OiBudW1iZXI7XG4gIHBlcmNlbnRpbGVDb21wdXRhdGlvbj86IGJvb2xlYW47XG4gIGRpc3RpbmN0PzogbnVtYmVyIHwgYm9vbGVhbjtcbiAgZ2V0UmFua2luZ0luZm8/OiBib29sZWFuO1xuICBjbGlja0FuYWx5dGljcz86IGJvb2xlYW47XG4gIGFuYWx5dGljcz86IGJvb2xlYW47XG4gIGFuYWx5dGljc1RhZ3M/OiBzdHJpbmdbXTtcbiAgc3lub255bXM/OiBib29sZWFuO1xuICByZXBsYWNlU3lub255bXNJbkhpZ2hsaWdodD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFJlcXVlc3RQYXJhbWV0ZXJzIGV4dGVuZHMgU2VhcmNoUGFyYW1ldGVycyB7XG4gIHF1ZXJ5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0UGFyYW1ldGVyc1xuICBleHRlbmRzIFNlYXJjaFBhcmFtZXRlcnMge1xuICBmYWNldFF1ZXJ5OiBzdHJpbmc7XG4gIGZhY2V0TmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBHZW9SZWN0YW5nbGUgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbmV4cG9ydCB0eXBlIEdlb1BvbHlnb24gPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbi8vIERvY3VtZW50YXRpb246IGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0LWFwaS9zZWFyY2gvP2xhbmd1YWdlPWphdmFzY3JpcHQjc2VhcmNoLW11bHRpcGxlLWluZGV4ZXNcbmV4cG9ydCB0eXBlIFNlYXJjaFJlc3BvbnNlID0ge1xuICBoaXRzOiBIaXRbXTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbmJIaXRzPzogbnVtYmVyO1xuICBuYlBhZ2VzPzogbnVtYmVyO1xuICBoaXRzUGVyUGFnZT86IG51bWJlcjtcbiAgcHJvY2Vzc2luZ1RpbWVNUz86IG51bWJlcjtcbiAgcXVlcnk/OiBzdHJpbmc7XG4gIHBhcmFtcz86IHN0cmluZztcbiAgaW5kZXg/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBIaXQgPSB7XG4gIF9oaWdobGlnaHRSZXN1bHQ/OiBvYmplY3Q7XG59O1xuXG4vLyBEb2N1bWVudGF0aW9uOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoLz9sYW5ndWFnZT1qYXZhc2NyaXB0I3NlYXJjaC1mb3ItZmFjZXQtdmFsdWVzXG5leHBvcnQgdHlwZSBTZWFyY2hGb3JGYWNldFZhbHVlc1Jlc3BvbnNlID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBoaWdobGlnaHRlZD86IHN0cmluZztcbiAgY291bnQ/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hDbGllbnQgPSB7XG4gIHNlYXJjaDogKHJlcXVlc3RzOiBTZWFyY2hSZXF1ZXN0W10pID0+IFByb21pc2U8eyByZXN1bHRzOiBTZWFyY2hSZXNwb25zZVtdIH0+O1xuICBzZWFyY2hGb3JGYWNldFZhbHVlcz86IChcbiAgICByZXF1ZXN0czogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0W11cbiAgKSA9PiBQcm9taXNlPHsgZmFjZXRIaXRzOiBTZWFyY2hGb3JGYWNldFZhbHVlc1Jlc3BvbnNlW10gfVtdPjtcbn07XG5cbmV4cG9ydCB0eXBlIEluc3RhbnRTZWFyY2hDb25maWcgPSB7XG4gIGFwcElkPzogc3RyaW5nO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIGluZGV4TmFtZTogc3RyaW5nO1xuXG4gIG51bWJlckxvY2FsZT86IHN0cmluZztcbiAgc2VhcmNoRnVuY3Rpb24/OiAoaGVscGVyOiBhbnkpID0+IHZvaWQ7XG4gIGNyZWF0ZUFsZ29saWFDbGllbnQ/OiAoXG4gICAgYWxnb2xpYXNlYXJjaDogRnVuY3Rpb24sXG4gICAgYXBwSWQ6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZ1xuICApID0+IG9iamVjdDtcbiAgc2VhcmNoQ2xpZW50PzogU2VhcmNoQ2xpZW50O1xuICBzZWFyY2hQYXJhbWV0ZXJzPzogU2VhcmNoUGFyYW1ldGVycyB8IHZvaWQ7XG4gIHVybFN5bmM/OlxuICAgIHwgYm9vbGVhblxuICAgIHwge1xuICAgICAgICBtYXBwaW5nPzogb2JqZWN0O1xuICAgICAgICB0aHJlc2hvbGQ/OiBudW1iZXI7XG4gICAgICAgIHRyYWNrZWRQYXJhbWV0ZXJzPzogc3RyaW5nW107XG4gICAgICAgIHVzZUhhc2g/OiBib29sZWFuO1xuICAgICAgICBnZXRIaXN0b3J5U3RhdGU/OiAoKSA9PiBvYmplY3Q7XG4gICAgICB9O1xuICByb3V0aW5nPzpcbiAgICB8IGJvb2xlYW5cbiAgICB8IHtcbiAgICAgICAgc3RhdGVNYXBwaW5nPzoge1xuICAgICAgICAgIHN0YXRlVG9Sb3V0ZShvYmplY3QpOiBvYmplY3Q7XG4gICAgICAgICAgcm91dGVUb1N0YXRlKG9iamVjdCk6IG9iamVjdDtcbiAgICAgICAgfTtcbiAgICAgIH07XG59O1xuXG5leHBvcnQgY2xhc3MgSW5zdGFudFNlYXJjaEluc3RhbmNlIHtcbiAgcHVibGljIHN0YXJ0OiAoKSA9PiB2b2lkO1xuXG4gIHB1YmxpYyBhZGRXaWRnZXQ6ICh3aWRnZXQ6IFdpZGdldCkgPT4gdm9pZDtcbiAgcHVibGljIGFkZFdpZGdldHM6ICh3aWRnZXRzOiBXaWRnZXRbXSkgPT4gdm9pZDtcblxuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0OiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWQ7XG4gIHB1YmxpYyByZW1vdmVXaWRnZXRzOiAod2lkZ2V0czogV2lkZ2V0W10pID0+IHZvaWQ7XG5cbiAgLy8gRXZlbnRFbW1pdGVyXG4gIHB1YmxpYyBvbjogKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHZvaWQ7XG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lcjogKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHZvaWQ7XG5cbiAgcHVibGljIGhlbHBlcjoge1xuICAgIGxhc3RSZXN1bHRzOiBPYmplY3Q7XG4gICAgc3RhdGU6IE9iamVjdDtcbiAgfTtcblxuICBwdWJsaWMgcmVmcmVzaDogKCkgPT4gdm9pZDtcbiAgcHVibGljIGRpc3Bvc2U6ICgpID0+IHZvaWQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1pbnN0YW50c2VhcmNoJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbnN0YW50U2VhcmNoIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBJbnN0YW50U2VhcmNoQ29uZmlnO1xuICBASW5wdXQoKSBwdWJsaWMgaW5zdGFuY2VOYW1lOiBzdHJpbmcgPSAnZGVmYXVsdCc7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPHsgcmVzdWx0czoge307IHN0YXRlOiB7fSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHJlc3VsdHM6IHt9O1xuICAgIHN0YXRlOiB7fTtcbiAgfT4oKTtcblxuICBwdWJsaWMgaW5zdGFudFNlYXJjaEluc3RhbmNlOiBJbnN0YW50U2VhcmNoSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlSW5zdGFudFNlYXJjaEluc3RhbmNlKHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5yZW1vdmVMaXN0ZW5lcigncmVuZGVyJywgdGhpcy5vblJlbmRlcik7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUluc3RhbnRTZWFyY2hJbnN0YW5jZShjb25maWc6IEluc3RhbnRTZWFyY2hDb25maWcpIHtcbiAgICAvLyBhZGQgZGVmYXVsdCBzZWFyY2hQYXJhbWV0ZXJzIHdpdGggaGlnaGxpZ2h0aW5nIGNvbmZpZ1xuICAgIGlmICghY29uZmlnLnNlYXJjaFBhcmFtZXRlcnMpIGNvbmZpZy5zZWFyY2hQYXJhbWV0ZXJzID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcuc2VhcmNoUGFyYW1ldGVycywge1xuICAgICAgaGlnaGxpZ2h0UHJlVGFnOiAnX19haXMtaGlnaGxpZ2h0X18nLFxuICAgICAgaGlnaGxpZ2h0UG9zdFRhZzogJ19fL2Fpcy1oaWdobGlnaHRfXycsXG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgVVJMU3luYyB3aWRnZXQgaWYgb24gU1NSXG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy51cmxTeW5jICE9PSAndW5kZWZpbmVkJykgZGVsZXRlIGNvbmZpZy51cmxTeW5jO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcucm91dGluZyAhPT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBjb25maWcucm91dGluZztcbiAgICB9XG5cbiAgICAvLyBjdXN0b20gYWxnb2xpYSBjbGllbnQgYWdlbnRcbiAgICBpZiAoIWNvbmZpZy5zZWFyY2hDbGllbnQgJiYgIWNvbmZpZy5jcmVhdGVBbGdvbGlhQ2xpZW50KSB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKGNvbmZpZy5hcHBJZCwgY29uZmlnLmFwaUtleSk7XG4gICAgICBjbGllbnQuYWRkQWxnb2xpYUFnZW50KGBhbmd1bGFyLWluc3RhbnRzZWFyY2ggJHtWRVJTSU9OfWApO1xuXG4gICAgICBjb25maWcuc2VhcmNoQ2xpZW50ID0gY2xpZW50O1xuICAgICAgY29uZmlnLmFwcElkID0gdW5kZWZpbmVkO1xuICAgICAgY29uZmlnLmFwaUtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZSA9IGluc3RhbnRzZWFyY2goY29uZmlnKTtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5vbigncmVuZGVyJywgdGhpcy5vblJlbmRlcik7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldDogV2lkZ2V0KSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuYWRkV2lkZ2V0KHdpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0KHdpZGdldDogV2lkZ2V0KSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVtb3ZlV2lkZ2V0KHdpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5yZWZyZXNoKCk7XG4gIH1cblxuICBvblJlbmRlciA9ICgpID0+IHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHtcbiAgICAgIHJlc3VsdHM6IHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmhlbHBlci5sYXN0UmVzdWx0cyxcbiAgICAgIHN0YXRlOiB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5oZWxwZXIuc3RhdGUsXG4gICAgfSk7XG4gIH07XG59XG4iXX0=