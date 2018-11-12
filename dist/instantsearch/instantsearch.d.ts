import { AfterViewInit, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Widget } from '../base-widget';
export declare type SearchRequest = {
    indexName: string;
    params: SearchRequestParameters;
};
export declare type SearchForFacetValuesRequest = {
    indexName: string;
    params: SearchForFacetValuesRequestParameters;
};
export declare type SearchParameters = {
    attributesToRetrieve?: string[];
    restrictSearchableAttributes?: string[];
    filters?: string;
    facetFilters?: string[];
    optionalFilters?: string[];
    numericFilters?: string[];
    sumOrFiltersScores?: boolean;
    facets?: string[];
    maxValuesPerFacet?: number;
    facetingAfterDistinct?: boolean;
    sortFacetValuesBy?: string;
    attributesToHighlight?: string[];
    attributesToSnippet?: string[];
    highlightPreTag?: string;
    highlightPostTag?: string;
    snippetEllipsisText?: string;
    restrictHighlightAndSnippetArrays?: boolean;
    page?: number;
    hitsPerPage?: number;
    offset?: number;
    length?: number;
    minWordSizefor1Typo?: number;
    minWordSizefor2Typos?: number;
    typoTolerance?: string | boolean;
    allowTyposOnNumericTokens?: boolean;
    ignorePlurals?: boolean | string[];
    disableTypoToleranceOnAttributes?: string[];
    aroundLatLng?: string;
    aroundLatLngViaIP?: boolean;
    aroundRadius?: number | 'all';
    aroundPrecision?: number;
    minimumAroundRadius?: number;
    insideBoundingBox?: GeoRectangle | GeoRectangle[];
    insidePolygon?: GeoPolygon | GeoPolygon[];
    queryType?: string;
    removeWordsIfNoResults?: string;
    advancedSyntax?: boolean;
    optionalWords?: string | string[];
    removeStopWords?: boolean | string[];
    disableExactOnAttributes?: string[];
    exactOnSingleWordQuery?: string;
    alternativesAsExact?: string[];
    enableRules?: boolean;
    ruleContexts?: string[];
    minProximity?: number;
    responseFields?: string[];
    maxFacetHits?: number;
    percentileComputation?: boolean;
    distinct?: number | boolean;
    getRankingInfo?: boolean;
    clickAnalytics?: boolean;
    analytics?: boolean;
    analyticsTags?: string[];
    synonyms?: boolean;
    replaceSynonymsInHighlight?: boolean;
};
export interface SearchRequestParameters extends SearchParameters {
    query: string;
}
export interface SearchForFacetValuesRequestParameters extends SearchParameters {
    facetQuery: string;
    facetName: string;
}
export declare type GeoRectangle = [number, number, number, number];
export declare type GeoPolygon = [number, number, number, number, number, number];
export declare type SearchResponse = {
    hits: Hit[];
    page?: number;
    nbHits?: number;
    nbPages?: number;
    hitsPerPage?: number;
    processingTimeMS?: number;
    query?: string;
    params?: string;
    index?: string;
};
export declare type Hit = {
    _highlightResult?: object;
};
export declare type SearchForFacetValuesResponse = {
    value: string;
    highlighted?: string;
    count?: number;
};
export declare type SearchClient = {
    search: (requests: SearchRequest[]) => Promise<{
        results: SearchResponse[];
    }>;
    searchForFacetValues?: (requests: SearchForFacetValuesRequest[]) => Promise<{
        facetHits: SearchForFacetValuesResponse[];
    }[]>;
};
export declare type InstantSearchConfig = {
    appId?: string;
    apiKey?: string;
    indexName: string;
    numberLocale?: string;
    searchFunction?: (helper: any) => void;
    createAlgoliaClient?: (algoliasearch: Function, appId: string, apiKey: string) => object;
    searchClient?: SearchClient;
    searchParameters?: SearchParameters | void;
    urlSync?: boolean | {
        mapping?: object;
        threshold?: number;
        trackedParameters?: string[];
        useHash?: boolean;
        getHistoryState?: () => object;
    };
    routing?: boolean | {
        stateMapping?: {
            stateToRoute(object: any): object;
            routeToState(object: any): object;
        };
    };
};
export declare class InstantSearchInstance {
    start: () => void;
    addWidget: (widget: Widget) => void;
    addWidgets: (widgets: Widget[]) => void;
    removeWidget: (widget: Widget) => void;
    removeWidgets: (widgets: Widget[]) => void;
    on: (eventName: string, callback: Function) => void;
    removeListener: (eventName: string, callback: Function) => void;
    helper: {
        lastResults: Object;
        state: Object;
    };
    refresh: () => void;
    dispose: () => void;
}
export declare class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
    private platformId;
    config: InstantSearchConfig;
    instanceName: string;
    change: EventEmitter<{
        results: {};
        state: {};
    }>;
    instantSearchInstance: InstantSearchInstance;
    constructor(platformId: Object);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    createInstantSearchInstance(config: InstantSearchConfig): void;
    addWidget(widget: Widget): void;
    removeWidget(widget: Widget): void;
    refresh(): void;
    onRender: () => void;
}
