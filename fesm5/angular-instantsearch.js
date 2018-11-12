import { Input, Component, Output, EventEmitter, Inject, PLATFORM_ID, forwardRef, NgModule, ContentChild, TemplateRef, ViewChild, KeyValueDiffers } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as algoliasearchProxy from 'algoliasearch/lite';
import algoliasearchProxy__default, {  } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';
import { __extends, __assign, __rest } from 'tslib';
import { connectBreadcrumb, connectClearAll, connectCurrentRefinedValues, connectHierarchicalMenu, connectHitsPerPage, connectHits, connectInfiniteHits, connectMenu, connectNumericRefinementList, connectNumericSelector, connectPagination, connectRange, connectRefinementList, connectSearchBox, connectSortBySelector, connectStarRating, connectStats, connectToggle, connectConfigure } from 'instantsearch.js/es/connectors';
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
    var cx = function (element, subElement) {
        if (element) {
            /** @type {?} */
            var scoppedWidgetName = "ais-" + widgetName + "-" + element;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === 'header' || element === 'body' || element === 'footer') {
                /** @type {?} */
                var nonScoppedWidgetName = "ais-" + element;
                return scoppedWidgetName + " " + nonScoppedWidgetName;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return scoppedWidgetName + "--" + subElement;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        // output `ais-Widget`
        return "ais-" + widgetName;
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
function noop() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var VERSION = "2.1.0";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var algoliasearch = algoliasearchProxy__default || algoliasearchProxy;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisBreadcrumb = /** @class */ (function (_super) {
    __extends(NgAisBreadcrumb, _super);
    function NgAisBreadcrumb(instantSearchParent) {
        var _this = _super.call(this, 'Breadcrumb') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisBreadcrumb.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisBreadcrumb.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.state.items.map(function (item, idx) { return (__assign({}, item, { separator: idx !== 0, isLast: idx === _this.state.items.length - 1 })); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisBreadcrumb.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisBreadcrumb.prototype.handleClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    };
    NgAisBreadcrumb.decorators = [
        { type: Component, args: [{
                    selector: 'ais-breadcrumb',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of items\"\n          [class]=\"cx('item', item.isLast ? 'selected' : undefined)\"\n          (click)=\"handleClick($event, item)\"\n        >\n          <span\n            *ngIf=\"item.separator\"\n            [class]=\"cx('separator')\"\n            aria-hidden=\"true\"\n          >\n            >\n          </span>\n          <a\n            [class]=\"cx('link')\"\n            href=\"{{state.createURL(item.value)}}\"\n            *ngIf=\"!item.isLast\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.name}}\n          </a>\n\n          <span *ngIf=\"item.isLast\">\n            {{item.name}}\n          </span>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisBreadcrumb.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisBreadcrumb.propDecorators = {
        attributes: [{ type: Input }],
        rootPath: [{ type: Input }]
    };
    return NgAisBreadcrumb;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisBreadcrumbModule = /** @class */ (function () {
    function NgAisBreadcrumbModule() {
    }
    NgAisBreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisBreadcrumb],
                    entryComponents: [NgAisBreadcrumb],
                    exports: [NgAisBreadcrumb],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisBreadcrumbModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisClearRefinements = /** @class */ (function (_super) {
    __extends(NgAisClearRefinements, _super);
    function NgAisClearRefinements(instantSearchParent) {
        var _this = _super.call(this, 'ClearRefinements') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.buttonLabel = 'Clear refinements';
        _this.clearsQuery = false;
        _this.excludeAttributes = [];
        _this.state = {
            hasRefinements: false,
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisClearRefinements.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.state.hasRefinements && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisClearRefinements.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisClearRefinements.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    };
    NgAisClearRefinements.decorators = [
        { type: Component, args: [{
                    selector: 'ais-clear-refinements',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n        (click)=\"handleClick($event)\"\n        [disabled]=\"!state.hasRefinements\"\n      >\n        {{buttonLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisClearRefinements.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisClearRefinements.propDecorators = {
        buttonLabel: [{ type: Input }],
        clearsQuery: [{ type: Input }],
        excludeAttributes: [{ type: Input }]
    };
    return NgAisClearRefinements;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisClearRefinementsModule = /** @class */ (function () {
    function NgAisClearRefinementsModule() {
    }
    NgAisClearRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisClearRefinements],
                    entryComponents: [NgAisClearRefinements],
                    exports: [NgAisClearRefinements],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisClearRefinementsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisCurrentRefinements = /** @class */ (function (_super) {
    __extends(NgAisCurrentRefinements, _super);
    function NgAisCurrentRefinements(instantSearchParent) {
        var _this = _super.call(this, 'CurrentRefinements') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.clearRefinements = 'after';
        _this.clearRefinementsLabel = 'Clear refinements';
        // connector options
        _this.onlyListedAttributes = false;
        _this.clearsQuery = false;
        _this.attributes = [];
        _this.state = {
            attributes: {},
            clearAllClick: noop,
            clearAllURL: noop,
            createURL: noop,
            refine: noop,
            refinements: [],
        };
        return _this;
    }
    Object.defineProperty(NgAisCurrentRefinements.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.refinements.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisCurrentRefinements.prototype, "refinements", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var items = typeof this.transformItems === 'function'
                ? this.transformItems(this.state.refinements)
                : this.state.refinements;
            // group refinements by category? (attributeName && type)
            return items.reduce(function (res, _a) {
                var type = _a.type, attributeName = _a.attributeName, refinement = __rest(_a, ["type", "attributeName"]);
                /** @type {?} */
                var match = res.find(function (r) { return r.attributeName === attributeName && r.type === type; });
                if (match) {
                    match.items.push(__assign({ type: type, attributeName: attributeName }, refinement));
                }
                else {
                    res.push({
                        type: type,
                        attributeName: attributeName,
                        label: capitalize(attributeName),
                        items: [__assign({ type: type, attributeName: attributeName }, refinement)],
                    });
                }
                return res;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisCurrentRefinements.prototype, "json", {
        get: /**
         * @return {?}
         */
        function () {
            return JSON.stringify(this.refinements, null, 4);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisCurrentRefinements.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} refinement
     * @return {?}
     */
    NgAisCurrentRefinements.prototype.handleClick = /**
     * @param {?} event
     * @param {?} refinement
     * @return {?}
     */
    function (event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisCurrentRefinements.prototype.handleClearAllClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.state.clearAllClick();
    };
    NgAisCurrentRefinements.decorators = [
        { type: Component, args: [{
                    selector: 'ais-current-refinements',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'before' || clearRefinements === true\">\n        {{clearRefinementsLabel}}\n      </button>\n\n      <ul\n        [class]=\"cx('list')\"\n        *ngFor=\"let refinement of refinements\"\n      >\n        <li [class]=\"cx('item')\">\n          <span [class]=\"cx('label')\">{{refinement.label}}:</span>\n\n          <span\n            [class]=\"cx('category')\"\n            *ngFor=\"let item of refinement.items\"\n          >\n            <span [class]=\"cx('categoryLabel')\">{{item.name}}</span>\n            <button [class]=\"cx('delete')\" (click)=\"handleClick($event, item)\">\u2715</button>\n          </span>\n        </li>\n      </ul>\n\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'after'\">\n        {{clearRefinementsLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisCurrentRefinements.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisCurrentRefinements.propDecorators = {
        clearRefinements: [{ type: Input }],
        clearRefinementsLabel: [{ type: Input }],
        transformItems: [{ type: Input }],
        onlyListedAttributes: [{ type: Input }],
        clearsQuery: [{ type: Input }],
        attributes: [{ type: Input }]
    };
    return NgAisCurrentRefinements;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisCurrentRefinementsModule = /** @class */ (function () {
    function NgAisCurrentRefinementsModule() {
    }
    NgAisCurrentRefinementsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisCurrentRefinements],
                    entryComponents: [NgAisCurrentRefinements],
                    exports: [NgAisCurrentRefinements],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisCurrentRefinementsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHierarchicalMenu = /** @class */ (function (_super) {
    __extends(NgAisHierarchicalMenu, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHierarchicalMenuModule = /** @class */ (function () {
    function NgAisHierarchicalMenuModule() {
    }
    NgAisHierarchicalMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
                    entryComponents: [NgAisHierarchicalMenu],
                    exports: [NgAisHierarchicalMenu],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisHierarchicalMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHitsPerPage = /** @class */ (function (_super) {
    __extends(NgAisHitsPerPage, _super);
    function NgAisHitsPerPage(instantSearchParent) {
        var _this = _super.call(this, 'HitsPerPage') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisHitsPerPage.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisHitsPerPage.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectHitsPerPage, { items: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisHitsPerPage.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hits-per-page',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.items\"\n          [value]=\"item.value\"\n          [selected]=\"item.isRefined\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisHitsPerPage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisHitsPerPage.propDecorators = {
        items: [{ type: Input }]
    };
    return NgAisHitsPerPage;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHitsPerPageModule = /** @class */ (function () {
    function NgAisHitsPerPageModule() {
    }
    NgAisHitsPerPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHitsPerPage],
                    entryComponents: [NgAisHitsPerPage],
                    exports: [NgAisHitsPerPage],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisHitsPerPageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var get = require('lodash/get');
var NgAisHighlight = /** @class */ (function () {
    function NgAisHighlight() {
        this.tagName = 'em';
        this.cx = bem('Highlight');
    }
    Object.defineProperty(NgAisHighlight.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.attribute === 'highlighted') {
                return this.hit.highlighted
                    ? this.replaceWithTagName(this.hit.highlighted)
                    : this.hit.label;
            }
            if (this.hit.hasOwnProperty('_highlightResult')) {
                /** @type {?} */
                var attributeHighlighted = get(this.hit._highlightResult, this.attribute);
                // check that the attributeHighlighted is a string
                if (attributeHighlighted !== undefined &&
                    typeof attributeHighlighted.value === 'string') {
                    return this.replaceWithTagName(attributeHighlighted.value);
                }
            }
            /** @type {?} */
            var fallback = get(this.hit, this.attribute);
            if (!fallback) {
                console.warn("Could not find attribute [" + this.attribute + "] into hit object, will display an empty string.");
                return '';
            }
            return fallback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgAisHighlight.prototype.replaceWithTagName = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value
            .replace(new RegExp('<em>', 'g'), "<" + this.tagName + " class=\"" + this.cx('highlighted') + "\">")
            .replace(new RegExp('</em>', 'g'), "</" + this.tagName + ">");
    };
    NgAisHighlight.decorators = [
        { type: Component, args: [{
                    selector: 'ais-highlight',
                    template: "<span [class]=\"cx()\" [innerHtml]=\"content\"></span>",
                },] },
    ];
    NgAisHighlight.propDecorators = {
        attribute: [{ type: Input }],
        hit: [{ type: Input }],
        tagName: [{ type: Input }]
    };
    return NgAisHighlight;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHighlightModule = /** @class */ (function () {
    function NgAisHighlightModule() {
    }
    NgAisHighlightModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHighlight],
                    entryComponents: [NgAisHighlight],
                    exports: [NgAisHighlight],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisHighlightModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHits = /** @class */ (function (_super) {
    __extends(NgAisHits, _super);
    function NgAisHits(instantSearchParent) {
        var _this = _super.call(this, 'Hits') || this;
        _this.instantSearchParent = instantSearchParent;
        // inner widget state returned from connector
        _this.state = { hits: [], results: {} };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: typeof _this.transformItems === 'function'
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectHits, { escapeHits: true });
        return _this;
    }
    NgAisHits.decorators = [
        { type: Component, args: [{
                    selector: 'ais-hits',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisHits.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisHits.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        transformItems: [{ type: Input }]
    };
    return NgAisHits;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisHitsModule = /** @class */ (function () {
    function NgAisHitsModule() {
    }
    NgAisHitsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisHits],
                    entryComponents: [NgAisHits],
                    exports: [NgAisHits],
                    imports: [CommonModule, NgAisHighlightModule],
                },] },
    ];
    return NgAisHitsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisInfiniteHits = /** @class */ (function (_super) {
    __extends(NgAisInfiniteHits, _super);
    function NgAisInfiniteHits(instantSearchParent) {
        var _this = _super.call(this, 'InfiniteHits') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more results';
        // inner widget state returned from connector
        _this.state = {
            hits: [],
            isLastPage: false,
            showMore: noop,
            results: {},
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: typeof _this.transformItems === 'function'
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectInfiniteHits, { escapeHits: true });
        return _this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisInfiniteHits.prototype.showMore = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.state.showMore();
    };
    NgAisInfiniteHits.decorators = [
        { type: Component, args: [{
                    selector: 'ais-infinite-hits',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n\n      <button\n        [class]=\"cx('showMore')\"\n        (click)=\"showMore($event)\"\n        [disabled]=\"state.isLastPage\"\n        *ngIf=\"!template\"\n      >\n        {{showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisInfiniteHits.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisInfiniteHits.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        showMoreLabel: [{ type: Input }],
        transformItems: [{ type: Input }]
    };
    return NgAisInfiniteHits;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisInfiniteHitsModule = /** @class */ (function () {
    function NgAisInfiniteHitsModule() {
    }
    NgAisInfiniteHitsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisInfiniteHits],
                    entryComponents: [NgAisInfiniteHits],
                    exports: [NgAisInfiniteHits],
                    imports: [CommonModule, NgAisHighlightModule],
                },] },
    ];
    return NgAisInfiniteHitsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisInstantSearchModule = /** @class */ (function () {
    function NgAisInstantSearchModule() {
    }
    /**
     * @return {?}
     */
    NgAisInstantSearchModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgAisInstantSearchModule,
            providers: [],
        };
    };
    NgAisInstantSearchModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisInstantSearch],
                    entryComponents: [NgAisInstantSearch],
                    exports: [NgAisInstantSearch],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisInstantSearchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisMenu = /** @class */ (function (_super) {
    __extends(NgAisMenu, _super);
    function NgAisMenu(instantSearchParent) {
        var _this = _super.call(this, 'Menu') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more';
        _this.showLessLabel = 'Show less';
        _this.limit = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: noop,
            isShowingMore: false,
            items: [],
            refine: noop,
            toggleShowMore: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "showMoreClass", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var className = this.cx('showMore');
            if (!this.state.canToggleShowMore) {
                className = className + " " + this.cx('showMore', 'disabled');
            }
            return className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "items", {
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
    NgAisMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectMenu, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    NgAisMenu.prototype.handleClick = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <span [class]=\"cx('label')\">{{item.label}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n        [class]=\"showMoreClass\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisMenu.propDecorators = {
        showMoreLabel: [{ type: Input }],
        showLessLabel: [{ type: Input }],
        transformItems: [{ type: Input }],
        attribute: [{ type: Input }],
        limit: [{ type: Input }],
        showMoreLimit: [{ type: Input }],
        sortBy: [{ type: Input }]
    };
    return NgAisMenu;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisMenuModule = /** @class */ (function () {
    function NgAisMenuModule() {
    }
    NgAisMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisMenu],
                    entryComponents: [NgAisMenu],
                    exports: [NgAisMenu],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisNumericMenu = /** @class */ (function (_super) {
    __extends(NgAisNumericMenu, _super);
    function NgAisNumericMenu(instantSearchParent) {
        var _this = _super.call(this, 'NumericMenu') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: noop,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisNumericMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisNumericMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectNumericRefinementList, {
            attributeName: this.attribute,
            options: this.items,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisNumericMenu.prototype.refine = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    };
    NgAisNumericMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-numeric-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of state.items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('radio')\"\n              type=\"radio\"\n              name=\"NumericMenu\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">{{item.label}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisNumericMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisNumericMenu.propDecorators = {
        attribute: [{ type: Input }],
        items: [{ type: Input }]
    };
    return NgAisNumericMenu;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisNumericMenuModule = /** @class */ (function () {
    function NgAisNumericMenuModule() {
    }
    NgAisNumericMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericMenu],
                    entryComponents: [NgAisNumericMenu],
                    exports: [NgAisNumericMenu],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisNumericMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisNumericSelector = /** @class */ (function (_super) {
    __extends(NgAisNumericSelector, _super);
    function NgAisNumericSelector(instantSearchParent) {
        var _this = _super.call(this, 'NumericSelector') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.operator = '=';
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisNumericSelector.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectNumericSelector, {
            attributeName: this.attribute,
            operator: this.operator,
            options: this.items,
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericSelector.decorators = [
        { type: Component, args: [{
                    selector: 'ais-numeric-selector',
                    template: "\n    <div [class]=\"cx('')\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisNumericSelector.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisNumericSelector.propDecorators = {
        attribute: [{ type: Input }],
        operator: [{ type: Input }],
        items: [{ type: Input }]
    };
    return NgAisNumericSelector;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisNumericSelectorModule = /** @class */ (function () {
    function NgAisNumericSelectorModule() {
    }
    NgAisNumericSelectorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisNumericSelector],
                    entryComponents: [NgAisNumericSelector],
                    exports: [NgAisNumericSelector],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisNumericSelectorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var range = require('lodash/range');
var NgAisPagination = /** @class */ (function (_super) {
    __extends(NgAisPagination, _super);
    function NgAisPagination(instantSearchParent) {
        var _this = _super.call(this, 'Pagination') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showFirst = true;
        _this.showLast = false;
        _this.showPrevious = true;
        _this.showNext = true;
        _this.padding = 3;
        _this.state = {
            createURL: noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisPagination.prototype, "pages", {
        get: /**
         * @return {?}
         */
        function () {
            var _a = this.state, nbPages = _a.nbPages, currentRefinement = _a.currentRefinement;
            /** @type {?} */
            var pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
            /** @type {?} */
            var pagesPadding = typeof this.padding === 'string'
                ? parseInt(this.padding, 10)
                : this.padding;
            if (pagesPadding && pagesPadding > 0) {
                // should not display pages that does not exists
                if (nbPages < pagesPadding * 2 + 1) {
                    return pagesArray;
                }
                /** @type {?} */
                var minDelta = currentRefinement - pagesPadding - 1;
                /** @type {?} */
                var maxDelta = currentRefinement + pagesPadding + 1;
                if (minDelta < 0) {
                    return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
                }
                if (maxDelta > nbPages) {
                    return range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
                }
                return range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
            }
            return pagesArray;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisPagination.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectPagination, {
            maxPages: parseNumberInput(this.totalPages),
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} page
     * @return {?}
     */
    NgAisPagination.prototype.refine = /**
     * @param {?} event
     * @param {?} page
     * @return {?}
     */
    function (event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page < 0 ||
            page === this.state.currentRefinement ||
            page >= this.state.nbPages) {
            return;
        }
        this.state.refine(page);
    };
    NgAisPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ais-pagination',
                    template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngIf=\"showFirst\"\n          (click)=\"refine($event, 0)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'firstPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(0)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\u2039\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showPrevious\"\n          (click)=\"refine($event, state.currentRefinement - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'previousPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\n          </a>\n        </li>\n\n        <li\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'page') +\n            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n          \"\n          *ngFor=\"let page of pages\"\n          (click)=\"refine($event, page)\"\n        >\n          <a\n            [class]=\"cx('link')\"\n            [href]=\"state.createURL(page)\"\n          >\n            {{page + 1}}\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showNext\"\n          (click)=\"refine($event, state.currentRefinement + 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'nextPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement + 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showLast\"\n          (click)=\"refine($event, state.nbPages - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'lastPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.nbPages - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\u203A\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisPagination.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisPagination.propDecorators = {
        showFirst: [{ type: Input }],
        showLast: [{ type: Input }],
        showPrevious: [{ type: Input }],
        showNext: [{ type: Input }],
        padding: [{ type: Input }],
        totalPages: [{ type: Input }]
    };
    return NgAisPagination;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisPaginationModule = /** @class */ (function () {
    function NgAisPaginationModule() {
    }
    NgAisPaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisPagination],
                    entryComponents: [NgAisPagination],
                    exports: [NgAisPagination],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisPaginationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRangeSlider = /** @class */ (function (_super) {
    __extends(NgAisRangeSlider, _super);
    function NgAisRangeSlider(instantSearchParent) {
        var _this = _super.call(this, 'RangeSlider') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.pips = true;
        _this.tooltips = true;
        _this.precision = 2;
        _this.state = {
            range: { min: 0, max: 1 },
            refine: noop,
            start: [0, 1],
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                // create slider
                /** @type {?} */
                var config = {
                    animate: false,
                    behaviour: 'snap',
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: _this.step,
                    tooltips: _this.tooltips && [
                        { to: _this.formatTooltip },
                        { to: _this.formatTooltip },
                    ],
                };
                if (_this.pips === true || typeof _this.pips === 'undefined') {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: 'positions',
                            stepped: true,
                            values: [0, 50, 100],
                        },
                    });
                }
                else if (_this.pips !== undefined) {
                    Object.assign(config, { pips: _this.pips });
                }
                _this.slider = create(_this.sliderContainer.nativeElement, config);
                // register listen events
                _this.sliderContainer.nativeElement.noUiSlider.on('change', _this.handleChange);
            }
            // update component inner state
            _this.state = state;
            // update the slider state
            var _a = state.range, min = _a.min, max = _a.max, start = state.start;
            /** @type {?} */
            var disabled = min === max;
            /** @type {?} */
            var range = disabled ? { min: min, max: max + 0.0001 } : { min: min, max: max };
            _this.slider.updateOptions({ disabled: disabled, range: range, start: start });
        };
        _this.handleChange = function (values) {
            _this.state.refine(values);
        };
        _this.formatTooltip = function (value) {
            return value.toFixed(parseNumberInput(_this.precision));
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeSlider.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            // compute step from the precision value
            /** @type {?} */
            var precision = parseNumberInput(this.precision) || 2;
            return 1 / Math.pow(10, precision);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRangeSlider.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRangeSlider.decorators = [
        { type: Component, args: [{
                    selector: 'ais-range-slider',
                    template: "\n    <div [class]=\"cx()\">\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisRangeSlider.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRangeSlider.propDecorators = {
        sliderContainer: [{ type: ViewChild, args: ['sliderContainer',] }],
        pips: [{ type: Input }],
        tooltips: [{ type: Input }],
        attribute: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        precision: [{ type: Input }]
    };
    return NgAisRangeSlider;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRangeSliderModule = /** @class */ (function () {
    function NgAisRangeSliderModule() {
    }
    NgAisRangeSliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRangeSlider],
                    entryComponents: [NgAisRangeSlider],
                    exports: [NgAisRangeSlider],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisRangeSliderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRefinementList = /** @class */ (function (_super) {
    __extends(NgAisRefinementList, _super);
    function NgAisRefinementList(instantSearchParent) {
        var _this = _super.call(this, 'RefinementList') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = 'Show more';
        _this.showLessLabel = 'Show less';
        _this.searchPlaceholder = 'Search here...';
        _this.operator = 'or';
        _this.limit = 10;
        _this.state = {
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
        return _this;
    }
    Object.defineProperty(NgAisRefinementList.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisRefinementList.prototype, "items", {
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
    NgAisRefinementList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectRefinementList, {
            limit: parseNumberInput(this.limit),
            showMoreLimit: parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
            escapeFacetValues: true,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NgAisRefinementList.prototype.refine = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    NgAisRefinementList.decorators = [
        { type: Component, args: [{
                    selector: 'ais-refinement-list',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <div\n        *ngIf=\"searchable\"\n        [class]=\"cx('searchBox')\"\n      >\n        <ais-facets-search\n          [search]=\"state.searchForItems\"\n          [searchPlaceholder]=\"searchPlaceholder\"\n        >\n        </ais-facets-search>\n      </div>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{item.value}}\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">\n              <ais-highlight attribute=\"highlighted\" [hit]=\"item\"></ais-highlight>\n            </span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </label>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                },] },
    ];
    NgAisRefinementList.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
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
    return NgAisRefinementList;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisFacetsSearch = /** @class */ (function () {
    function NgAisFacetsSearch() {
        this.cx = bem('SearchBox');
        this.searchQuery = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NgAisFacetsSearch.prototype.handleChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searchQuery = value;
        this.search(value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisFacetsSearch.prototype.handleSubmit = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.search(this.searchQuery);
    };
    NgAisFacetsSearch.decorators = [
        { type: Component, args: [{
                    selector: 'ais-facets-search',
                    template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{searchPlaceholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"searchQuery\"\n          (input)=\"handleChange($event.target.value)\"\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          title=\"Submit the search query.\"\n          type=\"submit\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"Clear the search query.\"\n          hidden\n        >\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  ",
                },] },
    ];
    NgAisFacetsSearch.propDecorators = {
        searchPlaceholder: [{ type: Input }],
        search: [{ type: Input }]
    };
    return NgAisFacetsSearch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRefinementListModule = /** @class */ (function () {
    function NgAisRefinementListModule() {
    }
    NgAisRefinementListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRefinementList, NgAisFacetsSearch],
                    entryComponents: [NgAisRefinementList],
                    exports: [NgAisRefinementList],
                    imports: [CommonModule, NgAisHighlightModule],
                },] },
    ];
    return NgAisRefinementListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisSearchBox = /** @class */ (function (_super) {
    __extends(NgAisSearchBox, _super);
    function NgAisSearchBox(instantSearchParent) {
        var _this = _super.call(this, 'SearchBox') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.placeholder = 'Search';
        _this.submitTitle = 'Submit';
        _this.resetTitle = 'Reset';
        _this.searchAsYouType = true;
        _this.autofocus = false;
        // Output events
        // form
        _this.submit = new EventEmitter();
        _this.reset = new EventEmitter();
        // input
        _this.change = new EventEmitter();
        _this.focus = new EventEmitter();
        _this.blur = new EventEmitter();
        _this.state = {
            query: '',
            refine: noop,
        };
        _this.createWidget(connectSearchBox);
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisSearchBox.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.autofocus) {
            this.searchBox.nativeElement.focus();
        }
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgAisSearchBox.prototype.handleChange = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        this.change.emit(query);
        if (this.searchAsYouType) {
            this.state.refine(query);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisSearchBox.prototype.handleSubmit = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // send submit event to parent component
        this.submit.emit(event);
        event.preventDefault();
        if (!this.searchAsYouType) {
            this.state.refine(this.state.query);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisSearchBox.prototype.handleReset = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // send reset event to parent component
        this.reset.emit(event);
        // reset search
        this.state.refine('');
    };
    NgAisSearchBox.decorators = [
        { type: Component, args: [{
                    selector: 'ais-search-box',
                    template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        novalidate\n        (submit)=\"handleSubmit($event)\"\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{placeholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"state.query\"\n          (input)=\"handleChange($event.target.value)\"\n          (focus)=\"focus.emit($event)\"\n          (blur)=\"blur.emit($event)\"\n          #searchBox\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          type=\"submit\"\n          title=\"{{submitTitle}}\"\n          (click)=\"handleSubmit($event)\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"40\"\n            height=\"40\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"{{resetTitle}}\"\n          (click)=\"handleReset($event)\"\n          [hidden]=\"!state.query || (state.query && !state.query.trim())\">\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"20\"\n            height=\"20\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  ",
                },] },
    ];
    NgAisSearchBox.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
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
    return NgAisSearchBox;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisSearchBoxModule = /** @class */ (function () {
    function NgAisSearchBoxModule() {
    }
    NgAisSearchBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSearchBox],
                    entryComponents: [NgAisSearchBox],
                    exports: [NgAisSearchBox],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisSearchBoxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisSortBy = /** @class */ (function (_super) {
    __extends(NgAisSortBy, _super);
    function NgAisSortBy(instantSearchParent) {
        var _this = _super.call(this, 'SortBy') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: noop,
        };
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisSortBy.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectSortBySelector, { indices: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisSortBy.decorators = [
        { type: Component, args: [{
                    selector: 'ais-sort-by',
                    template: "\n    <div [class]=\"cx()\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                },] },
    ];
    NgAisSortBy.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisSortBy.propDecorators = {
        items: [{ type: Input }]
    };
    return NgAisSortBy;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisSortByModule = /** @class */ (function () {
    function NgAisSortByModule() {
    }
    NgAisSortByModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisSortBy],
                    entryComponents: [NgAisSortBy],
                    exports: [NgAisSortBy],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisSortByModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRatingMenu = /** @class */ (function (_super) {
    __extends(NgAisRatingMenu, _super);
    function NgAisRatingMenu(instantSearchParent) {
        var _this = _super.call(this, 'RatingMenu') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.andUpLabel = '& Up';
        _this.max = 5;
        _this.state = {
            createURL: noop,
            hasNoResults: false,
            items: [],
            refine: noop,
        };
        return _this;
    }
    Object.defineProperty(NgAisRatingMenu.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRatingMenu.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectStarRating, {
            attributeName: this.attribute,
            max: this.max,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    NgAisRatingMenu.prototype.handleClick = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    NgAisRatingMenu.decorators = [
        { type: Component, args: [{
                    selector: 'ais-rating-menu',
                    template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <svg style=\"display:none;\">\n        <symbol\n          id=\"ais-StarRating-starSymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n        </symbol>\n        <symbol\n          id=\"ais-StarRating-starEmptySymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n        </symbol>\n      </svg>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of state.items\"\n          [class]=\"getItemClass(item)\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <svg\n              *ngFor=\"let star of item.stars\"\n              [ngClass]=\"cx('starIcon')\"\n              aria-hidden=\"true\"\n            >\n              <use\n                *ngIf=\"star\"\n                xlink:href=\"#ais-StarRating-starSymbol\"\n              >\n              </use>\n\n              <use\n                *ngIf=\"!star\"\n                xlink:href=\"#ais-StarRating-starEmptySymbol\"\n              >\n              </use>\n            </svg>\n\n            <span [class]=\"cx('label')\" aria-hidden=\"true\">{{andUpLabel}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisRatingMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRatingMenu.propDecorators = {
        andUpLabel: [{ type: Input }],
        attribute: [{ type: Input }],
        max: [{ type: Input }]
    };
    return NgAisRatingMenu;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRatingMenuModule = /** @class */ (function () {
    function NgAisRatingMenuModule() {
    }
    NgAisRatingMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRatingMenu],
                    entryComponents: [NgAisRatingMenu],
                    exports: [NgAisRatingMenu],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisRatingMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisStats = /** @class */ (function (_super) {
    __extends(NgAisStats, _super);
    function NgAisStats(instantSearchParent) {
        var _this = _super.call(this, 'Stats') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: '',
        };
        _this.createWidget(connectStats);
        return _this;
    }
    Object.defineProperty(NgAisStats.prototype, "templateContext", {
        get: /**
         * @return {?}
         */
        function () {
            return { state: this.state };
        },
        enumerable: true,
        configurable: true
    });
    NgAisStats.decorators = [
        { type: Component, args: [{
                    selector: 'ais-stats',
                    template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <span *ngIf=\"!template\" [class]=\"cx('text')\">\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </span>\n    </div>\n  ",
                },] },
    ];
    NgAisStats.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisStats.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return NgAisStats;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisStatsModule = /** @class */ (function () {
    function NgAisStatsModule() {
    }
    NgAisStatsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisStats],
                    entryComponents: [NgAisStats],
                    exports: [NgAisStats],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisStatsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisToggle = /** @class */ (function (_super) {
    __extends(NgAisToggle, _super);
    function NgAisToggle(instantSearchParent) {
        var _this = _super.call(this, 'ToggleRefinement') || this;
        _this.instantSearchParent = instantSearchParent;
        _this.values = { on: true, off: undefined };
        _this.state = {
            createURL: noop,
            refine: noop,
            value: {},
        };
        return _this;
    }
    /**
     * @return {?}
     */
    NgAisToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectToggle, {
            attributeName: this.attribute,
            label: this.label,
            values: this.values,
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisToggle.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    };
    NgAisToggle.decorators = [
        { type: Component, args: [{
                    selector: 'ais-toggle',
                    template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"cx('item')\"\n          (click)=\"handleClick($event)\">\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{state.value.name}}\"\n              [checked]=\"state.value.isRefined\"\n            />\n\n            <span [class]=\"cx('labelText')\">\n              {{label || state.value.name}}\n            </span>\n\n            <span [class]=\"cx('count')\">{{state.value.count}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    NgAisToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisToggle.propDecorators = {
        attribute: [{ type: Input }],
        label: [{ type: Input }],
        values: [{ type: Input }]
    };
    return NgAisToggle;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisToggleModule = /** @class */ (function () {
    function NgAisToggleModule() {
    }
    NgAisToggleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisToggle],
                    entryComponents: [NgAisToggle],
                    exports: [NgAisToggle],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRangeInput = /** @class */ (function (_super) {
    __extends(NgAisRangeInput, _super);
    function NgAisRangeInput(instantSearchParent) {
        var _this = _super.call(this, 'RangeInput') || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.currency = '$';
        _this.separator = 'to';
        _this.submitLabel = 'Go';
        _this.precision = 2;
        // inner state
        _this.minInputValue = '';
        _this.maxInputValue = '';
        _this.state = {
            range: { min: undefined, max: undefined },
            refine: noop,
            start: [0, 0],
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeInput.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var precision = parseNumberInput(this.precision) || 2;
            return 1 / Math.pow(10, precision);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgAisRangeInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createWidget(connectRange, {
            attributeName: this.attribute,
            max: parseNumberInput(this.max),
            min: parseNumberInput(this.min),
            precision: parseNumberInput(this.precision),
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    NgAisRangeInput.prototype.handleChange = /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    function (event, type) {
        /** @type {?} */
        var value = parseNumberInput(event.target.value);
        if (type === 'min') {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgAisRangeInput.prototype.handleSubmit = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    };
    NgAisRangeInput.decorators = [
        { type: Component, args: [{
                    selector: 'ais-range-input',
                    template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'min')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.min\"\n            [value]=\"minInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'min')\"\n          />\n        </label>\n\n        <span [class]=\"cx('separator')\">{{separator}}</span>\n\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'max')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.max\"\n            [value]=\"maxInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'max')\"\n          />\n        </label>\n\n        <button\n          [class]=\"cx('submit')\"\n          (click)=\"handleSubmit($event)\"\n        >\n          {{submitLabel}}\n        </button>\n      </form>\n    </div>\n  ",
                },] },
    ];
    NgAisRangeInput.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgAisInstantSearch; }),] }] }
    ]; };
    NgAisRangeInput.propDecorators = {
        currency: [{ type: Input }],
        separator: [{ type: Input }],
        submitLabel: [{ type: Input }],
        attribute: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        precision: [{ type: Input }]
    };
    return NgAisRangeInput;
}(BaseWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisRangeInputModule = /** @class */ (function () {
    function NgAisRangeInputModule() {
    }
    NgAisRangeInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisRangeInput],
                    entryComponents: [NgAisRangeInput],
                    exports: [NgAisRangeInput],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisRangeInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisPanel = /** @class */ (function () {
    function NgAisPanel() {
    }
    NgAisPanel.decorators = [
        { type: Component, args: [{
                    selector: 'ais-panel',
                    template: "\n    <div class=\"ais-Panel\">\n      <div *ngIf=\"header\" class=\"ais-Panel-header\">\n        {{header}}\n      </div>\n\n      <div class=\"ais-Panel-body\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"footer\" class=\"ais-Panel-footer\">\n        {{footer}}\n      </div>\n    </div>\n  ",
                },] },
    ];
    NgAisPanel.propDecorators = {
        header: [{ type: Input }],
        footer: [{ type: Input }]
    };
    return NgAisPanel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisPanelModule = /** @class */ (function () {
    function NgAisPanelModule() {
    }
    NgAisPanelModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisPanel],
                    entryComponents: [NgAisPanel],
                    exports: [NgAisPanel],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisPanelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisConfigure = /** @class */ (function (_super) {
    __extends(NgAisConfigure, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgAisConfigureModule = /** @class */ (function () {
    function NgAisConfigureModule() {
    }
    NgAisConfigureModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAisConfigure],
                    entryComponents: [NgAisConfigure],
                    exports: [NgAisConfigure],
                    imports: [CommonModule],
                },] },
    ];
    return NgAisConfigureModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
/** @type {?} */
var algoliasearch$1 = algoliasearchProxy__default$1 || algoliasearchProxy$1;
/** @type {?} */
var encode = encodeProxy__default || encodeProxy;
/**
 * @param {?} __0
 * @return {?}
 */
function createSSRAlgoliaClient(_a) {
    var httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    console.warn('`createSSRAlgoliaClient` is deprecated in favor of `createSSRSearchClient` to be plugged to `searchClient`.');
    return function (_, appId, apiKey) {
        return createSSRSearchClient({
            appId: appId,
            apiKey: apiKey,
            httpClient: httpClient,
            HttpHeaders: HttpHeaders,
            transferState: transferState,
            makeStateKey: makeStateKey,
        });
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
function createSSRSearchClient(_a) {
    var appId = _a.appId, apiKey = _a.apiKey, httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    /** @type {?} */
    var client = algoliasearch$1(appId, apiKey, {});
    client.addAlgoliaAgent("angular-instantsearch " + VERSION);
    client._request = function (rawUrl, opts) {
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('content-type', opts.method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json');
        headers = headers.set('accept', 'application/json');
        /** @type {?} */
        var url = rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(opts.headers);
        /** @type {?} */
        var transferStateKey = makeStateKey("ngais(" + opts.body + ")");
        if (transferState.hasKey(transferStateKey)) {
            /** @type {?} */
            var resp = JSON.parse(transferState.get(transferStateKey, {}));
            return Promise.resolve({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            });
        }
        return new Promise(function (resolve, reject) {
            httpClient
                .request(opts.method, url, {
                headers: headers,
                body: opts.body,
                observe: 'response',
            })
                .subscribe(function (resp) {
                transferState.set(transferStateKey, JSON.stringify(resp));
                resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            }, function (resp) {
                return reject({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            });
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
        var query = req.url.split('?')[1];
        return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var NGIS_MODULES = [
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
var NgAisRootModule = /** @class */ (function () {
    function NgAisRootModule() {
    }
    NgAisRootModule.decorators = [
        { type: NgModule, args: [{
                    exports: NGIS_MODULES,
                    imports: [NgAisInstantSearchModule.forRoot()],
                },] },
    ];
    return NgAisRootModule;
}());
var NgAisModule = /** @class */ (function () {
    function NgAisModule() {
    }
    /**
     * @return {?}
     */
    NgAisModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: NgAisRootModule };
    };
    NgAisModule.decorators = [
        { type: NgModule, args: [{ imports: NGIS_MODULES, exports: NGIS_MODULES },] },
    ];
    return NgAisModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgAisBreadcrumbModule, NgAisClearRefinementsModule, NgAisCurrentRefinementsModule, NgAisHierarchicalMenuModule, NgAisHitsPerPageModule, NgAisHitsModule, NgAisInfiniteHitsModule, NgAisInstantSearchModule, NgAisMenuModule, NgAisNumericMenuModule, NgAisNumericSelectorModule, NgAisPaginationModule, NgAisRangeSliderModule, NgAisRefinementListModule, NgAisSearchBoxModule, NgAisSortByModule, NgAisRatingMenuModule, NgAisStatsModule, NgAisToggleModule, NgAisHighlightModule, NgAisRangeInputModule, NgAisPanelModule, NgAisConfigureModule, createSSRAlgoliaClient, createSSRSearchClient, parseServerRequest, BaseWidget, NgAisInstantSearch, NgAisRootModule, NgAisModule, NgAisBreadcrumb as ɵb, NgAisClearRefinements as ɵc, NgAisConfigure as ɵx, NgAisCurrentRefinements as ɵd, NgAisHierarchicalMenu as ɵe, NgAisHierarchicalMenuItem as ɵf, NgAisHighlight as ɵi, NgAisHitsPerPage as ɵg, NgAisHits as ɵh, NgAisInfiniteHits as ɵj, NgAisMenu as ɵk, NgAisNumericMenu as ɵl, NgAisNumericSelector as ɵm, NgAisPagination as ɵn, NgAisPanel as ɵa, NgAisRangeInput as ɵw, NgAisRangeSlider as ɵo, NgAisRatingMenu as ɵt, NgAisFacetsSearch as ɵq, NgAisRefinementList as ɵp, NgAisSearchBox as ɵr, NgAisSortBy as ɵs, NgAisStats as ɵu, NgAisToggle as ɵv };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1pbnN0YW50c2VhcmNoLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdXRpbHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9iYXNlLXdpZGdldC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3ZlcnNpb24udHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvY2xlYXItcmVmaW5lbWVudHMvY2xlYXItcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jbGVhci1yZWZpbmVtZW50cy9jbGVhci1yZWZpbmVtZW50cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWVyYXJjaGljYWwtbWVudS9oaWVyYXJjaGljYWwtbWVudS1pdGVtLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpZ2hsaWdodC9oaWdobGlnaHQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLW1lbnUvbnVtZXJpYy1tZW51LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvbnVtZXJpYy1tZW51L251bWVyaWMtbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhbmdlLXNsaWRlci9yYW5nZS1zbGlkZXIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yZWZpbmVtZW50LWxpc3QvZmFjZXRzLXNlYXJjaC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYXRpbmctbWVudS9yYXRpbmctbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhdGluZy1tZW51L3JhdGluZy1tZW51Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3N0YXRzL3N0YXRzLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc3RhdHMvc3RhdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdG9nZ2xlL3RvZ2dsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3RvZ2dsZS90b2dnbGUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcmFuZ2UtaW5wdXQvcmFuZ2UtaW5wdXQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYW5lbC9wYW5lbC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3BhbmVsL3BhbmVsLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NvbmZpZ3VyZS9jb25maWd1cmUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jb25maWd1cmUvY29uZmlndXJlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NyZWF0ZS1zc3ItYWxnb2xpYS1jbGllbnQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYXJzZS1zZXJ2ZXItcmVxdWVzdC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBiZW0od2lkZ2V0TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGN4ID0gZnVuY3Rpb24oZWxlbWVudD86IHN0cmluZywgc3ViRWxlbWVudD86IHN0cmluZykge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzY29wcGVkV2lkZ2V0TmFtZSA9IGBhaXMtJHt3aWRnZXROYW1lfS0ke2VsZW1lbnR9YDtcblxuICAgICAgLy8gb3V0cHV0IGBhaXMtV2lkZ2V0LUhlYWRlcnxCb2R5fEZvb3RlciBhaXMtSGVhZGVyfEJvZHl8Rm9vdGVyYFxuICAgICAgaWYgKGVsZW1lbnQgPT09ICdoZWFkZXInIHx8IGVsZW1lbnQgPT09ICdib2R5JyB8fCBlbGVtZW50ID09PSAnZm9vdGVyJykge1xuICAgICAgICBjb25zdCBub25TY29wcGVkV2lkZ2V0TmFtZSA9IGBhaXMtJHtlbGVtZW50fWA7XG4gICAgICAgIHJldHVybiBgJHtzY29wcGVkV2lkZ2V0TmFtZX0gJHtub25TY29wcGVkV2lkZ2V0TmFtZX1gO1xuICAgICAgfVxuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtWHl6LS1hYmNgXG4gICAgICBpZiAoc3ViRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gYCR7c2NvcHBlZFdpZGdldE5hbWV9LS0ke3N1YkVsZW1lbnR9YDtcbiAgICAgIH1cblxuICAgICAgLy8gb3V0cHV0IGBhaXMtV2lkZ2V0LVh5emBcbiAgICAgIHJldHVybiBzY29wcGVkV2lkZ2V0TmFtZTtcbiAgICB9XG5cbiAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXRgXG4gICAgcmV0dXJuIGBhaXMtJHt3aWRnZXROYW1lfWA7XG4gIH07XG4gIHJldHVybiBjeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTnVtYmVySW5wdXQoaW5wdXQ/OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpbnB1dCwgMTApIDogaW5wdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzKSB7XG4gIHJldHVybiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zbGljZSgxKTtcbn1cbiIsImltcG9ydCB7IElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYmVtLCBub29wIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBXaWRnZXQge1xuICBwdWJsaWMgaW5pdDogKCkgPT4gdm9pZDtcbiAgcHVibGljIGdldENvbmZpZ3VyYXRpb246ICgpID0+IG9iamVjdDtcbiAgcHVibGljIHJlbmRlcjogKFxuICAgIHBhcmFtczoge1xuICAgICAgdGVtcGxhdGVzQ29uZmlnOiBvYmplY3Q7XG4gICAgICBzdGF0ZTogb2JqZWN0O1xuICAgICAgcmVzdWx0czoge31bXTtcbiAgICAgIGNyZWF0ZVVSTDogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcbiAgICAgIGluc3RhbnRTZWFyY2hJbnN0YW5jZTogb2JqZWN0O1xuICAgIH1cbiAgKSA9PiB2b2lkO1xuICBwdWJsaWMgZGlzcG9zZTogKFxuICAgIHBhcmFtczoge1xuICAgICAgaGVscGVyOiBvYmplY3Q7XG4gICAgICBzdGF0ZTogb2JqZWN0O1xuICAgIH1cbiAgKSA9PiBvYmplY3QgfCB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBDb25uZWN0b3IgPSAoXG4gIHJlbmRlckZuOiAoc3RhdGU6IG9iamVjdCwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4gdm9pZCxcbiAgdW5tb3VudEZuOiAoKSA9PiB2b2lkXG4pID0+ICh3aWRnZXRPcHRpb25zPzogb2JqZWN0KSA9PiBXaWRnZXQ7XG5cbmV4cG9ydCBjbGFzcyBCYXNlV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55O1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvSGlkZUNvbnRhaW5lcj86IGJvb2xlYW47XG5cbiAgcHVibGljIHdpZGdldD86IFdpZGdldDtcbiAgcHVibGljIHN0YXRlPzogb2JqZWN0ID0ge307XG4gIHB1YmxpYyBjeDogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3Iod2lkZ2V0TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jeCA9IGJlbSh3aWRnZXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVXaWRnZXQoY29ubmVjdG9yOiBDb25uZWN0b3IsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSB7XG4gICAgdGhpcy53aWRnZXQgPSBjb25uZWN0b3IodGhpcy51cGRhdGVTdGF0ZSwgbm9vcCkob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gYWRkIHdpZGdldCB0byB0aGUgSW5zdGFudFNlYXJjaCBJbnN0YW5jZVxuICAgIHRoaXMuaW5zdGFudFNlYXJjaFBhcmVudC5hZGRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLmluc3RhbnRTZWFyY2hQYXJlbnQucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuaW5zdGFudFNlYXJjaFBhcmVudC5yZW1vdmVXaWRnZXQodGhpcy53aWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdGF0ZSA9IChcbiAgICBzdGF0ZToge30sXG4gICAgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHwgdm9pZCA9PiB7XG4gICAgaWYgKGlzRmlyc3RSZW5kZXJpbmcpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9O1xuXG4gIC8vIGhlbHBlciBtZXRob2QgZm9yIGdlbmVyaW5nIGl0ZW0gbGlzdCBjbGFzc05hbWVcbiAgcHVibGljIGdldEl0ZW1DbGFzcyhpdGVtOiB7IGlzUmVmaW5lZD86IGJvb2xlYW4gfSkge1xuICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmN4KCdpdGVtJyk7XG5cbiAgICBpZiAoaXRlbS5pc1JlZmluZWQpIHtcbiAgICAgIGNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHt0aGlzLmN4KCdpdGVtJywgJ3NlbGVjdGVkJyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMi4xLjBcIjtcbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCAqIGFzIGFsZ29saWFzZWFyY2hQcm94eSBmcm9tICdhbGdvbGlhc2VhcmNoL2xpdGUnO1xuXG5pbXBvcnQgaW5zdGFudHNlYXJjaCBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzJztcblxuaW1wb3J0IHsgQWxnb2xpYVNlYXJjaEhlbHBlciB9IGZyb20gJ2FsZ29saWFzZWFyY2gtaGVscGVyJztcblxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL3ZlcnNpb24nO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYXNlYXJjaFByb3h5LmRlZmF1bHQgfHwgYWxnb2xpYXNlYXJjaFByb3h5O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hSZXF1ZXN0ID0ge1xuICBpbmRleE5hbWU6IHN0cmluZztcbiAgcGFyYW1zOiBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdCA9IHtcbiAgaW5kZXhOYW1lOiBzdHJpbmc7XG4gIHBhcmFtczogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0UGFyYW1ldGVycztcbn07XG5cbi8vIERvY3VtZW50YXRpb246IGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9hcGktcmVmZXJlbmNlL3NlYXJjaC1hcGktcGFyYW1ldGVycy9cbmV4cG9ydCB0eXBlIFNlYXJjaFBhcmFtZXRlcnMgPSB7XG4gIC8vIEF0dHJpYnV0ZXNcbiAgYXR0cmlidXRlc1RvUmV0cmlldmU/OiBzdHJpbmdbXTtcbiAgcmVzdHJpY3RTZWFyY2hhYmxlQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEZpbHRlcmluZ1xuICBmaWx0ZXJzPzogc3RyaW5nO1xuICBmYWNldEZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgb3B0aW9uYWxGaWx0ZXJzPzogc3RyaW5nW107XG4gIG51bWVyaWNGaWx0ZXJzPzogc3RyaW5nW107XG4gIHN1bU9yRmlsdGVyc1Njb3Jlcz86IGJvb2xlYW47XG5cbiAgLy8gRmFjZXRpbmdcbiAgZmFjZXRzPzogc3RyaW5nW107XG4gIG1heFZhbHVlc1BlckZhY2V0PzogbnVtYmVyO1xuICBmYWNldGluZ0FmdGVyRGlzdGluY3Q/OiBib29sZWFuO1xuICBzb3J0RmFjZXRWYWx1ZXNCeT86IHN0cmluZztcblxuICAvLyBIaWdobGlnaHRpbmcgLyBTbmlwcGV0aW5nXG4gIGF0dHJpYnV0ZXNUb0hpZ2hsaWdodD86IHN0cmluZ1tdO1xuICBhdHRyaWJ1dGVzVG9TbmlwcGV0Pzogc3RyaW5nW107XG4gIGhpZ2hsaWdodFByZVRhZz86IHN0cmluZztcbiAgaGlnaGxpZ2h0UG9zdFRhZz86IHN0cmluZztcbiAgc25pcHBldEVsbGlwc2lzVGV4dD86IHN0cmluZztcbiAgcmVzdHJpY3RIaWdobGlnaHRBbmRTbmlwcGV0QXJyYXlzPzogYm9vbGVhbjtcblxuICAvLyBQYWdpbmF0aW9uXG4gIHBhZ2U/OiBudW1iZXI7XG4gIGhpdHNQZXJQYWdlPzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIGxlbmd0aD86IG51bWJlcjtcblxuICAvLyBUeXBvc1xuICBtaW5Xb3JkU2l6ZWZvcjFUeXBvPzogbnVtYmVyO1xuICBtaW5Xb3JkU2l6ZWZvcjJUeXBvcz86IG51bWJlcjtcbiAgdHlwb1RvbGVyYW5jZT86IHN0cmluZyB8IGJvb2xlYW47XG4gIGFsbG93VHlwb3NPbk51bWVyaWNUb2tlbnM/OiBib29sZWFuO1xuICBpZ25vcmVQbHVyYWxzPzogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBkaXNhYmxlVHlwb1RvbGVyYW5jZU9uQXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8vIEdlby1TZWFyY2hcbiAgYXJvdW5kTGF0TG5nPzogc3RyaW5nO1xuICBhcm91bmRMYXRMbmdWaWFJUD86IGJvb2xlYW47XG4gIGFyb3VuZFJhZGl1cz86IG51bWJlciB8ICdhbGwnO1xuICBhcm91bmRQcmVjaXNpb24/OiBudW1iZXI7XG4gIG1pbmltdW1Bcm91bmRSYWRpdXM/OiBudW1iZXI7XG4gIGluc2lkZUJvdW5kaW5nQm94PzogR2VvUmVjdGFuZ2xlIHwgR2VvUmVjdGFuZ2xlW107XG4gIGluc2lkZVBvbHlnb24/OiBHZW9Qb2x5Z29uIHwgR2VvUG9seWdvbltdO1xuXG4gIC8vIFF1ZXJ5IFN0cmF0ZWd5XG4gIHF1ZXJ5VHlwZT86IHN0cmluZztcbiAgcmVtb3ZlV29yZHNJZk5vUmVzdWx0cz86IHN0cmluZztcbiAgYWR2YW5jZWRTeW50YXg/OiBib29sZWFuO1xuICBvcHRpb25hbFdvcmRzPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHJlbW92ZVN0b3BXb3Jkcz86IGJvb2xlYW4gfCBzdHJpbmdbXTtcbiAgZGlzYWJsZUV4YWN0T25BdHRyaWJ1dGVzPzogc3RyaW5nW107XG4gIGV4YWN0T25TaW5nbGVXb3JkUXVlcnk/OiBzdHJpbmc7XG4gIGFsdGVybmF0aXZlc0FzRXhhY3Q/OiBzdHJpbmdbXTtcblxuICAvLyBRdWVyeSBSdWxlc1xuICBlbmFibGVSdWxlcz86IGJvb2xlYW47XG4gIHJ1bGVDb250ZXh0cz86IHN0cmluZ1tdO1xuXG4gIC8vIEFkdmFuY2VkXG4gIG1pblByb3hpbWl0eT86IG51bWJlcjtcbiAgcmVzcG9uc2VGaWVsZHM/OiBzdHJpbmdbXTtcbiAgbWF4RmFjZXRIaXRzPzogbnVtYmVyO1xuICBwZXJjZW50aWxlQ29tcHV0YXRpb24/OiBib29sZWFuO1xuICBkaXN0aW5jdD86IG51bWJlciB8IGJvb2xlYW47XG4gIGdldFJhbmtpbmdJbmZvPzogYm9vbGVhbjtcbiAgY2xpY2tBbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3M/OiBib29sZWFuO1xuICBhbmFseXRpY3NUYWdzPzogc3RyaW5nW107XG4gIHN5bm9ueW1zPzogYm9vbGVhbjtcbiAgcmVwbGFjZVN5bm9ueW1zSW5IaWdobGlnaHQ/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXF1ZXN0UGFyYW1ldGVycyBleHRlbmRzIFNlYXJjaFBhcmFtZXRlcnMge1xuICBxdWVyeTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBTZWFyY2hQYXJhbWV0ZXJzIHtcbiAgZmFjZXRRdWVyeTogc3RyaW5nO1xuICBmYWNldE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2VvUmVjdGFuZ2xlID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5leHBvcnQgdHlwZSBHZW9Qb2x5Z29uID0gW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4vLyBEb2N1bWVudGF0aW9uOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoLz9sYW5ndWFnZT1qYXZhc2NyaXB0I3NlYXJjaC1tdWx0aXBsZS1pbmRleGVzXG5leHBvcnQgdHlwZSBTZWFyY2hSZXNwb25zZSA9IHtcbiAgaGl0czogSGl0W107XG4gIHBhZ2U/OiBudW1iZXI7XG4gIG5iSGl0cz86IG51bWJlcjtcbiAgbmJQYWdlcz86IG51bWJlcjtcbiAgaGl0c1BlclBhZ2U/OiBudW1iZXI7XG4gIHByb2Nlc3NpbmdUaW1lTVM/OiBudW1iZXI7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBwYXJhbXM/OiBzdHJpbmc7XG4gIGluZGV4Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgSGl0ID0ge1xuICBfaGlnaGxpZ2h0UmVzdWx0Pzogb2JqZWN0O1xufTtcblxuLy8gRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3QtYXBpL3NlYXJjaC8/bGFuZ3VhZ2U9amF2YXNjcmlwdCNzZWFyY2gtZm9yLWZhY2V0LXZhbHVlc1xuZXhwb3J0IHR5cGUgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmc7XG4gIGNvdW50PzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoQ2xpZW50ID0ge1xuICBzZWFyY2g6IChyZXF1ZXN0czogU2VhcmNoUmVxdWVzdFtdKSA9PiBQcm9taXNlPHsgcmVzdWx0czogU2VhcmNoUmVzcG9uc2VbXSB9PjtcbiAgc2VhcmNoRm9yRmFjZXRWYWx1ZXM/OiAoXG4gICAgcmVxdWVzdHM6IFNlYXJjaEZvckZhY2V0VmFsdWVzUmVxdWVzdFtdXG4gICkgPT4gUHJvbWlzZTx7IGZhY2V0SGl0czogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXNwb25zZVtdIH1bXT47XG59O1xuXG5leHBvcnQgdHlwZSBJbnN0YW50U2VhcmNoQ29uZmlnID0ge1xuICBhcHBJZD86IHN0cmluZztcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBpbmRleE5hbWU6IHN0cmluZztcblxuICBudW1iZXJMb2NhbGU/OiBzdHJpbmc7XG4gIHNlYXJjaEZ1bmN0aW9uPzogKGhlbHBlcjogYW55KSA9PiB2b2lkO1xuICBjcmVhdGVBbGdvbGlhQ2xpZW50PzogKFxuICAgIGFsZ29saWFzZWFyY2g6IEZ1bmN0aW9uLFxuICAgIGFwcElkOiBzdHJpbmcsXG4gICAgYXBpS2V5OiBzdHJpbmdcbiAgKSA9PiBvYmplY3Q7XG4gIHNlYXJjaENsaWVudD86IFNlYXJjaENsaWVudDtcbiAgc2VhcmNoUGFyYW1ldGVycz86IFNlYXJjaFBhcmFtZXRlcnMgfCB2b2lkO1xuICB1cmxTeW5jPzpcbiAgICB8IGJvb2xlYW5cbiAgICB8IHtcbiAgICAgICAgbWFwcGluZz86IG9iamVjdDtcbiAgICAgICAgdGhyZXNob2xkPzogbnVtYmVyO1xuICAgICAgICB0cmFja2VkUGFyYW1ldGVycz86IHN0cmluZ1tdO1xuICAgICAgICB1c2VIYXNoPzogYm9vbGVhbjtcbiAgICAgICAgZ2V0SGlzdG9yeVN0YXRlPzogKCkgPT4gb2JqZWN0O1xuICAgICAgfTtcbiAgcm91dGluZz86XG4gICAgfCBib29sZWFuXG4gICAgfCB7XG4gICAgICAgIHN0YXRlTWFwcGluZz86IHtcbiAgICAgICAgICBzdGF0ZVRvUm91dGUob2JqZWN0KTogb2JqZWN0O1xuICAgICAgICAgIHJvdXRlVG9TdGF0ZShvYmplY3QpOiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIEluc3RhbnRTZWFyY2hJbnN0YW5jZSB7XG4gIHB1YmxpYyBzdGFydDogKCkgPT4gdm9pZDtcblxuICBwdWJsaWMgYWRkV2lkZ2V0OiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWQ7XG4gIHB1YmxpYyBhZGRXaWRnZXRzOiAod2lkZ2V0czogV2lkZ2V0W10pID0+IHZvaWQ7XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldDogKHdpZGdldDogV2lkZ2V0KSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0czogKHdpZGdldHM6IFdpZGdldFtdKSA9PiB2b2lkO1xuXG4gIC8vIEV2ZW50RW1taXRlclxuICBwdWJsaWMgb246IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuXG4gIHB1YmxpYyBoZWxwZXI6IHtcbiAgICBsYXN0UmVzdWx0czogT2JqZWN0O1xuICAgIHN0YXRlOiBPYmplY3Q7XG4gIH07XG5cbiAgcHVibGljIHJlZnJlc2g6ICgpID0+IHZvaWQ7XG4gIHB1YmxpYyBkaXNwb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaW5zdGFudHNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5zdGFudFNlYXJjaCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZzogSW5zdGFudFNlYXJjaENvbmZpZztcbiAgQElucHV0KCkgcHVibGljIGluc3RhbmNlTmFtZTogc3RyaW5nID0gJ2RlZmF1bHQnO1xuXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjx7IHJlc3VsdHM6IHt9OyBzdGF0ZToge30gfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICByZXN1bHRzOiB7fTtcbiAgICBzdGF0ZToge307XG4gIH0+KCk7XG5cbiAgcHVibGljIGluc3RhbnRTZWFyY2hJbnN0YW5jZTogSW5zdGFudFNlYXJjaEluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUluc3RhbnRTZWFyY2hJbnN0YW5jZSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnN0YXJ0KCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVtb3ZlTGlzdGVuZXIoJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVJbnN0YW50U2VhcmNoSW5zdGFuY2UoY29uZmlnOiBJbnN0YW50U2VhcmNoQ29uZmlnKSB7XG4gICAgLy8gYWRkIGRlZmF1bHQgc2VhcmNoUGFyYW1ldGVycyB3aXRoIGhpZ2hsaWdodGluZyBjb25maWdcbiAgICBpZiAoIWNvbmZpZy5zZWFyY2hQYXJhbWV0ZXJzKSBjb25maWcuc2VhcmNoUGFyYW1ldGVycyA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLnNlYXJjaFBhcmFtZXRlcnMsIHtcbiAgICAgIGhpZ2hsaWdodFByZVRhZzogJ19fYWlzLWhpZ2hsaWdodF9fJyxcbiAgICAgIGhpZ2hsaWdodFBvc3RUYWc6ICdfXy9haXMtaGlnaGxpZ2h0X18nLFxuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIFVSTFN5bmMgd2lkZ2V0IGlmIG9uIFNTUlxuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcudXJsU3luYyAhPT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBjb25maWcudXJsU3luYztcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJvdXRpbmcgIT09ICd1bmRlZmluZWQnKSBkZWxldGUgY29uZmlnLnJvdXRpbmc7XG4gICAgfVxuXG4gICAgLy8gY3VzdG9tIGFsZ29saWEgY2xpZW50IGFnZW50XG4gICAgaWYgKCFjb25maWcuc2VhcmNoQ2xpZW50ICYmICFjb25maWcuY3JlYXRlQWxnb2xpYUNsaWVudCkge1xuICAgICAgY29uc3QgY2xpZW50ID0gYWxnb2xpYXNlYXJjaChjb25maWcuYXBwSWQsIGNvbmZpZy5hcGlLZXkpO1xuICAgICAgY2xpZW50LmFkZEFsZ29saWFBZ2VudChgYW5ndWxhci1pbnN0YW50c2VhcmNoICR7VkVSU0lPTn1gKTtcblxuICAgICAgY29uZmlnLnNlYXJjaENsaWVudCA9IGNsaWVudDtcbiAgICAgIGNvbmZpZy5hcHBJZCA9IHVuZGVmaW5lZDtcbiAgICAgIGNvbmZpZy5hcGlLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UgPSBpbnN0YW50c2VhcmNoKGNvbmZpZyk7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2Uub24oJ3JlbmRlcicsIHRoaXMub25SZW5kZXIpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmFkZFdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXQ6IFdpZGdldCkge1xuICAgIHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLnJlbW92ZVdpZGdldCh3aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVmcmVzaCgpO1xuICB9XG5cbiAgb25SZW5kZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICByZXN1bHRzOiB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5oZWxwZXIubGFzdFJlc3VsdHMsXG4gICAgICBzdGF0ZTogdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuaGVscGVyLnN0YXRlLFxuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25uZWN0QnJlYWRjcnVtYiB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgdHlwZSBCcmVhZGNydW1iSXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaXRlbScsIGl0ZW0uaXNMYXN0ID8gJ3NlbGVjdGVkJyA6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnc2VwYXJhdG9yJylcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgICBocmVmPVwie3tzdGF0ZS5jcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgICAgICAqbmdJZj1cIiFpdGVtLmlzTGFzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3tpdGVtLm5hbWV9fVxuICAgICAgICAgIDwvYT5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pc0xhc3RcIj5cbiAgICAgICAgICAgIHt7aXRlbS5uYW1lfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0JyZWFkY3J1bWIgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBwdWJsaWMgcm9vdFBhdGg/OiBzdHJpbmc7XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLm1hcCgoaXRlbSwgaWR4KSA9PiAoe1xuICAgICAgLi4uaXRlbSxcbiAgICAgIHNlcGFyYXRvcjogaWR4ICE9PSAwLFxuICAgICAgaXNMYXN0OiBpZHggPT09IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSxcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGU6IEJyZWFkY3J1bWJTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdCcmVhZGNydW1iJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEJyZWFkY3J1bWIsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHJvb3RQYXRoOiB0aGlzLnJvb3RQYXRoLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgaXRlbTogQnJlYWRjcnVtYkl0ZW0pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGl0ZW0udmFsdWUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzQnJlYWRjcnVtYiB9IGZyb20gJy4vYnJlYWRjcnVtYic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzQnJlYWRjcnVtYl0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQnJlYWRjcnVtYl0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0JyZWFkY3J1bWJdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNCcmVhZGNydW1iTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RDbGVhckFsbCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1jbGVhci1yZWZpbmVtZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdidXR0b24nKSArICghc3RhdGUuaGFzUmVmaW5lbWVudHMgPyAoJyAnICsgY3goJ2J1dHRvbicsICdkaXNhYmxlZCcpKSA6ICcnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFzdGF0ZS5oYXNSZWZpbmVtZW50c1wiXG4gICAgICA+XG4gICAgICAgIHt7YnV0dG9uTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ2xlYXJSZWZpbmVtZW50cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKSBwdWJsaWMgYnV0dG9uTGFiZWw6IHN0cmluZyA9ICdDbGVhciByZWZpbmVtZW50cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcnNRdWVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUF0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW107XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhhc1JlZmluZW1lbnRzOiBmYWxzZSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiAhdGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cyAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ2xlYXJSZWZpbmVtZW50cycpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIHdlIG5lZWQgdG8gYGNyZWF0ZVdpZGdldGAgZnJvbSBgbmdPbkluaXRgIHRvIGhhdmUgYEBJbnB1dCgpYCBpbnRpYWxpemVkXG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdENsZWFyQWxsLCB7XG4gICAgICBjbGVhcnNRdWVyeTogdGhpcy5jbGVhcnNRdWVyeSxcbiAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVzOiB0aGlzLmV4Y2x1ZGVBdHRyaWJ1dGVzLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNSZWZpbmVtZW50cykge1xuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHMgfSBmcm9tICcuL2NsZWFyLXJlZmluZW1lbnRzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNDbGVhclJlZmluZW1lbnRzXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNDbGVhclJlZmluZW1lbnRzXSxcbiAgZXhwb3J0czogW05nQWlzQ2xlYXJSZWZpbmVtZW50c10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDdXJyZW50UmVmaW5lbWVudHNTdGF0ZSA9IHtcbiAgYXR0cmlidXRlczoge307XG4gIGNsZWFyQWxsQ2xpY2s6IEZ1bmN0aW9uO1xuICBjbGVhckFsbFVSTDogRnVuY3Rpb247XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHJlZmluZW1lbnRzOiB7fVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWN1cnJlbnQtcmVmaW5lbWVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGVhckFsbENsaWNrKCRldmVudClcIlxuICAgICAgICAqbmdJZj1cImNsZWFyUmVmaW5lbWVudHMgPT09ICdiZWZvcmUnIHx8IGNsZWFyUmVmaW5lbWVudHMgPT09IHRydWVcIj5cbiAgICAgICAge3tjbGVhclJlZmluZW1lbnRzTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDx1bFxuICAgICAgICBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCByZWZpbmVtZW50IG9mIHJlZmluZW1lbnRzXCJcbiAgICAgID5cbiAgICAgICAgPGxpIFtjbGFzc109XCJjeCgnaXRlbScpXCI+XG4gICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tyZWZpbmVtZW50LmxhYmVsfX06PC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2F0ZWdvcnknKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiByZWZpbmVtZW50Lml0ZW1zXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NhdGVnb3J5TGFiZWwnKVwiPnt7aXRlbS5uYW1lfX08L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIFtjbGFzc109XCJjeCgnZGVsZXRlJylcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiPsOiwpzClTwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsZWFyQWxsQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICpuZ0lmPVwiY2xlYXJSZWZpbmVtZW50cyA9PT0gJ2FmdGVyJ1wiPlxuICAgICAgICB7e2NsZWFyUmVmaW5lbWVudHNMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDdXJyZW50UmVmaW5lbWVudHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGNsZWFyUmVmaW5lbWVudHM6ICdiZWZvcmUnIHwgJ2FmdGVyJyB8IGJvb2xlYW4gPSAnYWZ0ZXInO1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJSZWZpbmVtZW50c0xhYmVsOiBzdHJpbmcgPSAnQ2xlYXIgcmVmaW5lbWVudHMnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgb25seUxpc3RlZEF0dHJpYnV0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGNsZWFyc1F1ZXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhdHRyaWJ1dGVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogQ3VycmVudFJlZmluZW1lbnRzU3RhdGUgPSB7XG4gICAgYXR0cmlidXRlczoge30sXG4gICAgY2xlYXJBbGxDbGljazogbm9vcCxcbiAgICBjbGVhckFsbFVSTDogbm9vcCxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHJlZmluZW1lbnRzOiBbXSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucmVmaW5lbWVudHMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgcmVmaW5lbWVudHMoKSB7XG4gICAgY29uc3QgaXRlbXMgPVxuICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUucmVmaW5lbWVudHMpXG4gICAgICAgIDogdGhpcy5zdGF0ZS5yZWZpbmVtZW50cztcblxuICAgIC8vIGdyb3VwIHJlZmluZW1lbnRzIGJ5IGNhdGVnb3J5PyAoYXR0cmlidXRlTmFtZSAmJiB0eXBlKVxuICAgIHJldHVybiBpdGVtcy5yZWR1Y2UoKHJlcywgeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCAuLi5yZWZpbmVtZW50IH0pID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gcmVzLmZpbmQoXG4gICAgICAgIHIgPT4gci5hdHRyaWJ1dGVOYW1lID09PSBhdHRyaWJ1dGVOYW1lICYmIHIudHlwZSA9PT0gdHlwZVxuICAgICAgKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pdGVtcy5wdXNoKHsgdHlwZSwgYXR0cmlidXRlTmFtZSwgLi4ucmVmaW5lbWVudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgbGFiZWw6IGNhcGl0YWxpemUoYXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgaXRlbXM6IFt7IHR5cGUsIGF0dHJpYnV0ZU5hbWUsIC4uLnJlZmluZW1lbnQgfV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXQganNvbigpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yZWZpbmVtZW50cywgbnVsbCwgNCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDdXJyZW50UmVmaW5lbWVudHMnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q3VycmVudFJlZmluZWRWYWx1ZXMsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIGNsZWFyc1F1ZXJ5OiB0aGlzLmNsZWFyc1F1ZXJ5LFxuICAgICAgb25seUxpc3RlZEF0dHJpYnV0ZXM6IHRoaXMub25seUxpc3RlZEF0dHJpYnV0ZXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgcmVmaW5lbWVudDoge30pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHJlZmluZW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsZWFyQWxsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuY2xlYXJBbGxDbGljaygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNDdXJyZW50UmVmaW5lbWVudHMgfSBmcm9tICcuL2N1cnJlbnQtcmVmaW5lbWVudHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0N1cnJlbnRSZWZpbmVtZW50c10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQ3VycmVudFJlZmluZW1lbnRzXSxcbiAgZXhwb3J0czogW05nQWlzQ3VycmVudFJlZmluZW1lbnRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpZXJhcmNoaWNhbE1lbnUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBIaWVyYXJjaGljYWxNZW51U3RhdGUgPSB7XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZXJhcmNoaWNhbC1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpICsgJyAnICsgY3goJ2xpc3QnLCAnbHZsMCcpXCI+XG4gICAgICAgIDxhaXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICBbaXRlbV09XCJpdGVtXCJcbiAgICAgICAgICBbY3JlYXRlVVJMXT1cInN0YXRlLmNyZWF0ZVVSTFwiXG4gICAgICAgICAgW3JlZmluZV09XCJzdGF0ZS5yZWZpbmVcIlxuICAgICAgICA+XG4gICAgICAgIDwvYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvblxuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3I/OiBzdHJpbmcgPSAnID4gJztcbiAgQElucHV0KCkgcHVibGljIHJvb3RQYXRoPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd1BhcmVudExldmVsPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIGxpbWl0PzogbnVtYmVyIHwgc3RyaW5nID0gMTA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3J0Qnk/OiBzdHJpbmdbXSB8ICgoaXRlbTogb2JqZWN0KSA9PiBudW1iZXIpO1xuXG4gIHB1YmxpYyBzdGF0ZTogSGllcmFyY2hpY2FsTWVudVN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLml0ZW1zKVxuICAgICAgOiB0aGlzLnN0YXRlLml0ZW1zO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGllcmFyY2hpY2FsTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RIaWVyYXJjaGljYWxNZW51LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHJvb3RQYXRoOiB0aGlzLnJvb3RQYXRoLFxuICAgICAgc2VwYXJhdG9yOiB0aGlzLnNlcGFyYXRvcixcbiAgICAgIHNob3dQYXJlbnRMZXZlbDogdGhpcy5zaG93UGFyZW50TGV2ZWwsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBIaWVyYXJjaGljYWxNZW51SXRlbSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbiAgaXNSZWZpbmVkOiBib29sZWFuO1xuICBkYXRhOiBIaWVyYXJjaGljYWxNZW51SXRlbVtdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaVxuICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgPlxuICAgICAgPGFcbiAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICBocmVmPVwie3tjcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgPC9hPlxuXG4gICAgICA8dWxcbiAgICAgICAgW2NsYXNzXT1cImdldExpc3RDbGFzcyhpdGVtKVwiXG4gICAgICAgICpuZ0lmPVwiaXRlbS5pc1JlZmluZWQgJiYgaXNBcnJheShpdGVtLmRhdGEpICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwXCJcbiAgICAgID5cbiAgICAgICAgPGFpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNoaWxkIG9mIGl0ZW0uZGF0YVwiXG4gICAgICAgICAgW2l0ZW1dPVwiY2hpbGRcIlxuICAgICAgICAgIFtjcmVhdGVVUkxdPVwiY3JlYXRlVVJMXCJcbiAgICAgICAgICBbcmVmaW5lXT1cInJlZmluZVwiXG4gICAgICAgICAgW2x2bF09XCJsdmwgKyAxXCJcbiAgICAgICAgPlxuICAgICAgICA8L2Fpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtPlxuICAgICAgPC91bD5cbiAgICA8L2xpPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVJdGVtIHtcbiAgQElucHV0KCkgcHVibGljIGx2bDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgcHVibGljIHJlZmluZTogKHN0cmluZykgPT4gdm9pZDtcbiAgQElucHV0KCkgcHVibGljIGNyZWF0ZVVSTDogKHN0cmluZykgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaXRlbTogSGllcmFyY2hpY2FsTWVudUl0ZW07XG5cbiAgcHVibGljIGN4ID0gYmVtKCdIaWVyYXJjaGljYWxNZW51Jyk7XG5cbiAgcHVibGljIGdldEl0ZW1DbGFzcyhpdGVtKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ2l0ZW0nKTtcblxuICAgIGlmIChpdGVtLmlzUmVmaW5lZCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKX1gO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQXJyYXkoaXRlbS5kYXRhKSAmJiBpdGVtLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAncGFyZW50Jyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldExpc3RDbGFzcyhpdGVtKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuY3goJ2xpc3QnKX0gJHt0aGlzLmN4KCdsaXN0JywgJ2NoaWxkJyl9ICR7dGhpcy5jeChcbiAgICAgICdsaXN0JyxcbiAgICAgIGBsdmwke3RoaXMubHZsfWBcbiAgICApfWA7XG4gIH1cblxuICBwdWJsaWMgaXNBcnJheShwb3RlbnRpYWxBcnJheTogYW55KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocG90ZW50aWFsQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBIaWVyYXJjaGljYWxNZW51SXRlbSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSGllcmFyY2hpY2FsTWVudSB9IGZyb20gJy4vaGllcmFyY2hpY2FsLW1lbnUnO1xuaW1wb3J0IHsgTmdBaXNIaWVyYXJjaGljYWxNZW51SXRlbSB9IGZyb20gJy4vaGllcmFyY2hpY2FsLW1lbnUtaXRlbSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGllcmFyY2hpY2FsTWVudSwgTmdBaXNIaWVyYXJjaGljYWxNZW51SXRlbV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzSGllcmFyY2hpY2FsTWVudV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWVyYXJjaGljYWxNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpdHNQZXJQYWdlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmVzdWx0c1BlclBhZ2VTdGF0ZSA9IHtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGl0cy1wZXItcGFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWxlY3QnKVwiXG4gICAgICAgIChjaGFuZ2UpPVwic3RhdGUucmVmaW5lKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnb3B0aW9uJylcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGl0c1BlclBhZ2UgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGRlZmF1bHQ/OiBib29sZWFuO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBSZXN1bHRzUGVyUGFnZVN0YXRlID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGl0c1BlclBhZ2UnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGl0c1BlclBhZ2UsIHsgaXRlbXM6IHRoaXMuaXRlbXMgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSGl0c1BlclBhZ2UgfSBmcm9tICcuL2hpdHMtcGVyLXBhZ2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0hpdHNQZXJQYWdlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNIaXRzUGVyUGFnZV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpdHNQZXJQYWdlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGl0c1BlclBhZ2VNb2R1bGUge31cbiIsImNvbnN0IGdldCA9IHJlcXVpcmUoJ2xvZGFzaC9nZXQnKTtcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJlbSB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWhpZ2hsaWdodCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gW2NsYXNzXT1cImN4KClcIiBbaW5uZXJIdG1sXT1cImNvbnRlbnRcIj48L3NwYW4+YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWdobGlnaHQge1xuICBASW5wdXQoKSBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgaGl0OiB7IF9oaWdobGlnaHRSZXN1bHQ/OiB7fTsgbGFiZWw/OiBzdHJpbmc7IGhpZ2hsaWdodGVkPzogc3RyaW5nIH07XG4gIEBJbnB1dCgpIHRhZ05hbWU6IHN0cmluZyA9ICdlbSc7XG5cbiAgY3ggPSBiZW0oJ0hpZ2hsaWdodCcpO1xuXG4gIGdldCBjb250ZW50KCkge1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZSA9PT0gJ2hpZ2hsaWdodGVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0LmhpZ2hsaWdodGVkXG4gICAgICAgID8gdGhpcy5yZXBsYWNlV2l0aFRhZ05hbWUodGhpcy5oaXQuaGlnaGxpZ2h0ZWQpXG4gICAgICAgIDogdGhpcy5oaXQubGFiZWw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGl0Lmhhc093blByb3BlcnR5KCdfaGlnaGxpZ2h0UmVzdWx0JykpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZUhpZ2hsaWdodGVkID0gZ2V0KFxuICAgICAgICB0aGlzLmhpdC5faGlnaGxpZ2h0UmVzdWx0LFxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVxuICAgICAgKTtcblxuICAgICAgLy8gY2hlY2sgdGhhdCB0aGUgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgaXMgYSBzdHJpbmdcbiAgICAgIGlmIChcbiAgICAgICAgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgYXR0cmlidXRlSGlnaGxpZ2h0ZWQudmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVdpdGhUYWdOYW1lKGF0dHJpYnV0ZUhpZ2hsaWdodGVkLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmYWxsYmFjayA9IGdldCh0aGlzLmhpdCwgdGhpcy5hdHRyaWJ1dGUpO1xuICAgIGlmICghZmFsbGJhY2spIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYENvdWxkIG5vdCBmaW5kIGF0dHJpYnV0ZSBbJHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZVxuICAgICAgICB9XSBpbnRvIGhpdCBvYmplY3QsIHdpbGwgZGlzcGxheSBhbiBlbXB0eSBzdHJpbmcuYFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIHJlcGxhY2VXaXRoVGFnTmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cCgnPGVtPicsICdnJyksXG4gICAgICAgIGA8JHt0aGlzLnRhZ05hbWV9IGNsYXNzPVwiJHt0aGlzLmN4KCdoaWdobGlnaHRlZCcpfVwiPmBcbiAgICAgIClcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJzwvZW0+JywgJ2cnKSwgYDwvJHt0aGlzLnRhZ05hbWV9PmApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHQgfSBmcm9tICcuL2hpZ2hsaWdodCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGlnaGxpZ2h0XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNIaWdobGlnaHRdLFxuICBleHBvcnRzOiBbTmdBaXNIaWdobGlnaHRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaWdobGlnaHRNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RIaXRzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGl0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBzdGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIGRlZmF1bHQgcmVuZGVyaW5nIGlmIG5vIHRlbXBsYXRlIHNwZWNpZmllZCAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaGl0IG9mIHN0YXRlLmhpdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cIm5hbWVcIiBbaGl0XT1cImhpdFwiPlxuICAgICAgICAgICAgPC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBpbm5lciB3aWRnZXQgc3RhdGUgcmV0dXJuZWQgZnJvbSBjb25uZWN0b3JcbiAgcHVibGljIHN0YXRlOiB7IGhpdHM6IHt9W107IHJlc3VsdHM6IHt9IH0gPSB7IGhpdHM6IFtdLCByZXN1bHRzOiB7fSB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0hpdHMnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SGl0cywgeyBlc2NhcGVIaXRzOiB0cnVlIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIGlzRmlyc3RSZW5kZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVzdWx0czogc3RhdGUucmVzdWx0cyxcbiAgICAgIGhpdHM6XG4gICAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHN0YXRlLmhpdHMpXG4gICAgICAgICAgOiBzdGF0ZS5oaXRzLFxuICAgIH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuLi9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOZ0Fpc0hpdHMgfSBmcm9tICcuL2hpdHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0hpdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0hpdHNdLFxuICBleHBvcnRzOiBbTmdBaXNIaXRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmdBaXNIaWdobGlnaHRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpdHNNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RJbmZpbml0ZUhpdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaW5maW5pdGUtaGl0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBzdGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIGRlZmF1bHQgcmVuZGVyaW5nIGlmIG5vIHRlbXBsYXRlIHNwZWNpZmllZCAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaGl0IG9mIHN0YXRlLmhpdHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cIm5hbWVcIiBbaGl0XT1cImhpdFwiPlxuICAgICAgICAgICAgPC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ3Nob3dNb3JlJylcIlxuICAgICAgICAoY2xpY2spPVwic2hvd01vcmUoJGV2ZW50KVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJzdGF0ZS5pc0xhc3RQYWdlXCJcbiAgICAgICAgKm5nSWY9XCIhdGVtcGxhdGVcIlxuICAgICAgPlxuICAgICAgICB7e3Nob3dNb3JlTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5maW5pdGVIaXRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZT86IGFueTtcblxuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSByZXN1bHRzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG5cbiAgLy8gaW5uZXIgd2lkZ2V0IHN0YXRlIHJldHVybmVkIGZyb20gY29ubmVjdG9yXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGhpdHM6IHt9W107XG4gICAgaXNMYXN0UGFnZTogYm9vbGVhbjtcbiAgICBzaG93TW9yZTogRnVuY3Rpb247XG4gICAgcmVzdWx0czoge307XG4gIH0gPSB7XG4gICAgaGl0czogW10sXG4gICAgaXNMYXN0UGFnZTogZmFsc2UsXG4gICAgc2hvd01vcmU6IG5vb3AsXG4gICAgcmVzdWx0czoge30sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSW5maW5pdGVIaXRzJyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEluZmluaXRlSGl0cywgeyBlc2NhcGVIaXRzOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIHNob3dNb3JlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0YXRlLnNob3dNb3JlKCk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZXN1bHRzOiBzdGF0ZS5yZXN1bHRzLFxuICAgICAgaGl0czpcbiAgICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXMoc3RhdGUuaGl0cylcbiAgICAgICAgICA6IHN0YXRlLmhpdHMsXG4gICAgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB9IGZyb20gJy4uL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmltcG9ydCB7IE5nQWlzSW5maW5pdGVIaXRzIH0gZnJvbSAnLi9pbmZpbml0ZS1oaXRzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNJbmZpbml0ZUhpdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0luZmluaXRlSGl0c10sXG4gIGV4cG9ydHM6IFtOZ0Fpc0luZmluaXRlSGl0c10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5nQWlzSGlnaGxpZ2h0TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUge31cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuL2luc3RhbnRzZWFyY2gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hdLFxuICBleHBvcnRzOiBbTmdBaXNJbnN0YW50U2VhcmNoXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW10sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RNZW51IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgTWVudVN0YXRlID0ge1xuICBjYW5SZWZpbmU6IGJvb2xlYW47XG4gIGNhblRvZ2dsZVNob3dNb3JlOiBib29sZWFuO1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpc1Nob3dpbmdNb3JlOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdG9nZ2xlU2hvd01vcmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwie3tzdGF0ZS5jcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e2l0ZW0uY291bnR9fTwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwic2hvd01vcmVMaW1pdCAmJiBzdGF0ZS5jYW5Ub2dnbGVTaG93TW9yZVwiXG4gICAgICAgIChjbGljayk9XCJzdGF0ZS50b2dnbGVTaG93TW9yZSgpXCJcbiAgICAgICAgW2NsYXNzXT1cInNob3dNb3JlQ2xhc3NcIlxuICAgICAgPlxuICAgICAgICB7e3N0YXRlLmlzU2hvd2luZ01vcmUgPyBzaG93TGVzc0xhYmVsIDogc2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxhYmVsOiBzdHJpbmcgPSAnU2hvdyBtb3JlJztcbiAgQElucHV0KCkgcHVibGljIHNob3dMZXNzTGFiZWw6IHN0cmluZyA9ICdTaG93IGxlc3MnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdD86IG51bWJlciB8IHN0cmluZyA9IDEwO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMaW1pdD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeT86IHN0cmluZ1tdIHwgKChpdGVtOiBvYmplY3QpID0+IG51bWJlcik7XG5cbiAgcHVibGljIHN0YXRlOiBNZW51U3RhdGUgPSB7XG4gICAgY2FuUmVmaW5lOiBmYWxzZSxcbiAgICBjYW5Ub2dnbGVTaG93TW9yZTogZmFsc2UsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGlzU2hvd2luZ01vcmU6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgdG9nZ2xlU2hvd01vcmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IHNob3dNb3JlQ2xhc3MoKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ3Nob3dNb3JlJyk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuY2FuVG9nZ2xlU2hvd01vcmUpIHtcbiAgICAgIGNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHt0aGlzLmN4KCdzaG93TW9yZScsICdkaXNhYmxlZCcpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgfVxuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLml0ZW1zKVxuICAgICAgOiB0aGlzLnN0YXRlLml0ZW1zO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RNZW51LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIHNob3dNb3JlTGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5zaG93TW9yZUxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICB9KTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnN0YXRlLnJlZmluZSh2YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc01lbnUgfSBmcm9tICcuL21lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc01lbnVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNNZW51XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTWVudU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbnVtZXJpYy1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgncmFkaW8nKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgIG5hbWU9XCJOdW1lcmljTWVudVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3RhcnQ/OiBudW1iZXI7XG4gICAgZW5kPzogbnVtYmVyO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBOdW1lcmljUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdOdW1lcmljTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3ROdW1lcmljUmVmaW5lbWVudExpc3QsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgb3B0aW9uczogdGhpcy5pdGVtcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHJlZmluZShldmVudDogTW91c2VFdmVudCwgaXRlbTogeyB2YWx1ZTogc3RyaW5nIH0pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNOdW1lcmljTWVudSB9IGZyb20gJy4vbnVtZXJpYy1tZW51JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNOdW1lcmljTWVudV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzTnVtZXJpY01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNOdW1lcmljTWVudV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdE51bWVyaWNTZWxlY3RvciB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE51bWVyaWNTZWxlY3RvclN0YXRlID0ge1xuICBjdXJyZW50UmVmaW5lbWVudD86IHN0cmluZyB8IG51bGw7XG4gIG9wdGlvbnM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbnVtZXJpYy1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goJycpXCI+XG4gICAgICA8c2VsZWN0XG4gICAgICAgIFtjbGFzc109XCJjeCgnc2VsZWN0JylcIlxuICAgICAgICAoY2hhbmdlKT1cInN0YXRlLnJlZmluZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ29wdGlvbicpXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5vcHRpb25zXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW0udmFsdWUgPT09IHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY1NlbGVjdG9yIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG9wZXJhdG9yOiAnPCcgfCAnPD0nIHwgJz0nIHwgJz49JyB8ICc+JyB8ICchPScgPSAnPSc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpdGVtczoge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZTogTnVtZXJpY1NlbGVjdG9yU3RhdGUgPSB7XG4gICAgY3VycmVudFJlZmluZW1lbnQ6IG51bGwsXG4gICAgb3B0aW9uczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ051bWVyaWNTZWxlY3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3ROdW1lcmljU2VsZWN0b3IsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsXG4gICAgICBvcHRpb25zOiB0aGlzLml0ZW1zLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc051bWVyaWNTZWxlY3RvciB9IGZyb20gJy4vbnVtZXJpYy1zZWxlY3Rvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzTnVtZXJpY1NlbGVjdG9yXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNOdW1lcmljU2VsZWN0b3JdLFxuICBleHBvcnRzOiBbTmdBaXNOdW1lcmljU2VsZWN0b3JdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUge31cbiIsImNvbnN0IHJhbmdlID0gcmVxdWlyZSgnbG9kYXNoL3JhbmdlJyk7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RQYWdpbmF0aW9uIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdJZj1cInNob3dGaXJzdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIDApXCJcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICdmaXJzdFBhZ2UnKSArXG4gICAgICAgICAgICAoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgPT09IDAgPyAnICcgKyBjeCgnaXRlbScsICdkaXNhYmxlZCcpIDogJycpXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbaHJlZl09XCJzdGF0ZS5jcmVhdGVVUkwoMClcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIMOiwoDCucOiwoDCuVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdJZj1cInNob3dQcmV2aW91c1wiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50IC0gMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ3ByZXZpb3VzUGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gMCA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCAtIDEpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDDosKAwrlcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAncGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gcGFnZSA/ICcgJyArIGN4KCdpdGVtJywgJ3NlbGVjdGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VzXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgcGFnZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChwYWdlKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3twYWdlICsgMX19XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd05leHRcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEpXCJcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICduZXh0UGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEgPT09IHN0YXRlLm5iUGFnZXMgPyAnICcgKyBjeCgnaXRlbScsICdkaXNhYmxlZCcpIDogJycpXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBbaHJlZl09XCJzdGF0ZS5jcmVhdGVVUkwoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgKyAxKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgw6LCgMK6XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd0xhc3RcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBzdGF0ZS5uYlBhZ2VzIC0gMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ2xhc3RQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSA9PT0gc3RhdGUubmJQYWdlcyA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5uYlBhZ2VzIC0gMSlcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIMOiwoDCusOiwoDCulxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFnaW5hdGlvbiBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0ZpcnN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHNob3dMYXN0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93UHJldmlvdXM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd05leHQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFkZGluZzogbnVtYmVyIHwgc3RyaW5nID0gMztcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc3dcbiAgQElucHV0KCkgcHVibGljIHRvdGFsUGFnZXM/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBjdXJyZW50UmVmaW5lbWVudDogMCxcbiAgICBuYkhpdHM6IDAsXG4gICAgbmJQYWdlczogMCxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IHBhZ2VzKCkge1xuICAgIGNvbnN0IHsgbmJQYWdlcywgY3VycmVudFJlZmluZW1lbnQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBwYWdlc0FycmF5ID0gQXJyYXkuYXBwbHkobnVsbCwgeyBsZW5ndGg6IG5iUGFnZXMgfSkubWFwKFxuICAgICAgTnVtYmVyLmNhbGwsXG4gICAgICBOdW1iZXJcbiAgICApO1xuXG4gICAgY29uc3QgcGFnZXNQYWRkaW5nID1cbiAgICAgIHR5cGVvZiB0aGlzLnBhZGRpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgID8gcGFyc2VJbnQodGhpcy5wYWRkaW5nLCAxMClcbiAgICAgICAgOiB0aGlzLnBhZGRpbmc7XG5cbiAgICBpZiAocGFnZXNQYWRkaW5nICYmIHBhZ2VzUGFkZGluZyA+IDApIHtcbiAgICAgIC8vIHNob3VsZCBub3QgZGlzcGxheSBwYWdlcyB0aGF0IGRvZXMgbm90IGV4aXN0c1xuICAgICAgaWYgKG5iUGFnZXMgPCBwYWdlc1BhZGRpbmcgKiAyICsgMSkge1xuICAgICAgICByZXR1cm4gcGFnZXNBcnJheTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluRGVsdGEgPSBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyAtIDE7XG4gICAgICBjb25zdCBtYXhEZWx0YSA9IGN1cnJlbnRSZWZpbmVtZW50ICsgcGFnZXNQYWRkaW5nICsgMTtcblxuICAgICAgaWYgKG1pbkRlbHRhIDwgMCkge1xuICAgICAgICByZXR1cm4gcmFuZ2UoMCwgY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyBNYXRoLmFicyhtaW5EZWx0YSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWF4RGVsdGEgPiBuYlBhZ2VzKSB7XG4gICAgICAgIHJldHVybiByYW5nZShcbiAgICAgICAgICBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyAtIChtYXhEZWx0YSAtIG5iUGFnZXMpLFxuICAgICAgICAgIG5iUGFnZXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJhbmdlKFxuICAgICAgICBjdXJyZW50UmVmaW5lbWVudCAtIHBhZ2VzUGFkZGluZyxcbiAgICAgICAgY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyAxXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwYWdlc0FycmF5O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUGFnaW5hdGlvbicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RQYWdpbmF0aW9uLCB7XG4gICAgICBtYXhQYWdlczogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnRvdGFsUGFnZXMpLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVmaW5lKGV2ZW50OiBNb3VzZUV2ZW50LCBwYWdlOiBudW1iZXIpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKFxuICAgICAgcGFnZSA8IDAgfHxcbiAgICAgIHBhZ2UgPT09IHRoaXMuc3RhdGUuY3VycmVudFJlZmluZW1lbnQgfHxcbiAgICAgIHBhZ2UgPj0gdGhpcy5zdGF0ZS5uYlBhZ2VzXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUocGFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1BhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1BhZ2luYXRpb25dLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1BhZ2luYXRpb25dLFxuICBleHBvcnRzOiBbTmdBaXNQYWdpbmF0aW9uXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFnaW5hdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFJhbmdlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCAqIGFzIG5vVWlTbGlkZXIgZnJvbSAnbm91aXNsaWRlcic7XG5cbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmFuZ2VTbGlkZXJTdGF0ZSA9IHtcbiAgcmFuZ2U6IHsgbWluOiBudW1iZXI7IG1heDogbnVtYmVyIH07XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHN0YXJ0OiBudW1iZXJbXTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYW5nZS1zbGlkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxkaXYgW2NsYXNzXT1cImN4KCdib2R5JylcIj5cbiAgICAgICAgPGRpdiAjc2xpZGVyQ29udGFpbmVyPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmFuZ2VTbGlkZXIgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQFZpZXdDaGlsZCgnc2xpZGVyQ29udGFpbmVyJykgcHVibGljIHNsaWRlckNvbnRhaW5lcjogYW55O1xuXG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBwaXBzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtaW4/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVjaXNpb246IG51bWJlciB8IHN0cmluZyA9IDI7XG5cbiAgcHVibGljIHN0YXRlOiBSYW5nZVNsaWRlclN0YXRlID0ge1xuICAgIHJhbmdlOiB7IG1pbjogMCwgbWF4OiAxIH0sXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHN0YXJ0OiBbMCwgMV0sXG4gIH07XG5cbiAgcHJpdmF0ZSBzbGlkZXI6IGFueTtcblxuICBnZXQgc3RlcCgpIHtcbiAgICAvLyBjb21wdXRlIHN0ZXAgZnJvbSB0aGUgcHJlY2lzaW9uIHZhbHVlXG4gICAgY29uc3QgcHJlY2lzaW9uID0gcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbikgfHwgMjtcbiAgICByZXR1cm4gMSAvIE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUmFuZ2VTbGlkZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0UmFuZ2UsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiBwYXJzZU51bWJlcklucHV0KHRoaXMubWF4KSxcbiAgICAgIG1pbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1pbiksXG4gICAgICBwcmVjaXNpb246IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSB7XG4gICAgICAvLyBjcmVhdGUgc2xpZGVyXG4gICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIGFuaW1hdGU6IGZhbHNlLFxuICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgcmFuZ2U6IHsgbWluOiAwLCBtYXg6IDEgfSxcbiAgICAgICAgc3RhcnQ6IFswLCAxXSxcbiAgICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgICB0b29sdGlwczogdGhpcy50b29sdGlwcyAmJiBbXG4gICAgICAgICAgeyB0bzogdGhpcy5mb3JtYXRUb29sdGlwIH0sXG4gICAgICAgICAgeyB0bzogdGhpcy5mb3JtYXRUb29sdGlwIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5waXBzID09PSB0cnVlIHx8IHR5cGVvZiB0aGlzLnBpcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB7XG4gICAgICAgICAgcGlwczoge1xuICAgICAgICAgICAgZGVuc2l0eTogMyxcbiAgICAgICAgICAgIG1vZGU6ICdwb3NpdGlvbnMnLFxuICAgICAgICAgICAgc3RlcHBlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlczogWzAsIDUwLCAxMDBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBpcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgeyBwaXBzOiB0aGlzLnBpcHMgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcblxuICAgICAgLy8gcmVnaXN0ZXIgbGlzdGVuIGV2ZW50c1xuICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIubmF0aXZlRWxlbWVudC5ub1VpU2xpZGVyLm9uKFxuICAgICAgICAnY2hhbmdlJyxcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGNvbXBvbmVudCBpbm5lciBzdGF0ZVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHN0YXRlXG4gICAgY29uc3Qge1xuICAgICAgcmFuZ2U6IHsgbWluLCBtYXggfSxcbiAgICAgIHN0YXJ0LFxuICAgIH0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGRpc2FibGVkID0gbWluID09PSBtYXg7XG4gICAgY29uc3QgcmFuZ2UgPSBkaXNhYmxlZCA/IHsgbWluLCBtYXg6IG1heCArIDAuMDAwMSB9IDogeyBtaW4sIG1heCB9O1xuXG4gICAgdGhpcy5zbGlkZXIudXBkYXRlT3B0aW9ucyh7IGRpc2FibGVkLCByYW5nZSwgc3RhcnQgfSk7XG4gIH07XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZXM6IHN0cmluZ1tdIHwgbnVtYmVyW10pID0+IHtcbiAgICB0aGlzLnN0YXRlLnJlZmluZSh2YWx1ZXMpO1xuICB9O1xuXG4gIHB1YmxpYyBmb3JtYXRUb29sdGlwID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gdmFsdWUudG9GaXhlZChwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNSYW5nZVNsaWRlciB9IGZyb20gJy4vcmFuZ2Utc2xpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNSYW5nZVNsaWRlcl0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUmFuZ2VTbGlkZXJdLFxuICBleHBvcnRzOiBbTmdBaXNSYW5nZVNsaWRlcl0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RSZWZpbmVtZW50TGlzdCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gIGNhblJlZmluZTogYm9vbGVhbjtcbiAgY2FuVG9nZ2xlU2hvd01vcmU6IGJvb2xlYW47XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGlzU2hvd2luZ01vcmU6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB0b2dnbGVTaG93TW9yZTogRnVuY3Rpb247XG4gIHNlYXJjaEZvckl0ZW1zOiBGdW5jdGlvbjtcbiAgaXNGb3JtU2VhcmNoOiBib29sZWFuO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJlZmluZW1lbnQtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJzZWFyY2hhYmxlXCJcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWFyY2hCb3gnKVwiXG4gICAgICA+XG4gICAgICAgIDxhaXMtZmFjZXRzLXNlYXJjaFxuICAgICAgICAgIFtzZWFyY2hdPVwic3RhdGUuc2VhcmNoRm9ySXRlbXNcIlxuICAgICAgICAgIFtzZWFyY2hQbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICAgID5cbiAgICAgICAgPC9haXMtZmFjZXRzLXNlYXJjaD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdjaGVja2JveCcpXCJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cIml0ZW0uaXNSZWZpbmVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+XG4gICAgICAgICAgICAgIDxhaXMtaGlnaGxpZ2h0IGF0dHJpYnV0ZT1cImhpZ2hsaWdodGVkXCIgW2hpdF09XCJpdGVtXCI+PC9haXMtaGlnaGxpZ2h0PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJzaG93TW9yZUxpbWl0ICYmIHN0YXRlLmNhblRvZ2dsZVNob3dNb3JlXCJcbiAgICAgICAgKGNsaWNrKT1cInN0YXRlLnRvZ2dsZVNob3dNb3JlKClcIlxuICAgICAgPlxuICAgICAgICB7e3N0YXRlLmlzU2hvd2luZ01vcmUgPyBzaG93TGVzc0xhYmVsIDogc2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSZWZpbmVtZW50TGlzdCBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMYWJlbDogc3RyaW5nID0gJ1Nob3cgbW9yZSc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TGVzc0xhYmVsOiBzdHJpbmcgPSAnU2hvdyBsZXNzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hhYmxlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VhcmNoIGhlcmUuLi4nO1xuXG4gIC8vIGNvbm5lY3RvcnMgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvcGVyYXRvcjogJ29yJyB8ICdhbmQnID0gJ29yJztcbiAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGltaXQ6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeTogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IFJlZmluZW1lbnRMaXN0U3RhdGUgPSB7XG4gICAgY2FuUmVmaW5lOiBmYWxzZSxcbiAgICBjYW5Ub2dnbGVTaG93TW9yZTogZmFsc2UsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGlzU2hvd2luZ01vcmU6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgdG9nZ2xlU2hvd01vcmU6IG5vb3AsXG4gICAgc2VhcmNoRm9ySXRlbXM6IG5vb3AsXG4gICAgaXNGb3JtU2VhcmNoOiBmYWxzZSxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSZWZpbmVtZW50TGlzdCcpO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFJlZmluZW1lbnRMaXN0LCB7XG4gICAgICBsaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLmxpbWl0KSxcbiAgICAgIHNob3dNb3JlTGltaXQ6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5zaG93TW9yZUxpbWl0KSxcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICAgIGVzY2FwZUZhY2V0VmFsdWVzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoXG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQsXG4gICAgaXRlbTogeyBpc1JlZmluZWQ6IGJvb2xlYW47IHZhbHVlOiBzdHJpbmcgfVxuICApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuY2FuUmVmaW5lKSB7XG4gICAgICAvLyB1cGRhdGUgVUkgZGlyZWN0bHksIGl0IHdpbGwgdXBkYXRlIHRoZSBjaGVja2JveCBzdGF0ZVxuICAgICAgaXRlbS5pc1JlZmluZWQgPSAhaXRlbS5pc1JlZmluZWQ7XG5cbiAgICAgIC8vIHJlZmluZSB0aHJvdWdoIEFsZ29saWEgQVBJXG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShpdGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJlbSB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWZhY2V0cy1zZWFyY2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcpXCJcbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiXG4gICAgICAgICAgYXV0b2NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3tzZWFyY2hQbGFjZWhvbGRlcn19XCJcbiAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXQgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3N1Ym1pdEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQwIDQwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMTBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjYuODA0IDI5LjAxYy0yLjgzMiAyLjM0LTYuNDY1IDMuNzQ2LTEwLjQyNiAzLjc0NkM3LjMzMyAzMi43NTYgMCAyNS40MjQgMCAxNi4zNzggMCA3LjMzMyA3LjMzMyAwIDE2LjM3OCAwYzkuMDQ2IDAgMTYuMzc4IDcuMzMzIDE2LjM3OCAxNi4zNzggMCAzLjk2LTEuNDA2IDcuNTk0LTMuNzQ2IDEwLjQyNmwxMC41MzQgMTAuNTM0Yy42MDcuNjA3LjYxIDEuNTktLjAwNCAyLjIwMi0uNjEuNjEtMS41OTcuNjEtMi4yMDIuMDA0TDI2LjgwNCAyOS4wMXptLTEwLjQyNi42MjdjNy4zMjMgMCAxMy4yNi01LjkzNiAxMy4yNi0xMy4yNiAwLTcuMzItNS45MzctMTMuMjU3LTEzLjI2LTEzLjI1N0M5LjA1NiAzLjEyIDMuMTIgOS4wNTYgMy4xMiAxNi4zNzhjMCA3LjMyMyA1LjkzNiAxMy4yNiAxMy4yNTggMTMuMjZ6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgICB0eXBlPVwicmVzZXRcIlxuICAgICAgICAgIHRpdGxlPVwiQ2xlYXIgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIGhpZGRlblxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3Jlc2V0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgd2lkdGg9XCIxMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04LjExNCAxMEwuOTQ0IDIuODMgMCAxLjg4NSAxLjg4NiAwbC45NDMuOTQzTDEwIDguMTEzbDcuMTctNy4xNy45NDQtLjk0M0wyMCAxLjg4NmwtLjk0My45NDMtNy4xNyA3LjE3IDcuMTcgNy4xNy45NDMuOTQ0TDE4LjExNCAyMGwtLjk0My0uOTQzLTcuMTctNy4xNy03LjE3IDcuMTctLjk0NC45NDNMMCAxOC4xMTRsLjk0My0uOTQzTDguMTEzIDEwelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzRmFjZXRzU2VhcmNoIHtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2g6IEZ1bmN0aW9uO1xuXG4gIHB1YmxpYyBjeCA9IGJlbSgnU2VhcmNoQm94Jyk7XG5cbiAgcHVibGljIHNlYXJjaFF1ZXJ5ID0gJyc7XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWFyY2hRdWVyeSA9IHZhbHVlO1xuICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoUXVlcnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuLi9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0IH0gZnJvbSAnLi9yZWZpbmVtZW50LWxpc3QnO1xuaW1wb3J0IHsgTmdBaXNGYWNldHNTZWFyY2ggfSBmcm9tICcuL2ZhY2V0cy1zZWFyY2gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JlZmluZW1lbnRMaXN0LCBOZ0Fpc0ZhY2V0c1NlYXJjaF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUmVmaW5lbWVudExpc3RdLFxuICBleHBvcnRzOiBbTmdBaXNSZWZpbmVtZW50TGlzdF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5nQWlzSGlnaGxpZ2h0TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSZWZpbmVtZW50TGlzdE1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFNlYXJjaEJveCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1zZWFyY2gtYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnKVwiXG4gICAgICAgICAgYXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuICAgICAgICAgIGF1dG9jb3JyZWN0PVwib2ZmXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgICAgcm9sZT1cInRleHRib3hcIlxuICAgICAgICAgIHNwZWxsY2hlY2s9XCJmYWxzZVwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJzdGF0ZS5xdWVyeVwiXG4gICAgICAgICAgKGlucHV0KT1cImhhbmRsZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgKGZvY3VzKT1cImZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICNzZWFyY2hCb3hcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3N1Ym1pdFRpdGxlfX1cIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjeCgnc3VibWl0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAgNDBcIlxuICAgICAgICAgICAgd2lkdGg9XCI0MFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCI0MFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0yNi44MDQgMjkuMDFjLTIuODMyIDIuMzQtNi40NjUgMy43NDYtMTAuNDI2IDMuNzQ2QzcuMzMzIDMyLjc1NiAwIDI1LjQyNCAwIDE2LjM3OCAwIDcuMzMzIDcuMzMzIDAgMTYuMzc4IDBjOS4wNDYgMCAxNi4zNzggNy4zMzMgMTYuMzc4IDE2LjM3OCAwIDMuOTYtMS40MDYgNy41OTQtMy43NDYgMTAuNDI2bDEwLjUzNCAxMC41MzRjLjYwNy42MDcuNjEgMS41OS0uMDA0IDIuMjAyLS42MS42MS0xLjU5Ny42MS0yLjIwMi4wMDRMMjYuODA0IDI5LjAxem0tMTAuNDI2LjYyN2M3LjMyMyAwIDEzLjI2LTUuOTM2IDEzLjI2LTEzLjI2IDAtNy4zMi01LjkzNy0xMy4yNTctMTMuMjYtMTMuMjU3QzkuMDU2IDMuMTIgMy4xMiA5LjA1NiAzLjEyIDE2LjM3OGMwIDcuMzIzIDUuOTM2IDEzLjI2IDEzLjI1OCAxMy4yNnpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAgIHR5cGU9XCJyZXNldFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3Jlc2V0VGl0bGV9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVJlc2V0KCRldmVudClcIlxuICAgICAgICAgIFtoaWRkZW5dPVwiIXN0YXRlLnF1ZXJ5IHx8IChzdGF0ZS5xdWVyeSAmJiAhc3RhdGUucXVlcnkudHJpbSgpKVwiPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdyZXNldEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xMTQgMTBMLjk0NCAyLjgzIDAgMS44ODUgMS44ODYgMGwuOTQzLjk0M0wxMCA4LjExM2w3LjE3LTcuMTcuOTQ0LS45NDNMMjAgMS44ODZsLS45NDMuOTQzLTcuMTcgNy4xNyA3LjE3IDcuMTcuOTQzLjk0NEwxOC4xMTQgMjBsLS45NDMtLjk0My03LjE3LTcuMTctNy4xNyA3LjE3LS45NDQuOTQzTDAgMTguMTE0bC45NDMtLjk0M0w4LjExMyAxMHpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NlYXJjaEJveCBleHRlbmRzIEJhc2VXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoQm94Jykgc2VhcmNoQm94OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2gnO1xuICBASW5wdXQoKSBwdWJsaWMgc3VibWl0VGl0bGU6IHN0cmluZyA9ICdTdWJtaXQnO1xuICBASW5wdXQoKSBwdWJsaWMgcmVzZXRUaXRsZTogc3RyaW5nID0gJ1Jlc2V0JztcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEFzWW91VHlwZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvZm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBPdXRwdXQgZXZlbnRzXG4gIC8vIGZvcm1cbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIGlucHV0XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIHF1ZXJ5OiAnJyxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU2VhcmNoQm94Jyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFNlYXJjaEJveCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9mb2N1cykge1xuICAgICAgdGhpcy5zZWFyY2hCb3gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQocXVlcnkpO1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZVN1Ym1pdChldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIHNlbmQgc3VibWl0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KGV2ZW50KTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZSh0aGlzLnN0YXRlLnF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlUmVzZXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvLyBzZW5kIHJlc2V0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnJlc2V0LmVtaXQoZXZlbnQpO1xuXG4gICAgLy8gcmVzZXQgc2VhcmNoXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNTZWFyY2hCb3ggfSBmcm9tICcuL3NlYXJjaC1ib3gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1NlYXJjaEJveF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzU2VhcmNoQm94XSxcbiAgZXhwb3J0czogW05nQWlzU2VhcmNoQm94XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU2VhcmNoQm94TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFNvcnRCeVNlbGVjdG9yIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXNvcnQtYnknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWxlY3QnKVwiXG4gICAgICAgIChjaGFuZ2UpPVwic3RhdGUucmVmaW5lKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnb3B0aW9uJylcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLm9wdGlvbnNcIlxuICAgICAgICAgIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXRlbS52YWx1ZSA9PT0gc3RhdGUuY3VycmVudFJlZmluZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTb3J0QnkgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IHtcbiAgICBjdXJyZW50UmVmaW5lbWVudDogc3RyaW5nIHwgbnVsbDtcbiAgICBvcHRpb25zOiB7fVtdO1xuICAgIHJlZmluZTogRnVuY3Rpb247XG4gIH0gPSB7XG4gICAgY3VycmVudFJlZmluZW1lbnQ6IG51bGwsXG4gICAgb3B0aW9uczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1NvcnRCeScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTb3J0QnlTZWxlY3RvciwgeyBpbmRpY2VzOiB0aGlzLml0ZW1zIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1NvcnRCeSB9IGZyb20gJy4vc29ydC1ieSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzU29ydEJ5XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNTb3J0QnldLFxuICBleHBvcnRzOiBbTmdBaXNTb3J0QnldLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTb3J0QnlNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhclJhdGluZyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFJhdGluZ01lbnVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaGFzTm9SZXN1bHRzOiBib29sZWFuO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1yYXRpbmctbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxzdmcgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XG4gICAgICAgIDxzeW1ib2xcbiAgICAgICAgICBpZD1cImFpcy1TdGFyUmF0aW5nLXN0YXJTeW1ib2xcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgLjI4OGwyLjgzMyA4LjcxOGg5LjE2N2wtNy40MTcgNS4zODkgMi44MzMgOC43MTgtNy40MTYtNS4zODgtNy40MTcgNS4zODggMi44MzMtOC43MTgtNy40MTYtNS4zODloOS4xNjd6XCIvPlxuICAgICAgICA8L3N5bWJvbD5cbiAgICAgICAgPHN5bWJvbFxuICAgICAgICAgIGlkPVwiYWlzLVN0YXJSYXRpbmctc3RhckVtcHR5U3ltYm9sXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgID5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDYuNzZsMS4zNzkgNC4yNDZoNC40NjVsLTMuNjEyIDIuNjI1IDEuMzc5IDQuMjQ2LTMuNjExLTIuNjI1LTMuNjEyIDIuNjI1IDEuMzc5LTQuMjQ2LTMuNjEyLTIuNjI1aDQuNDY1bDEuMzgtNC4yNDZ6bTAtNi40NzJsLTIuODMzIDguNzE4aC05LjE2N2w3LjQxNiA1LjM4OS0yLjgzMyA4LjcxOCA3LjQxNy01LjM4OCA3LjQxNiA1LjM4OC0yLjgzMy04LjcxOCA3LjQxNy01LjM4OWgtOS4xNjdsLTIuODMzLTguNzE4elwiLz5cbiAgICAgICAgPC9zeW1ib2w+XG4gICAgICA8L3N2Zz5cblxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zXCJcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cInt7c3RhdGUuY3JlYXRlVVJMKGl0ZW0udmFsdWUpfX1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHN0YXIgb2YgaXRlbS5zdGFyc1wiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdGFySWNvbicpXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHVzZVxuICAgICAgICAgICAgICAgICpuZ0lmPVwic3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyU3ltYm9sXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L3VzZT5cblxuICAgICAgICAgICAgICA8dXNlXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhc3RhclwiXG4gICAgICAgICAgICAgICAgeGxpbms6aHJlZj1cIiNhaXMtU3RhclJhdGluZy1zdGFyRW1wdHlTeW1ib2xcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvdXNlPlxuICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7YW5kVXBMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYXRpbmdNZW51IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmRVcExhYmVsOiBzdHJpbmcgPSAnJiBVcCc7XG5cbiAgLy8gY29ubmVjdG9ycyBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciA9IDU7XG5cbiAgcHVibGljIHN0YXRlOiBSYXRpbmdNZW51U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGhhc05vUmVzdWx0czogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYXRpbmdNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFN0YXJSYXRpbmcsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUmF0aW5nTWVudSB9IGZyb20gJy4vcmF0aW5nLW1lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JhdGluZ01lbnVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1JhdGluZ01lbnVdLFxuICBleHBvcnRzOiBbTmdBaXNSYXRpbmdNZW51XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmF0aW5nTWVudU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U3RhdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuXG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXN0YXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFwiPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2NsYXNzXT1cImN4KCd0ZXh0JylcIj5cbiAgICAgICAge3tzdGF0ZS5uYkhpdHN9fSByZXN1bHRzIGZvdW5kIGluIHt7c3RhdGUucHJvY2Vzc2luZ1RpbWVNU319bXMuXG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU3RhdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBhbnk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIGhpdFBlclBhZ2U6IDAsXG4gICAgbmJIaXRzOiAwLFxuICAgIG5iUGFnZXM6IDAsXG4gICAgcGFnZTogMCxcbiAgICBwcm9jZXNzaW5nVGltZU1TOiAwLFxuICAgIHF1ZXJ5OiAnJyxcbiAgfTtcblxuICBnZXQgdGVtcGxhdGVDb250ZXh0KCkge1xuICAgIHJldHVybiB7IHN0YXRlOiB0aGlzLnN0YXRlIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTdGF0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTdGF0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1N0YXRzIH0gZnJvbSAnLi9zdGF0cyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzU3RhdHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1N0YXRzXSxcbiAgZXhwb3J0czogW05nQWlzU3RhdHNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTdGF0c01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RUb2dnbGUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBUb2dnbGVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgdmFsdWU6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNvdW50PzogbnVtYmVyO1xuICAgIGlzUmVmaW5lZD86IGJvb2xlYW47XG4gIH07XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJylcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIFtjbGFzc109XCJjeCgnY2hlY2tib3gnKVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwie3tzdGF0ZS52YWx1ZS5uYW1lfX1cIlxuICAgICAgICAgICAgICBbY2hlY2tlZF09XCJzdGF0ZS52YWx1ZS5pc1JlZmluZWRcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbFRleHQnKVwiPlxuICAgICAgICAgICAgICB7e2xhYmVsIHx8IHN0YXRlLnZhbHVlLm5hbWV9fVxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e3N0YXRlLnZhbHVlLmNvdW50fX08L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzVG9nZ2xlIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB2YWx1ZXM6IHsgb24/OiBib29sZWFuOyBvZmY/OiBib29sZWFuIH0gPSB7IG9uOiB0cnVlLCBvZmY6IHVuZGVmaW5lZCB9O1xuXG4gIHB1YmxpYyBzdGF0ZTogVG9nZ2xlU3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB2YWx1ZToge30sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignVG9nZ2xlUmVmaW5lbWVudCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RUb2dnbGUsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHRoaXMuc3RhdGUudmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNUb2dnbGUgfSBmcm9tICcuL3RvZ2dsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzVG9nZ2xlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNUb2dnbGVdLFxuICBleHBvcnRzOiBbTmdBaXNUb2dnbGVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNUb2dnbGVNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdCwgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0UmFuZ2UgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOdW1lcmljUmFuZ2VTdGF0ZSA9IHtcbiAgcmFuZ2U6IHsgbWluPzogbnVtYmVyOyBtYXg/OiBudW1iZXIgfTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgc3RhcnQ6IG51bWJlcltdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIlxuICAgICAgICBub3ZhbGlkYXRlXG4gICAgICA+XG4gICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2N1cnJlbmN5JylcIj57e2N1cnJlbmN5fX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2lucHV0JywgJ21pbicpXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW21pbl09XCJzdGF0ZS5yYW5nZS5taW5cIlxuICAgICAgICAgICAgW21heF09XCJzdGF0ZS5yYW5nZS5tYXhcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInN0YXRlLnJhbmdlLm1pblwiXG4gICAgICAgICAgICBbdmFsdWVdPVwibWluSW5wdXRWYWx1ZVwiXG4gICAgICAgICAgICBbc3RlcF09XCJzdGVwXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiaGFuZGxlQ2hhbmdlKCRldmVudCwgJ21pbicpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnc2VwYXJhdG9yJylcIj57e3NlcGFyYXRvcn19PC9zcGFuPlxuXG4gICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2N1cnJlbmN5JylcIj57e2N1cnJlbmN5fX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2lucHV0JywgJ21heCcpXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW21pbl09XCJzdGF0ZS5yYW5nZS5taW5cIlxuICAgICAgICAgICAgW21heF09XCJzdGF0ZS5yYW5nZS5tYXhcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInN0YXRlLnJhbmdlLm1heFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwibWF4SW5wdXRWYWx1ZVwiXG4gICAgICAgICAgICBbc3RlcF09XCJzdGVwXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiaGFuZGxlQ2hhbmdlKCRldmVudCwgJ21heCcpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3N1Ym1pdCcpXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlU3VibWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAge3tzdWJtaXRMYWJlbH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlSW5wdXQgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGN1cnJlbmN5OiBzdHJpbmcgPSAnJCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3I6IHN0cmluZyA9ICd0byc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWJtaXRMYWJlbDogc3RyaW5nID0gJ0dvJztcblxuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtaW4/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVjaXNpb246IG51bWJlciB8IHN0cmluZyA9IDI7XG5cbiAgLy8gaW5uZXIgc3RhdGVcbiAgcHVibGljIG1pbklucHV0VmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgPSAnJztcbiAgcHVibGljIG1heElucHV0VmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgPSAnJztcblxuICBnZXQgc3RlcCgpIHtcbiAgICBjb25zdCBwcmVjaXNpb24gPSBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSB8fCAyO1xuICAgIHJldHVybiAxIC8gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGU6IE51bWVyaWNSYW5nZVN0YXRlID0ge1xuICAgIHJhbmdlOiB7IG1pbjogdW5kZWZpbmVkLCBtYXg6IHVuZGVmaW5lZCB9LFxuICAgIHJlZmluZTogbm9vcCxcbiAgICBzdGFydDogWzAsIDBdLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1JhbmdlSW5wdXQnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0UmFuZ2UsIHtcbiAgICAgIGF0dHJpYnV0ZU5hbWU6IHRoaXMuYXR0cmlidXRlLFxuICAgICAgbWF4OiBwYXJzZU51bWJlcklucHV0KHRoaXMubWF4KSxcbiAgICAgIG1pbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLm1pbiksXG4gICAgICBwcmVjaXNpb246IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pLFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UoZXZlbnQ6IGFueSwgdHlwZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZU51bWJlcklucHV0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21pbicpIHtcbiAgICAgIHRoaXMubWluSW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heElucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlU3VibWl0KGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoW3RoaXMubWluSW5wdXRWYWx1ZSwgdGhpcy5tYXhJbnB1dFZhbHVlXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXQgfSBmcm9tICcuL3JhbmdlLWlucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNSYW5nZUlucHV0XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNSYW5nZUlucHV0XSxcbiAgZXhwb3J0czogW05nQWlzUmFuZ2VJbnB1dF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXBhbmVsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGVhZGVyXCIgY2xhc3M9XCJhaXMtUGFuZWwtaGVhZGVyXCI+XG4gICAgICAgIHt7aGVhZGVyfX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYWlzLVBhbmVsLWJvZHlcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cImFpcy1QYW5lbC1mb290ZXJcIj5cbiAgICAgICAge3tmb290ZXJ9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFuZWwge1xuICBASW5wdXQoKSBwdWJsaWMgaGVhZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZm9vdGVyPzogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcbmV4cG9ydCB7IE5nQWlzUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNQYW5lbF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUGFuZWxdLFxuICBleHBvcnRzOiBbTmdBaXNQYW5lbF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1BhbmVsTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIFRlc3RhYmlsaXR5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdENvbmZpZ3VyZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHtcbiAgTmdBaXNJbnN0YW50U2VhcmNoLFxuICBTZWFyY2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNvbmZpZ3VyZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDb25maWd1cmUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgcHJpdmF0ZSBpbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnM6IFNlYXJjaFBhcmFtZXRlcnM7XG4gIHByaXZhdGUgZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47IC8vIFNlYXJjaFBhcmFtZXRlcnMgKEkgZG9uJ3Qga25vdyBob3cgdG8gZ2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHR5cGUpXG5cbiAgcHVibGljIHN0YXRlOiB7IHJlZmluZTogRnVuY3Rpb24gfSA9IHtcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ29uZmlndXJlJyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2VhcmNoUGFyYW1ldGVycyh2YWx1ZXM6IFNlYXJjaFBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyA9IHZhbHVlcztcbiAgICBpZiAoIXRoaXMuZGlmZmVyICYmIHZhbHVlcykge1xuICAgICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZXMpLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q29uZmlndXJlLCB7XG4gICAgICBzZWFyY2hQYXJhbWV0ZXJzOiB0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUodGhpcy5pbnRlcm5hbFNlYXJjaFBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzQ29uZmlndXJlIH0gZnJvbSAnLi9jb25maWd1cmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0NvbmZpZ3VyZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzQ29uZmlndXJlXSxcbiAgZXhwb3J0czogW05nQWlzQ29uZmlndXJlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ29uZmlndXJlTW9kdWxlIHt9XG4iLCJpbXBvcnQgKiBhcyBhbGdvbGlhc2VhcmNoUHJveHkgZnJvbSAnYWxnb2xpYXNlYXJjaC9pbmRleCc7XG5pbXBvcnQgKiBhcyBlbmNvZGVQcm94eSBmcm9tICdxdWVyeXN0cmluZy1lczMvZW5jb2RlJztcblxuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4vdmVyc2lvbic7XG5cbi8vIEFPVCArIFJvbGx1cCB3b3JrYXJvdW5kXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvMTI2NyNpc3N1ZWNvbW1lbnQtMjk2Mzk1NzM0XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhc2VhcmNoUHJveHkuZGVmYXVsdCB8fCBhbGdvbGlhc2VhcmNoUHJveHk7XG5jb25zdCBlbmNvZGUgPSBlbmNvZGVQcm94eS5kZWZhdWx0IHx8IGVuY29kZVByb3h5O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1NSQWxnb2xpYUNsaWVudCh7XG4gIGh0dHBDbGllbnQsXG4gIEh0dHBIZWFkZXJzLFxuICB0cmFuc2ZlclN0YXRlLFxuICBtYWtlU3RhdGVLZXksXG59KSB7XG4gIGNvbnNvbGUud2FybihcbiAgICAnYGNyZWF0ZVNTUkFsZ29saWFDbGllbnRgIGlzIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYGNyZWF0ZVNTUlNlYXJjaENsaWVudGAgdG8gYmUgcGx1Z2dlZCB0byBgc2VhcmNoQ2xpZW50YC4nXG4gICk7XG5cbiAgcmV0dXJuIChfLCBhcHBJZCwgYXBpS2V5KSA9PlxuICAgIGNyZWF0ZVNTUlNlYXJjaENsaWVudCh7XG4gICAgICBhcHBJZCxcbiAgICAgIGFwaUtleSxcbiAgICAgIGh0dHBDbGllbnQsXG4gICAgICBIdHRwSGVhZGVycyxcbiAgICAgIHRyYW5zZmVyU3RhdGUsXG4gICAgICBtYWtlU3RhdGVLZXksXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTU1JTZWFyY2hDbGllbnQoe1xuICBhcHBJZCxcbiAgYXBpS2V5LFxuICBodHRwQ2xpZW50LFxuICBIdHRwSGVhZGVycyxcbiAgdHJhbnNmZXJTdGF0ZSxcbiAgbWFrZVN0YXRlS2V5LFxufSkge1xuICBjb25zdCBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKGFwcElkLCBhcGlLZXksIHt9KTtcbiAgY2xpZW50LmFkZEFsZ29saWFBZ2VudChgYW5ndWxhci1pbnN0YW50c2VhcmNoICR7VkVSU0lPTn1gKTtcblxuICBjbGllbnQuX3JlcXVlc3QgPSAocmF3VXJsLCBvcHRzKSA9PiB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldChcbiAgICAgICdjb250ZW50LXR5cGUnLFxuICAgICAgb3B0cy5tZXRob2QgPT09ICdQT1NUJ1xuICAgICAgICA/ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgKTtcblxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnYWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIGNvbnN0IHVybCA9XG4gICAgICByYXdVcmwgKyAocmF3VXJsLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPycpICsgZW5jb2RlKG9wdHMuaGVhZGVycyk7XG5cbiAgICBjb25zdCB0cmFuc2ZlclN0YXRlS2V5ID0gbWFrZVN0YXRlS2V5KGBuZ2Fpcygke29wdHMuYm9keX0pYCk7XG5cbiAgICBpZiAodHJhbnNmZXJTdGF0ZS5oYXNLZXkodHJhbnNmZXJTdGF0ZUtleSkpIHtcbiAgICAgIGNvbnN0IHJlc3AgPSBKU09OLnBhcnNlKHRyYW5zZmVyU3RhdGUuZ2V0KHRyYW5zZmVyU3RhdGVLZXksIHt9KSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogcmVzcC5zdGF0dXMsXG4gICAgICAgIGJvZHk6IHJlc3AuYm9keSxcbiAgICAgICAgaGVhZGVyczogcmVzcC5oZWFkZXJzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGh0dHBDbGllbnRcbiAgICAgICAgLnJlcXVlc3Qob3B0cy5tZXRob2QsIHVybCwge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgYm9keTogb3B0cy5ib2R5LFxuICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgcmVzcCA9PiB7XG4gICAgICAgICAgICB0cmFuc2ZlclN0YXRlLnNldCh0cmFuc2ZlclN0YXRlS2V5LCBKU09OLnN0cmluZ2lmeShyZXNwKSk7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgIGJvZHk6IHJlc3AuYm9keSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcC5oZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwID0+XG4gICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBjbGllbnQ7XG59XG4iLCJpbXBvcnQgeyBBbGdvbGlhU2VhcmNoSGVscGVyIH0gZnJvbSAnYWxnb2xpYXNlYXJjaC1oZWxwZXInO1xuXG4vLyBUcmFuc2Zvcm1zIHVybCBxdWVyeSB0byBTZWFyY2hQYXJhbWV0ZXJzXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZXJ2ZXJSZXF1ZXN0KHJlcTogeyB1cmw6IHN0cmluZyB9IHwgdm9pZCkge1xuICBpZiAocmVxICYmIHJlcS51cmwgJiYgcmVxLnVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgY29uc3QgcXVlcnkgPSByZXEudXJsLnNwbGl0KCc/JylbMV07XG4gICAgcmV0dXJuIEFsZ29saWFTZWFyY2hIZWxwZXIuZ2V0Q29uZmlndXJhdGlvbkZyb21RdWVyeVN0cmluZyhxdWVyeSk7XG4gIH1cblxuICByZXR1cm4ge307XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBNb2R1bGVzXG5pbXBvcnQgeyBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNCcmVhZGNydW1iTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUgfSBmcm9tICcuL2NsZWFyLXJlZmluZW1lbnRzL2NsZWFyLXJlZmluZW1lbnRzLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIH0gZnJvbSAnLi9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzQ3VycmVudFJlZmluZW1lbnRzTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVNb2R1bGUgfSBmcm9tICcuL2hpZXJhcmNoaWNhbC1tZW51L2hpZXJhcmNoaWNhbC1tZW51Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzSGl0c1BlclBhZ2VNb2R1bGUgfSBmcm9tICcuL2hpdHMtcGVyLXBhZ2UvaGl0cy1wZXItcGFnZS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNIaXRzUGVyUGFnZU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNIaXRzTW9kdWxlIH0gZnJvbSAnLi9oaXRzL2hpdHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSGl0c01vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUgfSBmcm9tICcuL2luZmluaXRlLWhpdHMvaW5maW5pdGUtaGl0cy5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNJbmZpbml0ZUhpdHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSB9IGZyb20gJy4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2hNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTWVudU1vZHVsZSB9IGZyb20gJy4vbWVudS9tZW51Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc01lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTnVtZXJpY01lbnVNb2R1bGUgfSBmcm9tICcuL251bWVyaWMtbWVudS9udW1lcmljLW1lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzTnVtZXJpY01lbnVNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzTnVtZXJpY1NlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzTnVtZXJpY1NlbGVjdG9yTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1BhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNQYWdpbmF0aW9uTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIH0gZnJvbSAnLi9yYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlIH0gZnJvbSAnLi9yZWZpbmVtZW50LWxpc3QvcmVmaW5lbWVudC1saXN0Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLWJveC9zZWFyY2gtYm94Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1NlYXJjaEJveE1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNTb3J0QnlNb2R1bGUgfSBmcm9tICcuL3NvcnQtYnkvc29ydC1ieS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNTb3J0QnlNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUmF0aW5nTWVudU1vZHVsZSB9IGZyb20gJy4vcmF0aW5nLW1lbnUvcmF0aW5nLW1lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUmF0aW5nTWVudU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNTdGF0c01vZHVsZSB9IGZyb20gJy4vc3RhdHMvc3RhdHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzU3RhdHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzVG9nZ2xlTW9kdWxlIH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1RvZ2dsZU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfSBmcm9tICcuL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSGlnaGxpZ2h0TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUgfSBmcm9tICcuL3JhbmdlLWlucHV0L3JhbmdlLWlucHV0Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUGFuZWxNb2R1bGUgfSBmcm9tICcuL3BhbmVsL3BhbmVsLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1BhbmVsTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0NvbmZpZ3VyZU1vZHVsZSB9IGZyb20gJy4vY29uZmlndXJlL2NvbmZpZ3VyZS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNDb25maWd1cmVNb2R1bGUgfTtcblxuLy8gQ3VzdG9tIFNTUiBhbGdvbGlhc2VhcmNoQ2xpZW50XG5pbXBvcnQge1xuICBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50LFxuICBjcmVhdGVTU1JTZWFyY2hDbGllbnQsXG59IGZyb20gJy4vY3JlYXRlLXNzci1hbGdvbGlhLWNsaWVudCc7XG5leHBvcnQgeyBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50LCBjcmVhdGVTU1JTZWFyY2hDbGllbnQgfTtcblxuaW1wb3J0IHsgcGFyc2VTZXJ2ZXJSZXF1ZXN0IH0gZnJvbSAnLi9wYXJzZS1zZXJ2ZXItcmVxdWVzdCc7XG5leHBvcnQgeyBwYXJzZVNlcnZlclJlcXVlc3QgfTtcblxuLy8gQ3VzdG9tIHdpZGdldCB3aXRoIEJhc2VXaWRnZXQgY2xhc3NcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcbmV4cG9ydCB7IEJhc2VXaWRnZXQgfTtcblxuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuZXhwb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH07XG5cbmNvbnN0IE5HSVNfTU9EVUxFUyA9IFtcbiAgTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlLFxuICBOZ0Fpc0hpdHNNb2R1bGUsXG4gIE5nQWlzU2VhcmNoQm94TW9kdWxlLFxuICBOZ0Fpc0NsZWFyUmVmaW5lbWVudHNNb2R1bGUsXG4gIE5nQWlzTWVudU1vZHVsZSxcbiAgTmdBaXNQYWdpbmF0aW9uTW9kdWxlLFxuICBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlLFxuICBOZ0Fpc0hpdHNQZXJQYWdlTW9kdWxlLFxuICBOZ0Fpc1NvcnRCeU1vZHVsZSxcbiAgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUsXG4gIE5nQWlzTnVtZXJpY01lbnVNb2R1bGUsXG4gIE5nQWlzU3RhdHNNb2R1bGUsXG4gIE5nQWlzVG9nZ2xlTW9kdWxlLFxuICBOZ0Fpc0luZmluaXRlSGl0c01vZHVsZSxcbiAgTmdBaXNDdXJyZW50UmVmaW5lbWVudHNNb2R1bGUsXG4gIE5nQWlzSGllcmFyY2hpY2FsTWVudU1vZHVsZSxcbiAgTmdBaXNSYXRpbmdNZW51TW9kdWxlLFxuICBOZ0Fpc1JhbmdlU2xpZGVyTW9kdWxlLFxuICBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUsXG4gIE5nQWlzSGlnaGxpZ2h0TW9kdWxlLFxuICBOZ0Fpc1JhbmdlSW5wdXRNb2R1bGUsXG4gIE5nQWlzUGFuZWxNb2R1bGUsXG4gIE5nQWlzQ29uZmlndXJlTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogTkdJU19NT0RVTEVTLFxuICBpbXBvcnRzOiBbTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlLmZvclJvb3QoKV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUm9vdE1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoeyBpbXBvcnRzOiBOR0lTX01PRFVMRVMsIGV4cG9ydHM6IE5HSVNfTU9EVUxFUyB9KVxuZXhwb3J0IGNsYXNzIE5nQWlzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBOZ0Fpc1Jvb3RNb2R1bGUgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImFsZ29saWFzZWFyY2hQcm94eS5kZWZhdWx0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJub1VpU2xpZGVyLmNyZWF0ZSIsImFsZ29saWFzZWFyY2giLCJhbGdvbGlhc2VhcmNoUHJveHkiLCJlbmNvZGVQcm94eS5kZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsYUFBb0IsVUFBa0I7O1FBQzlCLEVBQUUsR0FBRyxVQUFTLE9BQWdCLEVBQUUsVUFBbUI7UUFDdkQsSUFBSSxPQUFPLEVBQUU7O2dCQUNMLGlCQUFpQixHQUFHLFNBQU8sVUFBVSxTQUFJLE9BQVM7O1lBR3hELElBQUksT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7O29CQUNoRSxvQkFBb0IsR0FBRyxTQUFPLE9BQVM7Z0JBQzdDLE9BQVUsaUJBQWlCLFNBQUksb0JBQXNCLENBQUM7YUFDdkQ7O1lBR0QsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsT0FBVSxpQkFBaUIsVUFBSyxVQUFZLENBQUM7YUFDOUM7O1lBR0QsT0FBTyxpQkFBaUIsQ0FBQztTQUMxQjs7UUFHRCxPQUFPLFNBQU8sVUFBWSxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxFQUFFLENBQUM7Q0FDWDs7Ozs7QUFFRCwwQkFBaUMsS0FBdUI7SUFDdEQsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDaEU7Ozs7O0FBRUQ7SUFBcUIsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCx5QkFBYzs7Q0FBVTs7Ozs7QUFFN0Msb0JBQTJCLENBQUM7SUFDMUIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMs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