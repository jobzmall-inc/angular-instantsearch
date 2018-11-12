import { Input, Component, Output, EventEmitter, Inject, PLATFORM_ID, forwardRef, NgModule, ContentChild, TemplateRef, ViewChild, KeyValueDiffers } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as algoliasearchProxy from 'algoliasearch/lite';
import algoliasearchProxy__default, {  } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';
import { connectBreadcrumb, connectClearAll, connectCurrentRefinedValues, connectHierarchicalMenu, connectHitsPerPage, connectHits, connectInfiniteHits, connectMenu, connectNumericRefinementList, connectNumericSelector, connectPagination, connectRange, connectRefinementList, connectSearchBox, connectSortBySelector, connectStarRating, connectStats, connectToggle, connectConfigure } from 'instantsearch.js/es/connectors';
import { __rest } from 'tslib';
import { create } from 'nouislider';
import * as algoliasearchProxy$1 from 'algoliasearch/index';
import algoliasearchProxy__default$1, {  } from 'algoliasearch/index';
import * as encodeProxy from 'querystring-es3/encode';
import encodeProxy__default, {  } from 'querystring-es3/encode';
import { AlgoliaSearchHelper } from 'algoliasearch-helper';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} widgetName
 * @return {?}
 */
function bem(widgetName) {
    /** @type {?} */
    const cx = function (element, subElement) {
        if (element) {
            /** @type {?} */
            const scoppedWidgetName = `ais-${widgetName}-${element}`;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === 'header' || element === 'body' || element === 'footer') {
                /** @type {?} */
                const nonScoppedWidgetName = `ais-${element}`;
                return `${scoppedWidgetName} ${nonScoppedWidgetName}`;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return `${scoppedWidgetName}--${subElement}`;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        // output `ais-Widget`
        return `ais-${widgetName}`;
    };
    return cx;
}
/**
 * @param {?=} input
 * @return {?}
 */
function parseNumberInput(input) {
    return typeof input === 'string' ? parseInt(input, 10) : input;
}
/**
 * @param {...?} args
 * @return {?}
 */
function noop(...args) { }
/**
 * @param {?} s
 * @return {?}
 */
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class BaseWidget {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const VERSION = "2.1.0";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const algoliasearch = algoliasearchProxy__default || algoliasearchProxy;
class NgAisInstantSearch {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisBreadcrumb extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Breadcrumb');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get items() {
        return this.state.items.map((item, idx) => (Object.assign({}, item, { separator: idx !== 0, isLast: idx === this.state.items.length - 1 })));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    handleClick(event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    }
}
NgAisBreadcrumb.decorators = [
    { type: Component, args: [{
                selector: 'ais-breadcrumb',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          *ngFor="let item of items"
          [class]="cx('item', item.isLast ? 'selected' : undefined)"
          (click)="handleClick($event, item)"
        >
          <span
            *ngIf="item.separator"
            [class]="cx('separator')"
            aria-hidden="true"
          >
            >
          </span>
          <a
            [class]="cx('link')"
            href="{{state.createURL(item.value)}}"
            *ngIf="!item.isLast"
            (click)="handleClick($event, item)"
          >
            {{item.name}}
          </a>

          <span *ngIf="item.isLast">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisBreadcrumb.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisBreadcrumb.propDecorators = {
    attributes: [{ type: Input }],
    rootPath: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisBreadcrumbModule {
}
NgAisBreadcrumbModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisBreadcrumb],
                entryComponents: [NgAisBreadcrumb],
                exports: [NgAisBreadcrumb],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisClearRefinements extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('ClearRefinements');
        this.instantSearchParent = instantSearchParent;
        this.buttonLabel = 'Clear refinements';
        this.clearsQuery = false;
        this.excludeAttributes = [];
        this.state = {
            hasRefinements: false,
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return !this.state.hasRefinements && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    }
}
NgAisClearRefinements.decorators = [
    { type: Component, args: [{
                selector: 'ais-clear-refinements',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')"
        (click)="handleClick($event)"
        [disabled]="!state.hasRefinements"
      >
        {{buttonLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisClearRefinements.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisClearRefinements.propDecorators = {
    buttonLabel: [{ type: Input }],
    clearsQuery: [{ type: Input }],
    excludeAttributes: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisClearRefinementsModule {
}
NgAisClearRefinementsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisClearRefinements],
                entryComponents: [NgAisClearRefinements],
                exports: [NgAisClearRefinements],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisCurrentRefinements extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('CurrentRefinements');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.clearRefinements = 'after';
        this.clearRefinementsLabel = 'Clear refinements';
        // connector options
        this.onlyListedAttributes = false;
        this.clearsQuery = false;
        this.attributes = [];
        this.state = {
            attributes: {},
            clearAllClick: noop,
            clearAllURL: noop,
            createURL: noop,
            refine: noop,
            refinements: [],
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.refinements.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get refinements() {
        /** @type {?} */
        const items = typeof this.transformItems === 'function'
            ? this.transformItems(this.state.refinements)
            : this.state.refinements;
        // group refinements by category? (attributeName && type)
        return items.reduce((res, _a) => {
            var { type, attributeName } = _a, refinement = __rest(_a, ["type", "attributeName"]);
            /** @type {?} */
            const match = res.find(r => r.attributeName === attributeName && r.type === type);
            if (match) {
                match.items.push(Object.assign({ type, attributeName }, refinement));
            }
            else {
                res.push({
                    type,
                    attributeName,
                    label: capitalize(attributeName),
                    items: [Object.assign({ type, attributeName }, refinement)],
                });
            }
            return res;
        }, []);
    }
    /**
     * @return {?}
     */
    get json() {
        return JSON.stringify(this.refinements, null, 4);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} refinement
     * @return {?}
     */
    handleClick(event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClearAllClick(event) {
        event.preventDefault();
        this.state.clearAllClick();
    }
}
NgAisCurrentRefinements.decorators = [
    { type: Component, args: [{
                selector: 'ais-current-refinements',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'before' || clearRefinements === true">
        {{clearRefinementsLabel}}
      </button>

      <ul
        [class]="cx('list')"
        *ngFor="let refinement of refinements"
      >
        <li [class]="cx('item')">
          <span [class]="cx('label')">{{refinement.label}}:</span>

          <span
            [class]="cx('category')"
            *ngFor="let item of refinement.items"
          >
            <span [class]="cx('categoryLabel')">{{item.name}}</span>
            <button [class]="cx('delete')" (click)="handleClick($event, item)">✕</button>
          </span>
        </li>
      </ul>

      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'after'">
        {{clearRefinementsLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisCurrentRefinements.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisCurrentRefinements.propDecorators = {
    clearRefinements: [{ type: Input }],
    clearRefinementsLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    onlyListedAttributes: [{ type: Input }],
    clearsQuery: [{ type: Input }],
    attributes: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisCurrentRefinementsModule {
}
NgAisCurrentRefinementsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisCurrentRefinements],
                entryComponents: [NgAisCurrentRefinements],
                exports: [NgAisCurrentRefinements],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHierarchicalMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('HierarchicalMenu');
        this.instantSearchParent = instantSearchParent;
        this.separator = ' > ';
        this.limit = 10;
        this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get items() {
        return typeof this.transformItems === 'function'
            ? this.transformItems(this.state.items)
            : this.state.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectHierarchicalMenu, {
            limit: parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy,
        });
        super.ngOnInit();
    }
}
NgAisHierarchicalMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-hierarchical-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list') + ' ' + cx('list', 'lvl0')">
        <ais-hierarchical-menu-item
          *ngFor="let item of items"
          [item]="item"
          [createURL]="state.createURL"
          [refine]="state.refine"
        >
        </ais-hierarchical-menu-item>
      </ul>
    </div>
  `,
            },] },
];
NgAisHierarchicalMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisHierarchicalMenu.propDecorators = {
    transformItems: [{ type: Input }],
    attributes: [{ type: Input }],
    separator: [{ type: Input }],
    rootPath: [{ type: Input }],
    showParentLevel: [{ type: Input }],
    limit: [{ type: Input }],
    sortBy: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHierarchicalMenuItem {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHierarchicalMenuModule {
}
NgAisHierarchicalMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
                entryComponents: [NgAisHierarchicalMenu],
                exports: [NgAisHierarchicalMenu],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHitsPerPage extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('HitsPerPage');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            items: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectHitsPerPage, { items: this.items });
        super.ngOnInit();
    }
}
NgAisHitsPerPage.decorators = [
    { type: Component, args: [{
                selector: 'ais-hits-per-page',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <select
        [class]="cx('select')"
        (change)="state.refine($event.target.value)"
      >
        <option
          [class]="cx('option')"
          *ngFor="let item of state.items"
          [value]="item.value"
          [selected]="item.isRefined"
        >
          {{item.label}}
        </option>
      </select>
    </div>
  `,
            },] },
];
NgAisHitsPerPage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisHitsPerPage.propDecorators = {
    items: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHitsPerPageModule {
}
NgAisHitsPerPageModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisHitsPerPage],
                entryComponents: [NgAisHitsPerPage],
                exports: [NgAisHitsPerPage],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const get = require('lodash/get');
class NgAisHighlight {
    constructor() {
        this.tagName = 'em';
        this.cx = bem('Highlight');
    }
    /**
     * @return {?}
     */
    get content() {
        if (this.attribute === 'highlighted') {
            return this.hit.highlighted
                ? this.replaceWithTagName(this.hit.highlighted)
                : this.hit.label;
        }
        if (this.hit.hasOwnProperty('_highlightResult')) {
            /** @type {?} */
            const attributeHighlighted = get(this.hit._highlightResult, this.attribute);
            // check that the attributeHighlighted is a string
            if (attributeHighlighted !== undefined &&
                typeof attributeHighlighted.value === 'string') {
                return this.replaceWithTagName(attributeHighlighted.value);
            }
        }
        /** @type {?} */
        const fallback = get(this.hit, this.attribute);
        if (!fallback) {
            console.warn(`Could not find attribute [${this.attribute}] into hit object, will display an empty string.`);
            return '';
        }
        return fallback;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    replaceWithTagName(value) {
        return value
            .replace(new RegExp('<em>', 'g'), `<${this.tagName} class="${this.cx('highlighted')}">`)
            .replace(new RegExp('</em>', 'g'), `</${this.tagName}>`);
    }
}
NgAisHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ais-highlight',
                template: `<span [class]="cx()" [innerHtml]="content"></span>`,
            },] },
];
NgAisHighlight.propDecorators = {
    attribute: [{ type: Input }],
    hit: [{ type: Input }],
    tagName: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHighlightModule {
}
NgAisHighlightModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisHighlight],
                entryComponents: [NgAisHighlight],
                exports: [NgAisHighlight],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHits extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Hits');
        this.instantSearchParent = instantSearchParent;
        // inner widget state returned from connector
        this.state = { hits: [], results: {} };
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering)
                return;
            this.state = Object.assign({}, state, { results: state.results, hits: typeof this.transformItems === 'function'
                    ? this.transformItems(state.hits)
                    : state.hits });
        };
        this.createWidget(connectHits, { escapeHits: true });
    }
}
NgAisHits.decorators = [
    { type: Component, args: [{
                selector: 'ais-hits',
                template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let hit of state.hits"
          >
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </li>
        </ul>
      </div>
    </div>
  `,
            },] },
];
NgAisHits.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisHits.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    transformItems: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisHitsModule {
}
NgAisHitsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisHits],
                entryComponents: [NgAisHits],
                exports: [NgAisHits],
                imports: [CommonModule, NgAisHighlightModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisInfiniteHits extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('InfiniteHits');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more results';
        // inner widget state returned from connector
        this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {},
        };
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering)
                return;
            this.state = Object.assign({}, state, { results: state.results, hits: typeof this.transformItems === 'function'
                    ? this.transformItems(state.hits)
                    : state.hits });
        };
        this.createWidget(connectInfiniteHits, { escapeHits: true });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showMore(event) {
        event.preventDefault();
        this.state.showMore();
    }
}
NgAisInfiniteHits.decorators = [
    { type: Component, args: [{
                selector: 'ais-infinite-hits',
                template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let hit of state.hits"
          >
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </li>
        </ul>
      </div>

      <button
        [class]="cx('showMore')"
        (click)="showMore($event)"
        [disabled]="state.isLastPage"
        *ngIf="!template"
      >
        {{showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisInfiniteHits.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisInfiniteHits.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    showMoreLabel: [{ type: Input }],
    transformItems: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisInfiniteHitsModule {
}
NgAisInfiniteHitsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisInfiniteHits],
                entryComponents: [NgAisInfiniteHits],
                exports: [NgAisInfiniteHits],
                imports: [CommonModule, NgAisHighlightModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisInstantSearchModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgAisInstantSearchModule,
            providers: [],
        };
    }
}
NgAisInstantSearchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisInstantSearch],
                entryComponents: [NgAisInstantSearch],
                exports: [NgAisInstantSearch],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Menu');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more';
        this.showLessLabel = 'Show less';
        this.limit = 10;
        this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get showMoreClass() {
        /** @type {?} */
        let className = this.cx('showMore');
        if (!this.state.canToggleShowMore) {
            className = `${className} ${this.cx('showMore', 'disabled')}`;
        }
        return className;
    }
    /**
     * @return {?}
     */
    get items() {
        return typeof this.transformItems === 'function'
            ? this.transformItems(this.state.items)
            : this.state.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    handleClick(event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    }
}
NgAisMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of items"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <span [class]="cx('label')">{{item.label}}</span>
            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>

      <button
        *ngIf="showMoreLimit && state.canToggleShowMore"
        (click)="state.toggleShowMore()"
        [class]="showMoreClass"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisMenu.propDecorators = {
    showMoreLabel: [{ type: Input }],
    showLessLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    attribute: [{ type: Input }],
    limit: [{ type: Input }],
    showMoreLimit: [{ type: Input }],
    sortBy: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisMenuModule {
}
NgAisMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisMenu],
                entryComponents: [NgAisMenu],
                exports: [NgAisMenu],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisNumericMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('NumericMenu');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attribute,
            options: this.items,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    refine(event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    }
}
NgAisNumericMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-numeric-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('radio')"
              type="radio"
              name="NumericMenu"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">{{item.label}}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisNumericMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisNumericMenu.propDecorators = {
    attribute: [{ type: Input }],
    items: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisNumericMenuModule {
}
NgAisNumericMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisNumericMenu],
                entryComponents: [NgAisNumericMenu],
                exports: [NgAisNumericMenu],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisNumericSelector extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('NumericSelector');
        this.instantSearchParent = instantSearchParent;
        this.operator = '=';
        this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attribute,
            operator: this.operator,
            options: this.items,
        });
        super.ngOnInit();
    }
}
NgAisNumericSelector.decorators = [
    { type: Component, args: [{
                selector: 'ais-numeric-selector',
                template: `
    <div [class]="cx('')">
      <select
        [class]="cx('select')"
        (change)="state.refine($event.target.value)"
      >
        <option
          [class]="cx('option')"
          *ngFor="let item of state.options"
          [value]="item.value"
          [selected]="item.value === state.currentRefinement"
        >
          {{item.label}}
        </option>
      </select>
    </div>
  `,
            },] },
];
NgAisNumericSelector.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisNumericSelector.propDecorators = {
    attribute: [{ type: Input }],
    operator: [{ type: Input }],
    items: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisNumericSelectorModule {
}
NgAisNumericSelectorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisNumericSelector],
                entryComponents: [NgAisNumericSelector],
                exports: [NgAisNumericSelector],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const range = require('lodash/range');
class NgAisPagination extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Pagination');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showFirst = true;
        this.showLast = false;
        this.showPrevious = true;
        this.showNext = true;
        this.padding = 3;
        this.state = {
            createURL: noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get pages() {
        const { nbPages, currentRefinement } = this.state;
        /** @type {?} */
        const pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
        /** @type {?} */
        const pagesPadding = typeof this.padding === 'string'
            ? parseInt(this.padding, 10)
            : this.padding;
        if (pagesPadding && pagesPadding > 0) {
            // should not display pages that does not exists
            if (nbPages < pagesPadding * 2 + 1) {
                return pagesArray;
            }
            /** @type {?} */
            const minDelta = currentRefinement - pagesPadding - 1;
            /** @type {?} */
            const maxDelta = currentRefinement + pagesPadding + 1;
            if (minDelta < 0) {
                return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
            }
            if (maxDelta > nbPages) {
                return range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
            }
            return range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
        }
        return pagesArray;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectPagination, {
            maxPages: parseNumberInput(this.totalPages),
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} page
     * @return {?}
     */
    refine(event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page < 0 ||
            page === this.state.currentRefinement ||
            page >= this.state.nbPages) {
            return;
        }
        this.state.refine(page);
    }
}
NgAisPagination.decorators = [
    { type: Component, args: [{
                selector: 'ais-pagination',
                template: `
    <div [class]="cx()">
      <ul [class]="cx('list')">
        <li
          *ngIf="showFirst"
          (click)="refine($event, 0)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'firstPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(0)"
            [class]="cx('link')"
          >
            ‹‹
          </a>
        </li>

        <li
          *ngIf="showPrevious"
          (click)="refine($event, state.currentRefinement - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'previousPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement - 1)"
            [class]="cx('link')"
          >
            ‹
          </a>
        </li>

        <li
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'page') +
            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')
          "
          *ngFor="let page of pages"
          (click)="refine($event, page)"
        >
          <a
            [class]="cx('link')"
            [href]="state.createURL(page)"
          >
            {{page + 1}}
          </a>
        </li>

        <li
          *ngIf="showNext"
          (click)="refine($event, state.currentRefinement + 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'nextPage') +
            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement + 1)"
            [class]="cx('link')"
          >
            ›
          </a>
        </li>

        <li
          *ngIf="showLast"
          (click)="refine($event, state.nbPages - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'lastPage') +
            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.nbPages - 1)"
            [class]="cx('link')"
          >
            ››
          </a>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisPagination.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisPagination.propDecorators = {
    showFirst: [{ type: Input }],
    showLast: [{ type: Input }],
    showPrevious: [{ type: Input }],
    showNext: [{ type: Input }],
    padding: [{ type: Input }],
    totalPages: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisPaginationModule {
}
NgAisPaginationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisPagination],
                entryComponents: [NgAisPagination],
                exports: [NgAisPagination],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRangeSlider extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RangeSlider');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.pips = true;
        this.tooltips = true;
        this.precision = 2;
        this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1],
        };
        this.updateState = (state, isFirstRendering) => {
            if (isFirstRendering) {
                // create slider
                /** @type {?} */
                const config = {
                    animate: false,
                    behaviour: 'snap',
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: this.step,
                    tooltips: this.tooltips && [
                        { to: this.formatTooltip },
                        { to: this.formatTooltip },
                    ],
                };
                if (this.pips === true || typeof this.pips === 'undefined') {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: 'positions',
                            stepped: true,
                            values: [0, 50, 100],
                        },
                    });
                }
                else if (this.pips !== undefined) {
                    Object.assign(config, { pips: this.pips });
                }
                this.slider = create(this.sliderContainer.nativeElement, config);
                // register listen events
                this.sliderContainer.nativeElement.noUiSlider.on('change', this.handleChange);
            }
            // update component inner state
            this.state = state;
            // update the slider state
            const { range: { min, max }, start, } = state;
            /** @type {?} */
            const disabled = min === max;
            /** @type {?} */
            const range = disabled ? { min, max: max + 0.0001 } : { min, max };
            this.slider.updateOptions({ disabled, range, start });
        };
        this.handleChange = (values) => {
            this.state.refine(values);
        };
        this.formatTooltip = (value) => {
            return value.toFixed(parseNumberInput(this.precision));
        };
    }
    /**
     * @return {?}
     */
    get step() {
        // compute step from the precision value
        /** @type {?} */
        const precision = parseNumberInput(this.precision) || 2;
        return 1 / Math.pow(10, precision);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        super.ngOnInit();
    }
}
NgAisRangeSlider.decorators = [
    { type: Component, args: [{
                selector: 'ais-range-slider',
                template: `
    <div [class]="cx()">
      <div [class]="cx('body')">
        <div #sliderContainer></div>
      </div>
    </div>
  `,
            },] },
];
NgAisRangeSlider.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRangeSlider.propDecorators = {
    sliderContainer: [{ type: ViewChild, args: ['sliderContainer',] }],
    pips: [{ type: Input }],
    tooltips: [{ type: Input }],
    attribute: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    precision: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRangeSliderModule {
}
NgAisRangeSliderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisRangeSlider],
                entryComponents: [NgAisRangeSlider],
                exports: [NgAisRangeSlider],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRefinementList extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RefinementList');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.showMoreLabel = 'Show more';
        this.showLessLabel = 'Show less';
        this.searchPlaceholder = 'Search here...';
        this.operator = 'or';
        this.limit = 10;
        this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
            searchForItems: noop,
            isFormSearch: false,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    get items() {
        return typeof this.transformItems === 'function'
            ? this.transformItems(this.state.items)
            : this.state.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
            escapeFacetValues: true,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    refine(event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    }
}
NgAisRefinementList.decorators = [
    { type: Component, args: [{
                selector: 'ais-refinement-list',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <div
        *ngIf="searchable"
        [class]="cx('searchBox')"
      >
        <ais-facets-search
          [search]="state.searchForItems"
          [searchPlaceholder]="searchPlaceholder"
        >
        </ais-facets-search>
      </div>

      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('checkbox')"
              type="checkbox"
              value="{{item.value}}"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">
              <ais-highlight attribute="highlighted" [hit]="item"></ais-highlight>
            </span>
            <span [class]="cx('count')">{{item.count}}</span>
          </label>
        </li>
      </ul>

      <button
        *ngIf="showMoreLimit && state.canToggleShowMore"
        (click)="state.toggleShowMore()"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
            },] },
];
NgAisRefinementList.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRefinementList.propDecorators = {
    showMoreLabel: [{ type: Input }],
    showLessLabel: [{ type: Input }],
    transformItems: [{ type: Input }],
    searchable: [{ type: Input }],
    searchPlaceholder: [{ type: Input }],
    attribute: [{ type: Input }],
    operator: [{ type: Input }],
    limit: [{ type: Input }],
    showMoreLimit: [{ type: Input }],
    sortBy: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisFacetsSearch {
    constructor() {
        this.cx = bem('SearchBox');
        this.searchQuery = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleChange(value) {
        this.searchQuery = value;
        this.search(value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSubmit(event) {
        event.preventDefault();
        this.search(this.searchQuery);
    }
}
NgAisFacetsSearch.decorators = [
    { type: Component, args: [{
                selector: 'ais-facets-search',
                template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        (submit)="handleSubmit($event)"
        novalidate
      >
        <input
          [class]="cx('input')"
          autocapitalize="off"
          autocorrect="off"
          placeholder="{{searchPlaceholder}}"
          role="textbox"
          spellcheck="false"
          type="text"
          [value]="searchQuery"
          (input)="handleChange($event.target.value)"
        />

        <button
          [class]="cx('submit')"
          title="Submit the search query."
          type="submit"
        >
          <svg
            [ngClass]="cx('submitIcon')"
            viewBox="0 0 40 40"
            width="10"
            height="10"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>

        <button
          [class]="cx('reset')"
          type="reset"
          title="Clear the search query."
          hidden
        >
          <svg
            [ngClass]="cx('resetIcon')"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
    </div>
  `,
            },] },
];
NgAisFacetsSearch.propDecorators = {
    searchPlaceholder: [{ type: Input }],
    search: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRefinementListModule {
}
NgAisRefinementListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisRefinementList, NgAisFacetsSearch],
                entryComponents: [NgAisRefinementList],
                exports: [NgAisRefinementList],
                imports: [CommonModule, NgAisHighlightModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisSearchBox extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('SearchBox');
        this.instantSearchParent = instantSearchParent;
        this.placeholder = 'Search';
        this.submitTitle = 'Submit';
        this.resetTitle = 'Reset';
        this.searchAsYouType = true;
        this.autofocus = false;
        // Output events
        // form
        this.submit = new EventEmitter();
        this.reset = new EventEmitter();
        // input
        this.change = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.state = {
            query: '',
            refine: noop,
        };
        this.createWidget(connectSearchBox);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.autofocus) {
            this.searchBox.nativeElement.focus();
        }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    handleChange(query) {
        this.change.emit(query);
        if (this.searchAsYouType) {
            this.state.refine(query);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSubmit(event) {
        // send submit event to parent component
        this.submit.emit(event);
        event.preventDefault();
        if (!this.searchAsYouType) {
            this.state.refine(this.state.query);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleReset(event) {
        // send reset event to parent component
        this.reset.emit(event);
        // reset search
        this.state.refine('');
    }
}
NgAisSearchBox.decorators = [
    { type: Component, args: [{
                selector: 'ais-search-box',
                template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        novalidate
        (submit)="handleSubmit($event)"
      >
        <input
          [class]="cx('input')"
          autocapitalize="off"
          autocorrect="off"
          placeholder="{{placeholder}}"
          role="textbox"
          spellcheck="false"
          type="text"
          [value]="state.query"
          (input)="handleChange($event.target.value)"
          (focus)="focus.emit($event)"
          (blur)="blur.emit($event)"
          #searchBox
        />

        <button
          [class]="cx('submit')"
          type="submit"
          title="{{submitTitle}}"
          (click)="handleSubmit($event)"
        >
          <svg
            [ngClass]="cx('submitIcon')"
            viewBox="0 0 40 40"
            width="40"
            height="40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>

        <button
          [class]="cx('reset')"
          type="reset"
          title="{{resetTitle}}"
          (click)="handleReset($event)"
          [hidden]="!state.query || (state.query && !state.query.trim())">
          <svg
            [ngClass]="cx('resetIcon')"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
    </div>
  `,
            },] },
];
NgAisSearchBox.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisSearchBox.propDecorators = {
    searchBox: [{ type: ViewChild, args: ['searchBox',] }],
    placeholder: [{ type: Input }],
    submitTitle: [{ type: Input }],
    resetTitle: [{ type: Input }],
    searchAsYouType: [{ type: Input }],
    autofocus: [{ type: Input }],
    submit: [{ type: Output }],
    reset: [{ type: Output }],
    change: [{ type: Output }],
    focus: [{ type: Output }],
    blur: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisSearchBoxModule {
}
NgAisSearchBoxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisSearchBox],
                entryComponents: [NgAisSearchBox],
                exports: [NgAisSearchBox],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisSortBy extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('SortBy');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectSortBySelector, { indices: this.items });
        super.ngOnInit();
    }
}
NgAisSortBy.decorators = [
    { type: Component, args: [{
                selector: 'ais-sort-by',
                template: `
    <div [class]="cx()">
      <select
        [class]="cx('select')"
        (change)="state.refine($event.target.value)"
      >
        <option
          [class]="cx('option')"
          *ngFor="let item of state.options"
          [value]="item.value"
          [selected]="item.value === state.currentRefinement"
        >
          {{item.label}}
        </option>
      </select>
    </div>
  `,
            },] },
];
NgAisSortBy.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisSortBy.propDecorators = {
    items: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisSortByModule {
}
NgAisSortByModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisSortBy],
                entryComponents: [NgAisSortBy],
                exports: [NgAisSortBy],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRatingMenu extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RatingMenu');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.andUpLabel = '& Up';
        this.max = 5;
        this.state = {
            createURL: noop,
            hasNoResults: false,
            items: [],
            refine: noop,
        };
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.state.items.length === 0 && this.autoHideContainer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectStarRating, {
            attributeName: this.attribute,
            max: this.max,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    handleClick(event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    }
}
NgAisRatingMenu.decorators = [
    { type: Component, args: [{
                selector: 'ais-rating-menu',
                template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <svg style="display:none;">
        <symbol
          id="ais-StarRating-starSymbol"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
        </symbol>
        <symbol
          id="ais-StarRating-starEmptySymbol"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>
        </symbol>
      </svg>

      <ul [class]="cx('list')">
        <li
          *ngFor="let item of state.items"
          [class]="getItemClass(item)"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <svg
              *ngFor="let star of item.stars"
              [ngClass]="cx('starIcon')"
              aria-hidden="true"
            >
              <use
                *ngIf="star"
                xlink:href="#ais-StarRating-starSymbol"
              >
              </use>

              <use
                *ngIf="!star"
                xlink:href="#ais-StarRating-starEmptySymbol"
              >
              </use>
            </svg>

            <span [class]="cx('label')" aria-hidden="true">{{andUpLabel}}</span>
            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisRatingMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRatingMenu.propDecorators = {
    andUpLabel: [{ type: Input }],
    attribute: [{ type: Input }],
    max: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRatingMenuModule {
}
NgAisRatingMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisRatingMenu],
                entryComponents: [NgAisRatingMenu],
                exports: [NgAisRatingMenu],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisStats extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('Stats');
        this.instantSearchParent = instantSearchParent;
        this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: '',
        };
        this.createWidget(connectStats);
    }
    /**
     * @return {?}
     */
    get templateContext() {
        return { state: this.state };
    }
}
NgAisStats.decorators = [
    { type: Component, args: [{
                selector: 'ais-stats',
                template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: templateContext">
      </ng-container>

      <span *ngIf="!template" [class]="cx('text')">
        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.
      </span>
    </div>
  `,
            },] },
];
NgAisStats.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisStats.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisStatsModule {
}
NgAisStatsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisStats],
                entryComponents: [NgAisStats],
                exports: [NgAisStats],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisToggle extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('ToggleRefinement');
        this.instantSearchParent = instantSearchParent;
        this.values = { on: true, off: undefined };
        this.state = {
            createURL: noop,
            refine: noop,
            value: {},
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectToggle, {
            attributeName: this.attribute,
            label: this.label,
            values: this.values,
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    }
}
NgAisToggle.decorators = [
    { type: Component, args: [{
                selector: 'ais-toggle',
                template: `
    <div [class]="cx()">
      <ul [class]="cx('list')">
        <li
          [class]="cx('item')"
          (click)="handleClick($event)">
          <label [class]="cx('label')">
            <input
              [class]="cx('checkbox')"
              type="checkbox"
              value="{{state.value.name}}"
              [checked]="state.value.isRefined"
            />

            <span [class]="cx('labelText')">
              {{label || state.value.name}}
            </span>

            <span [class]="cx('count')">{{state.value.count}}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
            },] },
];
NgAisToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisToggle.propDecorators = {
    attribute: [{ type: Input }],
    label: [{ type: Input }],
    values: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisToggleModule {
}
NgAisToggleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisToggle],
                entryComponents: [NgAisToggle],
                exports: [NgAisToggle],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRangeInput extends BaseWidget {
    /**
     * @param {?} instantSearchParent
     */
    constructor(instantSearchParent) {
        super('RangeInput');
        this.instantSearchParent = instantSearchParent;
        // render options
        this.currency = '$';
        this.separator = 'to';
        this.submitLabel = 'Go';
        this.precision = 2;
        // inner state
        this.minInputValue = '';
        this.maxInputValue = '';
        this.state = {
            range: { min: undefined, max: undefined },
            refine: noop,
            start: [0, 0],
        };
    }
    /**
     * @return {?}
     */
    get step() {
        /** @type {?} */
        const precision = parseNumberInput(this.precision) || 2;
        return 1 / Math.pow(10, precision);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    handleChange(event, type) {
        /** @type {?} */
        const value = parseNumberInput(event.target.value);
        if (type === 'min') {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSubmit(event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    }
}
NgAisRangeInput.decorators = [
    { type: Component, args: [{
                selector: 'ais-range-input',
                template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        (submit)="handleSubmit($event)"
        novalidate
      >
        <label [class]="cx('label')">
          <span [class]="cx('currency')">{{currency}}</span>
          <input
            [class]="cx('input', 'min')"
            type="number"
            [min]="state.range.min"
            [max]="state.range.max"
            [placeholder]="state.range.min"
            [value]="minInputValue"
            [step]="step"
            (change)="handleChange($event, 'min')"
          />
        </label>

        <span [class]="cx('separator')">{{separator}}</span>

        <label [class]="cx('label')">
          <span [class]="cx('currency')">{{currency}}</span>
          <input
            [class]="cx('input', 'max')"
            type="number"
            [min]="state.range.min"
            [max]="state.range.max"
            [placeholder]="state.range.max"
            [value]="maxInputValue"
            [step]="step"
            (change)="handleChange($event, 'max')"
          />
        </label>

        <button
          [class]="cx('submit')"
          (click)="handleSubmit($event)"
        >
          {{submitLabel}}
        </button>
      </form>
    </div>
  `,
            },] },
];
NgAisRangeInput.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgAisInstantSearch),] }] }
];
NgAisRangeInput.propDecorators = {
    currency: [{ type: Input }],
    separator: [{ type: Input }],
    submitLabel: [{ type: Input }],
    attribute: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    precision: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisRangeInputModule {
}
NgAisRangeInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisRangeInput],
                entryComponents: [NgAisRangeInput],
                exports: [NgAisRangeInput],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisPanel {
}
NgAisPanel.decorators = [
    { type: Component, args: [{
                selector: 'ais-panel',
                template: `
    <div class="ais-Panel">
      <div *ngIf="header" class="ais-Panel-header">
        {{header}}
      </div>

      <div class="ais-Panel-body">
        <ng-content></ng-content>
      </div>

      <div *ngIf="footer" class="ais-Panel-footer">
        {{footer}}
      </div>
    </div>
  `,
            },] },
];
NgAisPanel.propDecorators = {
    header: [{ type: Input }],
    footer: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisPanelModule {
}
NgAisPanelModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisPanel],
                entryComponents: [NgAisPanel],
                exports: [NgAisPanel],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisConfigure extends BaseWidget {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgAisConfigureModule {
}
NgAisConfigureModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAisConfigure],
                entryComponents: [NgAisConfigure],
                exports: [NgAisConfigure],
                imports: [CommonModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
/** @type {?} */
const algoliasearch$1 = algoliasearchProxy__default$1 || algoliasearchProxy$1;
/** @type {?} */
const encode = encodeProxy__default || encodeProxy;
/**
 * @param {?} __0
 * @return {?}
 */
function createSSRAlgoliaClient({ httpClient, HttpHeaders, transferState, makeStateKey, }) {
    console.warn('`createSSRAlgoliaClient` is deprecated in favor of `createSSRSearchClient` to be plugged to `searchClient`.');
    return (_, appId, apiKey) => createSSRSearchClient({
        appId,
        apiKey,
        httpClient,
        HttpHeaders,
        transferState,
        makeStateKey,
    });
}
/**
 * @param {?} __0
 * @return {?}
 */
function createSSRSearchClient({ appId, apiKey, httpClient, HttpHeaders, transferState, makeStateKey, }) {
    /** @type {?} */
    const client = algoliasearch$1(appId, apiKey, {});
    client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);
    client._request = (rawUrl, opts) => {
        /** @type {?} */
        let headers = new HttpHeaders();
        headers = headers.set('content-type', opts.method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json');
        headers = headers.set('accept', 'application/json');
        /** @type {?} */
        const url = rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(opts.headers);
        /** @type {?} */
        const transferStateKey = makeStateKey(`ngais(${opts.body})`);
        if (transferState.hasKey(transferStateKey)) {
            /** @type {?} */
            const resp = JSON.parse(transferState.get(transferStateKey, {}));
            return Promise.resolve({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            });
        }
        return new Promise((resolve, reject) => {
            httpClient
                .request(opts.method, url, {
                headers,
                body: opts.body,
                observe: 'response',
            })
                .subscribe(resp => {
                transferState.set(transferStateKey, JSON.stringify(resp));
                resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            }, resp => reject({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            }));
        });
    };
    return client;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// Transforms url query to SearchParameters
/**
 * @param {?} req
 * @return {?}
 */
function parseServerRequest(req) {
    if (req && req.url && req.url.includes('?')) {
        /** @type {?} */
        const query = req.url.split('?')[1];
        return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const NGIS_MODULES = [
    NgAisInstantSearchModule,
    NgAisHitsModule,
    NgAisSearchBoxModule,
    NgAisClearRefinementsModule,
    NgAisMenuModule,
    NgAisPaginationModule,
    NgAisRefinementListModule,
    NgAisHitsPerPageModule,
    NgAisSortByModule,
    NgAisNumericSelectorModule,
    NgAisNumericMenuModule,
    NgAisStatsModule,
    NgAisToggleModule,
    NgAisInfiniteHitsModule,
    NgAisCurrentRefinementsModule,
    NgAisHierarchicalMenuModule,
    NgAisRatingMenuModule,
    NgAisRangeSliderModule,
    NgAisBreadcrumbModule,
    NgAisHighlightModule,
    NgAisRangeInputModule,
    NgAisPanelModule,
    NgAisConfigureModule,
];
class NgAisRootModule {
}
NgAisRootModule.decorators = [
    { type: NgModule, args: [{
                exports: NGIS_MODULES,
                imports: [NgAisInstantSearchModule.forRoot()],
            },] },
];
class NgAisModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: NgAisRootModule };
    }
}
NgAisModule.decorators = [
    { type: NgModule, args: [{ imports: NGIS_MODULES, exports: NGIS_MODULES },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgAisBreadcrumbModule, NgAisClearRefinementsModule, NgAisCurrentRefinementsModule, NgAisHierarchicalMenuModule, NgAisHitsPerPageModule, NgAisHitsModule, NgAisInfiniteHitsModule, NgAisInstantSearchModule, NgAisMenuModule, NgAisNumericMenuModule, NgAisNumericSelectorModule, NgAisPaginationModule, NgAisRangeSliderModule, NgAisRefinementListModule, NgAisSearchBoxModule, NgAisSortByModule, NgAisRatingMenuModule, NgAisStatsModule, NgAisToggleModule, NgAisHighlightModule, NgAisRangeInputModule, NgAisPanelModule, NgAisConfigureModule, createSSRAlgoliaClient, createSSRSearchClient, parseServerRequest, BaseWidget, NgAisInstantSearch, NgAisRootModule, NgAisModule, NgAisBreadcrumb as ɵb, NgAisClearRefinements as ɵc, NgAisConfigure as ɵx, NgAisCurrentRefinements as ɵd, NgAisHierarchicalMenu as ɵe, NgAisHierarchicalMenuItem as ɵf, NgAisHighlight as ɵi, NgAisHitsPerPage as ɵg, NgAisHits as ɵh, NgAisInfiniteHits as ɵj, NgAisMenu as ɵk, NgAisNumericMenu as ɵl, NgAisNumericSelector as ɵm, NgAisPagination as ɵn, NgAisPanel as ɵa, NgAisRangeInput as ɵw, NgAisRangeSlider as ɵo, NgAisRatingMenu as ɵt, NgAisFacetsSearch as ɵq, NgAisRefinementList as ɵp, NgAisSearchBox as ɵr, NgAisSortBy as ɵs, NgAisStats as ɵu, NgAisToggle as ɵv };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1pbnN0YW50c2VhcmNoLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdXRpbHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9iYXNlLXdpZGdldC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3ZlcnNpb24udHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvY2xlYXItcmVmaW5lbWVudHMvY2xlYXItcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jbGVhci1yZWZpbmVtZW50cy9jbGVhci1yZWZpbmVtZW50cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWVyYXJjaGljYWwtbWVudS9oaWVyYXJjaGljYWwtbWVudS1pdGVtLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpZ2hsaWdodC9oaWdobGlnaHQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLW1lbnUvbnVtZXJpYy1tZW51LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvbnVtZXJpYy1tZW51L251bWVyaWMtbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhbmdlLXNsaWRlci9yYW5nZS1zbGlkZXIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yZWZpbmVtZW50LWxpc3QvZmFjZXRzLXNlYXJjaC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYXRpbmctbWVudS9yYXRpbmctbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhdGluZy1tZW51L3JhdGluZy1tZW51Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3N0YXRzL3N0YXRzLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc3RhdHMvc3RhdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdG9nZ2xlL3RvZ2dsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3RvZ2dsZS90b2dnbGUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcmFuZ2UtaW5wdXQvcmFuZ2UtaW5wdXQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYW5lbC9wYW5lbC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3BhbmVsL3BhbmVsLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NvbmZpZ3VyZS9jb25maWd1cmUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jb25maWd1cmUvY29uZmlndXJlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NyZWF0ZS1zc3ItYWxnb2xpYS1jbGllbnQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYXJzZS1zZXJ2ZXItcmVxdWVzdC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBiZW0od2lkZ2V0TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGN4ID0gZnVuY3Rpb24oZWxlbWVudD86IHN0cmluZywgc3ViRWxlbWVudD86IHN0cmluZykge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzY29wcGVkV2lkZ2V0TmFtZSA9IGBhaXMtJHt3aWRnZXROYW1lfS0ke2VsZW1lbnR9YDtcblxuICAgICAgLy8gb3V0cHV0IGBhaXMtV2lkZ2V0LUhlYWRlcnxCb2R5fEZvb3RlciBhaXMtSGVhZGVyfEJvZHl8Rm9vdGVyYFxuICAgICAgaWYgKGVsZW1lbnQgPT09ICdoZWFkZXInIHx8IGVsZW1lbnQgPT09ICdib2R5JyB8fCBlbGVtZW50ID09PSAnZm9vdGVyJykge1xuICAgICAgICBjb25zdCBub25TY29wcGVkV2lkZ2V0TmFtZSA9IGBhaXMtJHtlbGVtZW50fWA7XG4gICAgICAgIHJldHVybiBgJHtzY29wcGVkV2lkZ2V0TmFtZX0gJHtub25TY29wcGVkV2lkZ2V0TmFtZX1gO1xuICAgICAgfVxuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtWHl6LS1hYmNgXG4gICAgICBpZiAoc3ViRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gYCR7c2NvcHBlZFdpZGdldE5hbWV9LS0ke3N1YkVsZW1lbnR9YDtcbiAgICAgIH1cblxuICAgICAgLy8gb3V0cHV0IGBhaXMtV2lkZ2V0LVh5emBcbiAgICAgIHJldHVybiBzY29wcGVkV2lkZ2V0TmFtZTtcbiAgICB9XG5cbiAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXRgXG4gICAgcmV0dXJuIGBhaXMtJHt3aWRnZXROYW1lfWA7XG4gIH07XG4gIHJldHVybiBjeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTnVtYmVySW5wdXQoaW5wdXQ/OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpbnB1dCwgMTApIDogaW5wdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzKSB7XG4gIHJldHVybiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zbGljZSgxKTtcbn1cbiIsImltcG9ydCB7IElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYmVtLCBub29wIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBXaWRnZXQge1xuICBwdWJsaWMgaW5pdDogKCkgPT4gdm9pZDtcbiAgcHVibGljIGdldENvbmZpZ3VyYXRpb246ICgpID0+IG9iamVjdDtcbiAgcHVibGljIHJlbmRlcjogKFxuICAgIHBhcmFtczoge1xuICAgICAgdGVtcGxhdGVzQ29uZmlnOiBvYmplY3Q7XG4gICAgICBzdGF0ZTogb2JqZWN0O1xuICAgICAgcmVzdWx0czoge31bXTtcbiAgICAgIGNyZWF0ZVVSTDogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcbiAgICAgIGluc3RhbnRTZWFyY2hJbnN0YW5jZTogb2JqZWN0O1xuICAgIH1cbiAgKSA9PiB2b2lkO1xuICBwdWJsaWMgZGlzcG9zZTogKFxuICAgIHBhcmFtczoge1xuICAgICAgaGVscGVyOiBvYmplY3Q7XG4gICAgICBzdGF0ZTogb2JqZWN0O1xuICAgIH1cbiAgKSA9PiBvYmplY3QgfCB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBDb25uZWN0b3IgPSAoXG4gIHJlbmRlckZuOiAoc3RhdGU6IG9iamVjdCwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4gdm9pZCxcbiAgdW5tb3VudEZuOiAoKSA9PiB2b2lkXG4pID0+ICh3aWRnZXRPcHRpb25zPzogb2JqZWN0KSA9PiBXaWRnZXQ7XG5cbmV4cG9ydCBjbGFzcyBCYXNlV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55O1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvSGlkZUNvbnRhaW5lcj86IGJvb2xlYW47XG5cbiAgcHVibGljIHdpZGdldD86IFdpZGdldDtcbiAgcHVibGljIHN0YXRlPzogb2JqZWN0ID0ge307XG4gIHB1YmxpYyBjeDogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3Iod2lkZ2V0TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jeCA9IGJlbSh3aWRnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVXaWRnZXQoY29ubmVjdG9yOiBDb25uZWN0b3IsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSB7XG4gICAgdGhpcy53aWRnZXQgPSBjb25uZWN0b3IodGhpcy51cGRhdGVTdGF0ZSwgbm9vcCkob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gYWRkIHdpZGdldCB0byB0aGUgSW5zdGFudFNlYXJjaCBJbnN0YW5jZVxuICAgIHRoaXMuaW5zdGFudFNlYXJjaFBhcmVudC5hZGRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuaW5zdGFudFNlYXJjaFBhcmVudC5yZW1vdmVXaWRnZXQodGhpcy53aWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdGF0ZSA9IChcbiAgICBzdGF0ZToge30sXG4gICAgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHwgdm9pZCA9PiB7XG4gICAgaWYgKGlzRmlyc3RSZW5kZXJpbmcpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9O1xuXG4gIC8vIGhlbHBlciBtZXRob2QgZm9yIGdlbmVyaW5nIGl0ZW0gbGlzdCBjbGFzc05hbWVcbiAgcHVibGljIGdldEl0ZW1DbGFzcyhpdGVtOiB7IGlzUmVmaW5lZD86IGJvb2xlYW4gfSkge1xuICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmN4KCdpdGVtJyk7XG5cbiAgICBpZiAoaXRlbS5pc1JlZmluZWQpIHtcbiAgICAgIGNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHt0aGlzLmN4KCdpdGVtJywgJ3NlbGVjdGVkJyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMi4xLjBcIjtcbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCAqIGFzIGFsZ29saWFzZWFyY2hQcm94eSBmcm9tICdhbGdvbGlhc2VhcmNoL2xpdGUnO1xuXG5pbXBvcnQgaW5zdGFudHNlYXJjaCBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzJztcblxuaW1wb3J0IHsgQWxnb2xpYVNlYXJjaEhlbHBlciB9IGZyb20gJ2FsZ29saWFzZWFyY2gtaGVscGVyJztcblxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL3ZlcnNpb24nO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYXNlYXJjaFByb3h5LmRlZmF1bHQgfHwgYWxnb2xpYXNlYXJjaFByb3h5O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hSZXF1ZXN0ID0ge1xuICBpbmRleE5hbWU6IHN0cmluZztcbiAgcGFyYW1zOiBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdCA9IHtcbiAgaW5kZXhOYW1lOiBzdHJpbmc7XG4gIHBhcmFtczogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbi8vIERvY3VtZW50YXRpb246IGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9hcGktcmVmZXJlbmNlL3NlYXJjaC1hcGktcGFyYW1ldGVycy9cbmV4cG9ydCB0eXBlIFNlYXJjaFBhcmFtZXRlcnMgPSB7XG4gIC8vIEF0dHJpYnV0ZXNcbiAgYXR0cmlidXRlc1RvUmV0cmlldmU/OiBzdHJpbmdbXTtcbiAgcmVzdHJpY3RTZWFyY2hhYmxlQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEZpbHRlcmluZ1xuICBmaWx0ZXJzPzogc3RyaW5nO1xuICBmYWNldEZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgb3B0aW9uYWxGaWx0ZXJzPzogc3RyaW5nW107XG4gIG51bWVyaWNGaWx0ZXJzPzogc3RyaW5nW107XG4gIHN1bU9yRmlsdGVyc1Njb3Jlcz86IGJvb2xlYW47XG5cbiAgLy8gRmFjZXRpbmdcbiAgZmFjZXRzPzogc3RyaW5nW107XG4gIG1heFZhbHVlc1BlckZhY2V0PzogbnVtYmVyO1xuICBmYWNldGluZ0FmdGVyRGlzdGluY3Q/OiBib29sZWFuO1xuICBzb3J0RmFjZXRWYWx1ZXNCeT86IHN0cmluZztcblxuICAvLyBIaWdobGlnaHRpbmcgLyBTbmlwcGV0aW5nXG4gIGF0dHJpYnV0ZXNUb0hpZ2hsaWdodD86IHN0cmluZ1tdO1xuICBhdHRyaWJ1dGVzVG9TbmlwcGV0Pzogc3RyaW5nW107XG4gIGhpZ2hsaWdodFByZVRhZz86IHN0cmluZztcbiAgaGlnaGxpZ2h0UG9zdFRhZz86IHN0cmluZztcbiAgc25pcHBldEVsbGlwc2lzVGV4dD86IHN0cmluZztcbiAgcmVzdHJpY3RIaWdobGlnaHRBbmRTbmlwcGV0QXJyYXlzPzogYm9vbGVhbjtcblxuICAvLyBQYWdpbmF0aW9uXG4gIHBhZ2U/OiBudW1iZXI7XG4gIGhpdHNQZXJQYWdlPzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIGxlbmd0aD86IG51bWJlcjtcblxuICAvLyBUeXBvc1xuICBtaW5Xb3JkU2l6ZWZvcjFUeXBvPzogbnVtYmVyO1xuICBtaW5Xb3JkU2l6ZWZvcjJUeXBvcz86IG51bWJlcjtcbiAgdHlwb1RvbGVyYW5jZT86IHN0cmluZyB8IGJvb2xlYW47XG4gIGFsbG93VHlwb3NPbk51bWVyaWNUb2tlbnM/OiBib29sZWFuO1xuICBpZ25vcmVQbHVyYWxzPzogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBkaXNhYmxlVHlwb1RvbGVyYW5jZU9uQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEdlby1TZWFyY2hcbiAgYXJvdW5kTGF0TG5nPzogc3RyaW5nO1xuICBhcm91bmRMYXRMbmdWaWFJUD86IGJvb2xlYW47XG4gIGFyb3VuZFJhZGl1cz86IG51bWJlciB8ICdhbGwnO1xuICBhcm91bmRQcmVjaXNpb24/OiBudW1iZXI7XG4gIG1pbmltdW1Bcm91bmRSYWRpdXM/OiBudW1iZXI7XG4gIGluc2lkZUJvdW5kaW5nQm94PzogR2VvUmVjdGFuZ2xlIHwgR2VvUmVjdGFuZ2xlW107XG4gIGluc2lkZVBvbHlnb24/OiBHZW9Qb2x5Z29uIHwgR2VvUG9seWdvbltdO1xuXG4gIC8vIFF1ZXJ5IFN0cmF0ZWd5XG4gIHF1ZXJ5VHlwZT86IHN0cmluZztcbiAgcmVtb3ZlV29yZHNJZk5vUmVzdWx0cz86IHN0cmluZztcbiAgYWR2YW5jZWRTeW50YXg/OiBib29sZWFuO1xuICBvcHRpb25hbFdvcmRzPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHJlbW92ZVN0b3BXb3Jkcz86IGJvb2xlYW4gfCBzdHJpbmdbXTtcbiAgZGlzYWJsZUV4YWN0T25BdHRyaWJ1dGVzPzogc3RyaW5nW107XG4gIGV4YWN0T25TaW5nbGVXb3JkUXVlcnk/OiBzdHJpbmc7XG4gIGFsdGVybmF0aXZlc0FzRXhhY3Q/OiBzdHJpbmdbXTtcblxuICAvLyBRdWVyeSBSdWxlc1xuICBlbmFibGVSdWxlcz86IGJvb2xlYW47XG4gIHJ1bGVDb250ZXh0cz86IHN0cmluZ1tdO1xuXG4gIC8vIEFkdmFuY2VkXG4gIG1pblByb3hpbWl0eT86IG51bWJlcjtcbiAgcmVzcG9uc2VGaWVsZHM/OiBzdHJpbmdbXTtcbiAgbWF4RmFjZXRIaXRzPzogbnVtYmVyO1xuICBwZXJjZW50aWxlQ29tcHV0YXRpb24/OiBib29sZWFuO1xuICBkaXN0aW5jdD86IG51bWJlciB8IGJvb2xlYW47XG4gIGdldFJhbmtpbmdJbmZvPzogYm9vbGVhbjtcbiAgY2xpY2tBbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3NUYWdzPzogc3RyaW5nW107XG4gIHN5bm9ueW1zPzogYm9vbGVhbjtcbiAgcmVwbGFjZVN5bm9ueW1zSW5IaWdobGlnaHQ/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycyBleHRlbmRzIFNlYXJjaFBhcmFtZXRlcnMge1xuICBxdWVyeTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBTZWFyY2hQYXJhbWV0ZXJzIHtcbiAgZmFjZXRRdWVyeTogc3RyaW5nO1xuICBmYWNldE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2VvUmVjdGFuZ2xlID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5leHBvcnQgdHlwZSBHZW9Qb2x5Z29uID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4vLyBEb2N1bWVudGF0aW9uOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoLz9sYW5ndWFnZT1qYXZhc2NyaXB0I3NlYXJjaC1tdWx0aXBsZS1pbmRleGVzXG5leHBvcnQgdHlwZSBTZWFyY2hSZXNwb25zZSA9IHtcbiAgaGl0czogSGl0W107XG4gIHBhZ2U/OiBudW1iZXI7XG4gIG5iSGl0cz86IG51bWJlcjtcbiAgbmJQYWdlcz86IG51bWJlcjtcbiAgaGl0c1BlclBhZ2U/OiBudW1iZXI7XG4gIHByb2Nlc3NpbmdUaW1lTVM/OiBudW1iZXI7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBwYXJhbXM/OiBzdHJpbmc7XG4gIGluZGV4Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgSGl0ID0ge1xuICBfaGlnaGxpZ2h0UmVzdWx0Pzogb2JqZWN0O1xufTtcblxuLy8gRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3QtYXBpL3NlYXJjaC8/bGFuZ3VhZ2U9amF2YXNjcmlwdCNzZWFyY2gtZm9yLWZhY2V0LXZhbHVlc1xuZXhwb3J0IHR5cGUgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmc7XG4gIGNvdW50PzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoQ2xpZW50ID0ge1xuICBzZWFyY2g6IChyZXF1ZXN0czogU2VhcmNoUmVxdWVzdFtdKSA9PiBQcm9taXNlPHsgcmVzdWx0czogU2VhcmNoUmVzcG9uc2VbXSB9PjtcbiAgc2VhcmNoRm9yRmFjZXRWYWx1ZXM/OiAoXG4gICAgcmVxdWVzdHM6IFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFtdXG4gICkgPT4gUHJvbWlzZTx7IGZhY2V0SGl0czogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZVtdIH1bXT47XG59O1xuXG5leHBvcnQgdHlwZSBJbnN0YW50U2VhcmNoQ29uZmlnID0ge1xuICBhcHBJZD86IHN0cmluZztcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBpbmRleE5hbWU6IHN0cmluZztcblxuICBudW1iZXJMb2NhbGU/OiBzdHJpbmc7XG4gIHNlYXJjaEZ1bmN0aW9uPzogKGhlbHBlcjogYW55KSA9PiB2b2lkO1xuICBjcmVhdGVBbGdvbGlhQ2xpZW50PzogKFxuICAgIGFsZ29saWFzZWFyY2g6IEZ1bmN0aW9uLFxuICAgIGFwcElkOiBzdHJpbmcsXG4gICAgYXBpS2V5OiBzdHJpbmdcbiAgKSA9PiBvYmplY3Q7XG4gIHNlYXJjaENsaWVudD86IFNlYXJjaENsaWVudDtcbiAgc2VhcmNoUGFyYW1ldGVycz86IFNlYXJjaFBhcmFtZXRlcnMgfCB2b2lkO1xuICB1cmxTeW5jPzpcbiAgICB8IGJvb2xlYW5cbiAgICB8IHtcbiAgICAgICAgbWFwcGluZz86IG9iamVjdDtcbiAgICAgICAgdGhyZXNob2xkPzogbnVtYmVyO1xuICAgICAgICB0cmFja2VkUGFyYW1ldGVycz86IHN0cmluZ1tdO1xuICAgICAgICB1c2VIYXNoPzogYm9vbGVhbjtcbiAgICAgICAgZ2V0SGlzdG9yeVN0YXRlPzogKCkgPT4gb2JqZWN0O1xuICAgICAgfTtcbiAgcm91dGluZz86XG4gICAgfCBib29sZWFuXG4gICAgfCB7XG4gICAgICAgIHN0YXRlTWFwcGluZz86IHtcbiAgICAgICAgICBzdGF0ZVRvUm91dGUob2JqZWN0KTogb2JqZWN0O1xuICAgICAgICAgIHJvdXRlVG9TdGF0ZShvYmplY3QpOiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbnRTZWFyY2hJbnN0YW5jZSB7XG4gIHB1YmxpYyBzdGFydDogKCkgPT4gdm9pZDtcblxuICBwdWJsaWMgYWRkV2lkZ2V0OiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWQ7XG4gIHB1YmxpYyBhZGRXaWRnZXRzOiAod2lkZ2V0czogV2lkZ2V0W10pID0+IHZvaWQ7XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldDogKHdpZGdldDogV2lkZ2V0KSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0czogKHdpZGdldHM6IFdpZGdldFtdKSA9PiB2b2lkO1xuXG4gIC8vIEV2ZW50RW1taXRlclxuICBwdWJsaWMgb246IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuXG4gIHB1YmxpYyBoZWxwZXI6IHtcbiAgICBsYXN0UmVzdWx0czogT2JqZWN0O1xuICAgIHN0YXRlOiBPYmplY3Q7XG4gIH07XG5cbiAgcHVibGljIHJlZnJlc2g6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBkaXNwb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaW5zdGFudHNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5zdGFudFNlYXJjaCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZzogSW5zdGFudFNlYXJjaENvbmZpZztcbiAgQElucHV0KCkgcHVibGljIGluc3RhbmNlTmFtZTogc3RyaW5nID0gJ2RlZmF1bHQnO1xuXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjx7IHJlc3VsdHM6IHt9OyBzdGF0ZToge30gfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICByZXN1bHRzOiB7fTtcbiAgICBzdGF0ZToge307XG4gIH0+KCk7XG5cbiAgcHVibGljIGluc3RhbnRTZWFyY2hJbnN0YW5jZTogSW5zdGFudFNlYXJjaEluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUluc3RhbnRTZWFyY2hJbnN0YW5jZSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnN0YXJ0KCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVtb3ZlTGlzdGVuZXIoJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVJbnN0YW50U2VhcmNoSW5zdGFuY2UoY29uZmlnOiBJbnN0YW50U2VhcmNoQ29uZmlnKSB7XG4gICAgLy8gYWRkIGRlZmF1bHQgc2VhcmNoUGFyYW1ldGVycyB3aXRoIGhpZ2hsaWdodGluZyBjb25maWdcbiAgICBpZiAoIWNvbmZpZy5zZWFyY2hQYXJhbWV0ZXJzKSBjb25maWcuc2VhcmNoUGFyYW1ldGVycyA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLnNlYXJjaFBhcmFtZXRlcnMsIHtcbiAgICAgIGhpZ2hsaWdodFByZVRhZzogJ19fYWlzLWhpZ2hsaWdodF9fJyxcbiAgICAgIGhpZ2hsaWdodFBvc3RUYWc6ICdfXy9haXMtaGlnaGxpZ2h0X18nLFxuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIFVSTFN5bmMgd2lkZ2V0IGlmIG9uIFNTUlxuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcudXJsU3luYyAhPT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBjb25maWcudXJsU3luYztcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJvdXRpbmcgIT09ICd1bmRlZmluZWQnKSBkZWxldGUgY29uZmlnLnJvdXRpbmc7XG4gICAgfVxuXG4gICAgLy8gY3VzdG9tIGFsZ29saWEgY2xpZW50IGFnZW50XG4gICAgaWYgKCFjb25maWcuc2VhcmNoQ2xpZW50ICYmICFjb25maWcuY3JlYXRlQWxnb2xpYUNsaWVudCkge1xuICAgICAgY29uc3QgY2xpZW50ID0gYWxnb2xpYXNlYXJjaChjb25maWcuYXBwSWQsIGNvbmZpZy5hcGlLZXkpO1xuICAgICAgY2xpZW50LmFkZEFsZ29saWFBZ2VudChgYW5ndWxhci1pbnN0YW50c2VhcmNoICR7VkVSU0lPTn1gKTtcblxuICAgICAgY29uZmlnLnNlYXJjaENsaWVudCA9IGNsaWVudDtcbiAgICAgIGNvbmZpZy5hcHBJZCA9IHVuZGVmaW5lZDtcbiAgICAgIGNvbmZpZy5hcGlLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UgPSBpbnN0YW50c2VhcmNoKGNvbmZpZyk7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2Uub24oJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmFkZFdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnJlbW92ZVdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVmcmVzaCgpO1xuICB9XG5cbiAgb25SZW5kZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICByZXN1bHRzOiB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5oZWxwZXIubGFzdFJlc3VsdHMsXG4gICAgICBzdGF0ZTogdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuaGVscGVyLnN0YXRlLFxuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25uZWN0QnJlYWRjcnVtYiB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgdHlwZSBCcmVhZGNydW1iSXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaXRlbScsIGl0ZW0uaXNMYXN0ID8gJ3NlbGVjdGVkJyA6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnc2VwYXJhdG9yJylcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgICBocmVmPVwie3tzdGF0ZS5jcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgICAgICAqbmdJZj1cIiFpdGVtLmlzTGFzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3tpdGVtLm5hbWV9fVxuICAgICAgICAgIDwvYT5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pc0xhc3RcIj5cbiAgICAgICAgICAgIHt7aXRlbS5uYW1lfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0JyZWFkY3J1bWIgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBwdWJsaWMgcm9vdFBhdGg/OiBzdHJpbmc7XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLm1hcCgoaXRlbSwgaWR4KSA9PiAoe1xuICAgICAgLi4uaXRlbSxcbiAgICAgIHNlcGFyYXRvcjogaWR4ICE9PSAwLFxuICAgICAgaXNMYXN0OiBpZHggPT09IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSxcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGU6IEJyZWFkY3J1bWJTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdCcmVhZGNydW1iJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEJyZWFkY3J1bWIsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHJvb3RQYXRoOiB0aGlzLnJvb3RQYXRoLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgaXRlbTogQnJlYWRjcnVtYkl0ZW0pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGl0ZW0udmFsdWUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzQnJlYWRjcnVtYiB9IGZyb20gJy4vYnJlYWRjcnVtYic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzQnJlYWRjcnVtYl0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQnJlYWRjcnVtYl0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0JyZWFkY3J1bWJdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNCcmVhZGNydW1iTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RDbGVhckFsbCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1jbGVhci1yZWZpbmVtZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdidXR0b24nKSArICghc3RhdGUuaGFzUmVmaW5lbWVudHMgPyAoJyAnICsgY3goJ2J1dHRvbicsICdkaXNhYmxlZCcpKSA6ICcnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFzdGF0ZS5oYXNSZWZpbmVtZW50c1wiXG4gICAgICA+XG4gICAgICAgIHt7YnV0dG9uTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ2xlYXJSZWZpbmVtZW50cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKSBwdWJsaWMgYnV0dG9uTGFiZWw6IHN0cmluZyA9ICdDbGVhciByZWZpbmVtZW50cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcnNRdWVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUF0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW107XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhhc1JlZmluZW1lbnRzOiBmYWxzZSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiAhdGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cyAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ2xlYXJSZWZpbmVtZW50cycpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIHdlIG5lZWQgdG8gYGNyZWF0ZVdpZGdldGAgZnJvbSBgbmdPbkluaXRgIHRvIGhhdmUgYEBJbnB1dCgpYCBpbnRpYWxpemVkXG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdENsZWFyQWxsLCB7XG4gICAgICBjbGVhcnNRdWVyeTogdGhpcy5jbGVhcnNRdWVyeSxcbiAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVzOiB0aGlzLmV4Y2x1ZGVBdHRyaWJ1dGVzLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cykge1xuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHMgfSBmcm9tICcuL2NsZWFyLXJlZmluZW1lbnRzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNDbGVhclJlZmluZW1lbnRzXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNDbGVhclJlZmluZW1lbnRzXSxcbiAgZXhwb3J0czogW05nQWlzQ2xlYXJSZWZpbmVtZW50c10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDdXJyZW50UmVmaW5lbWVudHNTdGF0ZSA9IHtcbiAgYXR0cmlidXRlczoge307XG4gIGNsZWFyQWxsQ2xpY2s6IEZ1bmN0aW9uO1xuICBjbGVhckFsbFVSTDogRnVuY3Rpb247XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHJlZmluZW1lbnRzOiB7fVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWN1cnJlbnQtcmVmaW5lbWVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGVhckFsbENsaWNrKCRldmVudClcIlxuICAgICAgICAqbmdJZj1cImNsZWFyUmVmaW5lbWVudHMgPT09ICdiZWZvcmUnIHx8IGNsZWFyUmVmaW5lbWVudHMgPT09IHRydWVcIj5cbiAgICAgICAge3tjbGVhclJlZmluZW1lbnRzTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDx1bFxuICAgICAgICBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCByZWZpbmVtZW50IG9mIHJlZmluZW1lbnRzXCJcbiAgICAgID5cbiAgICAgICAgPGxpIFtjbGFzc109XCJjeCgnaXRlbScpXCI+XG4gICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tyZWZpbmVtZW50LmxhYmVsfX06PC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2F0ZWdvcnknKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiByZWZpbmVtZW50Lml0ZW1zXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NhdGVnb3J5TGFiZWwnKVwiPnt7aXRlbS5uYW1lfX08L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIFtjbGFzc109XCJjeCgnZGVsZXRlJylcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiPsOiwpzClTwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsZWFyQWxsQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICpuZ0lmPVwiY2xlYXJSZWZpbmVtZW50cyA9PT0gJ2FmdGVyJ1wiPlxuICAgICAgICB7e2NsZWFyUmVmaW5lbWVudHNMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDdXJyZW50UmVmaW5lbWVudHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGNsZWFyUmVmaW5lbWVudHM6ICdiZWZvcmUnIHwgJ2FmdGVyJyB8IGJvb2xlYW4gPSAnYWZ0ZXInO1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJSZWZpbmVtZW50c0xhYmVsOiBzdHJpbmcgPSAnQ2xlYXIgcmVmaW5lbWVudHMnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgb25seUxpc3RlZEF0dHJpYnV0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGNsZWFyc1F1ZXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhdHRyaWJ1dGVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogQ3VycmVudFJlZmluZW1lbnRzU3RhdGUgPSB7XG4gICAgYXR0cmlidXRlczoge30sXG4gICAgY2xlYXJBbGxDbGljazogbm9vcCxcbiAgICBjbGVhckFsbFVSTDogbm9vcCxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHJlZmluZW1lbnRzOiBbXSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucmVmaW5lbWVudHMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgcmVmaW5lbWVudHMoKSB7XG4gICAgY29uc3QgaXRlbXMgPVxuICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUucmVmaW5lbWVudHMpXG4gICAgICAgIDogdGhpcy5zdGF0ZS5yZWZpbmVtZW50cztcblxuICAgIC8vIGdyb3VwIHJlZmluZW1lbnRzIGJ5IGNhdGVnb3J5PyAoYXR0cmlidXRlTmFtZSAmJiB0eXBlKVxuICAgIHJldHVybiBpdGVtcy5yZWR1Y2UoKHJlcywgeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCAuLi5yZWZpbmVtZW50IH0pID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gcmVzLmZpbmQoXG4gICAgICAgIHIgPT4gci5hdHRyaWJ1dGVOYW1lID09PSBhdHRyaWJ1dGVOYW1lICYmIHIudHlwZSA9PT0gdHlwZVxuICAgICAgKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pdGVtcy5wdXNoKHsgdHlwZSwgYXR0cmlidXRlTmFtZSwgLi4ucmVmaW5lbWVudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgbGFiZWw6IGNhcGl0YWxpemUoYXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgaXRlbXM6IFt7IHR5cGUsIGF0dHJpYnV0ZU5hbWUsIC4uLnJlZmluZW1lbnQgfV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXQganNvbigpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yZWZpbmVtZW50cywgbnVsbCwgNCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDdXJyZW50UmVmaW5lbWVudHMnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIGNsZWFyc1F1ZXJ5OiB0aGlzLmNsZWFyc1F1ZXJ5LFxuICAgICAgb25seUxpc3RlZEF0dHJpYnV0ZXM6IHRoaXMub25seUxpc3RlZEF0dHJpYnV0ZXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgcmVmaW5lbWVudDoge30pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHJlZmluZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsZWFyQWxsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuY2xlYXJBbGxDbGljaygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNDdXJyZW50UmVmaW5lbWVudHMgfSBmcm9tICcuL2N1cnJlbnQtcmVmaW5lbWVudHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0N1cnJlbnRSZWZpbmVtZW50c10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQ3VycmVudFJlZmluZW1lbnRzXSxcbiAgZXhwb3J0czogW05nQWlzQ3VycmVudFJlZmluZW1lbnRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpZXJhcmNoaWNhbE1lbnUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBIaWVyYXJjaGljYWxNZW51U3RhdGUgPSB7XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZXJhcmNoaWNhbC1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpICsgJyAnICsgY3goJ2xpc3QnLCAnbHZsMCcpXCI+XG4gICAgICAgIDxhaXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICBbaXRlbV09XCJpdGVtXCJcbiAgICAgICAgICBbY3JlYXRlVVJMXT1cInN0YXRlLmNyZWF0ZVVSTFwiXG4gICAgICAgICAgW3JlZmluZV09XCJzdGF0ZS5yZWZpbmVcIlxuICAgICAgICA+XG4gICAgICAgIDwvYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvblxuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3I/OiBzdHJpbmcgPSAnID4gJztcbiAgQElucHV0KCkgcHVibGljIHJvb3RQYXRoPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd1BhcmVudExldmVsPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIGxpbWl0PzogbnVtYmVyIHwgc3RyaW5nID0gMTA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3J0Qnk/OiBzdHJpbmdbXSB8ICgoaXRlbTogb2JqZWN0KSA9PiBudW1iZXIpO1xuXG4gIHB1YmxpYyBzdGF0ZTogSGllcmFyY2hpY2FsTWVudVN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLml0ZW1zKVxuICAgICAgOiB0aGlzLnN0YXRlLml0ZW1zO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGllcmFyY2hpY2FsTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RIaWVyYXJjaGljYWxNZW51LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHJvb3RQYXRoOiB0aGlzLnJvb3RQYXRoLFxuICAgICAgc2VwYXJhdG9yOiB0aGlzLnNlcGFyYXRvcixcbiAgICAgIHNob3dQYXJlbnRMZXZlbDogdGhpcy5zaG93UGFyZW50TGV2ZWwsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBIaWVyYXJjaGljYWxNZW51SXRlbSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbiAgaXNSZWZpbmVkOiBib29sZWFuO1xuICBkYXRhOiBIaWVyYXJjaGljYWxNZW51SXRlbVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaVxuICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgPlxuICAgICAgPGFcbiAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICBocmVmPVwie3tjcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgPC9hPlxuXG4gICAgICA8dWxcbiAgICAgICAgW2NsYXNzXT1cImdldExpc3RDbGFzcyhpdGVtKVwiXG4gICAgICAgICpuZ0lmPVwiaXRlbS5pc1JlZmluZWQgJiYgaXNBcnJheShpdGVtLmRhdGEpICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwXCJcbiAgICAgID5cbiAgICAgICAgPGFpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNoaWxkIG9mIGl0ZW0uZGF0YVwiXG4gICAgICAgICAgW2l0ZW1dPVwiY2hpbGRcIlxuICAgICAgICAgIFtjcmVhdGVVUkxdPVwiY3JlYXRlVVJMXCJcbiAgICAgICAgICBbcmVmaW5lXT1cInJlZmluZVwiXG4gICAgICAgICAgW2x2bF09XCJsdmwgKyAxXCJcbiAgICAgICAgPlxuICAgICAgICA8L2Fpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtPlxuICAgICAgPC91bD5cbiAgICA8L2xpPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVJdGVtIHtcbiAgQElucHV0KCkgcHVibGljIGx2bDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgcHVibGljIHJlZmluZTogKHN0cmluZykgPT4gdm9pZDtcbiAgQElucHV0KCkgcHVibGljIGNyZWF0ZVVSTDogKHN0cmluZykgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaXRlbTogSGllcmFyY2hpY2FsTWVudUl0ZW07XG5cbiAgcHVibGljIGN4ID0gYmVtKCdIaWVyYXJjaGljYWxNZW51Jyk7XG5cbiAgcHVibGljIGdldEl0ZW1DbGFzcyhpdGVtKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ2l0ZW0nKTtcblxuICAgIGlmIChpdGVtLmlzUmVmaW5lZCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKX1gO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQXJyYXkoaXRlbS5kYXRhKSAmJiBpdGVtLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAncGFyZW50Jyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldExpc3RDbGFzcyhpdGVtKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuY3goJ2xpc3QnKX0gJHt0aGlzLmN4KCdsaXN0JywgJ2NoaWxkJyl9ICR7dGhpcy5jeChcbiAgICAgICdsaXN0JyxcbiAgICAgIGBsdmwke3RoaXMubHZsfWBcbiAgICApfWA7XG4gIH1cblxuICBwdWJsaWMgaXNBcnJheShwb3RlbnRpYWxBcnJheTogYW55KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocG90ZW50aWFsQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBIaWVyYXJjaGljYWxNZW51SXRlbSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSGllcmFyY2hpY2FsTWVudSB9IGZyb20gJy4vaGllcmFyY2hpY2FsLW1lbnUnO1xuaW1wb3J0IHsgTmdBaXNIaWVyYXJjaGljYWxNZW51SXRlbSB9IGZyb20gJy4vaGllcmFyY2hpY2FsLW1lbnUtaXRlbSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGllcmFyY2hpY2FsTWVudSwgTmdBaXNIaWVyYXJjaGljYWxNZW51SXRlbV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzSGllcmFyY2hpY2FsTWVudV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWVyYXJjaGljYWxNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpdHNQZXJQYWdlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmVzdWx0c1BlclBhZ2VTdGF0ZSA9IHtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGl0cy1wZXItcGFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWxlY3QnKVwiXG4gICAgICAgIChjaGFuZ2UpPVwic3RhdGUucmVmaW5lKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnb3B0aW9uJylcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGl0c1BlclBhZ2UgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGRlZmF1bHQ/OiBib29sZWFuO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBSZXN1bHRzUGVyUGFnZVN0YXRlID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGl0c1BlclBhZ2UnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGl0c1BlclBhZ2UsIHsgaXRlbXM6IHRoaXMuaXRlbXMgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSGl0c1BlclBhZ2UgfSBmcm9tICcuL2hpdHMtcGVyLXBhZ2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0hpdHNQZXJQYWdlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNIaXRzUGVyUGFnZV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpdHNQZXJQYWdlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGl0c1BlclBhZ2VNb2R1bGUge31cbiIsImNvbnN0IGdldCA9IHJlcXVpcmUoJ2xvZGFzaC9nZXQnKTtcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJlbSB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZ2hsaWdodCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gW2NsYXNzXT1cImN4KClcIiBbaW5uZXJIdG1sXT1cImNvbnRlbnRcIj48L3NwYW4+YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWdobGlnaHQge1xuICBASW5wdXQoKSBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgaGl0OiB7IF9oaWdobGlnaHRSZXN1bHQ/OiB7fTsgbGFiZWw/OiBzdHJpbmc7IGhpZ2hsaWdodGVkPzogc3RyaW5nIH07XG4gIEBJbnB1dCgpIHRhZ05hbWU6IHN0cmluZyA9ICdlbSc7XG5cbiAgY3ggPSBiZW0oJ0hpZ2hsaWdodCcpO1xuXG4gIGdldCBjb250ZW50KCkge1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZSA9PT0gJ2hpZ2hsaWdodGVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0LmhpZ2hsaWdodGVkXG4gICAgICAgID8gdGhpcy5yZXBsYWNlV2l0aFRhZ05hbWUodGhpcy5oaXQuaGlnaGxpZ2h0ZWQpXG4gICAgICAgIDogdGhpcy5oaXQubGFiZWw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGl0Lmhhc093blByb3BlcnR5KCdfaGlnaGxpZ2h0UmVzdWx0JykpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZUhpZ2hsaWdodGVkID0gZ2V0KFxuICAgICAgICB0aGlzLmhpdC5faGlnaGxpZ2h0UmVzdWx0LFxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVxuICAgICAgKTtcblxuICAgICAgLy8gY2hlY2sgdGhhdCB0aGUgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgaXMgYSBzdHJpbmdcbiAgICAgIGlmIChcbiAgICAgICAgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgYXR0cmlidXRlSGlnaGxpZ2h0ZWQudmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVdpdGhUYWdOYW1lKGF0dHJpYnV0ZUhpZ2hsaWdodGVkLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmYWxsYmFjayA9IGdldCh0aGlzLmhpdCwgdGhpcy5hdHRyaWJ1dGUpO1xuICAgIGlmICghZmFsbGJhY2spIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYENvdWxkIG5vdCBmaW5kIGF0dHJpYnV0ZSBbJHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZVxuICAgICAgICB9XSBpbnRvIGhpdCBvYmplY3QsIHdpbGwgZGlzcGxheSBhbiBlbXB0eSBzdHJpbmcuYFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIHJlcGxhY2VXaXRoVGFnTmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cCgnPGVtPicsICdnJyksXG4gICAgICAgIGA8JHt0aGlzLnRhZ05hbWV9IGNsYXNzPVwiJHt0aGlzLmN4KCdoaWdobGlnaHRlZCcpfVwiPmBcbiAgICAgIClcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJzwvZW0+JywgJ2cnKSwgYDwvJHt0aGlzLnRhZ05hbWV9PmApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHQgfSBmcm9tICcuL2hpZ2hsaWdodCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGlnaGxpZ2h0XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNIaWdobGlnaHRdLFxuICBleHBvcnRzOiBbTmdBaXNIaWdobGlnaHRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWdobGlnaHRNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RIaXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGl0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBzdGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIGRlZmF1bHQgcmVuZGVyaW5nIGlmIG5vIHRlbXBsYXRlIHNwZWNpZmllZCAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaGl0IG9mIHN0YXRlLmhpdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cIm5hbWVcIiBbaGl0XT1cImhpdFwiPlxuICAgICAgICAgICAgPC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBpbm5lciB3aWRnZXQgc3RhdGUgcmV0dXJuZWQgZnJvbSBjb25uZWN0b3JcbiAgcHVibGljIHN0YXRlOiB7IGhpdHM6IHt9W107IHJlc3VsdHM6IHt9IH0gPSB7IGhpdHM6IFtdLCByZXN1bHRzOiB7fSB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0hpdHMnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGl0cywgeyBlc2NhcGVIaXRzOiB0cnVlIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVzdWx0czogc3RhdGUucmVzdWx0cyxcbiAgICAgIGhpdHM6XG4gICAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHN0YXRlLmhpdHMpXG4gICAgICAgICAgOiBzdGF0ZS5oaXRzLFxuICAgIH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuLi9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOZ0Fpc0hpdHMgfSBmcm9tICcuL2hpdHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0hpdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0hpdHNdLFxuICBleHBvcnRzOiBbTmdBaXNIaXRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmdBaXNIaWdobGlnaHRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpdHNNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RJbmZpbml0ZUhpdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaW5maW5pdGUtaGl0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBzdGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIGRlZmF1bHQgcmVuZGVyaW5nIGlmIG5vIHRlbXBsYXRlIHNwZWNpZmllZCAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaGl0IG9mIHN0YXRlLmhpdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cIm5hbWVcIiBbaGl0XT1cImhpdFwiPlxuICAgICAgICAgICAgPC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ3Nob3dNb3JlJylcIlxuICAgICAgICAoY2xpY2spPVwic2hvd01vcmUoJGV2ZW50KVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJzdGF0ZS5pc0xhc3RQYWdlXCJcbiAgICAgICAgKm5nSWY9XCIhdGVtcGxhdGVcIlxuICAgICAgPlxuICAgICAgICB7e3Nob3dNb3JlTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5maW5pdGVIaXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZT86IGFueTtcblxuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSByZXN1bHRzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG5cbiAgLy8gaW5uZXIgd2lkZ2V0IHN0YXRlIHJldHVybmVkIGZyb20gY29ubmVjdG9yXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGhpdHM6IHt9W107XG4gICAgaXNMYXN0UGFnZTogYm9vbGVhbjtcbiAgICBzaG93TW9yZTogRnVuY3Rpb247XG4gICAgcmVzdWx0czoge307XG4gIH0gPSB7XG4gICAgaGl0czogW10sXG4gICAgaXNMYXN0UGFnZTogZmFsc2UsXG4gICAgc2hvd01vcmU6IG5vb3AsXG4gICAgcmVzdWx0czoge30sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSW5maW5pdGVIaXRzJyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEluZmluaXRlSGl0cywgeyBlc2NhcGVIaXRzOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIHNob3dNb3JlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0YXRlLnNob3dNb3JlKCk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZXN1bHRzOiBzdGF0ZS5yZXN1bHRzLFxuICAgICAgaGl0czpcbiAgICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXMoc3RhdGUuaGl0cylcbiAgICAgICAgICA6IHN0YXRlLmhpdHMsXG4gICAgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB9IGZyb20gJy4uL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmltcG9ydCB7IE5nQWlzSW5maW5pdGVIaXRzIH0gZnJvbSAnLi9pbmZpbml0ZS1oaXRzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNJbmZpbml0ZUhpdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0luZmluaXRlSGl0c10sXG4gIGV4cG9ydHM6IFtOZ0Fpc0luZmluaXRlSGl0c10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5nQWlzSGlnaGxpZ2h0TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUge31cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuL2luc3RhbnRzZWFyY2gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hdLFxuICBleHBvcnRzOiBbTmdBaXNJbnN0YW50U2VhcmNoXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW10sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RNZW51IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgTWVudVN0YXRlID0ge1xuICBjYW5SZWZpbmU6IGJvb2xlYW47XG4gIGNhblRvZ2dsZVNob3dNb3JlOiBib29sZWFuO1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpc1Nob3dpbmdNb3JlOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdG9nZ2xlU2hvd01vcmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwie3tzdGF0ZS5jcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e2l0ZW0uY291bnR9fTwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwic2hvd01vcmVMaW1pdCAmJiBzdGF0ZS5jYW5Ub2dnbGVTaG93TW9yZVwiXG4gICAgICAgIChjbGljayk9XCJzdGF0ZS50b2dnbGVTaG93TW9yZSgpXCJcbiAgICAgICAgW2NsYXNzXT1cInNob3dNb3JlQ2xhc3NcIlxuICAgICAgPlxuICAgICAgICB7e3N0YXRlLmlzU2hvd2luZ01vcmUgPyBzaG93TGVzc0xhYmVsIDogc2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxhYmVsOiBzdHJpbmcgPSAnU2hvdyBtb3JlJztcbiAgQElucHV0KCkgcHVibGljIHNob3dMZXNzTGFiZWw6IHN0cmluZyA9ICdTaG93IGxlc3MnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdD86IG51bWJlciB8IHN0cmluZyA9IDEwO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMaW1pdD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeT86IHN0cmluZ1tdIHwgKChpdGVtOiBvYmplY3QpID0+IG51bWJlcik7XG5cbiAgcHVibGljIHN0YXRlOiBNZW51U3RhdGUgPSB7XG4gICAgY2FuUmVmaW5lOiBmYWxzZSxcbiAgICBjYW5Ub2dnbGVTaG93TW9yZTogZmFsc2UsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGlzU2hvd2luZ01vcmU6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgdG9nZ2xlU2hvd01vcmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IHNob3dNb3JlQ2xhc3MoKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ3Nob3dNb3JlJyk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuY2FuVG9nZ2xlU2hvd01vcmUpIHtcbiAgICAgIGNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHt0aGlzLmN4KCdzaG93TW9yZScsICdkaXNhYmxlZCcpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLml0ZW1zKVxuICAgICAgOiB0aGlzLnN0YXRlLml0ZW1zO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RNZW51LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIHNob3dNb3JlTGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5zaG93TW9yZUxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnN0YXRlLnJlZmluZSh2YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc01lbnUgfSBmcm9tICcuL21lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc01lbnVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNNZW51XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTWVudU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbnVtZXJpYy1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgncmFkaW8nKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgIG5hbWU9XCJOdW1lcmljTWVudVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3RhcnQ/OiBudW1iZXI7XG4gICAgZW5kPzogbnVtYmVyO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdOdW1lcmljTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgb3B0aW9uczogdGhpcy5pdGVtcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHJlZmluZShldmVudDogTW91c2VFdmVudCwgaXRlbTogeyB2YWx1ZTogc3RyaW5nIH0pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNOdW1lcmljTWVudSB9IGZyb20gJy4vbnVtZXJpYy1tZW51JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNOdW1lcmljTWVudV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzTnVtZXJpY01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNOdW1lcmljTWVudV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdE51bWVyaWNTZWxlY3RvciB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE51bWVyaWNTZWxlY3RvclN0YXRlID0ge1xuICBjdXJyZW50UmVmaW5lbWVudD86IHN0cmluZyB8IG51bGw7XG4gIG9wdGlvbnM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbnVtZXJpYy1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goJycpXCI+XG4gICAgICA8c2VsZWN0XG4gICAgICAgIFtjbGFzc109XCJjeCgnc2VsZWN0JylcIlxuICAgICAgICAoY2hhbmdlKT1cInN0YXRlLnJlZmluZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ29wdGlvbicpXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5vcHRpb25zXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW0udmFsdWUgPT09IHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY1NlbGVjdG9yIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG9wZXJhdG9yOiAnPCcgfCAnPD0nIHwgJz0nIHwgJz49JyB8ICc+JyB8ICchPScgPSAnPSc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpdGVtczoge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogTnVtZXJpY1NlbGVjdG9yU3RhdGUgPSB7XG4gICAgY3VycmVudFJlZmluZW1lbnQ6IG51bGwsXG4gICAgb3B0aW9uczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ051bWVyaWNTZWxlY3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3ROdW1lcmljU2VsZWN0b3IsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsXG4gICAgICBvcHRpb25zOiB0aGlzLml0ZW1zLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc051bWVyaWNTZWxlY3RvciB9IGZyb20gJy4vbnVtZXJpYy1zZWxlY3Rvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzTnVtZXJpY1NlbGVjdG9yXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNOdW1lcmljU2VsZWN0b3JdLFxuICBleHBvcnRzOiBbTmdBaXNOdW1lcmljU2VsZWN0b3JdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUge31cbiIsImNvbnN0IHJhbmdlID0gcmVxdWlyZSgnbG9kYXNoL3JhbmdlJyk7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RQYWdpbmF0aW9uIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdJZj1cInNob3dGaXJzdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIDApXCJcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICdmaXJzdFBhZ2UnKSArXG4gICAgICAgICAgICAoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgPT09IDAgPyAnICcgKyBjeCgnaXRlbScsICdkaXNhYmxlZCcpIDogJycpXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbaHJlZl09XCJzdGF0ZS5jcmVhdGVVUkwoMClcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIMOiwoDCucOiwoDCuVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdJZj1cInNob3dQcmV2aW91c1wiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50IC0gMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ3ByZXZpb3VzUGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gMCA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCAtIDEpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDDosKAwrlcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAncGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gcGFnZSA/ICcgJyArIGN4KCdpdGVtJywgJ3NlbGVjdGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VzXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgcGFnZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChwYWdlKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3twYWdlICsgMX19XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd05leHRcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEpXCJcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICduZXh0UGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEgPT09IHN0YXRlLm5iUGFnZXMgPyAnICcgKyBjeCgnaXRlbScsICdkaXNhYmxlZCcpIDogJycpXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbaHJlZl09XCJzdGF0ZS5jcmVhdGVVUkwoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgKyAxKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgw6LCgMK6XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd0xhc3RcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBzdGF0ZS5uYlBhZ2VzIC0gMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ2xhc3RQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSA9PT0gc3RhdGUubmJQYWdlcyA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5uYlBhZ2VzIC0gMSlcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIMOiwoDCusOiwoDCulxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFnaW5hdGlvbiBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0ZpcnN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHNob3dMYXN0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93UHJldmlvdXM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd05leHQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFkZGluZzogbnVtYmVyIHwgc3RyaW5nID0gMztcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc3dcbiAgQElucHV0KCkgcHVibGljIHRvdGFsUGFnZXM/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBjdXJyZW50UmVmaW5lbWVudDogMCxcbiAgICBuYkhpdHM6IDAsXG4gICAgbmJQYWdlczogMCxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IHBhZ2VzKCkge1xuICAgIGNvbnN0IHsgbmJQYWdlcywgY3VycmVudFJlZmluZW1lbnQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBwYWdlc0FycmF5ID0gQXJyYXkuYXBwbHkobnVsbCwgeyBsZW5ndGg6IG5iUGFnZXMgfSkubWFwKFxuICAgICAgTnVtYmVyLmNhbGwsXG4gICAgICBOdW1iZXJcbiAgICApO1xuXG4gICAgY29uc3QgcGFnZXNQYWRkaW5nID1cbiAgICAgIHR5cGVvZiB0aGlzLnBhZGRpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgID8gcGFyc2VJbnQodGhpcy5wYWRkaW5nLCAxMClcbiAgICAgICAgOiB0aGlzLnBhZGRpbmc7XG5cbiAgICBpZiAocGFnZXNQYWRkaW5nICYmIHBhZ2VzUGFkZGluZyA+IDApIHtcbiAgICAgIC8vIHNob3VsZCBub3QgZGlzcGxheSBwYWdlcyB0aGF0IGRvZXMgbm90IGV4aXN0c1xuICAgICAgaWYgKG5iUGFnZXMgPCBwYWdlc1BhZGRpbmcgKiAyICsgMSkge1xuICAgICAgICByZXR1cm4gcGFnZXNBcnJheTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluRGVsdGEgPSBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyAtIDE7XG4gICAgICBjb25zdCBtYXhEZWx0YSA9IGN1cnJlbnRSZWZpbmVtZW50ICsgcGFnZXNQYWRkaW5nICsgMTtcblxuICAgICAgaWYgKG1pbkRlbHRhIDwgMCkge1xuICAgICAgICByZXR1cm4gcmFuZ2UoMCwgY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyBNYXRoLmFicyhtaW5EZWx0YSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWF4RGVsdGEgPiBuYlBhZ2VzKSB7XG4gICAgICAgIHJldHVybiByYW5nZShcbiAgICAgICAgICBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyAtIChtYXhEZWx0YSAtIG5iUGFnZXMpLFxuICAgICAgICAgIG5iUGFnZXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJhbmdlKFxuICAgICAgICBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyxcbiAgICAgICAgY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyAxXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwYWdlc0FycmF5O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUGFnaW5hdGlvbicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RQYWdpbmF0aW9uLCB7XG4gICAgICBtYXhQYWdlczogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnRvdGFsUGFnZXMpLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVmaW5lKGV2ZW50OiBNb3VzZUV2ZW50LCBwYWdlOiBudW1iZXIpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKFxuICAgICAgcGFnZSA8IDAgfHxcbiAgICAgIHBhZ2UgPT09IHRoaXMuc3RhdGUuY3VycmVudFJlZmluZW1lbnQgfHxcbiAgICAgIHBhZ2UgPj0gdGhpcy5zdGF0ZS5uYlBhZ2VzXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUocGFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1BhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1BhZ2luYXRpb25dLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1BhZ2luYXRpb25dLFxuICBleHBvcnRzOiBbTmdBaXNQYWdpbmF0aW9uXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFnaW5hdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFJhbmdlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCAqIGFzIG5vVWlTbGlkZXIgZnJvbSAnbm91aXNsaWRlcic7XG5cbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmFuZ2VTbGlkZXJTdGF0ZSA9IHtcbiAgcmFuZ2U6IHsgbWluOiBudW1iZXI7IG1heDogbnVtYmVyIH07XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHN0YXJ0OiBudW1iZXJbXTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYW5nZS1zbGlkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxkaXYgW2NsYXNzXT1cImN4KCdib2R5JylcIj5cbiAgICAgICAgPGRpdiAjc2xpZGVyQ29udGFpbmVyPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmFuZ2VTbGlkZXIgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQFZpZXdDaGlsZCgnc2xpZGVyQ29udGFpbmVyJykgcHVibGljIHNsaWRlckNvbnRhaW5lcjogYW55O1xuXG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBwaXBzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtaW4/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVjaXNpb246IG51bWJlciB8IHN0cmluZyA9IDI7XG5cbiAgcHVibGljIHN0YXRlOiBSYW5nZVNsaWRlclN0YXRlID0ge1xuICAgIHJhbmdlOiB7IG1pbjogMCwgbWF4OiAxIH0sXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHN0YXJ0OiBbMCwgMV0sXG4gIH07XG5cbiAgcHJpdmF0ZSBzbGlkZXI6IGFueTtcblxuICBnZXQgc3RlcCgpIHtcbiAgICAvLyBjb21wdXRlIHN0ZXAgZnJvbSB0aGUgcHJlY2lzaW9uIHZhbHVlXG4gICAgY29uc3QgcHJlY2lzaW9uID0gcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbikgfHwgMjtcbiAgICByZXR1cm4gMSAvIE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUmFuZ2VTbGlkZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0UmFuZ2UsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiBwYXJzZU51bWJlcklucHV0KHRoaXMubWF4KSxcbiAgICAgIG1pbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1pbiksXG4gICAgICBwcmVjaXNpb246IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSB7XG4gICAgICAvLyBjcmVhdGUgc2xpZGVyXG4gICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIGFuaW1hdGU6IGZhbHNlLFxuICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgcmFuZ2U6IHsgbWluOiAwLCBtYXg6IDEgfSxcbiAgICAgICAgc3RhcnQ6IFswLCAxXSxcbiAgICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgICB0b29sdGlwczogdGhpcy50b29sdGlwcyAmJiBbXG4gICAgICAgICAgeyB0bzogdGhpcy5mb3JtYXRUb29sdGlwIH0sXG4gICAgICAgICAgeyB0bzogdGhpcy5mb3JtYXRUb29sdGlwIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5waXBzID09PSB0cnVlIHx8IHR5cGVvZiB0aGlzLnBpcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB7XG4gICAgICAgICAgcGlwczoge1xuICAgICAgICAgICAgZGVuc2l0eTogMyxcbiAgICAgICAgICAgIG1vZGU6ICdwb3NpdGlvbnMnLFxuICAgICAgICAgICAgc3RlcHBlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlczogWzAsIDUwLCAxMDBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBpcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgeyBwaXBzOiB0aGlzLnBpcHMgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcblxuICAgICAgLy8gcmVnaXN0ZXIgbGlzdGVuIGV2ZW50c1xuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIubmF0aXZlRWxlbWVudC5ub1VpU2xpZGVyLm9uKFxuICAgICAgICAnY2hhbmdlJyxcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGNvbXBvbmVudCBpbm5lciBzdGF0ZVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHN0YXRlXG4gICAgY29uc3Qge1xuICAgICAgcmFuZ2U6IHsgbWluLCBtYXggfSxcbiAgICAgIHN0YXJ0LFxuICAgIH0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGRpc2FibGVkID0gbWluID09PSBtYXg7XG4gICAgY29uc3QgcmFuZ2UgPSBkaXNhYmxlZCA/IHsgbWluLCBtYXg6IG1heCArIDAuMDAwMSB9IDogeyBtaW4sIG1heCB9O1xuXG4gICAgdGhpcy5zbGlkZXIudXBkYXRlT3B0aW9ucyh7IGRpc2FibGVkLCByYW5nZSwgc3RhcnQgfSk7XG4gIH07XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZXM6IHN0cmluZ1tdIHwgbnVtYmVyW10pID0+IHtcbiAgICB0aGlzLnN0YXRlLnJlZmluZSh2YWx1ZXMpO1xuICB9O1xuXG4gIHB1YmxpYyBmb3JtYXRUb29sdGlwID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9GaXhlZChwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNSYW5nZVNsaWRlciB9IGZyb20gJy4vcmFuZ2Utc2xpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNSYW5nZVNsaWRlcl0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUmFuZ2VTbGlkZXJdLFxuICBleHBvcnRzOiBbTmdBaXNSYW5nZVNsaWRlcl0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RSZWZpbmVtZW50TGlzdCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gIGNhblJlZmluZTogYm9vbGVhbjtcbiAgY2FuVG9nZ2xlU2hvd01vcmU6IGJvb2xlYW47XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGlzU2hvd2luZ01vcmU6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB0b2dnbGVTaG93TW9yZTogRnVuY3Rpb247XG4gIHNlYXJjaEZvckl0ZW1zOiBGdW5jdGlvbjtcbiAgaXNGb3JtU2VhcmNoOiBib29sZWFuO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJlZmluZW1lbnQtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJzZWFyY2hhYmxlXCJcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWFyY2hCb3gnKVwiXG4gICAgICA+XG4gICAgICAgIDxhaXMtZmFjZXRzLXNlYXJjaFxuICAgICAgICAgIFtzZWFyY2hdPVwic3RhdGUuc2VhcmNoRm9ySXRlbXNcIlxuICAgICAgICAgIFtzZWFyY2hQbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICAgID5cbiAgICAgICAgPC9haXMtZmFjZXRzLXNlYXJjaD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdjaGVja2JveCcpXCJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+XG4gICAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cImhpZ2hsaWdodGVkXCIgW2hpdF09XCJpdGVtXCI+PC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJzaG93TW9yZUxpbWl0ICYmIHN0YXRlLmNhblRvZ2dsZVNob3dNb3JlXCJcbiAgICAgICAgKGNsaWNrKT1cInN0YXRlLnRvZ2dsZVNob3dNb3JlKClcIlxuICAgICAgPlxuICAgICAgICB7e3N0YXRlLmlzU2hvd2luZ01vcmUgPyBzaG93TGVzc0xhYmVsIDogc2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSZWZpbmVtZW50TGlzdCBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TGVzc0xhYmVsOiBzdHJpbmcgPSAnU2hvdyBsZXNzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hhYmxlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VhcmNoIGhlcmUuLi4nO1xuXG4gIC8vIGNvbm5lY3RvcnMgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcGVyYXRvcjogJ29yJyB8ICdhbmQnID0gJ29yJztcbiAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGltaXQ6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeTogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gICAgY2FuUmVmaW5lOiBmYWxzZSxcbiAgICBjYW5Ub2dnbGVTaG93TW9yZTogZmFsc2UsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGlzU2hvd2luZ01vcmU6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgdG9nZ2xlU2hvd01vcmU6IG5vb3AsXG4gICAgc2VhcmNoRm9ySXRlbXM6IG5vb3AsXG4gICAgaXNGb3JtU2VhcmNoOiBmYWxzZSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSZWZpbmVtZW50TGlzdCcpO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFJlZmluZW1lbnRMaXN0LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIHNob3dNb3JlTGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5zaG93TW9yZUxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICAgIGVzY2FwZUZhY2V0VmFsdWVzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoXG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQsXG4gICAgaXRlbTogeyBpc1JlZmluZWQ6IGJvb2xlYW47IHZhbHVlOiBzdHJpbmcgfVxuICApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuY2FuUmVmaW5lKSB7XG4gICAgICAvLyB1cGRhdGUgVUkgZGlyZWN0bHksIGl0IHdpbGwgdXBkYXRlIHRoZSBjaGVja2JveCBzdGF0ZVxuICAgICAgaXRlbS5pc1JlZmluZWQgPSAhaXRlbS5pc1JlZmluZWQ7XG5cbiAgICAgIC8vIHJlZmluZSB0aHJvdWdoIEFsZ29saWEgQVBJXG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJlbSB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWZhY2V0cy1zZWFyY2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcpXCJcbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiXG4gICAgICAgICAgYXV0b2NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3tzZWFyY2hQbGFjZWhvbGRlcn19XCJcbiAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXQgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3N1Ym1pdEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQwIDQwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMTBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjYuODA0IDI5LjAxYy0yLjgzMiAyLjM0LTYuNDY1IDMuNzQ2LTEwLjQyNiAzLjc0NkM3LjMzMyAzMi43NTYgMCAyNS40MjQgMCAxNi4zNzggMCA3LjMzMyA3LjMzMyAwIDE2LjM3OCAwYzkuMDQ2IDAgMTYuMzc4IDcuMzMzIDE2LjM3OCAxNi4zNzggMCAzLjk2LTEuNDA2IDcuNTk0LTMuNzQ2IDEwLjQyNmwxMC41MzQgMTAuNTM0Yy42MDcuNjA3LjYxIDEuNTktLjAwNCAyLjIwMi0uNjEuNjEtMS41OTcuNjEtMi4yMDIuMDA0TDI2LjgwNCAyOS4wMXptLTEwLjQyNi42MjdjNy4zMjMgMCAxMy4yNi01LjkzNiAxMy4yNi0xMy4yNiAwLTcuMzItNS45MzctMTMuMjU3LTEzLjI2LTEzLjI1N0M5LjA1NiAzLjEyIDMuMTIgOS4wNTYgMy4xMiAxNi4zNzhjMCA3LjMyMyA1LjkzNiAxMy4yNiAxMy4yNTggMTMuMjZ6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgICB0eXBlPVwicmVzZXRcIlxuICAgICAgICAgIHRpdGxlPVwiQ2xlYXIgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIGhpZGRlblxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3Jlc2V0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgd2lkdGg9XCIxMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04LjExNCAxMEwuOTQ0IDIuODMgMCAxLjg4NSAxLjg4NiAwbC45NDMuOTQzTDEwIDguMTEzbDcuMTctNy4xNy45NDQtLjk0M0wyMCAxLjg4NmwtLjk0My45NDMtNy4xNyA3LjE3IDcuMTcgNy4xNy45NDMuOTQ0TDE4LjExNCAyMGwtLjk0My0uOTQzLTcuMTctNy4xNy03LjE3IDcuMTctLjk0NC45NDNMMCAxOC4xMTRsLjk0My0uOTQzTDguMTEzIDEwelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzRmFjZXRzU2VhcmNoIHtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2g6IEZ1bmN0aW9uO1xuXG4gIHB1YmxpYyBjeCA9IGJlbSgnU2VhcmNoQm94Jyk7XG5cbiAgcHVibGljIHNlYXJjaFF1ZXJ5ID0gJyc7XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWFyY2hRdWVyeSA9IHZhbHVlO1xuICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoUXVlcnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuLi9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0IH0gZnJvbSAnLi9yZWZpbmVtZW50LWxpc3QnO1xuaW1wb3J0IHsgTmdBaXNGYWNldHNTZWFyY2ggfSBmcm9tICcuL2ZhY2V0cy1zZWFyY2gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JlZmluZW1lbnRMaXN0LCBOZ0Fpc0ZhY2V0c1NlYXJjaF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUmVmaW5lbWVudExpc3RdLFxuICBleHBvcnRzOiBbTmdBaXNSZWZpbmVtZW50TGlzdF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5nQWlzSGlnaGxpZ2h0TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSZWZpbmVtZW50TGlzdE1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFNlYXJjaEJveCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1zZWFyY2gtYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnKVwiXG4gICAgICAgICAgYXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuICAgICAgICAgIGF1dG9jb3JyZWN0PVwib2ZmXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgICAgcm9sZT1cInRleHRib3hcIlxuICAgICAgICAgIHNwZWxsY2hlY2s9XCJmYWxzZVwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJzdGF0ZS5xdWVyeVwiXG4gICAgICAgICAgKGlucHV0KT1cImhhbmRsZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgKGZvY3VzKT1cImZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICNzZWFyY2hCb3hcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3N1Ym1pdFRpdGxlfX1cIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjeCgnc3VibWl0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAgNDBcIlxuICAgICAgICAgICAgd2lkdGg9XCI0MFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCI0MFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0yNi44MDQgMjkuMDFjLTIuODMyIDIuMzQtNi40NjUgMy43NDYtMTAuNDI2IDMuNzQ2QzcuMzMzIDMyLjc1NiAwIDI1LjQyNCAwIDE2LjM3OCAwIDcuMzMzIDcuMzMzIDAgMTYuMzc4IDBjOS4wNDYgMCAxNi4zNzggNy4zMzMgMTYuMzc4IDE2LjM3OCAwIDMuOTYtMS40MDYgNy41OTQtMy43NDYgMTAuNDI2bDEwLjUzNCAxMC41MzRjLjYwNy42MDcuNjEgMS41OS0uMDA0IDIuMjAyLS42MS42MS0xLjU5Ny42MS0yLjIwMi4wMDRMMjYuODA0IDI5LjAxem0tMTAuNDI2LjYyN2M3LjMyMyAwIDEzLjI2LTUuOTM2IDEzLjI2LTEzLjI2IDAtNy4zMi01LjkzNy0xMy4yNTctMTMuMjYtMTMuMjU3QzkuMDU2IDMuMTIgMy4xMiA5LjA1NiAzLjEyIDE2LjM3OGMwIDcuMzIzIDUuOTM2IDEzLjI2IDEzLjI1OCAxMy4yNnpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAgIHR5cGU9XCJyZXNldFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3Jlc2V0VGl0bGV9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVJlc2V0KCRldmVudClcIlxuICAgICAgICAgIFtoaWRkZW5dPVwiIXN0YXRlLnF1ZXJ5IHx8IChzdGF0ZS5xdWVyeSAmJiAhc3RhdGUucXVlcnkudHJpbSgpKVwiPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdyZXNldEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xMTQgMTBMLjk0NCAyLjgzIDAgMS44ODUgMS44ODYgMGwuOTQzLjk0M0wxMCA4LjExM2w3LjE3LTcuMTcuOTQ0LS45NDNMMjAgMS44ODZsLS45NDMuOTQzLTcuMTcgNy4xNyA3LjE3IDcuMTcuOTQzLjk0NEwxOC4xMTQgMjBsLS45NDMtLjk0My03LjE3LTcuMTctNy4xNyA3LjE3LS45NDQuOTQzTDAgMTguMTE0bC45NDMtLjk0M0w4LjExMyAxMHpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NlYXJjaEJveCBleHRlbmRzIEJhc2VXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoQm94Jykgc2VhcmNoQm94OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2gnO1xuICBASW5wdXQoKSBwdWJsaWMgc3VibWl0VGl0bGU6IHN0cmluZyA9ICdTdWJtaXQnO1xuICBASW5wdXQoKSBwdWJsaWMgcmVzZXRUaXRsZTogc3RyaW5nID0gJ1Jlc2V0JztcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEFzWW91VHlwZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvZm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBPdXRwdXQgZXZlbnRzXG4gIC8vIGZvcm1cbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIGlucHV0XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIHF1ZXJ5OiAnJyxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU2VhcmNoQm94Jyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFNlYXJjaEJveCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9mb2N1cykge1xuICAgICAgdGhpcy5zZWFyY2hCb3gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQocXVlcnkpO1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZVN1Ym1pdChldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIHNlbmQgc3VibWl0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KGV2ZW50KTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZSh0aGlzLnN0YXRlLnF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlUmVzZXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvLyBzZW5kIHJlc2V0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnJlc2V0LmVtaXQoZXZlbnQpO1xuXG4gICAgLy8gcmVzZXQgc2VhcmNoXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNTZWFyY2hCb3ggfSBmcm9tICcuL3NlYXJjaC1ib3gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1NlYXJjaEJveF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzU2VhcmNoQm94XSxcbiAgZXhwb3J0czogW05nQWlzU2VhcmNoQm94XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU2VhcmNoQm94TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFNvcnRCeVNlbGVjdG9yIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXNvcnQtYnknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWxlY3QnKVwiXG4gICAgICAgIChjaGFuZ2UpPVwic3RhdGUucmVmaW5lKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnb3B0aW9uJylcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLm9wdGlvbnNcIlxuICAgICAgICAgIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXRlbS52YWx1ZSA9PT0gc3RhdGUuY3VycmVudFJlZmluZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTb3J0QnkgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IHtcbiAgICBjdXJyZW50UmVmaW5lbWVudDogc3RyaW5nIHwgbnVsbDtcbiAgICBvcHRpb25zOiB7fVtdO1xuICAgIHJlZmluZTogRnVuY3Rpb247XG4gIH0gPSB7XG4gICAgY3VycmVudFJlZmluZW1lbnQ6IG51bGwsXG4gICAgb3B0aW9uczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1NvcnRCeScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTb3J0QnlTZWxlY3RvciwgeyBpbmRpY2VzOiB0aGlzLml0ZW1zIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1NvcnRCeSB9IGZyb20gJy4vc29ydC1ieSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzU29ydEJ5XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNTb3J0QnldLFxuICBleHBvcnRzOiBbTmdBaXNTb3J0QnldLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTb3J0QnlNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhclJhdGluZyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJhdGluZ01lbnVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaGFzTm9SZXN1bHRzOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYXRpbmctbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxzdmcgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XG4gICAgICAgIDxzeW1ib2xcbiAgICAgICAgICBpZD1cImFpcy1TdGFyUmF0aW5nLXN0YXJTeW1ib2xcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgLjI4OGwyLjgzMyA4LjcxOGg5LjE2N2wtNy40MTcgNS4zODkgMi44MzMgOC43MTgtNy40MTYtNS4zODgtNy40MTcgNS4zODggMi44MzMtOC43MTgtNy40MTYtNS4zODloOS4xNjd6XCIvPlxuICAgICAgICA8L3N5bWJvbD5cbiAgICAgICAgPHN5bWJvbFxuICAgICAgICAgIGlkPVwiYWlzLVN0YXJSYXRpbmctc3RhckVtcHR5U3ltYm9sXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgID5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDYuNzZsMS4zNzkgNC4yNDZoNC40NjVsLTMuNjEyIDIuNjI1IDEuMzc5IDQuMjQ2LTMuNjExLTIuNjI1LTMuNjEyIDIuNjI1IDEuMzc5LTQuMjQ2LTMuNjEyLTIuNjI1aDQuNDY1bDEuMzgtNC4yNDZ6bTAtNi40NzJsLTIuODMzIDguNzE4aC05LjE2N2w3LjQxNiA1LjM4OS0yLjgzMyA4LjcxOCA3LjQxNy01LjM4OCA3LjQxNiA1LjM4OC0yLjgzMy04LjcxOCA3LjQxNy01LjM4OWgtOS4xNjdsLTIuODMzLTguNzE4elwiLz5cbiAgICAgICAgPC9zeW1ib2w+XG4gICAgICA8L3N2Zz5cblxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cInt7c3RhdGUuY3JlYXRlVVJMKGl0ZW0udmFsdWUpfX1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHN0YXIgb2YgaXRlbS5zdGFyc1wiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdGFySWNvbicpXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHVzZVxuICAgICAgICAgICAgICAgICpuZ0lmPVwic3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyU3ltYm9sXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L3VzZT5cblxuICAgICAgICAgICAgICA8dXNlXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhc3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyRW1wdHlTeW1ib2xcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvdXNlPlxuICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7YW5kVXBMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYXRpbmdNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmRVcExhYmVsOiBzdHJpbmcgPSAnJiBVcCc7XG5cbiAgLy8gY29ubmVjdG9ycyBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciA9IDU7XG5cbiAgcHVibGljIHN0YXRlOiBSYXRpbmdNZW51U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGhhc05vUmVzdWx0czogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYXRpbmdNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFN0YXJSYXRpbmcsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUmF0aW5nTWVudSB9IGZyb20gJy4vcmF0aW5nLW1lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JhdGluZ01lbnVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1JhdGluZ01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNSYXRpbmdNZW51XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmF0aW5nTWVudU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuXG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXN0YXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFwiPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2NsYXNzXT1cImN4KCd0ZXh0JylcIj5cbiAgICAgICAge3tzdGF0ZS5uYkhpdHN9fSByZXN1bHRzIGZvdW5kIGluIHt7c3RhdGUucHJvY2Vzc2luZ1RpbWVNU319bXMuXG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU3RhdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBhbnk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhpdFBlclBhZ2U6IDAsXG4gICAgbmJIaXRzOiAwLFxuICAgIG5iUGFnZXM6IDAsXG4gICAgcGFnZTogMCxcbiAgICBwcm9jZXNzaW5nVGltZU1TOiAwLFxuICAgIHF1ZXJ5OiAnJyxcbiAgfTtcblxuICBnZXQgdGVtcGxhdGVDb250ZXh0KCkge1xuICAgIHJldHVybiB7IHN0YXRlOiB0aGlzLnN0YXRlIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTdGF0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTdGF0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1N0YXRzIH0gZnJvbSAnLi9zdGF0cyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzU3RhdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1N0YXRzXSxcbiAgZXhwb3J0czogW05nQWlzU3RhdHNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTdGF0c01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RUb2dnbGUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBUb2dnbGVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdmFsdWU6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNvdW50PzogbnVtYmVyO1xuICAgIGlzUmVmaW5lZD86IGJvb2xlYW47XG4gIH07XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJylcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2hlY2tib3gnKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwie3tzdGF0ZS52YWx1ZS5uYW1lfX1cIlxuICAgICAgICAgICAgICBbY2hlY2tlZF09XCJzdGF0ZS52YWx1ZS5pc1JlZmluZWRcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbFRleHQnKVwiPlxuICAgICAgICAgICAgICB7e2xhYmVsIHx8IHN0YXRlLnZhbHVlLm5hbWV9fVxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e3N0YXRlLnZhbHVlLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzVG9nZ2xlIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB2YWx1ZXM6IHsgb24/OiBib29sZWFuOyBvZmY/OiBib29sZWFuIH0gPSB7IG9uOiB0cnVlLCBvZmY6IHVuZGVmaW5lZCB9O1xuXG4gIHB1YmxpYyBzdGF0ZTogVG9nZ2xlU3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB2YWx1ZToge30sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignVG9nZ2xlUmVmaW5lbWVudCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RUb2dnbGUsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHRoaXMuc3RhdGUudmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNUb2dnbGUgfSBmcm9tICcuL3RvZ2dsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzVG9nZ2xlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNUb2dnbGVdLFxuICBleHBvcnRzOiBbTmdBaXNUb2dnbGVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNUb2dnbGVNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdCwgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0UmFuZ2UgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljUmFuZ2VTdGF0ZSA9IHtcbiAgcmFuZ2U6IHsgbWluPzogbnVtYmVyOyBtYXg/OiBudW1iZXIgfTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgc3RhcnQ6IG51bWJlcltdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIlxuICAgICAgICBub3ZhbGlkYXRlXG4gICAgICA+XG4gICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2N1cnJlbmN5JylcIj57e2N1cnJlbmN5fX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2lucHV0JywgJ21pbicpXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW21pbl09XCJzdGF0ZS5yYW5nZS5taW5cIlxuICAgICAgICAgICAgW21heF09XCJzdGF0ZS5yYW5nZS5tYXhcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInN0YXRlLnJhbmdlLm1pblwiXG4gICAgICAgICAgICBbdmFsdWVdPVwibWluSW5wdXRWYWx1ZVwiXG4gICAgICAgICAgICBbc3RlcF09XCJzdGVwXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiaGFuZGxlQ2hhbmdlKCRldmVudCwgJ21pbicpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnc2VwYXJhdG9yJylcIj57e3NlcGFyYXRvcn19PC9zcGFuPlxuXG4gICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2N1cnJlbmN5JylcIj57e2N1cnJlbmN5fX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2lucHV0JywgJ21heCcpXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW21pbl09XCJzdGF0ZS5yYW5nZS5taW5cIlxuICAgICAgICAgICAgW21heF09XCJzdGF0ZS5yYW5nZS5tYXhcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInN0YXRlLnJhbmdlLm1heFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwibWF4SW5wdXRWYWx1ZVwiXG4gICAgICAgICAgICBbc3RlcF09XCJzdGVwXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiaGFuZGxlQ2hhbmdlKCRldmVudCwgJ21heCcpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3N1Ym1pdCcpXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlU3VibWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAge3tzdWJtaXRMYWJlbH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlSW5wdXQgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGN1cnJlbmN5OiBzdHJpbmcgPSAnJCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3I6IHN0cmluZyA9ICd0byc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWJtaXRMYWJlbDogc3RyaW5nID0gJ0dvJztcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtaW4/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVjaXNpb246IG51bWJlciB8IHN0cmluZyA9IDI7XG5cbiAgLy8gaW5uZXIgc3RhdGVcbiAgcHVibGljIG1pbklucHV0VmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgPSAnJztcbiAgcHVibGljIG1heElucHV0VmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgPSAnJztcblxuICBnZXQgc3RlcCgpIHtcbiAgICBjb25zdCBwcmVjaXNpb24gPSBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSB8fCAyO1xuICAgIHJldHVybiAxIC8gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGU6IE51bWVyaWNSYW5nZVN0YXRlID0ge1xuICAgIHJhbmdlOiB7IG1pbjogdW5kZWZpbmVkLCBtYXg6IHVuZGVmaW5lZCB9LFxuICAgIHJlZmluZTogbm9vcCxcbiAgICBzdGFydDogWzAsIDBdLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1JhbmdlSW5wdXQnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0UmFuZ2UsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiBwYXJzZU51bWJlcklucHV0KHRoaXMubWF4KSxcbiAgICAgIG1pbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1pbiksXG4gICAgICBwcmVjaXNpb246IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UoZXZlbnQ6IGFueSwgdHlwZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZU51bWJlcklucHV0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21pbicpIHtcbiAgICAgIHRoaXMubWluSW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heElucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlU3VibWl0KGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoW3RoaXMubWluSW5wdXRWYWx1ZSwgdGhpcy5tYXhJbnB1dFZhbHVlXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXQgfSBmcm9tICcuL3JhbmdlLWlucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNSYW5nZUlucHV0XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNSYW5nZUlucHV0XSxcbiAgZXhwb3J0czogW05nQWlzUmFuZ2VJbnB1dF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGVhZGVyXCIgY2xhc3M9XCJhaXMtUGFuZWwtaGVhZGVyXCI+XG4gICAgICAgIHt7aGVhZGVyfX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsLWJvZHlcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cImFpcy1QYW5lbC1mb290ZXJcIj5cbiAgICAgICAge3tmb290ZXJ9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFuZWwge1xuICBASW5wdXQoKSBwdWJsaWMgaGVhZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZm9vdGVyPzogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcbmV4cG9ydCB7IE5nQWlzUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNQYW5lbF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUGFuZWxdLFxuICBleHBvcnRzOiBbTmdBaXNQYW5lbF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1BhbmVsTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIFRlc3RhYmlsaXR5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdENvbmZpZ3VyZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHtcbiAgTmdBaXNJbnN0YW50U2VhcmNoLFxuICBTZWFyY2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNvbmZpZ3VyZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDb25maWd1cmUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgcHJpdmF0ZSBpbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnM6IFNlYXJjaFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47IC8vIFNlYXJjaFBhcmFtZXRlcnMgKEkgZG9uJ3Qga25vdyBob3cgdG8gZ2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHR5cGUpXG5cbiAgcHVibGljIHN0YXRlOiB7IHJlZmluZTogRnVuY3Rpb24gfSA9IHtcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ29uZmlndXJlJyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2VhcmNoUGFyYW1ldGVycyh2YWx1ZXM6IFNlYXJjaFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyA9IHZhbHVlcztcbiAgICBpZiAoIXRoaXMuZGlmZmVyICYmIHZhbHVlcykge1xuICAgICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZXMpLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q29uZmlndXJlLCB7XG4gICAgICBzZWFyY2hQYXJhbWV0ZXJzOiB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzQ29uZmlndXJlIH0gZnJvbSAnLi9jb25maWd1cmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0NvbmZpZ3VyZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQ29uZmlndXJlXSxcbiAgZXhwb3J0czogW05nQWlzQ29uZmlndXJlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ29uZmlndXJlTW9kdWxlIHt9XG4iLCJpbXBvcnQgKiBhcyBhbGdvbGlhc2VhcmNoUHJveHkgZnJvbSAnYWxnb2xpYXNlYXJjaC9pbmRleCc7XG5pbXBvcnQgKiBhcyBlbmNvZGVQcm94eSBmcm9tICdxdWVyeXN0cmluZy1lczMvZW5jb2RlJztcblxuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4vdmVyc2lvbic7XG5cbi8vIEFPVCArIFJvbGx1cCB3b3JrYXJvdW5kXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvMTI2NyNpc3N1ZWNvbW1lbnQtMjk2Mzk1NzM0XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhc2VhcmNoUHJveHkuZGVmYXVsdCB8fCBhbGdvbGlhc2VhcmNoUHJveHk7XG5jb25zdCBlbmNvZGUgPSBlbmNvZGVQcm94eS5kZWZhdWx0IHx8IGVuY29kZVByb3h5O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1NSQWxnb2xpYUNsaWVudCh7XG4gIGh0dHBDbGllbnQsXG4gIEh0dHBIZWFkZXJzLFxuICB0cmFuc2ZlclN0YXRlLFxuICBtYWtlU3RhdGVLZXksXG59KSB7XG4gIGNvbnNvbGUud2FybihcbiAgICAnYGNyZWF0ZVNTUkFsZ29saWFDbGllbnRgIGlzIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYGNyZWF0ZVNTUlNlYXJjaENsaWVudGAgdG8gYmUgcGx1Z2dlZCB0byBgc2VhcmNoQ2xpZW50YC4nXG4gICk7XG5cbiAgcmV0dXJuIChfLCBhcHBJZCwgYXBpS2V5KSA9PlxuICAgIGNyZWF0ZVNTUlNlYXJjaENsaWVudCh7XG4gICAgICBhcHBJZCxcbiAgICAgIGFwaUtleSxcbiAgICAgIGh0dHBDbGllbnQsXG4gICAgICBIdHRwSGVhZGVycyxcbiAgICAgIHRyYW5zZmVyU3RhdGUsXG4gICAgICBtYWtlU3RhdGVLZXksXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTU1JTZWFyY2hDbGllbnQoe1xuICBhcHBJZCxcbiAgYXBpS2V5LFxuICBodHRwQ2xpZW50LFxuICBIdHRwSGVhZGVycyxcbiAgdHJhbnNmZXJTdGF0ZSxcbiAgbWFrZVN0YXRlS2V5LFxufSkge1xuICBjb25zdCBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKGFwcElkLCBhcGlLZXksIHt9KTtcbiAgY2xpZW50LmFkZEFsZ29saWFBZ2VudChgYW5ndWxhci1pbnN0YW50c2VhcmNoICR7VkVSU0lPTn1gKTtcblxuICBjbGllbnQuX3JlcXVlc3QgPSAocmF3VXJsLCBvcHRzKSA9PiB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldChcbiAgICAgICdjb250ZW50LXR5cGUnLFxuICAgICAgb3B0cy5tZXRob2QgPT09ICdQT1NUJ1xuICAgICAgICA/ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgKTtcblxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnYWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIGNvbnN0IHVybCA9XG4gICAgICByYXdVcmwgKyAocmF3VXJsLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPycpICsgZW5jb2RlKG9wdHMuaGVhZGVycyk7XG5cbiAgICBjb25zdCB0cmFuc2ZlclN0YXRlS2V5ID0gbWFrZVN0YXRlS2V5KGBuZ2Fpcygke29wdHMuYm9keX0pYCk7XG5cbiAgICBpZiAodHJhbnNmZXJTdGF0ZS5oYXNLZXkodHJhbnNmZXJTdGF0ZUtleSkpIHtcbiAgICAgIGNvbnN0IHJlc3AgPSBKU09OLnBhcnNlKHRyYW5zZmVyU3RhdGUuZ2V0KHRyYW5zZmVyU3RhdGVLZXksIHt9KSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogcmVzcC5zdGF0dXMsXG4gICAgICAgIGJvZHk6IHJlc3AuYm9keSxcbiAgICAgICAgaGVhZGVyczogcmVzcC5oZWFkZXJzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGh0dHBDbGllbnRcbiAgICAgICAgLnJlcXVlc3Qob3B0cy5tZXRob2QsIHVybCwge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgYm9keTogb3B0cy5ib2R5LFxuICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgcmVzcCA9PiB7XG4gICAgICAgICAgICB0cmFuc2ZlclN0YXRlLnNldCh0cmFuc2ZlclN0YXRlS2V5LCBKU09OLnN0cmluZ2lmeShyZXNwKSk7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgIGJvZHk6IHJlc3AuYm9keSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcC5oZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwID0+XG4gICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBjbGllbnQ7XG59XG4iLCJpbXBvcnQgeyBBbGdvbGlhU2VhcmNoSGVscGVyIH0gZnJvbSAnYWxnb2xpYXNlYXJjaC1oZWxwZXInO1xuXG4vLyBUcmFuc2Zvcm1zIHVybCBxdWVyeSB0byBTZWFyY2hQYXJhbWV0ZXJzXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZXJ2ZXJSZXF1ZXN0KHJlcTogeyB1cmw6IHN0cmluZyB9IHwgdm9pZCkge1xuICBpZiAocmVxICYmIHJlcS51cmwgJiYgcmVxLnVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgY29uc3QgcXVlcnkgPSByZXEudXJsLnNwbGl0KCc/JylbMV07XG4gICAgcmV0dXJuIEFsZ29saWFTZWFyY2hIZWxwZXIuZ2V0Q29uZmlndXJhdGlvbkZyb21RdWVyeVN0cmluZyhxdWVyeSk7XG4gIH1cblxuICByZXR1cm4ge307XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBNb2R1bGVzXG5pbXBvcnQgeyBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNCcmVhZGNydW1iTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUgfSBmcm9tICcuL2NsZWFyLXJlZmluZW1lbnRzL2NsZWFyLXJlZmluZW1lbnRzLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIH0gZnJvbSAnLi9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVNb2R1bGUgfSBmcm9tICcuL2hpZXJhcmNoaWNhbC1tZW51L2hpZXJhcmNoaWNhbC1tZW51Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzSGl0c1BlclBhZ2VNb2R1bGUgfSBmcm9tICcuL2hpdHMtcGVyLXBhZ2UvaGl0cy1wZXItcGFnZS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNIaXRzUGVyUGFnZU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNIaXRzTW9kdWxlIH0gZnJvbSAnLi9oaXRzL2hpdHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSGl0c01vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUgfSBmcm9tICcuL2luZmluaXRlLWhpdHMvaW5maW5pdGUtaGl0cy5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSB9IGZyb20gJy4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2hNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTWVudU1vZHVsZSB9IGZyb20gJy4vbWVudS9tZW51Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc01lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTnVtZXJpY01lbnVNb2R1bGUgfSBmcm9tICcuL251bWVyaWMtbWVudS9udW1lcmljLW1lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzTnVtZXJpY01lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTnVtZXJpY1NlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzTnVtZXJpY1NlbGVjdG9yTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1BhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNQYWdpbmF0aW9uTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIH0gZnJvbSAnLi9yYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlIH0gZnJvbSAnLi9yZWZpbmVtZW50LWxpc3QvcmVmaW5lbWVudC1saXN0Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLWJveC9zZWFyY2gtYm94Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1NlYXJjaEJveE1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNTb3J0QnlNb2R1bGUgfSBmcm9tICcuL3NvcnQtYnkvc29ydC1ieS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNTb3J0QnlNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUmF0aW5nTWVudU1vZHVsZSB9IGZyb20gJy4vcmF0aW5nLW1lbnUvcmF0aW5nLW1lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUmF0aW5nTWVudU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNTdGF0c01vZHVsZSB9IGZyb20gJy4vc3RhdHMvc3RhdHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzU3RhdHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzVG9nZ2xlTW9kdWxlIH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1RvZ2dsZU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSGlnaGxpZ2h0TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUgfSBmcm9tICcuL3JhbmdlLWlucHV0L3JhbmdlLWlucHV0Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUGFuZWxNb2R1bGUgfSBmcm9tICcuL3BhbmVsL3BhbmVsLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1BhbmVsTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0NvbmZpZ3VyZU1vZHVsZSB9IGZyb20gJy4vY29uZmlndXJlL2NvbmZpZ3VyZS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNDb25maWd1cmVNb2R1bGUgfTtcblxuLy8gQ3VzdG9tIFNTUiBhbGdvbGlhc2VhcmNoQ2xpZW50XG5pbXBvcnQge1xuICBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50LFxuICBjcmVhdGVTU1JTZWFyY2hDbGllbnQsXG59IGZyb20gJy4vY3JlYXRlLXNzci1hbGdvbGlhLWNsaWVudCc7XG5leHBvcnQgeyBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50LCBjcmVhdGVTU1JTZWFyY2hDbGllbnQgfTtcblxuaW1wb3J0IHsgcGFyc2VTZXJ2ZXJSZXF1ZXN0IH0gZnJvbSAnLi9wYXJzZS1zZXJ2ZXItcmVxdWVzdCc7XG5leHBvcnQgeyBwYXJzZVNlcnZlclJlcXVlc3QgfTtcblxuLy8gQ3VzdG9tIHdpZGdldCB3aXRoIEJhc2VXaWRnZXQgY2xhc3NcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcbmV4cG9ydCB7IEJhc2VXaWRnZXQgfTtcblxuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuZXhwb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH07XG5cbmNvbnN0IE5HSVNfTU9EVUxFUyA9IFtcbiAgTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlLFxuICBOZ0Fpc0hpdHNNb2R1bGUsXG4gIE5nQWlzU2VhcmNoQm94TW9kdWxlLFxuICBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUsXG4gIE5nQWlzTWVudU1vZHVsZSxcbiAgTmdBaXNQYWdpbmF0aW9uTW9kdWxlLFxuICBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlLFxuICBOZ0Fpc0hpdHNQZXJQYWdlTW9kdWxlLFxuICBOZ0Fpc1NvcnRCeU1vZHVsZSxcbiAgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUsXG4gIE5nQWlzTnVtZXJpY01lbnVNb2R1bGUsXG4gIE5nQWlzU3RhdHNNb2R1bGUsXG4gIE5nQWlzVG9nZ2xlTW9kdWxlLFxuICBOZ0Fpc0luZmluaXRlSGl0c01vZHVsZSxcbiAgTmdBaXNDdXJyZW50UmVmaW5lbWVudHNNb2R1bGUsXG4gIE5nQWlzSGllcmFyY2hpY2FsTWVudU1vZHVsZSxcbiAgTmdBaXNSYXRpbmdNZW51TW9kdWxlLFxuICBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlLFxuICBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUsXG4gIE5nQWlzSGlnaGxpZ2h0TW9kdWxlLFxuICBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUsXG4gIE5nQWlzUGFuZWxNb2R1bGUsXG4gIE5nQWlzQ29uZmlndXJlTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogTkdJU19NT0RVTEVTLFxuICBpbXBvcnRzOiBbTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlLmZvclJvb3QoKV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUm9vdE1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoeyBpbXBvcnRzOiBOR0lTX01PRFVMRVMsIGV4cG9ydHM6IE5HSVNfTU9EVUxFUyB9KVxuZXhwb3J0IGNsYXNzIE5nQWlzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBOZ0Fpc1Jvb3RNb2R1bGUgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImFsZ29saWFzZWFyY2hQcm94eS5kZWZhdWx0Iiwibm9VaVNsaWRlci5jcmVhdGUiLCJhbGdvbGlhc2VhcmNoIiwiYWxnb2xpYXNlYXJjaFByb3h5IiwiZW5jb2RlUHJveHkuZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQW9CLFVBQWtCOztVQUM5QixFQUFFLEdBQUcsVUFBUyxPQUFnQixFQUFFLFVBQW1CO1FBQ3ZELElBQUksT0FBTyxFQUFFOztrQkFDTCxpQkFBaUIsR0FBRyxPQUFPLFVBQVUsSUFBSSxPQUFPLEVBQUU7O1lBR3hELElBQUksT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7O3NCQUNoRSxvQkFBb0IsR0FBRyxPQUFPLE9BQU8sRUFBRTtnQkFDN0MsT0FBTyxHQUFHLGlCQUFpQixJQUFJLG9CQUFvQixFQUFFLENBQUM7YUFDdkQ7O1lBR0QsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsT0FBTyxHQUFHLGlCQUFpQixLQUFLLFVBQVUsRUFBRSxDQUFDO2FBQzlDOztZQUdELE9BQU8saUJBQWlCLENBQUM7U0FDMUI7O1FBR0QsT0FBTyxPQUFPLFVBQVUsRUFBRSxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxFQUFFLENBQUM7Q0FDWDs7Ozs7QUFFRCwwQkFBaUMsS0FBdUI7SUFDdEQsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDaEU7Ozs7O0FBRUQsY0FBcUIsR0FBRyxJQUFXLEtBQVU7Ozs7O0FBRTdDLG9CQUEyQixDQUFDO0lBQzFCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9DOzs7Ozs7QUNsQ0Q7Ozs7SUFzQ0UsWUFBWSxVQUFrQjtRQUh2QixVQUFLLEdBQVksRUFBRSxDQUFDO1FBc0JwQixnQkFBVyxHQUFHLENBQ25CLEtBQVMsRUFDVCxnQkFBeUI7WUFFekIsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztpQkFDcEIsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQixDQUFDO1FBN0JBLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzNCOzs7Ozs7SUFFTSxZQUFZLENBQUMsU0FBb0IsRUFBRSxVQUFrQixFQUFFO1FBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUQ7Ozs7SUFFTSxRQUFROztRQUViLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRU0sV0FBVztRQUNoQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDtLQUNGOzs7Ozs7SUFnQk0sWUFBWSxDQUFDLElBQTZCOztZQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLFNBQVMsR0FBRyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1NBQzNEO1FBRUQsT0FBTyxTQUFTLENBQUM7S0FDbEI7OztnQ0EvQ0EsS0FBSzs7Ozs7Ozs7QUNoQ1IsTUFBYSxPQUFPLEdBQUcsT0FBTzs7Ozs7O0FDQTlCO01Bc0JNLGFBQWEsR0FBR0EsMkJBQTBCLElBQUksa0JBQWtCOzs7OztJQTZNcEUsWUFBeUMsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQVYzQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUdqRCxXQUFNLEdBQTZDLElBQUksWUFBWSxFQUcvRCxDQUFDO1FBMkRMLGFBQVEsR0FBRztZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFdBQVc7Z0JBQ3RELEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEtBQUs7YUFDL0MsQ0FBQyxDQUFDO1NBQ0osQ0FBQztLQTVENkQ7Ozs7SUFFeEQsUUFBUTtRQUNiLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0M7Ozs7SUFFTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7SUFFTSwyQkFBMkIsQ0FBQyxNQUEyQjs7UUFFNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7WUFBRSxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JDLGVBQWUsRUFBRSxtQkFBbUI7WUFDcEMsZ0JBQWdCLEVBQUUsb0JBQW9CO1NBQ3ZDLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFdBQVc7Z0JBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pFLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFdBQVc7Z0JBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2xFOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFOztrQkFDakQsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUUzRCxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVNLFNBQVMsQ0FBQyxNQUFjO1FBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7Ozs7O0lBRU0sWUFBWSxDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDs7OztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDdEM7OztZQXJFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7O1lBYXNELE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzs7cUJBWDlCLEtBQUs7MkJBQ0wsS0FBSztxQkFFTCxNQUFNOzs7Ozs7O0FDM05ULHFCQXNENkIsU0FBUSxVQUFVOzs7O0lBdUI3QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFSMUIsVUFBSyxHQUFvQjtZQUM5QixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0tBT0Q7Ozs7SUF2QkQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUNoRTs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsd0JBQ2pDLElBQUksSUFDUCxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFDcEIsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUMzQyxDQUFDLENBQUM7S0FDTDs7OztJQWVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFO1lBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBaUIsRUFBRSxJQUFvQjtRQUN4RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtLQUNGOzs7WUFuRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO2FBQ0Y7Ozs0Q0F5QkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7eUJBdEI3QyxLQUFLO3VCQUNMLEtBQUs7Ozs7Ozs7QUN6RFI7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLGVBQWUsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDbEMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCwyQkF1Qm1DLFNBQVEsVUFBVTs7OztJQWNuRCxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUZuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFmakIsZ0JBQVcsR0FBVyxtQkFBbUIsQ0FBQztRQUMxQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFFMUMsVUFBSyxHQUFHO1lBQ2IsY0FBYyxFQUFFLEtBQUs7WUFDckIsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0tBV0Q7Ozs7SUFURCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQzdEOzs7O0lBU00sUUFBUTs7UUFFYixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRTtZQUNqQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtTQUMxQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQWlCO1FBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7S0FDRjs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDthQUNGOzs7NENBZ0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7OzBCQWQ3QyxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs7Ozs7OztBQzFCUjs7O1lBS0MsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyQyxlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4Qjs7Ozs7Ozs2QkM4Q29DLFNBQVEsVUFBVTs7OztJQXlEckQsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFGckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLOztRQXpEakIscUJBQWdCLEdBQWlDLE9BQU8sQ0FBQztRQUN6RCwwQkFBcUIsR0FBVyxtQkFBbUIsQ0FBQzs7UUFJcEQseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXRDLGVBQVUsR0FHWCxFQUFFLENBQUM7UUFFRixVQUFLLEdBQTRCO1lBQ3RDLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUM7S0F3Q0Q7Ozs7SUF0Q0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUN0RTs7OztJQUVELElBQUksV0FBVzs7Y0FDUCxLQUFLLEdBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFVBQVU7Y0FDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztjQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7O1FBRzVCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFzQztnQkFBdEMsRUFBRSxJQUFJLEVBQUUsYUFBYSxPQUFpQixFQUFmLGtEQUFhOztrQkFDdEQsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQ3BCLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxLQUFLLGFBQWEsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FDMUQ7WUFDRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQUcsSUFBSSxFQUFFLGFBQWEsSUFBSyxVQUFVLEVBQUcsQ0FBQzthQUMxRDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNQLElBQUk7b0JBQ0osYUFBYTtvQkFDYixLQUFLLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQztvQkFDaEMsS0FBSyxFQUFFLGlCQUFHLElBQUksRUFBRSxhQUFhLElBQUssVUFBVSxFQUFHO2lCQUNoRCxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sR0FBRyxDQUFDO1NBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNSOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2xEOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsMkJBQTJCLEVBQUU7WUFDN0MsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1NBQ2hELENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQWlCLEVBQUUsVUFBYztRQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0I7Ozs7O0lBRU0sbUJBQW1CLENBQUMsS0FBaUI7UUFDMUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDNUI7OztZQXpIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7YUFDRjs7OzRDQTJESSxNQUFNLFNBQUMsVUFBVSxDQUFDLE1BQU0sa0JBQWtCLENBQUM7OzsrQkF4RDdDLEtBQUs7b0NBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUdMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzs7Ozs7O0FDakVSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDbEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsMkJBZ0NtQyxTQUFRLFVBQVU7Ozs7SUE0Qm5ELFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRm5CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQXhCakIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUczQixVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUd0QyxVQUFLLEdBQTBCO1lBQ3BDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7S0FpQkQ7Ozs7SUFmRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2hFOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtjQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2NBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3RCOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUU7WUFDekMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDthQUNGOzs7NENBOEJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7OzZCQTNCN0MsS0FBSzt5QkFHTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSzs7Ozs7OztBQzFDUjtJQVdBO1FBaUNrQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBS3pCLE9BQUUsR0FBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQWlDckM7Ozs7O0lBL0JRLFlBQVksQ0FBQyxJQUFJOztZQUNsQixTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLFNBQVMsR0FBRyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1NBQzNEO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkQsU0FBUyxHQUFHLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDekQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjs7Ozs7SUFFTSxZQUFZLENBQUMsSUFBSTtRQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUM5RCxNQUFNLEVBQ04sTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQ2pCLEVBQUUsQ0FBQztLQUNMOzs7OztJQUVNLE9BQU8sQ0FBQyxjQUFtQjtRQUNoQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQUVNLFdBQVcsQ0FBQyxLQUFpQixFQUFFLElBQTBCO1FBQzlELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7OztZQXRFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2FBQ0Y7OztrQkFFRSxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLOzs7Ozs7O0FDL0NSOzs7WUFNQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUseUJBQXlCLENBQUM7Z0JBQ2hFLGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUN4QyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDWEQsc0JBbUM4QixTQUFRLFVBQVU7Ozs7SUFpQjlDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUZkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQVgxQixVQUFLLEdBQXdCO1lBQ2xDLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0tBV0Q7Ozs7SUFURCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2hFOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDN0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7WUFsREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDthQUNGOzs7NENBbUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O29CQWpCN0MsS0FBSzs7Ozs7OztBQ3BDUjs7O1lBS0MsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUNoQyxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4Qjs7Ozs7Ozs7TUNWSyxHQUFHLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUNqQztJQUdBO1FBT1csWUFBTyxHQUFXLElBQUksQ0FBQztRQUVoQyxPQUFFLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBOEN2Qjs7OztJQTVDQyxJQUFJLE9BQU87UUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssYUFBYSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXO2tCQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7a0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFOztrQkFDekMsb0JBQW9CLEdBQUcsR0FBRyxDQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUN6QixJQUFJLENBQUMsU0FBUyxDQUNmOztZQUdELElBQ0Usb0JBQW9CLEtBQUssU0FBUztnQkFDbEMsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUM5QztnQkFDQSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1RDtTQUNGOztjQUVLLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLENBQUMsSUFBSSxDQUNWLDZCQUNFLElBQUksQ0FBQyxTQUNQLGtEQUFrRCxDQUNuRCxDQUFDO1lBRUYsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE9BQU8sUUFBUSxDQUFDO0tBQ2pCOzs7OztJQUVELGtCQUFrQixDQUFDLEtBQWE7UUFDOUIsT0FBTyxLQUFLO2FBQ1QsT0FBTyxDQUNOLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxXQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDdEQ7YUFDQSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDNUQ7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxvREFBb0Q7YUFDL0Q7Ozt3QkFFRSxLQUFLO2tCQUNMLEtBQUs7c0JBQ0wsS0FBSzs7Ozs7OztBQ1hSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5QixlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDekIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsZUFrQ3VCLFNBQVEsVUFBVTs7OztJQVN2QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFGUCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7O1FBSjFCLFVBQUssR0FBZ0MsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztRQVV0RSxnQkFBVyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUF5QjtZQUM3QyxJQUFJLGdCQUFnQjtnQkFBRSxPQUFPO1lBRTdCLElBQUksQ0FBQyxLQUFLLHFCQUNMLEtBQUssSUFDUixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDdEIsSUFBSSxFQUNGLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO3NCQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7c0JBQy9CLEtBQUssQ0FBQyxJQUFJLEdBQ2pCLENBQUM7U0FDSCxDQUFDO1FBZEEsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RDs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDthQUNGOzs7NENBV0ksTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7dUJBVDdDLFlBQVksU0FBQyxXQUFXOzZCQUd4QixLQUFLOzs7Ozs7O0FDdENSOzs7WUFNQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUN6QixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDO2FBQzlDOzs7Ozs7O0FDWEQsdUJBNEMrQixTQUFRLFVBQVU7Ozs7SUFvQi9DLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUZmLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSzs7UUFsQmpCLGtCQUFhLEdBQVcsbUJBQW1CLENBQUM7O1FBSXJELFVBQUssR0FLUjtZQUNGLElBQUksRUFBRSxFQUFFO1lBQ1IsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFlRixnQkFBVyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUF5QjtZQUM3QyxJQUFJLGdCQUFnQjtnQkFBRSxPQUFPO1lBRTdCLElBQUksQ0FBQyxLQUFLLHFCQUNMLEtBQUssSUFDUixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDdEIsSUFBSSxFQUNGLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO3NCQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7c0JBQy9CLEtBQUssQ0FBQyxJQUFJLEdBQ2pCLENBQUM7U0FDSCxDQUFDO1FBbkJBLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5RDs7Ozs7SUFFTSxRQUFRLENBQUMsS0FBaUI7UUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDdkI7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDthQUNGOzs7NENBc0JJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O3VCQXBCN0MsWUFBWSxTQUFDLFdBQVc7NEJBR3hCLEtBQUs7NkJBQ0wsS0FBSzs7Ozs7OztBQ2pEUjs7O1lBTUMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxlQUFlLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQzthQUM5Qzs7Ozs7OztBQ1hEOzs7O0lBWVMsT0FBTyxPQUFPO1FBQ25CLE9BQU87WUFDTCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztLQUNIOzs7WUFaRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2xDLGVBQWUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsZUFtRHVCLFNBQVEsVUFBVTs7OztJQTBDdkMsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRlAsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLOztRQTFDakIsa0JBQWEsR0FBVyxXQUFXLENBQUM7UUFDcEMsa0JBQWEsR0FBVyxXQUFXLENBQUM7UUFLcEMsVUFBSyxHQUFxQixFQUFFLENBQUM7UUFJdEMsVUFBSyxHQUFjO1lBQ3hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsU0FBUyxFQUFFLElBQUk7WUFDZixhQUFhLEVBQUUsS0FBSztZQUNwQixLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQztLQTJCRDs7OztJQXpCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2hFOzs7O0lBRUQsSUFBSSxhQUFhOztZQUNYLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxTQUFTLEdBQUcsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztTQUMvRDtRQUVELE9BQU8sU0FBUyxDQUFDO0tBQ2xCOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtjQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2NBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3RCOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzdCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ25ELGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBaUIsRUFBRSxLQUFhO1FBQzFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7OztZQW5HRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUO2FBQ0Y7Ozs0Q0E0Q0ksTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7NEJBekM3QyxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSzt3QkFHTCxLQUFLO29CQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLOzs7Ozs7O0FDN0RSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUN6QixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsc0JBd0M4QixTQUFRLFVBQVU7Ozs7SUFtQjlDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUZkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQVoxQixVQUFLLEdBQStCO1lBQ3pDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7S0FXRDs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDaEU7Ozs7SUFTTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRTtZQUM5QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7Ozs7O0lBRU0sTUFBTSxDQUFDLEtBQWlCLEVBQUUsSUFBdUI7UUFDdEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0I7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7NENBcUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O3dCQW5CN0MsS0FBSztvQkFDTCxLQUFLOzs7Ozs7O0FDMUNSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2hDLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsMEJBaUNrQyxTQUFRLFVBQVU7Ozs7SUFnQmxELFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRmxCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQWZqQixhQUFRLEdBQXlDLEdBQUcsQ0FBQztRQU85RCxVQUFLLEdBQXlCO1lBQ25DLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7S0FPRDs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFO1lBQ3hDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7O1lBbERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7YUFDRjs7OzRDQWtCSSxNQUFNLFNBQUMsVUFBVSxDQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozt3QkFmN0MsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7Ozs7Ozs7QUNyQ1I7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDcEMsZUFBZSxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUMvQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7O01DVkssS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDckMscUJBd0c2QixTQUFRLFVBQVU7Ozs7SUE2RDdDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUZiLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSzs7UUE3RGpCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFlBQU8sR0FBb0IsQ0FBQyxDQUFDO1FBS3RDLFVBQUssR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO0tBaUREOzs7O0lBL0NELElBQUksS0FBSztjQUNELEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUs7O2NBRTNDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDM0QsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQ1A7O2NBRUssWUFBWSxHQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUTtjQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7Y0FDMUIsSUFBSSxDQUFDLE9BQU87UUFFbEIsSUFBSSxZQUFZLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTs7WUFFcEMsSUFBSSxPQUFPLEdBQUcsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxDQUFDO2FBQ25COztrQkFFSyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLENBQUM7O2tCQUMvQyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLENBQUM7WUFFckQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUN4RTtZQUVELElBQUksUUFBUSxHQUFHLE9BQU8sRUFBRTtnQkFDdEIsT0FBTyxLQUFLLENBQ1YsaUJBQWlCLEdBQUcsWUFBWSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsRUFDdkQsT0FBTyxDQUNSLENBQUM7YUFDSDtZQUVELE9BQU8sS0FBSyxDQUNWLGlCQUFpQixHQUFHLFlBQVksRUFDaEMsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FDckMsQ0FBQztTQUNIO1FBRUQsT0FBTyxVQUFVLENBQUM7S0FDbkI7Ozs7SUFTTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7Ozs7OztJQUVNLE1BQU0sQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDM0MsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUNFLElBQUksR0FBRyxDQUFDO1lBQ1IsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQ3JDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFDMUI7WUFDQSxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7O1lBMUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4RlQ7YUFDRjs7OzRDQStESSxNQUFNLFNBQUMsVUFBVSxDQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozt3QkE1RDdDLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFHTCxLQUFLOzs7Ozs7O0FDbEhSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMvQixlQUFlLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQsc0JBeUI4QixTQUFRLFVBQVU7Ozs7SUEyQjlDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUZkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSzs7UUF6QmpCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsYUFBUSxHQUFZLElBQUksQ0FBQztRQU16QixjQUFTLEdBQW9CLENBQUMsQ0FBQztRQUV4QyxVQUFLLEdBQXFCO1lBQy9CLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtZQUN6QixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZCxDQUFDO1FBNEJLLGdCQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZ0JBQXlCO1lBQ3BELElBQUksZ0JBQWdCLEVBQUU7OztzQkFFZCxNQUFNLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsU0FBUyxFQUFFLE1BQU07b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUk7d0JBQ3pCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQzFCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7cUJBQzNCO2lCQUNGO2dCQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtvQkFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7d0JBQ3BCLElBQUksRUFBRTs0QkFDSixPQUFPLEVBQUUsQ0FBQzs0QkFDVixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLElBQUk7NEJBQ2IsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7eUJBQ3JCO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtxQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO29CQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDNUM7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sR0FBR0MsTUFBaUIsQ0FDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQ2xDLE1BQU0sQ0FDUCxDQUFDOztnQkFHRixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUM5QyxRQUFRLEVBQ1IsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQzthQUNIOztZQUdELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztrQkFHYixFQUNKLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFDbkIsS0FBSyxHQUNOLEdBQUcsS0FBSzs7a0JBRUgsUUFBUSxHQUFHLEdBQUcsS0FBSyxHQUFHOztrQkFDdEIsS0FBSyxHQUFHLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtZQUVsRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2RCxDQUFDO1FBRUssaUJBQVksR0FBRyxDQUFDLE1BQTJCO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFFSyxrQkFBYSxHQUFHLENBQUMsS0FBYTtZQUNuQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDeEQsQ0FBQztLQTNFRDs7OztJQVhELElBQUksSUFBSTs7O2NBRUEsU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzlCLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7OztZQXJERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7R0FNVDthQUNGOzs7NENBNkJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7OzhCQTNCN0MsU0FBUyxTQUFDLGlCQUFpQjttQkFHM0IsS0FBSzt1QkFDTCxLQUFLO3dCQUdMLEtBQUs7a0JBQ0wsS0FBSztrQkFDTCxLQUFLO3dCQUNMLEtBQUs7Ozs7Ozs7QUNwQ1I7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEMsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCx5QkFrRWlDLFNBQVEsVUFBVTs7OztJQStCakQsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFGakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLOztRQS9CakIsa0JBQWEsR0FBVyxXQUFXLENBQUM7UUFDcEMsa0JBQWEsR0FBVyxXQUFXLENBQUM7UUFHcEMsc0JBQWlCLEdBQVcsZ0JBQWdCLENBQUM7UUFJN0MsYUFBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsVUFBSyxHQUFvQixFQUFFLENBQUM7UUFJckMsVUFBSyxHQUF3QjtZQUNsQyxTQUFTLEVBQUUsS0FBSztZQUNoQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUM7S0FXRDs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDaEU7Ozs7SUFTRCxJQUFJLEtBQUs7UUFDUCxPQUFPLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO2NBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Y0FDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDdEI7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNuRCxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7SUFFTSxNQUFNLENBQ1gsS0FBaUIsRUFDakIsSUFBMkM7UUFFM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztZQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7WUFHakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7OztZQXRIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDVDthQUNGOzs7NENBaUNJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7OzRCQTlCN0MsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBQ0wsS0FBSztnQ0FDTCxLQUFLO3dCQUdMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7cUJBQ0wsS0FBSzs7Ozs7OztBQy9FUjtJQUdBO1FBMkRTLE9BQUUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7S0FXekI7Ozs7O0lBVFEsWUFBWSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjs7Ozs7SUFFTSxZQUFZLENBQUMsS0FBSztRQUN2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDL0I7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRFQ7YUFDRjs7O2dDQUVFLEtBQUs7cUJBQ0wsS0FBSzs7Ozs7OztBQzVEUjs7O1lBT0MsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO2dCQUN0RCxlQUFlLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQzthQUM5Qzs7Ozs7OztBQ1pELG9CQTRFNEIsU0FBUSxVQUFVOzs7O0lBdUI1QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGWix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUF2QmpCLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLGVBQVUsR0FBVyxPQUFPLENBQUM7UUFDN0Isb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsY0FBUyxHQUFZLEtBQUssQ0FBQzs7O1FBSWpDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztRQUczQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3QixVQUFLLEdBQUc7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQU9BLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNyQzs7OztJQUVNLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RDO0tBQ0Y7Ozs7O0lBRU0sWUFBWSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBRU0sWUFBWSxDQUFDLEtBQWlCOztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztLQUNGOzs7OztJQUVNLFdBQVcsQ0FBQyxLQUFpQjs7UUFFbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCOzs7WUF6SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVEVDthQUNGOzs7NENBeUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O3dCQXZCN0MsU0FBUyxTQUFDLFdBQVc7MEJBQ3JCLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFJTCxNQUFNO29CQUNOLE1BQU07cUJBR04sTUFBTTtvQkFDTixNQUFNO21CQUNOLE1BQU07Ozs7Ozs7QUM1RlQ7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzlCLGVBQWUsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCxpQkEyQnlCLFNBQVEsVUFBVTs7OztJQWlCekMsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRlQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBWjFCLFVBQUssR0FJUjtZQUNGLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7S0FPRDs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO2FBQ0Y7Ozs0Q0FtQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7b0JBakI3QyxLQUFLOzs7Ozs7O0FDNUJSOzs7WUFLQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUMzQixlQUFlLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDVkQscUJBNkU2QixTQUFRLFVBQVU7Ozs7SUFtQjdDLFlBRVMsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUZiLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSzs7UUFuQmpCLGVBQVUsR0FBVyxNQUFNLENBQUM7UUFJNUIsUUFBRyxHQUFZLENBQUMsQ0FBQztRQUUxQixVQUFLLEdBQW9CO1lBQzlCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7S0FXRDs7OztJQVRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDaEU7Ozs7SUFTTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBaUIsRUFBRSxLQUFhO1FBQ2pELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUI7OztZQXRHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJEVDthQUNGOzs7NENBcUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O3lCQWxCN0MsS0FBSzt3QkFHTCxLQUFLO2tCQUNMLEtBQUs7Ozs7Ozs7QUNuRlI7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLGVBQWUsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDbEMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCxnQkEwQndCLFNBQVEsVUFBVTs7OztJQWdCeEMsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRlIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBZjFCLFVBQUssR0FBRztZQUNiLFVBQVUsRUFBRSxDQUFDO1lBQ2IsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFXQSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2pDOzs7O0lBVkQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzlCOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO2FBQ0Y7Ozs0Q0FrQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7dUJBaEI3QyxZQUFZLFNBQUMsV0FBVzs7Ozs7OztBQzNCM0I7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLGVBQWUsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCxpQkE0Q3lCLFNBQVEsVUFBVTs7OztJQWF6QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUZuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFWMUIsV0FBTSxHQUFvQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBRXZFLFVBQUssR0FBZ0I7WUFDMUIsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztLQU9EOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBaUI7UUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOzs7WUE1REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2FBQ0Y7Ozs0Q0FlSSxNQUFNLFNBQUMsVUFBVSxDQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozt3QkFaN0MsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7Ozs7Ozs7QUNoRFI7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQzNCLGVBQWUsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRCxxQkE4RDZCLFNBQVEsVUFBVTs7OztJQTJCN0MsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRmIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLOztRQTNCakIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBTTNCLGNBQVMsR0FBb0IsQ0FBQyxDQUFDOztRQUd4QyxrQkFBYSxHQUFxQixFQUFFLENBQUM7UUFDckMsa0JBQWEsR0FBcUIsRUFBRSxDQUFDO1FBT3JDLFVBQUssR0FBc0I7WUFDaEMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO1lBQ3pDLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNkLENBQUM7S0FPRDs7OztJQWhCRCxJQUFJLElBQUk7O2NBQ0EsU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBZU0sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzlCLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMvQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7Ozs7OztJQUVNLFlBQVksQ0FBQyxLQUFVLEVBQUUsSUFBWTs7Y0FDcEMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWxELElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDNUI7S0FDRjs7Ozs7SUFFTSxZQUFZLENBQUMsS0FBaUM7UUFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUM3RDs7O1lBM0dGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDVDthQUNGOzs7NENBNkJJLE1BQU0sU0FBQyxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O3VCQTFCN0MsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7d0JBR0wsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7Ozs7OztBQ3hFUjs7O1lBS0MsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsZUFBZSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4Qjs7Ozs7OztBQ1ZEOzs7WUFFQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDthQUNGOzs7cUJBRUUsS0FBSztxQkFDTCxLQUFLOzs7Ozs7O0FDdEJSOzs7WUFNQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUMxQixlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7O0FDWEQsb0JBc0I0QixTQUFRLFVBQVU7Ozs7O0lBUTVDLFlBQ1UsT0FBd0IsRUFFekIsbUJBQXdCO1FBRS9CLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpYLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBRXpCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBSztRQVAxQixVQUFLLEdBQXlCO1lBQ25DLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztLQVFEOzs7OztJQUVELElBQ0ksZ0JBQWdCLENBQUMsTUFBd0I7UUFDM0MsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNsRDtLQUNGOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtTQUNoRCxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbEI7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztrQkFDVCxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBQy9ELElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0Y7S0FDRjs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYjs7O1lBZkMsZUFBZTs0Q0EwQlosTUFBTSxTQUFDLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDOzs7K0JBTTdDLEtBQUs7Ozs7Ozs7QUN0Q1I7OztZQUtDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzlCLGVBQWUsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7QUNWRDs7O01BUU1DLGVBQWEsR0FBR0YsNkJBQTBCLElBQUlHLG9CQUFrQjs7TUFDaEUsTUFBTSxHQUFHQyxvQkFBbUIsSUFBSSxXQUFXOzs7OztBQUVqRCxnQ0FBdUMsRUFDckMsVUFBVSxFQUNWLFdBQVcsRUFDWCxhQUFhLEVBQ2IsWUFBWSxHQUNiO0lBQ0MsT0FBTyxDQUFDLElBQUksQ0FDViw2R0FBNkcsQ0FDOUcsQ0FBQztJQUVGLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sS0FDdEIscUJBQXFCLENBQUM7UUFDcEIsS0FBSztRQUNMLE1BQU07UUFDTixVQUFVO1FBQ1YsV0FBVztRQUNYLGFBQWE7UUFDYixZQUFZO0tBQ2IsQ0FBQyxDQUFDO0NBQ047Ozs7O0FBRUQsK0JBQXNDLEVBQ3BDLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxhQUFhLEVBQ2IsWUFBWSxHQUNiOztVQUNPLE1BQU0sR0FBR0YsZUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMseUJBQXlCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJOztZQUN6QixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQ25CLGNBQWMsRUFDZCxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU07Y0FDbEIsbUNBQW1DO2NBQ25DLGtCQUFrQixDQUN2QixDQUFDO1FBRUYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7O2NBRTlDLEdBQUcsR0FDUCxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7O2NBRTlELGdCQUFnQixHQUFHLFlBQVksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUU1RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs7a0JBQ3BDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsVUFBVTtpQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3pCLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxVQUFVO2FBQ3BCLENBQUM7aUJBQ0QsU0FBUyxDQUNSLElBQUk7Z0JBQ0YsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sQ0FBQztvQkFDTixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87aUJBQ3RCLENBQUMsQ0FBQzthQUNKLEVBQ0QsSUFBSSxJQUNGLE1BQU0sQ0FBQztnQkFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUNMLENBQUM7U0FDTCxDQUFDLENBQUM7S0FDSixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7Q0FDZjs7Ozs7O0FDaEdEOzs7OztBQUdBLDRCQUFtQyxHQUEyQjtJQUM1RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztjQUNyQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sbUJBQW1CLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkU7SUFFRCxPQUFPLEVBQUUsQ0FBQztDQUNYOzs7Ozs7QUNWRDtNQW1FTSxZQUFZLEdBQUc7SUFDbkIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtDQUNyQjtBQU1EOzs7WUFKQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzlDOztBQUlEOzs7O0lBQ1MsT0FBTyxPQUFPO1FBQ25CLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7S0FDdEM7OztZQUpGLFFBQVEsU0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRTs7Ozs7Ozs7OzsifQ==