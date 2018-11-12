(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('algoliasearch/lite'), require('instantsearch.js/es'), require('instantsearch.js/es/connectors'), require('nouislider'), require('algoliasearch/index'), require('querystring-es3/encode'), require('algoliasearch-helper')) :
    typeof define === 'function' && define.amd ? define('angular-instantsearch', ['exports', '@angular/core', '@angular/common', 'algoliasearch/lite', 'instantsearch.js/es', 'instantsearch.js/es/connectors', 'nouislider', 'algoliasearch/index', 'querystring-es3/encode', 'algoliasearch-helper'], factory) :
    (factory((global['angular-instantsearch'] = {}),global.ng.core,global.ng.common,null,global.instantsearch,global.instantsearch.connectors,global.noUiSlider,global.algoliasearch,global.qs.encode,global.algoliasearchHelper));
}(this, (function (exports,core,common,algoliasearchProxy,instantsearch,connectors,noUiSlider,algoliasearchProxy$1,encodeProxy,algoliasearchHelper) { 'use strict';

    var algoliasearchProxy__default = 'default' in algoliasearchProxy ? algoliasearchProxy['default'] : algoliasearchProxy;
    instantsearch = instantsearch && instantsearch.hasOwnProperty('default') ? instantsearch['default'] : instantsearch;
    var algoliasearchProxy$1__default = 'default' in algoliasearchProxy$1 ? algoliasearchProxy$1['default'] : algoliasearchProxy$1;
    var encodeProxy__default = 'default' in encodeProxy ? encodeProxy['default'] : encodeProxy;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    }

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
                if (options === void 0) {
                    options = {};
                }
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
                if (common.isPlatformBrowser(this.instantSearchParent.platformId)) {
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
            autoHideContainer: [{ type: core.Input }]
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
            this.change = new core.EventEmitter();
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
                if (!common.isPlatformBrowser(this.platformId)) {
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
            { type: core.Component, args: [{
                        selector: 'ais-instantsearch',
                        template: "<ng-content></ng-content>",
                    },] },
        ];
        NgAisInstantSearch.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        NgAisInstantSearch.propDecorators = {
            config: [{ type: core.Input }],
            instanceName: [{ type: core.Input }],
            change: [{ type: core.Output }]
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
             */ function () {
                return this.state.items.length === 0 && this.autoHideContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgAisBreadcrumb.prototype, "items", {
            get: /**
             * @return {?}
             */ function () {
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
                this.createWidget(connectors.connectBreadcrumb, {
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
            { type: core.Component, args: [{
                        selector: 'ais-breadcrumb',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of items\"\n          [class]=\"cx('item', item.isLast ? 'selected' : undefined)\"\n          (click)=\"handleClick($event, item)\"\n        >\n          <span\n            *ngIf=\"item.separator\"\n            [class]=\"cx('separator')\"\n            aria-hidden=\"true\"\n          >\n            >\n          </span>\n          <a\n            [class]=\"cx('link')\"\n            href=\"{{state.createURL(item.value)}}\"\n            *ngIf=\"!item.isLast\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.name}}\n          </a>\n\n          <span *ngIf=\"item.isLast\">\n            {{item.name}}\n          </span>\n        </li>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisBreadcrumb.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisBreadcrumb.propDecorators = {
            attributes: [{ type: core.Input }],
            rootPath: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisBreadcrumb],
                        entryComponents: [NgAisBreadcrumb],
                        exports: [NgAisBreadcrumb],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectClearAll, {
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
            { type: core.Component, args: [{
                        selector: 'ais-clear-refinements',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n        (click)=\"handleClick($event)\"\n        [disabled]=\"!state.hasRefinements\"\n      >\n        {{buttonLabel}}\n      </button>\n    </div>\n  ",
                    },] },
        ];
        NgAisClearRefinements.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisClearRefinements.propDecorators = {
            buttonLabel: [{ type: core.Input }],
            clearsQuery: [{ type: core.Input }],
            excludeAttributes: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisClearRefinements],
                        entryComponents: [NgAisClearRefinements],
                        exports: [NgAisClearRefinements],
                        imports: [common.CommonModule],
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
             */ function () {
                return this.state.refinements.length === 0 && this.autoHideContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgAisCurrentRefinements.prototype, "refinements", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
                this.createWidget(connectors.connectCurrentRefinedValues, {
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
            { type: core.Component, args: [{
                        selector: 'ais-current-refinements',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'before' || clearRefinements === true\">\n        {{clearRefinementsLabel}}\n      </button>\n\n      <ul\n        [class]=\"cx('list')\"\n        *ngFor=\"let refinement of refinements\"\n      >\n        <li [class]=\"cx('item')\">\n          <span [class]=\"cx('label')\">{{refinement.label}}:</span>\n\n          <span\n            [class]=\"cx('category')\"\n            *ngFor=\"let item of refinement.items\"\n          >\n            <span [class]=\"cx('categoryLabel')\">{{item.name}}</span>\n            <button [class]=\"cx('delete')\" (click)=\"handleClick($event, item)\">\u2715</button>\n          </span>\n        </li>\n      </ul>\n\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'after'\">\n        {{clearRefinementsLabel}}\n      </button>\n    </div>\n  ",
                    },] },
        ];
        NgAisCurrentRefinements.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisCurrentRefinements.propDecorators = {
            clearRefinements: [{ type: core.Input }],
            clearRefinementsLabel: [{ type: core.Input }],
            transformItems: [{ type: core.Input }],
            onlyListedAttributes: [{ type: core.Input }],
            clearsQuery: [{ type: core.Input }],
            attributes: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisCurrentRefinements],
                        entryComponents: [NgAisCurrentRefinements],
                        exports: [NgAisCurrentRefinements],
                        imports: [common.CommonModule],
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
             */ function () {
                return this.state.items.length === 0 && this.autoHideContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgAisHierarchicalMenu.prototype, "items", {
            get: /**
             * @return {?}
             */ function () {
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
                this.createWidget(connectors.connectHierarchicalMenu, {
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
            { type: core.Component, args: [{
                        selector: 'ais-hierarchical-menu',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list') + ' ' + cx('list', 'lvl0')\">\n        <ais-hierarchical-menu-item\n          *ngFor=\"let item of items\"\n          [item]=\"item\"\n          [createURL]=\"state.createURL\"\n          [refine]=\"state.refine\"\n        >\n        </ais-hierarchical-menu-item>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisHierarchicalMenu.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisHierarchicalMenu.propDecorators = {
            transformItems: [{ type: core.Input }],
            attributes: [{ type: core.Input }],
            separator: [{ type: core.Input }],
            rootPath: [{ type: core.Input }],
            showParentLevel: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            sortBy: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'ais-hierarchical-menu-item',
                        template: "\n    <li\n      [class]=\"getItemClass(item)\"\n      (click)=\"handleClick($event, item)\"\n    >\n      <a\n        [class]=\"cx('link')\"\n        href=\"{{createURL(item.value)}}\"\n        (click)=\"handleClick($event, item)\"\n      >\n        <span [class]=\"cx('label')\">{{item.label}}</span>\n        <span [class]=\"cx('count')\">{{item.count}}</span>\n      </a>\n\n      <ul\n        [class]=\"getListClass(item)\"\n        *ngIf=\"item.isRefined && isArray(item.data) && item.data.length > 0\"\n      >\n        <ais-hierarchical-menu-item\n          *ngFor=\"let child of item.data\"\n          [item]=\"child\"\n          [createURL]=\"createURL\"\n          [refine]=\"refine\"\n          [lvl]=\"lvl + 1\"\n        >\n        </ais-hierarchical-menu-item>\n      </ul>\n    </li>\n  ",
                    },] },
        ];
        NgAisHierarchicalMenuItem.propDecorators = {
            lvl: [{ type: core.Input }],
            refine: [{ type: core.Input }],
            createURL: [{ type: core.Input }],
            item: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
                        entryComponents: [NgAisHierarchicalMenu],
                        exports: [NgAisHierarchicalMenu],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectHitsPerPage, { items: this.items });
                _super.prototype.ngOnInit.call(this);
            };
        NgAisHitsPerPage.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-hits-per-page',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.items\"\n          [value]=\"item.value\"\n          [selected]=\"item.isRefined\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                    },] },
        ];
        NgAisHitsPerPage.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisHitsPerPage.propDecorators = {
            items: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisHitsPerPage],
                        entryComponents: [NgAisHitsPerPage],
                        exports: [NgAisHitsPerPage],
                        imports: [common.CommonModule],
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'ais-highlight',
                        template: "<span [class]=\"cx()\" [innerHtml]=\"content\"></span>",
                    },] },
        ];
        NgAisHighlight.propDecorators = {
            attribute: [{ type: core.Input }],
            hit: [{ type: core.Input }],
            tagName: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisHighlight],
                        entryComponents: [NgAisHighlight],
                        exports: [NgAisHighlight],
                        imports: [common.CommonModule],
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
            _this.createWidget(connectors.connectHits, { escapeHits: true });
            return _this;
        }
        NgAisHits.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-hits',
                        template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    },] },
        ];
        NgAisHits.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisHits.propDecorators = {
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            transformItems: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisHits],
                        entryComponents: [NgAisHits],
                        exports: [NgAisHits],
                        imports: [common.CommonModule, NgAisHighlightModule],
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
            _this.createWidget(connectors.connectInfiniteHits, { escapeHits: true });
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
            { type: core.Component, args: [{
                        selector: 'ais-infinite-hits',
                        template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ais-highlight attribute=\"name\" [hit]=\"hit\">\n            </ais-highlight>\n          </li>\n        </ul>\n      </div>\n\n      <button\n        [class]=\"cx('showMore')\"\n        (click)=\"showMore($event)\"\n        [disabled]=\"state.isLastPage\"\n        *ngIf=\"!template\"\n      >\n        {{showMoreLabel}}\n      </button>\n    </div>\n  ",
                    },] },
        ];
        NgAisInfiniteHits.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisInfiniteHits.propDecorators = {
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            showMoreLabel: [{ type: core.Input }],
            transformItems: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisInfiniteHits],
                        entryComponents: [NgAisInfiniteHits],
                        exports: [NgAisInfiniteHits],
                        imports: [common.CommonModule, NgAisHighlightModule],
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisInstantSearch],
                        entryComponents: [NgAisInstantSearch],
                        exports: [NgAisInstantSearch],
                        imports: [common.CommonModule],
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
             */ function () {
                return this.state.items.length === 0 && this.autoHideContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgAisMenu.prototype, "showMoreClass", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
                this.createWidget(connectors.connectMenu, {
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
            { type: core.Component, args: [{
                        selector: 'ais-menu',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <span [class]=\"cx('label')\">{{item.label}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n        [class]=\"showMoreClass\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                    },] },
        ];
        NgAisMenu.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisMenu.propDecorators = {
            showMoreLabel: [{ type: core.Input }],
            showLessLabel: [{ type: core.Input }],
            transformItems: [{ type: core.Input }],
            attribute: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            showMoreLimit: [{ type: core.Input }],
            sortBy: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisMenu],
                        entryComponents: [NgAisMenu],
                        exports: [NgAisMenu],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectNumericRefinementList, {
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
            { type: core.Component, args: [{
                        selector: 'ais-numeric-menu',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of state.items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('radio')\"\n              type=\"radio\"\n              name=\"NumericMenu\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">{{item.label}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisNumericMenu.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisNumericMenu.propDecorators = {
            attribute: [{ type: core.Input }],
            items: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisNumericMenu],
                        entryComponents: [NgAisNumericMenu],
                        exports: [NgAisNumericMenu],
                        imports: [common.CommonModule],
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
                this.createWidget(connectors.connectNumericSelector, {
                    attributeName: this.attribute,
                    operator: this.operator,
                    options: this.items,
                });
                _super.prototype.ngOnInit.call(this);
            };
        NgAisNumericSelector.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-numeric-selector',
                        template: "\n    <div [class]=\"cx('')\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                    },] },
        ];
        NgAisNumericSelector.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisNumericSelector.propDecorators = {
            attribute: [{ type: core.Input }],
            operator: [{ type: core.Input }],
            items: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisNumericSelector],
                        entryComponents: [NgAisNumericSelector],
                        exports: [NgAisNumericSelector],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectPagination, {
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
            { type: core.Component, args: [{
                        selector: 'ais-pagination',
                        template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngIf=\"showFirst\"\n          (click)=\"refine($event, 0)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'firstPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(0)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\u2039\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showPrevious\"\n          (click)=\"refine($event, state.currentRefinement - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'previousPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\n          </a>\n        </li>\n\n        <li\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'page') +\n            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n          \"\n          *ngFor=\"let page of pages\"\n          (click)=\"refine($event, page)\"\n        >\n          <a\n            [class]=\"cx('link')\"\n            [href]=\"state.createURL(page)\"\n          >\n            {{page + 1}}\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showNext\"\n          (click)=\"refine($event, state.currentRefinement + 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'nextPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement + 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showLast\"\n          (click)=\"refine($event, state.nbPages - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'lastPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.nbPages - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\u203A\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisPagination.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisPagination.propDecorators = {
            showFirst: [{ type: core.Input }],
            showLast: [{ type: core.Input }],
            showPrevious: [{ type: core.Input }],
            showNext: [{ type: core.Input }],
            padding: [{ type: core.Input }],
            totalPages: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisPagination],
                        entryComponents: [NgAisPagination],
                        exports: [NgAisPagination],
                        imports: [common.CommonModule],
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
                    _this.slider = noUiSlider.create(_this.sliderContainer.nativeElement, config);
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
             */ function () {
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
                this.createWidget(connectors.connectRange, {
                    attributeName: this.attribute,
                    max: parseNumberInput(this.max),
                    min: parseNumberInput(this.min),
                    precision: parseNumberInput(this.precision),
                });
                _super.prototype.ngOnInit.call(this);
            };
        NgAisRangeSlider.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-range-slider',
                        template: "\n    <div [class]=\"cx()\">\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n    </div>\n  ",
                    },] },
        ];
        NgAisRangeSlider.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisRangeSlider.propDecorators = {
            sliderContainer: [{ type: core.ViewChild, args: ['sliderContainer',] }],
            pips: [{ type: core.Input }],
            tooltips: [{ type: core.Input }],
            attribute: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            precision: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisRangeSlider],
                        entryComponents: [NgAisRangeSlider],
                        exports: [NgAisRangeSlider],
                        imports: [common.CommonModule],
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
             */ function () {
                return this.state.items.length === 0 && this.autoHideContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgAisRefinementList.prototype, "items", {
            get: /**
             * @return {?}
             */ function () {
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
                this.createWidget(connectors.connectRefinementList, {
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
            { type: core.Component, args: [{
                        selector: 'ais-refinement-list',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <div\n        *ngIf=\"searchable\"\n        [class]=\"cx('searchBox')\"\n      >\n        <ais-facets-search\n          [search]=\"state.searchForItems\"\n          [searchPlaceholder]=\"searchPlaceholder\"\n        >\n        </ais-facets-search>\n      </div>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{item.value}}\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">\n              <ais-highlight attribute=\"highlighted\" [hit]=\"item\"></ais-highlight>\n            </span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </label>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  ",
                    },] },
        ];
        NgAisRefinementList.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisRefinementList.propDecorators = {
            showMoreLabel: [{ type: core.Input }],
            showLessLabel: [{ type: core.Input }],
            transformItems: [{ type: core.Input }],
            searchable: [{ type: core.Input }],
            searchPlaceholder: [{ type: core.Input }],
            attribute: [{ type: core.Input }],
            operator: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            showMoreLimit: [{ type: core.Input }],
            sortBy: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'ais-facets-search',
                        template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{searchPlaceholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"searchQuery\"\n          (input)=\"handleChange($event.target.value)\"\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          title=\"Submit the search query.\"\n          type=\"submit\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"Clear the search query.\"\n          hidden\n        >\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  ",
                    },] },
        ];
        NgAisFacetsSearch.propDecorators = {
            searchPlaceholder: [{ type: core.Input }],
            search: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisRefinementList, NgAisFacetsSearch],
                        entryComponents: [NgAisRefinementList],
                        exports: [NgAisRefinementList],
                        imports: [common.CommonModule, NgAisHighlightModule],
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
            _this.submit = new core.EventEmitter();
            _this.reset = new core.EventEmitter();
            // input
            _this.change = new core.EventEmitter();
            _this.focus = new core.EventEmitter();
            _this.blur = new core.EventEmitter();
            _this.state = {
                query: '',
                refine: noop,
            };
            _this.createWidget(connectors.connectSearchBox);
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
            { type: core.Component, args: [{
                        selector: 'ais-search-box',
                        template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        novalidate\n        (submit)=\"handleSubmit($event)\"\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{placeholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"state.query\"\n          (input)=\"handleChange($event.target.value)\"\n          (focus)=\"focus.emit($event)\"\n          (blur)=\"blur.emit($event)\"\n          #searchBox\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          type=\"submit\"\n          title=\"{{submitTitle}}\"\n          (click)=\"handleSubmit($event)\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"40\"\n            height=\"40\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"{{resetTitle}}\"\n          (click)=\"handleReset($event)\"\n          [hidden]=\"!state.query || (state.query && !state.query.trim())\">\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"20\"\n            height=\"20\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  ",
                    },] },
        ];
        NgAisSearchBox.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisSearchBox.propDecorators = {
            searchBox: [{ type: core.ViewChild, args: ['searchBox',] }],
            placeholder: [{ type: core.Input }],
            submitTitle: [{ type: core.Input }],
            resetTitle: [{ type: core.Input }],
            searchAsYouType: [{ type: core.Input }],
            autofocus: [{ type: core.Input }],
            submit: [{ type: core.Output }],
            reset: [{ type: core.Output }],
            change: [{ type: core.Output }],
            focus: [{ type: core.Output }],
            blur: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisSearchBox],
                        entryComponents: [NgAisSearchBox],
                        exports: [NgAisSearchBox],
                        imports: [common.CommonModule],
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
                this.createWidget(connectors.connectSortBySelector, { indices: this.items });
                _super.prototype.ngOnInit.call(this);
            };
        NgAisSortBy.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-sort-by',
                        template: "\n    <div [class]=\"cx()\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  ",
                    },] },
        ];
        NgAisSortBy.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisSortBy.propDecorators = {
            items: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisSortBy],
                        entryComponents: [NgAisSortBy],
                        exports: [NgAisSortBy],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectStarRating, {
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
            { type: core.Component, args: [{
                        selector: 'ais-rating-menu',
                        template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <svg style=\"display:none;\">\n        <symbol\n          id=\"ais-StarRating-starSymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n        </symbol>\n        <symbol\n          id=\"ais-StarRating-starEmptySymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n        </symbol>\n      </svg>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of state.items\"\n          [class]=\"getItemClass(item)\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <svg\n              *ngFor=\"let star of item.stars\"\n              [ngClass]=\"cx('starIcon')\"\n              aria-hidden=\"true\"\n            >\n              <use\n                *ngIf=\"star\"\n                xlink:href=\"#ais-StarRating-starSymbol\"\n              >\n              </use>\n\n              <use\n                *ngIf=\"!star\"\n                xlink:href=\"#ais-StarRating-starEmptySymbol\"\n              >\n              </use>\n            </svg>\n\n            <span [class]=\"cx('label')\" aria-hidden=\"true\">{{andUpLabel}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisRatingMenu.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisRatingMenu.propDecorators = {
            andUpLabel: [{ type: core.Input }],
            attribute: [{ type: core.Input }],
            max: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisRatingMenu],
                        entryComponents: [NgAisRatingMenu],
                        exports: [NgAisRatingMenu],
                        imports: [common.CommonModule],
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
            _this.createWidget(connectors.connectStats);
            return _this;
        }
        Object.defineProperty(NgAisStats.prototype, "templateContext", {
            get: /**
             * @return {?}
             */ function () {
                return { state: this.state };
            },
            enumerable: true,
            configurable: true
        });
        NgAisStats.decorators = [
            { type: core.Component, args: [{
                        selector: 'ais-stats',
                        template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <span *ngIf=\"!template\" [class]=\"cx('text')\">\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </span>\n    </div>\n  ",
                    },] },
        ];
        NgAisStats.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisStats.propDecorators = {
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisStats],
                        entryComponents: [NgAisStats],
                        exports: [NgAisStats],
                        imports: [common.CommonModule],
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
                this.createWidget(connectors.connectToggle, {
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
            { type: core.Component, args: [{
                        selector: 'ais-toggle',
                        template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"cx('item')\"\n          (click)=\"handleClick($event)\">\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{state.value.name}}\"\n              [checked]=\"state.value.isRefined\"\n            />\n\n            <span [class]=\"cx('labelText')\">\n              {{label || state.value.name}}\n            </span>\n\n            <span [class]=\"cx('count')\">{{state.value.count}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  ",
                    },] },
        ];
        NgAisToggle.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisToggle.propDecorators = {
            attribute: [{ type: core.Input }],
            label: [{ type: core.Input }],
            values: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisToggle],
                        entryComponents: [NgAisToggle],
                        exports: [NgAisToggle],
                        imports: [common.CommonModule],
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
             */ function () {
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
                this.createWidget(connectors.connectRange, {
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
            { type: core.Component, args: [{
                        selector: 'ais-range-input',
                        template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'min')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.min\"\n            [value]=\"minInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'min')\"\n          />\n        </label>\n\n        <span [class]=\"cx('separator')\">{{separator}}</span>\n\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'max')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.max\"\n            [value]=\"maxInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'max')\"\n          />\n        </label>\n\n        <button\n          [class]=\"cx('submit')\"\n          (click)=\"handleSubmit($event)\"\n        >\n          {{submitLabel}}\n        </button>\n      </form>\n    </div>\n  ",
                    },] },
        ];
        NgAisRangeInput.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisRangeInput.propDecorators = {
            currency: [{ type: core.Input }],
            separator: [{ type: core.Input }],
            submitLabel: [{ type: core.Input }],
            attribute: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            precision: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisRangeInput],
                        entryComponents: [NgAisRangeInput],
                        exports: [NgAisRangeInput],
                        imports: [common.CommonModule],
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
            { type: core.Component, args: [{
                        selector: 'ais-panel',
                        template: "\n    <div class=\"ais-Panel\">\n      <div *ngIf=\"header\" class=\"ais-Panel-header\">\n        {{header}}\n      </div>\n\n      <div class=\"ais-Panel-body\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"footer\" class=\"ais-Panel-footer\">\n        {{footer}}\n      </div>\n    </div>\n  ",
                    },] },
        ];
        NgAisPanel.propDecorators = {
            header: [{ type: core.Input }],
            footer: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisPanel],
                        entryComponents: [NgAisPanel],
                        exports: [NgAisPanel],
                        imports: [common.CommonModule],
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
             */ function (values) {
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
                this.createWidget(connectors.connectConfigure, {
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
            { type: core.Component, args: [{
                        selector: 'ais-configure',
                        template: '',
                    },] },
        ];
        NgAisConfigure.ctorParameters = function () {
            return [
                { type: core.KeyValueDiffers },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgAisInstantSearch; }),] }] }
            ];
        };
        NgAisConfigure.propDecorators = {
            searchParameters: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NgAisConfigure],
                        entryComponents: [NgAisConfigure],
                        exports: [NgAisConfigure],
                        imports: [common.CommonModule],
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
    var algoliasearch$1 = algoliasearchProxy$1__default || algoliasearchProxy$1;
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
            return algoliasearchHelper.AlgoliaSearchHelper.getConfigurationFromQueryString(query);
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
            { type: core.NgModule, args: [{
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
            { type: core.NgModule, args: [{ imports: NGIS_MODULES, exports: NGIS_MODULES },] },
        ];
        return NgAisModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.NgAisBreadcrumbModule = NgAisBreadcrumbModule;
    exports.NgAisClearRefinementsModule = NgAisClearRefinementsModule;
    exports.NgAisCurrentRefinementsModule = NgAisCurrentRefinementsModule;
    exports.NgAisHierarchicalMenuModule = NgAisHierarchicalMenuModule;
    exports.NgAisHitsPerPageModule = NgAisHitsPerPageModule;
    exports.NgAisHitsModule = NgAisHitsModule;
    exports.NgAisInfiniteHitsModule = NgAisInfiniteHitsModule;
    exports.NgAisInstantSearchModule = NgAisInstantSearchModule;
    exports.NgAisMenuModule = NgAisMenuModule;
    exports.NgAisNumericMenuModule = NgAisNumericMenuModule;
    exports.NgAisNumericSelectorModule = NgAisNumericSelectorModule;
    exports.NgAisPaginationModule = NgAisPaginationModule;
    exports.NgAisRangeSliderModule = NgAisRangeSliderModule;
    exports.NgAisRefinementListModule = NgAisRefinementListModule;
    exports.NgAisSearchBoxModule = NgAisSearchBoxModule;
    exports.NgAisSortByModule = NgAisSortByModule;
    exports.NgAisRatingMenuModule = NgAisRatingMenuModule;
    exports.NgAisStatsModule = NgAisStatsModule;
    exports.NgAisToggleModule = NgAisToggleModule;
    exports.NgAisHighlightModule = NgAisHighlightModule;
    exports.NgAisRangeInputModule = NgAisRangeInputModule;
    exports.NgAisPanelModule = NgAisPanelModule;
    exports.NgAisConfigureModule = NgAisConfigureModule;
    exports.createSSRAlgoliaClient = createSSRAlgoliaClient;
    exports.createSSRSearchClient = createSSRSearchClient;
    exports.parseServerRequest = parseServerRequest;
    exports.BaseWidget = BaseWidget;
    exports.NgAisInstantSearch = NgAisInstantSearch;
    exports.NgAisRootModule = NgAisRootModule;
    exports.NgAisModule = NgAisModule;
    exports.ɵb = NgAisBreadcrumb;
    exports.ɵc = NgAisClearRefinements;
    exports.ɵx = NgAisConfigure;
    exports.ɵd = NgAisCurrentRefinements;
    exports.ɵe = NgAisHierarchicalMenu;
    exports.ɵf = NgAisHierarchicalMenuItem;
    exports.ɵi = NgAisHighlight;
    exports.ɵg = NgAisHitsPerPage;
    exports.ɵh = NgAisHits;
    exports.ɵj = NgAisInfiniteHits;
    exports.ɵk = NgAisMenu;
    exports.ɵl = NgAisNumericMenu;
    exports.ɵm = NgAisNumericSelector;
    exports.ɵn = NgAisPagination;
    exports.ɵa = NgAisPanel;
    exports.ɵw = NgAisRangeInput;
    exports.ɵo = NgAisRangeSlider;
    exports.ɵt = NgAisRatingMenu;
    exports.ɵq = NgAisFacetsSearch;
    exports.ɵp = NgAisRefinementList;
    exports.ɵr = NgAisSearchBox;
    exports.ɵs = NgAisSortBy;
    exports.ɵu = NgAisStats;
    exports.ɵv = NgAisToggle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1pbnN0YW50c2VhcmNoLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdXRpbHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9iYXNlLXdpZGdldC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3ZlcnNpb24udHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9icmVhZGNydW1iL2JyZWFkY3J1bWIubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvY2xlYXItcmVmaW5lbWVudHMvY2xlYXItcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jbGVhci1yZWZpbmVtZW50cy9jbGVhci1yZWZpbmVtZW50cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jdXJyZW50LXJlZmluZW1lbnRzL2N1cnJlbnQtcmVmaW5lbWVudHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWVyYXJjaGljYWwtbWVudS9oaWVyYXJjaGljYWwtbWVudS1pdGVtLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpZ2hsaWdodC9oaWdobGlnaHQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9oaWdobGlnaHQvaGlnaGxpZ2h0Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2hpdHMvaGl0cy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9pbmZpbml0ZS1oaXRzL2luZmluaXRlLWhpdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL21lbnUvbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLW1lbnUvbnVtZXJpYy1tZW51LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvbnVtZXJpYy1tZW51L251bWVyaWMtbWVudS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9udW1lcmljLXNlbGVjdG9yL251bWVyaWMtc2VsZWN0b3IubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhbmdlLXNsaWRlci9yYW5nZS1zbGlkZXIudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yZWZpbmVtZW50LWxpc3QvZmFjZXRzLXNlYXJjaC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94LnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3NvcnQtYnkvc29ydC1ieS5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYXRpbmctbWVudS9yYXRpbmctbWVudS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3JhdGluZy1tZW51L3JhdGluZy1tZW51Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3N0YXRzL3N0YXRzLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvc3RhdHMvc3RhdHMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvdG9nZ2xlL3RvZ2dsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3RvZ2dsZS90b2dnbGUubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvcmFuZ2UtaW5wdXQvcmFuZ2UtaW5wdXQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYW5lbC9wYW5lbC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL3BhbmVsL3BhbmVsLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NvbmZpZ3VyZS9jb25maWd1cmUudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9jb25maWd1cmUvY29uZmlndXJlLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2NyZWF0ZS1zc3ItYWxnb2xpYS1jbGllbnQudHMiLCJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC9wYXJzZS1zZXJ2ZXItcmVxdWVzdC50cyIsIm5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJlbSh3aWRnZXROYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgY3ggPSBmdW5jdGlvbihlbGVtZW50Pzogc3RyaW5nLCBzdWJFbGVtZW50Pzogc3RyaW5nKSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNjb3BwZWRXaWRnZXROYW1lID0gYGFpcy0ke3dpZGdldE5hbWV9LSR7ZWxlbWVudH1gO1xuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtSGVhZGVyfEJvZHl8Rm9vdGVyIGFpcy1IZWFkZXJ8Qm9keXxGb290ZXJgXG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ2hlYWRlcicgfHwgZWxlbWVudCA9PT0gJ2JvZHknIHx8IGVsZW1lbnQgPT09ICdmb290ZXInKSB7XG4gICAgICAgIGNvbnN0IG5vblNjb3BwZWRXaWRnZXROYW1lID0gYGFpcy0ke2VsZW1lbnR9YDtcbiAgICAgICAgcmV0dXJuIGAke3Njb3BwZWRXaWRnZXROYW1lfSAke25vblNjb3BwZWRXaWRnZXROYW1lfWA7XG4gICAgICB9XG5cbiAgICAgIC8vIG91dHB1dCBgYWlzLVdpZGdldC1YeXotLWFiY2BcbiAgICAgIGlmIChzdWJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBgJHtzY29wcGVkV2lkZ2V0TmFtZX0tLSR7c3ViRWxlbWVudH1gO1xuICAgICAgfVxuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtWHl6YFxuICAgICAgcmV0dXJuIHNjb3BwZWRXaWRnZXROYW1lO1xuICAgIH1cblxuICAgIC8vIG91dHB1dCBgYWlzLVdpZGdldGBcbiAgICByZXR1cm4gYGFpcy0ke3dpZGdldE5hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGN4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOdW1iZXJJbnB1dChpbnB1dD86IG51bWJlciB8IHN0cmluZykge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlucHV0LCAxMCkgOiBpbnB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoLi4uYXJnczogYW55W10pOiB2b2lkIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHMpIHtcbiAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufVxuIiwiaW1wb3J0IHsgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBiZW0sIG5vb3AgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFdpZGdldCB7XG4gIHB1YmxpYyBpbml0OiAoKSA9PiB2b2lkO1xuICBwdWJsaWMgZ2V0Q29uZmlndXJhdGlvbjogKCkgPT4gb2JqZWN0O1xuICBwdWJsaWMgcmVuZGVyOiAoXG4gICAgcGFyYW1zOiB7XG4gICAgICB0ZW1wbGF0ZXNDb25maWc6IG9iamVjdDtcbiAgICAgIHN0YXRlOiBvYmplY3Q7XG4gICAgICByZXN1bHRzOiB7fVtdO1xuICAgICAgY3JlYXRlVVJMOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuICAgICAgaW5zdGFudFNlYXJjaEluc3RhbmNlOiBvYmplY3Q7XG4gICAgfVxuICApID0+IHZvaWQ7XG4gIHB1YmxpYyBkaXNwb3NlOiAoXG4gICAgcGFyYW1zOiB7XG4gICAgICBoZWxwZXI6IG9iamVjdDtcbiAgICAgIHN0YXRlOiBvYmplY3Q7XG4gICAgfVxuICApID0+IG9iamVjdCB8IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIENvbm5lY3RvciA9IChcbiAgcmVuZGVyRm46IChzdGF0ZTogb2JqZWN0LCBpc0ZpcnN0UmVuZGVyaW5nOiBib29sZWFuKSA9PiB2b2lkLFxuICB1bm1vdW50Rm46ICgpID0+IHZvaWRcbikgPT4gKHdpZGdldE9wdGlvbnM/OiBvYmplY3QpID0+IFdpZGdldDtcblxuZXhwb3J0IGNsYXNzIEJhc2VXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnk7XG5cbiAgQElucHV0KCkgcHVibGljIGF1dG9IaWRlQ29udGFpbmVyPzogYm9vbGVhbjtcblxuICBwdWJsaWMgd2lkZ2V0PzogV2lkZ2V0O1xuICBwdWJsaWMgc3RhdGU/OiBvYmplY3QgPSB7fTtcbiAgcHVibGljIGN4OiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih3aWRnZXROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmN4ID0gYmVtKHdpZGdldE5hbWUpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVdpZGdldChjb25uZWN0b3I6IENvbm5lY3Rvciwgb3B0aW9uczogb2JqZWN0ID0ge30pIHtcbiAgICB0aGlzLndpZGdldCA9IGNvbm5lY3Rvcih0aGlzLnVwZGF0ZVN0YXRlLCBub29wKShvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBJbnN0YW50U2VhcmNoIEluc3RhbmNlXG4gICAgdGhpcy5pbnN0YW50U2VhcmNoUGFyZW50LmFkZFdpZGdldCh0aGlzLndpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuaW5zdGFudFNlYXJjaFBhcmVudC5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5pbnN0YW50U2VhcmNoUGFyZW50LnJlbW92ZVdpZGdldCh0aGlzLndpZGdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZVN0YXRlID0gKFxuICAgIHN0YXRlOiB7fSxcbiAgICBpc0ZpcnN0UmVuZGVyaW5nOiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4gfCB2b2lkID0+IHtcbiAgICBpZiAoaXNGaXJzdFJlbmRlcmluZykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH07XG5cbiAgLy8gaGVscGVyIG1ldGhvZCBmb3IgZ2VuZXJpbmcgaXRlbSBsaXN0IGNsYXNzTmFtZVxuICBwdWJsaWMgZ2V0SXRlbUNsYXNzKGl0ZW06IHsgaXNSZWZpbmVkPzogYm9vbGVhbiB9KSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuY3goJ2l0ZW0nKTtcblxuICAgIGlmIChpdGVtLmlzUmVmaW5lZCkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc05hbWU7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIyLjEuMFwiO1xuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0ICogYXMgYWxnb2xpYXNlYXJjaFByb3h5IGZyb20gJ2FsZ29saWFzZWFyY2gvbGl0ZSc7XG5cbmltcG9ydCBpbnN0YW50c2VhcmNoIGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMnO1xuXG5pbXBvcnQgeyBBbGdvbGlhU2VhcmNoSGVscGVyIH0gZnJvbSAnYWxnb2xpYXNlYXJjaC1oZWxwZXInO1xuXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vdmVyc2lvbic7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhc2VhcmNoUHJveHkuZGVmYXVsdCB8fCBhbGdvbGlhc2VhcmNoUHJveHk7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaFJlcXVlc3QgPSB7XG4gIGluZGV4TmFtZTogc3RyaW5nO1xuICBwYXJhbXM6IFNlYXJjaFJlcXVlc3RQYXJhbWV0ZXJzO1xufTtcblxuZXhwb3J0IHR5cGUgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0ID0ge1xuICBpbmRleE5hbWU6IHN0cmluZztcbiAgcGFyYW1zOiBTZWFyY2hGb3JGYWNldFZhbHVlc1JlcXVlc3RQYXJhbWV0ZXJzO1xufTtcblxuLy8gRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL2FwaS1yZWZlcmVuY2Uvc2VhcmNoLWFwaS1wYXJhbWV0ZXJzL1xuZXhwb3J0IHR5cGUgU2VhcmNoUGFyYW1ldGVycyA9IHtcbiAgLy8gQXR0cmlidXRlc1xuICBhdHRyaWJ1dGVzVG9SZXRyaWV2ZT86IHN0cmluZ1tdO1xuICByZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLy8gRmlsdGVyaW5nXG4gIGZpbHRlcnM/OiBzdHJpbmc7XG4gIGZhY2V0RmlsdGVycz86IHN0cmluZ1tdO1xuICBvcHRpb25hbEZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgbnVtZXJpY0ZpbHRlcnM/OiBzdHJpbmdbXTtcbiAgc3VtT3JGaWx0ZXJzU2NvcmVzPzogYm9vbGVhbjtcblxuICAvLyBGYWNldGluZ1xuICBmYWNldHM/OiBzdHJpbmdbXTtcbiAgbWF4VmFsdWVzUGVyRmFjZXQ/OiBudW1iZXI7XG4gIGZhY2V0aW5nQWZ0ZXJEaXN0aW5jdD86IGJvb2xlYW47XG4gIHNvcnRGYWNldFZhbHVlc0J5Pzogc3RyaW5nO1xuXG4gIC8vIEhpZ2hsaWdodGluZyAvIFNuaXBwZXRpbmdcbiAgYXR0cmlidXRlc1RvSGlnaGxpZ2h0Pzogc3RyaW5nW107XG4gIGF0dHJpYnV0ZXNUb1NuaXBwZXQ/OiBzdHJpbmdbXTtcbiAgaGlnaGxpZ2h0UHJlVGFnPzogc3RyaW5nO1xuICBoaWdobGlnaHRQb3N0VGFnPzogc3RyaW5nO1xuICBzbmlwcGV0RWxsaXBzaXNUZXh0Pzogc3RyaW5nO1xuICByZXN0cmljdEhpZ2hsaWdodEFuZFNuaXBwZXRBcnJheXM/OiBib29sZWFuO1xuXG4gIC8vIFBhZ2luYXRpb25cbiAgcGFnZT86IG51bWJlcjtcbiAgaGl0c1BlclBhZ2U/OiBudW1iZXI7XG4gIG9mZnNldD86IG51bWJlcjtcbiAgbGVuZ3RoPzogbnVtYmVyO1xuXG4gIC8vIFR5cG9zXG4gIG1pbldvcmRTaXplZm9yMVR5cG8/OiBudW1iZXI7XG4gIG1pbldvcmRTaXplZm9yMlR5cG9zPzogbnVtYmVyO1xuICB0eXBvVG9sZXJhbmNlPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgYWxsb3dUeXBvc09uTnVtZXJpY1Rva2Vucz86IGJvb2xlYW47XG4gIGlnbm9yZVBsdXJhbHM/OiBib29sZWFuIHwgc3RyaW5nW107XG4gIGRpc2FibGVUeXBvVG9sZXJhbmNlT25BdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLy8gR2VvLVNlYXJjaFxuICBhcm91bmRMYXRMbmc/OiBzdHJpbmc7XG4gIGFyb3VuZExhdExuZ1ZpYUlQPzogYm9vbGVhbjtcbiAgYXJvdW5kUmFkaXVzPzogbnVtYmVyIHwgJ2FsbCc7XG4gIGFyb3VuZFByZWNpc2lvbj86IG51bWJlcjtcbiAgbWluaW11bUFyb3VuZFJhZGl1cz86IG51bWJlcjtcbiAgaW5zaWRlQm91bmRpbmdCb3g/OiBHZW9SZWN0YW5nbGUgfCBHZW9SZWN0YW5nbGVbXTtcbiAgaW5zaWRlUG9seWdvbj86IEdlb1BvbHlnb24gfCBHZW9Qb2x5Z29uW107XG5cbiAgLy8gUXVlcnkgU3RyYXRlZ3lcbiAgcXVlcnlUeXBlPzogc3RyaW5nO1xuICByZW1vdmVXb3Jkc0lmTm9SZXN1bHRzPzogc3RyaW5nO1xuICBhZHZhbmNlZFN5bnRheD86IGJvb2xlYW47XG4gIG9wdGlvbmFsV29yZHM/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgcmVtb3ZlU3RvcFdvcmRzPzogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBkaXNhYmxlRXhhY3RPbkF0dHJpYnV0ZXM/OiBzdHJpbmdbXTtcbiAgZXhhY3RPblNpbmdsZVdvcmRRdWVyeT86IHN0cmluZztcbiAgYWx0ZXJuYXRpdmVzQXNFeGFjdD86IHN0cmluZ1tdO1xuXG4gIC8vIFF1ZXJ5IFJ1bGVzXG4gIGVuYWJsZVJ1bGVzPzogYm9vbGVhbjtcbiAgcnVsZUNvbnRleHRzPzogc3RyaW5nW107XG5cbiAgLy8gQWR2YW5jZWRcbiAgbWluUHJveGltaXR5PzogbnVtYmVyO1xuICByZXNwb25zZUZpZWxkcz86IHN0cmluZ1tdO1xuICBtYXhGYWNldEhpdHM/OiBudW1iZXI7XG4gIHBlcmNlbnRpbGVDb21wdXRhdGlvbj86IGJvb2xlYW47XG4gIGRpc3RpbmN0PzogbnVtYmVyIHwgYm9vbGVhbjtcbiAgZ2V0UmFua2luZ0luZm8/OiBib29sZWFuO1xuICBjbGlja0FuYWx5dGljcz86IGJvb2xlYW47XG4gIGFuYWx5dGljcz86IGJvb2xlYW47XG4gIGFuYWx5dGljc1RhZ3M/OiBzdHJpbmdbXTtcbiAgc3lub255bXM/OiBib29sZWFuO1xuICByZXBsYWNlU3lub255bXNJbkhpZ2hsaWdodD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFJlcXVlc3RQYXJhbWV0ZXJzIGV4dGVuZHMgU2VhcmNoUGFyYW1ldGVycyB7XG4gIHF1ZXJ5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0UGFyYW1ldGVyc1xuICBleHRlbmRzIFNlYXJjaFBhcmFtZXRlcnMge1xuICBmYWNldFF1ZXJ5OiBzdHJpbmc7XG4gIGZhY2V0TmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBHZW9SZWN0YW5nbGUgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbmV4cG9ydCB0eXBlIEdlb1BvbHlnb24gPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbi8vIERvY3VtZW50YXRpb246IGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0LWFwaS9zZWFyY2gvP2xhbmd1YWdlPWphdmFzY3JpcHQjc2VhcmNoLW11bHRpcGxlLWluZGV4ZXNcbmV4cG9ydCB0eXBlIFNlYXJjaFJlc3BvbnNlID0ge1xuICBoaXRzOiBIaXRbXTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbmJIaXRzPzogbnVtYmVyO1xuICBuYlBhZ2VzPzogbnVtYmVyO1xuICBoaXRzUGVyUGFnZT86IG51bWJlcjtcbiAgcHJvY2Vzc2luZ1RpbWVNUz86IG51bWJlcjtcbiAgcXVlcnk/OiBzdHJpbmc7XG4gIHBhcmFtcz86IHN0cmluZztcbiAgaW5kZXg/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBIaXQgPSB7XG4gIF9oaWdobGlnaHRSZXN1bHQ/OiBvYmplY3Q7XG59O1xuXG4vLyBEb2N1bWVudGF0aW9uOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoLz9sYW5ndWFnZT1qYXZhc2NyaXB0I3NlYXJjaC1mb3ItZmFjZXQtdmFsdWVzXG5leHBvcnQgdHlwZSBTZWFyY2hGb3JGYWNldFZhbHVlc1Jlc3BvbnNlID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBoaWdobGlnaHRlZD86IHN0cmluZztcbiAgY291bnQ/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hDbGllbnQgPSB7XG4gIHNlYXJjaDogKHJlcXVlc3RzOiBTZWFyY2hSZXF1ZXN0W10pID0+IFByb21pc2U8eyByZXN1bHRzOiBTZWFyY2hSZXNwb25zZVtdIH0+O1xuICBzZWFyY2hGb3JGYWNldFZhbHVlcz86IChcbiAgICByZXF1ZXN0czogU2VhcmNoRm9yRmFjZXRWYWx1ZXNSZXF1ZXN0W11cbiAgKSA9PiBQcm9taXNlPHsgZmFjZXRIaXRzOiBTZWFyY2hGb3JGYWNldFZhbHVlc1Jlc3BvbnNlW10gfVtdPjtcbn07XG5cbmV4cG9ydCB0eXBlIEluc3RhbnRTZWFyY2hDb25maWcgPSB7XG4gIGFwcElkPzogc3RyaW5nO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIGluZGV4TmFtZTogc3RyaW5nO1xuXG4gIG51bWJlckxvY2FsZT86IHN0cmluZztcbiAgc2VhcmNoRnVuY3Rpb24/OiAoaGVscGVyOiBhbnkpID0+IHZvaWQ7XG4gIGNyZWF0ZUFsZ29saWFDbGllbnQ/OiAoXG4gICAgYWxnb2xpYXNlYXJjaDogRnVuY3Rpb24sXG4gICAgYXBwSWQ6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZ1xuICApID0+IG9iamVjdDtcbiAgc2VhcmNoQ2xpZW50PzogU2VhcmNoQ2xpZW50O1xuICBzZWFyY2hQYXJhbWV0ZXJzPzogU2VhcmNoUGFyYW1ldGVycyB8IHZvaWQ7XG4gIHVybFN5bmM/OlxuICAgIHwgYm9vbGVhblxuICAgIHwge1xuICAgICAgICBtYXBwaW5nPzogb2JqZWN0O1xuICAgICAgICB0aHJlc2hvbGQ/OiBudW1iZXI7XG4gICAgICAgIHRyYWNrZWRQYXJhbWV0ZXJzPzogc3RyaW5nW107XG4gICAgICAgIHVzZUhhc2g/OiBib29sZWFuO1xuICAgICAgICBnZXRIaXN0b3J5U3RhdGU/OiAoKSA9PiBvYmplY3Q7XG4gICAgICB9O1xuICByb3V0aW5nPzpcbiAgICB8IGJvb2xlYW5cbiAgICB8IHtcbiAgICAgICAgc3RhdGVNYXBwaW5nPzoge1xuICAgICAgICAgIHN0YXRlVG9Sb3V0ZShvYmplY3QpOiBvYmplY3Q7XG4gICAgICAgICAgcm91dGVUb1N0YXRlKG9iamVjdCk6IG9iamVjdDtcbiAgICAgICAgfTtcbiAgICAgIH07XG59O1xuXG5leHBvcnQgY2xhc3MgSW5zdGFudFNlYXJjaEluc3RhbmNlIHtcbiAgcHVibGljIHN0YXJ0OiAoKSA9PiB2b2lkO1xuXG4gIHB1YmxpYyBhZGRXaWRnZXQ6ICh3aWRnZXQ6IFdpZGdldCkgPT4gdm9pZDtcbiAgcHVibGljIGFkZFdpZGdldHM6ICh3aWRnZXRzOiBXaWRnZXRbXSkgPT4gdm9pZDtcblxuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0OiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWQ7XG4gIHB1YmxpYyByZW1vdmVXaWRnZXRzOiAod2lkZ2V0czogV2lkZ2V0W10pID0+IHZvaWQ7XG5cbiAgLy8gRXZlbnRFbW1pdGVyXG4gIHB1YmxpYyBvbjogKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHZvaWQ7XG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lcjogKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHZvaWQ7XG5cbiAgcHVibGljIGhlbHBlcjoge1xuICAgIGxhc3RSZXN1bHRzOiBPYmplY3Q7XG4gICAgc3RhdGU6IE9iamVjdDtcbiAgfTtcblxuICBwdWJsaWMgcmVmcmVzaDogKCkgPT4gdm9pZDtcbiAgcHVibGljIGRpc3Bvc2U6ICgpID0+IHZvaWQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1pbnN0YW50c2VhcmNoJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbnN0YW50U2VhcmNoIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBJbnN0YW50U2VhcmNoQ29uZmlnO1xuICBASW5wdXQoKSBwdWJsaWMgaW5zdGFuY2VOYW1lOiBzdHJpbmcgPSAnZGVmYXVsdCc7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPHsgcmVzdWx0czoge307IHN0YXRlOiB7fSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHJlc3VsdHM6IHt9O1xuICAgIHN0YXRlOiB7fTtcbiAgfT4oKTtcblxuICBwdWJsaWMgaW5zdGFudFNlYXJjaEluc3RhbmNlOiBJbnN0YW50U2VhcmNoSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlSW5zdGFudFNlYXJjaEluc3RhbmNlKHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5yZW1vdmVMaXN0ZW5lcigncmVuZGVyJywgdGhpcy5vblJlbmRlcik7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUluc3RhbnRTZWFyY2hJbnN0YW5jZShjb25maWc6IEluc3RhbnRTZWFyY2hDb25maWcpIHtcbiAgICAvLyBhZGQgZGVmYXVsdCBzZWFyY2hQYXJhbWV0ZXJzIHdpdGggaGlnaGxpZ2h0aW5nIGNvbmZpZ1xuICAgIGlmICghY29uZmlnLnNlYXJjaFBhcmFtZXRlcnMpIGNvbmZpZy5zZWFyY2hQYXJhbWV0ZXJzID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcuc2VhcmNoUGFyYW1ldGVycywge1xuICAgICAgaGlnaGxpZ2h0UHJlVGFnOiAnX19haXMtaGlnaGxpZ2h0X18nLFxuICAgICAgaGlnaGxpZ2h0UG9zdFRhZzogJ19fL2Fpcy1oaWdobGlnaHRfXycsXG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgVVJMU3luYyB3aWRnZXQgaWYgb24gU1NSXG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy51cmxTeW5jICE9PSAndW5kZWZpbmVkJykgZGVsZXRlIGNvbmZpZy51cmxTeW5jO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcucm91dGluZyAhPT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBjb25maWcucm91dGluZztcbiAgICB9XG5cbiAgICAvLyBjdXN0b20gYWxnb2xpYSBjbGllbnQgYWdlbnRcbiAgICBpZiAoIWNvbmZpZy5zZWFyY2hDbGllbnQgJiYgIWNvbmZpZy5jcmVhdGVBbGdvbGlhQ2xpZW50KSB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKGNvbmZpZy5hcHBJZCwgY29uZmlnLmFwaUtleSk7XG4gICAgICBjbGllbnQuYWRkQWxnb2xpYUFnZW50KGBhbmd1bGFyLWluc3RhbnRzZWFyY2ggJHtWRVJTSU9OfWApO1xuXG4gICAgICBjb25maWcuc2VhcmNoQ2xpZW50ID0gY2xpZW50O1xuICAgICAgY29uZmlnLmFwcElkID0gdW5kZWZpbmVkO1xuICAgICAgY29uZmlnLmFwaUtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZSA9IGluc3RhbnRzZWFyY2goY29uZmlnKTtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5vbigncmVuZGVyJywgdGhpcy5vblJlbmRlcik7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldDogV2lkZ2V0KSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UuYWRkV2lkZ2V0KHdpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlV2lkZ2V0KHdpZGdldDogV2lkZ2V0KSB7XG4gICAgdGhpcy5pbnN0YW50U2VhcmNoSW5zdGFuY2UucmVtb3ZlV2lkZ2V0KHdpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5yZWZyZXNoKCk7XG4gIH1cblxuICBvblJlbmRlciA9ICgpID0+IHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHtcbiAgICAgIHJlc3VsdHM6IHRoaXMuaW5zdGFudFNlYXJjaEluc3RhbmNlLmhlbHBlci5sYXN0UmVzdWx0cyxcbiAgICAgIHN0YXRlOiB0aGlzLmluc3RhbnRTZWFyY2hJbnN0YW5jZS5oZWxwZXIuc3RhdGUsXG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3RCcmVhZGNydW1iIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgQnJlYWRjcnVtYlN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJJdGVtID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtYnJlYWRjcnVtYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpdGVtJywgaXRlbS5pc0xhc3QgPyAnc2VsZWN0ZWQnIDogdW5kZWZpbmVkKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0lmPVwiaXRlbS5zZXBhcmF0b3JcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdzZXBhcmF0b3InKVwiXG4gICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIGhyZWY9XCJ7e3N0YXRlLmNyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgICAgICpuZ0lmPVwiIWl0ZW0uaXNMYXN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7e2l0ZW0ubmFtZX19XG4gICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmlzTGFzdFwiPlxuICAgICAgICAgICAge3tpdGVtLm5hbWV9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQnJlYWRjcnVtYiBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyBjb25uZWN0b3Igb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHB1YmxpYyByb290UGF0aD86IHN0cmluZztcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubWFwKChpdGVtLCBpZHgpID0+ICh7XG4gICAgICAuLi5pdGVtLFxuICAgICAgc2VwYXJhdG9yOiBpZHggIT09IDAsXG4gICAgICBpc0xhc3Q6IGlkeCA9PT0gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLSAxLFxuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0ZTogQnJlYWRjcnVtYlN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0JyZWFkY3J1bWInKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0QnJlYWRjcnVtYiwge1xuICAgICAgYXR0cmlidXRlczogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgcm9vdFBhdGg6IHRoaXMucm9vdFBhdGgsXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBCcmVhZGNydW1iSXRlbSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoaXRlbS52YWx1ZSkge1xuICAgICAgdGhpcy5zdGF0ZS5yZWZpbmUoaXRlbS52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNCcmVhZGNydW1iIH0gZnJvbSAnLi9icmVhZGNydW1iJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNCcmVhZGNydW1iXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNCcmVhZGNydW1iXSxcbiAgZXhwb3J0czogW05nQWlzQnJlYWRjcnVtYl0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdENsZWFyQWxsIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWNsZWFyLXJlZmluZW1lbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ2J1dHRvbicpICsgKCFzdGF0ZS5oYXNSZWZpbmVtZW50cyA/ICgnICcgKyBjeCgnYnV0dG9uJywgJ2Rpc2FibGVkJykpIDogJycpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIXN0YXRlLmhhc1JlZmluZW1lbnRzXCJcbiAgICAgID5cbiAgICAgICAge3tidXR0b25MYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDbGVhclJlZmluZW1lbnRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBidXR0b25MYWJlbDogc3RyaW5nID0gJ0NsZWFyIHJlZmluZW1lbnRzJztcbiAgQElucHV0KCkgcHVibGljIGNsZWFyc1F1ZXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlQXR0cmlidXRlczogc3RyaW5nW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgaGFzUmVmaW5lbWVudHM6IGZhbHNlLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlLmhhc1JlZmluZW1lbnRzICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDbGVhclJlZmluZW1lbnRzJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gd2UgbmVlZCB0byBgY3JlYXRlV2lkZ2V0YCBmcm9tIGBuZ09uSW5pdGAgdG8gaGF2ZSBgQElucHV0KClgIGludGlhbGl6ZWRcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0Q2xlYXJBbGwsIHtcbiAgICAgIGNsZWFyc1F1ZXJ5OiB0aGlzLmNsZWFyc1F1ZXJ5LFxuICAgICAgZXhjbHVkZUF0dHJpYnV0ZXM6IHRoaXMuZXhjbHVkZUF0dHJpYnV0ZXMsXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmhhc1JlZmluZW1lbnRzKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzQ2xlYXJSZWZpbmVtZW50cyB9IGZyb20gJy4vY2xlYXItcmVmaW5lbWVudHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0NsZWFyUmVmaW5lbWVudHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0NsZWFyUmVmaW5lbWVudHNdLFxuICBleHBvcnRzOiBbTmdBaXNDbGVhclJlZmluZW1lbnRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ2xlYXJSZWZpbmVtZW50c01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RDdXJyZW50UmVmaW5lZFZhbHVlcyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AsIGNhcGl0YWxpemUgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEN1cnJlbnRSZWZpbmVtZW50c1N0YXRlID0ge1xuICBhdHRyaWJ1dGVzOiB7fTtcbiAgY2xlYXJBbGxDbGljazogRnVuY3Rpb247XG4gIGNsZWFyQWxsVVJMOiBGdW5jdGlvbjtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgcmVmaW5lbWVudHM6IHt9W107XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtY3VycmVudC1yZWZpbmVtZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsZWFyQWxsQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICpuZ0lmPVwiY2xlYXJSZWZpbmVtZW50cyA9PT0gJ2JlZm9yZScgfHwgY2xlYXJSZWZpbmVtZW50cyA9PT0gdHJ1ZVwiPlxuICAgICAgICB7e2NsZWFyUmVmaW5lbWVudHNMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPHVsXG4gICAgICAgIFtjbGFzc109XCJjeCgnbGlzdCcpXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHJlZmluZW1lbnQgb2YgcmVmaW5lbWVudHNcIlxuICAgICAgPlxuICAgICAgICA8bGkgW2NsYXNzXT1cImN4KCdpdGVtJylcIj5cbiAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj57e3JlZmluZW1lbnQubGFiZWx9fTo8L3NwYW4+XG5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdjYXRlZ29yeScpXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlZmluZW1lbnQuaXRlbXNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY2F0ZWdvcnlMYWJlbCcpXCI+e3tpdGVtLm5hbWV9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gW2NsYXNzXT1cImN4KCdkZWxldGUnKVwiIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCI+w6LCnMKVPC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xlYXJBbGxDbGljaygkZXZlbnQpXCJcbiAgICAgICAgKm5nSWY9XCJjbGVhclJlZmluZW1lbnRzID09PSAnYWZ0ZXInXCI+XG4gICAgICAgIHt7Y2xlYXJSZWZpbmVtZW50c0xhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0N1cnJlbnRSZWZpbmVtZW50cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJSZWZpbmVtZW50czogJ2JlZm9yZScgfCAnYWZ0ZXInIHwgYm9vbGVhbiA9ICdhZnRlcic7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhclJlZmluZW1lbnRzTGFiZWw6IHN0cmluZyA9ICdDbGVhciByZWZpbmVtZW50cyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBvbmx5TGlzdGVkQXR0cmlidXRlczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJzUXVlcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcHVibGljIGF0dHJpYnV0ZXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdID0gW107XG5cbiAgcHVibGljIHN0YXRlOiBDdXJyZW50UmVmaW5lbWVudHNTdGF0ZSA9IHtcbiAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICBjbGVhckFsbENsaWNrOiBub29wLFxuICAgIGNsZWFyQWxsVVJMOiBub29wLFxuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgcmVmaW5lbWVudHM6IFtdLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5yZWZpbmVtZW50cy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGdldCByZWZpbmVtZW50cygpIHtcbiAgICBjb25zdCBpdGVtcyA9XG4gICAgICB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXModGhpcy5zdGF0ZS5yZWZpbmVtZW50cylcbiAgICAgICAgOiB0aGlzLnN0YXRlLnJlZmluZW1lbnRzO1xuXG4gICAgLy8gZ3JvdXAgcmVmaW5lbWVudHMgYnkgY2F0ZWdvcnk/IChhdHRyaWJ1dGVOYW1lICYmIHR5cGUpXG4gICAgcmV0dXJuIGl0ZW1zLnJlZHVjZSgocmVzLCB7IHR5cGUsIGF0dHJpYnV0ZU5hbWUsIC4uLnJlZmluZW1lbnQgfSkgPT4ge1xuICAgICAgY29uc3QgbWF0Y2ggPSByZXMuZmluZChcbiAgICAgICAgciA9PiByLmF0dHJpYnV0ZU5hbWUgPT09IGF0dHJpYnV0ZU5hbWUgJiYgci50eXBlID09PSB0eXBlXG4gICAgICApO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLml0ZW1zLnB1c2goeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCAuLi5yZWZpbmVtZW50IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2goe1xuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICBsYWJlbDogY2FwaXRhbGl6ZShhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgICBpdGVtczogW3sgdHlwZSwgYXR0cmlidXRlTmFtZSwgLi4ucmVmaW5lbWVudCB9XSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldCBqc29uKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnJlZmluZW1lbnRzLCBudWxsLCA0KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ0N1cnJlbnRSZWZpbmVtZW50cycpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RDdXJyZW50UmVmaW5lZFZhbHVlcywge1xuICAgICAgYXR0cmlidXRlczogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgY2xlYXJzUXVlcnk6IHRoaXMuY2xlYXJzUXVlcnksXG4gICAgICBvbmx5TGlzdGVkQXR0cmlidXRlczogdGhpcy5vbmx5TGlzdGVkQXR0cmlidXRlcyxcbiAgICB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCByZWZpbmVtZW50OiB7fSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUocmVmaW5lbWVudCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xlYXJBbGxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5jbGVhckFsbENsaWNrKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0N1cnJlbnRSZWZpbmVtZW50cyB9IGZyb20gJy4vY3VycmVudC1yZWZpbmVtZW50cyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzQ3VycmVudFJlZmluZW1lbnRzXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNDdXJyZW50UmVmaW5lbWVudHNdLFxuICBleHBvcnRzOiBbTmdBaXNDdXJyZW50UmVmaW5lbWVudHNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDdXJyZW50UmVmaW5lbWVudHNNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0SGllcmFyY2hpY2FsTWVudSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEhpZXJhcmNoaWNhbE1lbnVTdGF0ZSA9IHtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGllcmFyY2hpY2FsLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JykgKyAnICcgKyBjeCgnbGlzdCcsICdsdmwwJylcIj5cbiAgICAgICAgPGFpcy1oaWVyYXJjaGljYWwtbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgIFtjcmVhdGVVUkxdPVwic3RhdGUuY3JlYXRlVVJMXCJcbiAgICAgICAgICBbcmVmaW5lXT1cInN0YXRlLnJlZmluZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9haXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGllcmFyY2hpY2FsTWVudSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uXG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGVzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcj86IHN0cmluZyA9ICcgPiAnO1xuICBASW5wdXQoKSBwdWJsaWMgcm9vdFBhdGg/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93UGFyZW50TGV2ZWw/OiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgbGltaXQ/OiBudW1iZXIgfCBzdHJpbmcgPSAxMDtcbiAgQElucHV0KCkgcHVibGljIHNvcnRCeT86IHN0cmluZ1tdIHwgKChpdGVtOiBvYmplY3QpID0+IG51bWJlcik7XG5cbiAgcHVibGljIHN0YXRlOiBIaWVyYXJjaGljYWxNZW51U3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdIaWVyYXJjaGljYWxNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEhpZXJhcmNoaWNhbE1lbnUsIHtcbiAgICAgIGxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMubGltaXQpLFxuICAgICAgYXR0cmlidXRlczogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgcm9vdFBhdGg6IHRoaXMucm9vdFBhdGgsXG4gICAgICBzZXBhcmF0b3I6IHRoaXMuc2VwYXJhdG9yLFxuICAgICAgc2hvd1BhcmVudExldmVsOiB0aGlzLnNob3dQYXJlbnRMZXZlbCxcbiAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBiZW0gfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIEhpZXJhcmNoaWNhbE1lbnVJdGVtID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xuICBpc1JlZmluZWQ6IGJvb2xlYW47XG4gIGRhdGE6IEhpZXJhcmNoaWNhbE1lbnVJdGVtW107XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGllcmFyY2hpY2FsLW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpXG4gICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICA+XG4gICAgICA8YVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgIGhyZWY9XCJ7e2NyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjb3VudCcpXCI+e3tpdGVtLmNvdW50fX08L3NwYW4+XG4gICAgICA8L2E+XG5cbiAgICAgIDx1bFxuICAgICAgICBbY2xhc3NdPVwiZ2V0TGlzdENsYXNzKGl0ZW0pXCJcbiAgICAgICAgKm5nSWY9XCJpdGVtLmlzUmVmaW5lZCAmJiBpc0FycmF5KGl0ZW0uZGF0YSkgJiYgaXRlbS5kYXRhLmxlbmd0aCA+IDBcIlxuICAgICAgPlxuICAgICAgICA8YWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgaXRlbS5kYXRhXCJcbiAgICAgICAgICBbaXRlbV09XCJjaGlsZFwiXG4gICAgICAgICAgW2NyZWF0ZVVSTF09XCJjcmVhdGVVUkxcIlxuICAgICAgICAgIFtyZWZpbmVdPVwicmVmaW5lXCJcbiAgICAgICAgICBbbHZsXT1cImx2bCArIDFcIlxuICAgICAgICA+XG4gICAgICAgIDwvYWlzLWhpZXJhcmNoaWNhbC1tZW51LWl0ZW0+XG4gICAgICA8L3VsPlxuICAgIDwvbGk+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGllcmFyY2hpY2FsTWVudUl0ZW0ge1xuICBASW5wdXQoKSBwdWJsaWMgbHZsOiBudW1iZXIgPSAxO1xuICBASW5wdXQoKSBwdWJsaWMgcmVmaW5lOiAoc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwdWJsaWMgY3JlYXRlVVJMOiAoc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpdGVtOiBIaWVyYXJjaGljYWxNZW51SXRlbTtcblxuICBwdWJsaWMgY3ggPSBiZW0oJ0hpZXJhcmNoaWNhbE1lbnUnKTtcblxuICBwdWJsaWMgZ2V0SXRlbUNsYXNzKGl0ZW0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnaXRlbScpO1xuXG4gICAgaWYgKGl0ZW0uaXNSZWZpbmVkKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdzZWxlY3RlZCcpfWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBcnJheShpdGVtLmRhdGEpICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBjbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7dGhpcy5jeCgnaXRlbScsICdwYXJlbnQnKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc05hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlzdENsYXNzKGl0ZW0pIHtcbiAgICByZXR1cm4gYCR7dGhpcy5jeCgnbGlzdCcpfSAke3RoaXMuY3goJ2xpc3QnLCAnY2hpbGQnKX0gJHt0aGlzLmN4KFxuICAgICAgJ2xpc3QnLFxuICAgICAgYGx2bCR7dGhpcy5sdmx9YFxuICAgICl9YDtcbiAgfVxuXG4gIHB1YmxpYyBpc0FycmF5KHBvdGVudGlhbEFycmF5OiBhbnkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwb3RlbnRpYWxBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEhpZXJhcmNoaWNhbE1lbnVJdGVtKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMucmVmaW5lKGl0ZW0udmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaWVyYXJjaGljYWxNZW51IH0gZnJvbSAnLi9oaWVyYXJjaGljYWwtbWVudSc7XG5pbXBvcnQgeyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVJdGVtIH0gZnJvbSAnLi9oaWVyYXJjaGljYWwtbWVudS1pdGVtJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNIaWVyYXJjaGljYWxNZW51LCBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVJdGVtXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNIaWVyYXJjaGljYWxNZW51XSxcbiAgZXhwb3J0czogW05nQWlzSGllcmFyY2hpY2FsTWVudV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZXJhcmNoaWNhbE1lbnVNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0SGl0c1BlclBhZ2UgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBSZXN1bHRzUGVyUGFnZVN0YXRlID0ge1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1oaXRzLXBlci1wYWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHNlbGVjdFxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlbGVjdCcpXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzdGF0ZS5yZWZpbmUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdvcHRpb24nKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUuaXRlbXNcIlxuICAgICAgICAgIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXRlbS5pc1JlZmluZWRcIlxuICAgICAgICA+XG4gICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaXRzUGVyUGFnZSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgZGVmYXVsdD86IGJvb2xlYW47XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IFJlc3VsdHNQZXJQYWdlU3RhdGUgPSB7XG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdIaXRzUGVyUGFnZScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RIaXRzUGVyUGFnZSwgeyBpdGVtczogdGhpcy5pdGVtcyB9KTtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNIaXRzUGVyUGFnZSB9IGZyb20gJy4vaGl0cy1wZXItcGFnZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGl0c1BlclBhZ2VdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0hpdHNQZXJQYWdlXSxcbiAgZXhwb3J0czogW05nQWlzSGl0c1BlclBhZ2VdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNIaXRzUGVyUGFnZU1vZHVsZSB7fVxuIiwiY29uc3QgZ2V0ID0gcmVxdWlyZSgnbG9kYXNoL2dldCcpO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGlnaGxpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiBbY2xhc3NdPVwiY3goKVwiIFtpbm5lckh0bWxdPVwiY29udGVudFwiPjwvc3Bhbj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZ2hsaWdodCB7XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBoaXQ6IHsgX2hpZ2hsaWdodFJlc3VsdD86IHt9OyBsYWJlbD86IHN0cmluZzsgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmcgfTtcbiAgQElucHV0KCkgdGFnTmFtZTogc3RyaW5nID0gJ2VtJztcblxuICBjeCA9IGJlbSgnSGlnaGxpZ2h0Jyk7XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlID09PSAnaGlnaGxpZ2h0ZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXQuaGlnaGxpZ2h0ZWRcbiAgICAgICAgPyB0aGlzLnJlcGxhY2VXaXRoVGFnTmFtZSh0aGlzLmhpdC5oaWdobGlnaHRlZClcbiAgICAgICAgOiB0aGlzLmhpdC5sYWJlbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaXQuaGFzT3duUHJvcGVydHkoJ19oaWdobGlnaHRSZXN1bHQnKSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgPSBnZXQoXG4gICAgICAgIHRoaXMuaGl0Ll9oaWdobGlnaHRSZXN1bHQsXG4gICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICApO1xuXG4gICAgICAvLyBjaGVjayB0aGF0IHRoZSBhdHRyaWJ1dGVIaWdobGlnaHRlZCBpcyBhIHN0cmluZ1xuICAgICAgaWYgKFxuICAgICAgICBhdHRyaWJ1dGVIaWdobGlnaHRlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBhdHRyaWJ1dGVIaWdobGlnaHRlZC52YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlV2l0aFRhZ05hbWUoYXR0cmlidXRlSGlnaGxpZ2h0ZWQudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0KHRoaXMuaGl0LCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgaWYgKCFmYWxsYmFjaykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgQ291bGQgbm90IGZpbmQgYXR0cmlidXRlIFske1xuICAgICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICAgIH1dIGludG8gaGl0IG9iamVjdCwgd2lsbCBkaXNwbGF5IGFuIGVtcHR5IHN0cmluZy5gXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG5cbiAgcmVwbGFjZVdpdGhUYWdOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKCc8ZW0+JywgJ2cnKSxcbiAgICAgICAgYDwke3RoaXMudGFnTmFtZX0gY2xhc3M9XCIke3RoaXMuY3goJ2hpZ2hsaWdodGVkJyl9XCI+YFxuICAgICAgKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnPC9lbT4nLCAnZycpLCBgPC8ke3RoaXMudGFnTmFtZX0+YCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodCB9IGZyb20gJy4vaGlnaGxpZ2h0JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNIaWdobGlnaHRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc0hpZ2hsaWdodF0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpZ2hsaWdodF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1oaXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHN0YXRlXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gZGVmYXVsdCByZW5kZXJpbmcgaWYgbm8gdGVtcGxhdGUgc3BlY2lmaWVkIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPlxuICAgICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnaXRlbScpXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBoaXQgb2Ygc3RhdGUuaGl0c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFpcy1oaWdobGlnaHQgYXR0cmlidXRlPVwibmFtZVwiIFtoaXRdPVwiaGl0XCI+XG4gICAgICAgICAgICA8L2Fpcy1oaWdobGlnaHQ+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGlubmVyIHdpZGdldCBzdGF0ZSByZXR1cm5lZCBmcm9tIGNvbm5lY3RvclxuICBwdWJsaWMgc3RhdGU6IHsgaGl0czoge31bXTsgcmVzdWx0czoge30gfSA9IHsgaGl0czogW10sIHJlc3VsdHM6IHt9IH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGl0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RIaXRzLCB7IGVzY2FwZUhpdHM6IHRydWUgfSk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZXN1bHRzOiBzdGF0ZS5yZXN1bHRzLFxuICAgICAgaGl0czpcbiAgICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXMoc3RhdGUuaGl0cylcbiAgICAgICAgICA6IHN0YXRlLmhpdHMsXG4gICAgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB9IGZyb20gJy4uL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmltcG9ydCB7IE5nQWlzSGl0cyB9IGZyb20gJy4vaGl0cyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSGl0c10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzSGl0c10sXG4gIGV4cG9ydHM6IFtOZ0Fpc0hpdHNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOZ0Fpc0hpZ2hsaWdodE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzSGl0c01vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEluZmluaXRlSGl0cyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1pbmZpbml0ZS1oaXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHN0YXRlXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gZGVmYXVsdCByZW5kZXJpbmcgaWYgbm8gdGVtcGxhdGUgc3BlY2lmaWVkIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPlxuICAgICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnaXRlbScpXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBoaXQgb2Ygc3RhdGUuaGl0c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFpcy1oaWdobGlnaHQgYXR0cmlidXRlPVwibmFtZVwiIFtoaXRdPVwiaGl0XCI+XG4gICAgICAgICAgICA8L2Fpcy1oaWdobGlnaHQ+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgIFtjbGFzc109XCJjeCgnc2hvd01vcmUnKVwiXG4gICAgICAgIChjbGljayk9XCJzaG93TW9yZSgkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cInN0YXRlLmlzTGFzdFBhZ2VcIlxuICAgICAgICAqbmdJZj1cIiF0ZW1wbGF0ZVwiXG4gICAgICA+XG4gICAgICAgIHt7c2hvd01vcmVMYWJlbH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbmZpbml0ZUhpdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlPzogYW55O1xuXG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxhYmVsOiBzdHJpbmcgPSAnU2hvdyBtb3JlIHJlc3VsdHMnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcblxuICAvLyBpbm5lciB3aWRnZXQgc3RhdGUgcmV0dXJuZWQgZnJvbSBjb25uZWN0b3JcbiAgcHVibGljIHN0YXRlOiB7XG4gICAgaGl0czoge31bXTtcbiAgICBpc0xhc3RQYWdlOiBib29sZWFuO1xuICAgIHNob3dNb3JlOiBGdW5jdGlvbjtcbiAgICByZXN1bHRzOiB7fTtcbiAgfSA9IHtcbiAgICBoaXRzOiBbXSxcbiAgICBpc0xhc3RQYWdlOiBmYWxzZSxcbiAgICBzaG93TW9yZTogbm9vcCxcbiAgICByZXN1bHRzOiB7fSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdJbmZpbml0ZUhpdHMnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0SW5maW5pdGVIaXRzLCB7IGVzY2FwZUhpdHM6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01vcmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuc2hvd01vcmUoKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlID0gKHN0YXRlLCBpc0ZpcnN0UmVuZGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgaWYgKGlzRmlyc3RSZW5kZXJpbmcpIHJldHVybjtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHJlc3VsdHM6IHN0YXRlLnJlc3VsdHMsXG4gICAgICBoaXRzOlxuICAgICAgICB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyhzdGF0ZS5oaXRzKVxuICAgICAgICAgIDogc3RhdGUuaGl0cyxcbiAgICB9O1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSGlnaGxpZ2h0TW9kdWxlIH0gZnJvbSAnLi4vaGlnaGxpZ2h0L2hpZ2hsaWdodC5tb2R1bGUnO1xuaW1wb3J0IHsgTmdBaXNJbmZpbml0ZUhpdHMgfSBmcm9tICcuL2luZmluaXRlLWhpdHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc0luZmluaXRlSGl0c10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzSW5maW5pdGVIaXRzXSxcbiAgZXhwb3J0czogW05nQWlzSW5maW5pdGVIaXRzXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmdBaXNIaWdobGlnaHRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0luZmluaXRlSGl0c01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4vaW5zdGFudHNlYXJjaCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzSW5zdGFudFNlYXJjaF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzSW5zdGFudFNlYXJjaF0sXG4gIGV4cG9ydHM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXSxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdE1lbnUgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBNZW51U3RhdGUgPSB7XG4gIGNhblJlZmluZTogYm9vbGVhbjtcbiAgY2FuVG9nZ2xlU2hvd01vcmU6IGJvb2xlYW47XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGlzU2hvd2luZ01vcmU6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB0b2dnbGVTaG93TW9yZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImN4KClcIlxuICAgICAgKm5nSWY9XCIhaXNIaWRkZW5cIlxuICAgID5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCJ7e3N0YXRlLmNyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJzaG93TW9yZUxpbWl0ICYmIHN0YXRlLmNhblRvZ2dsZVNob3dNb3JlXCJcbiAgICAgICAgKGNsaWNrKT1cInN0YXRlLnRvZ2dsZVNob3dNb3JlKClcIlxuICAgICAgICBbY2xhc3NdPVwic2hvd01vcmVDbGFzc1wiXG4gICAgICA+XG4gICAgICAgIHt7c3RhdGUuaXNTaG93aW5nTW9yZSA/IHNob3dMZXNzTGFiZWwgOiBzaG93TW9yZUxhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHNob3dNb3JlTGFiZWw6IHN0cmluZyA9ICdTaG93IG1vcmUnO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0xlc3NMYWJlbDogc3RyaW5nID0gJ1Nob3cgbGVzcyc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGxpbWl0PzogbnVtYmVyIHwgc3RyaW5nID0gMTA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxpbWl0PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc29ydEJ5Pzogc3RyaW5nW10gfCAoKGl0ZW06IG9iamVjdCkgPT4gbnVtYmVyKTtcblxuICBwdWJsaWMgc3RhdGU6IE1lbnVTdGF0ZSA9IHtcbiAgICBjYW5SZWZpbmU6IGZhbHNlLFxuICAgIGNhblRvZ2dsZVNob3dNb3JlOiBmYWxzZSxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXNTaG93aW5nTW9yZTogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB0b2dnbGVTaG93TW9yZTogbm9vcCxcbiAgfTtcblxuICBnZXQgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMuYXV0b0hpZGVDb250YWluZXI7XG4gIH1cblxuICBnZXQgc2hvd01vcmVDbGFzcygpIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jeCgnc2hvd01vcmUnKTtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5jYW5Ub2dnbGVTaG93TW9yZSkge1xuICAgICAgY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3RoaXMuY3goJ3Nob3dNb3JlJywgJ2Rpc2FibGVkJyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2Zvcm1JdGVtcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybUl0ZW1zKHRoaXMuc3RhdGUuaXRlbXMpXG4gICAgICA6IHRoaXMuc3RhdGUuaXRlbXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdE1lbnUsIHtcbiAgICAgIGxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMubGltaXQpLFxuICAgICAgc2hvd01vcmVMaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnNob3dNb3JlTGltaXQpLFxuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgIH0pO1xuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzTWVudSB9IGZyb20gJy4vbWVudSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzTWVudV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzTWVudV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc01lbnVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdE51bWVyaWNSZWZpbmVtZW50TGlzdCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE51bWVyaWNSZWZpbmVtZW50TGlzdFN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBpdGVtczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1udW1lcmljLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUuaXRlbXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdyYWRpbycpXCJcbiAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgbmFtZT1cIk51bWVyaWNNZW51XCJcbiAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXRlbS5pc1JlZmluZWRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWxUZXh0JylcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNOdW1lcmljTWVudSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpdGVtczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdGFydD86IG51bWJlcjtcbiAgICBlbmQ/OiBudW1iZXI7XG4gIH1bXTtcblxuICBwdWJsaWMgc3RhdGU6IE51bWVyaWNSZWZpbmVtZW50TGlzdFN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ051bWVyaWNNZW51Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdE51bWVyaWNSZWZpbmVtZW50TGlzdCwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBvcHRpb25zOiB0aGlzLml0ZW1zLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVmaW5lKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiB7IHZhbHVlOiBzdHJpbmcgfSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoaXRlbS52YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc051bWVyaWNNZW51IH0gZnJvbSAnLi9udW1lcmljLW1lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc051bWVyaWNNZW51XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNOdW1lcmljTWVudV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc051bWVyaWNNZW51XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzTnVtZXJpY01lbnVNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0TnVtZXJpY1NlbGVjdG9yIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgTnVtZXJpY1NlbGVjdG9yU3RhdGUgPSB7XG4gIGN1cnJlbnRSZWZpbmVtZW50Pzogc3RyaW5nIHwgbnVsbDtcbiAgb3B0aW9uczoge31bXTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1udW1lcmljLXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgnJylcIj5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgW2NsYXNzXT1cImN4KCdzZWxlY3QnKVwiXG4gICAgICAgIChjaGFuZ2UpPVwic3RhdGUucmVmaW5lKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnb3B0aW9uJylcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLm9wdGlvbnNcIlxuICAgICAgICAgIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXRlbS52YWx1ZSA9PT0gc3RhdGUuY3VycmVudFJlZmluZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNOdW1lcmljU2VsZWN0b3IgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgb3BlcmF0b3I6ICc8JyB8ICc8PScgfCAnPScgfCAnPj0nIHwgJz4nIHwgJyE9JyA9ICc9JztcbiAgQElucHV0KClcbiAgcHVibGljIGl0ZW1zOiB7XG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICBsYWJlbDogc3RyaW5nO1xuICB9W107XG5cbiAgcHVibGljIHN0YXRlOiBOdW1lcmljU2VsZWN0b3JTdGF0ZSA9IHtcbiAgICBjdXJyZW50UmVmaW5lbWVudDogbnVsbCxcbiAgICBvcHRpb25zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignTnVtZXJpY1NlbGVjdG9yJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdE51bWVyaWNTZWxlY3Rvciwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBvcGVyYXRvcjogdGhpcy5vcGVyYXRvcixcbiAgICAgIG9wdGlvbnM6IHRoaXMuaXRlbXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzTnVtZXJpY1NlbGVjdG9yIH0gZnJvbSAnLi9udW1lcmljLXNlbGVjdG9yJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNOdW1lcmljU2VsZWN0b3JdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc051bWVyaWNTZWxlY3Rvcl0sXG4gIGV4cG9ydHM6IFtOZ0Fpc051bWVyaWNTZWxlY3Rvcl0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc051bWVyaWNTZWxlY3Rvck1vZHVsZSB7fVxuIiwiY29uc3QgcmFuZ2UgPSByZXF1aXJlKCdsb2Rhc2gvcmFuZ2UnKTtcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdFBhZ2luYXRpb24gfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPHVsIFtjbGFzc109XCJjeCgnbGlzdCcpXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd0ZpcnN0XCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgMClcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ2ZpcnN0UGFnZScpICtcbiAgICAgICAgICAgIChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCA9PT0gMCA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTCgwKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgw6LCgMK5w6LCgMK5XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaVxuICAgICAgICAgICpuZ0lmPVwic2hvd1ByZXZpb3VzXCJcbiAgICAgICAgICAoY2xpY2spPVwicmVmaW5lKCRldmVudCwgc3RhdGUuY3VycmVudFJlZmluZW1lbnQgLSAxKVwiXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAncHJldmlvdXNQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ID09PSAwID8gJyAnICsgY3goJ2l0ZW0nLCAnZGlzYWJsZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50IC0gMSlcIlxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIMOiwoDCuVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiXG4gICAgICAgICAgICBjeCgnaXRlbScpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBjeCgnaXRlbScsICdwYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ID09PSBwYWdlID8gJyAnICsgY3goJ2l0ZW0nLCAnc2VsZWN0ZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgcGFnZXNcIlxuICAgICAgICAgIChjbGljayk9XCJyZWZpbmUoJGV2ZW50LCBwYWdlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdsaW5rJylcIlxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHBhZ2UpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7e3BhZ2UgKyAxfX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nSWY9XCJzaG93TmV4dFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSlcIlxuICAgICAgICAgIFtjbGFzc109XCJcbiAgICAgICAgICAgIGN4KCdpdGVtJykgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGN4KCdpdGVtJywgJ25leHRQYWdlJykgK1xuICAgICAgICAgICAgKHN0YXRlLmN1cnJlbnRSZWZpbmVtZW50ICsgMSA9PT0gc3RhdGUubmJQYWdlcyA/ICcgJyArIGN4KCdpdGVtJywgJ2Rpc2FibGVkJykgOiAnJylcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIFtocmVmXT1cInN0YXRlLmNyZWF0ZVVSTChzdGF0ZS5jdXJyZW50UmVmaW5lbWVudCArIDEpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDDosKAwrpcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nSWY9XCJzaG93TGFzdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIHN0YXRlLm5iUGFnZXMgLSAxKVwiXG4gICAgICAgICAgW2NsYXNzXT1cIlxuICAgICAgICAgICAgY3goJ2l0ZW0nKSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgY3goJ2l0ZW0nLCAnbGFzdFBhZ2UnKSArXG4gICAgICAgICAgICAoc3RhdGUuY3VycmVudFJlZmluZW1lbnQgKyAxID09PSBzdGF0ZS5uYlBhZ2VzID8gJyAnICsgY3goJ2l0ZW0nLCAnZGlzYWJsZWQnKSA6ICcnKVxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgW2hyZWZdPVwic3RhdGUuY3JlYXRlVVJMKHN0YXRlLm5iUGFnZXMgLSAxKVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgw6LCgMK6w6LCgMK6XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNQYWdpbmF0aW9uIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93Rmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0xhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNob3dQcmV2aW91czogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TmV4dDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWRkaW5nOiBudW1iZXIgfCBzdHJpbmcgPSAzO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zd1xuICBASW5wdXQoKSBwdWJsaWMgdG90YWxQYWdlcz86IG51bWJlciB8IHN0cmluZztcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIGN1cnJlbnRSZWZpbmVtZW50OiAwLFxuICAgIG5iSGl0czogMCxcbiAgICBuYlBhZ2VzOiAwLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBnZXQgcGFnZXMoKSB7XG4gICAgY29uc3QgeyBuYlBhZ2VzLCBjdXJyZW50UmVmaW5lbWVudCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHBhZ2VzQXJyYXkgPSBBcnJheS5hcHBseShudWxsLCB7IGxlbmd0aDogbmJQYWdlcyB9KS5tYXAoXG4gICAgICBOdW1iZXIuY2FsbCxcbiAgICAgIE51bWJlclxuICAgICk7XG5cbiAgICBjb25zdCBwYWdlc1BhZGRpbmcgPVxuICAgICAgdHlwZW9mIHRoaXMucGFkZGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBwYXJzZUludCh0aGlzLnBhZGRpbmcsIDEwKVxuICAgICAgICA6IHRoaXMucGFkZGluZztcblxuICAgIGlmIChwYWdlc1BhZGRpbmcgJiYgcGFnZXNQYWRkaW5nID4gMCkge1xuICAgICAgLy8gc2hvdWxkIG5vdCBkaXNwbGF5IHBhZ2VzIHRoYXQgZG9lcyBub3QgZXhpc3RzXG4gICAgICBpZiAobmJQYWdlcyA8IHBhZ2VzUGFkZGluZyAqIDIgKyAxKSB7XG4gICAgICAgIHJldHVybiBwYWdlc0FycmF5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtaW5EZWx0YSA9IGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nIC0gMTtcbiAgICAgIGNvbnN0IG1heERlbHRhID0gY3VycmVudFJlZmluZW1lbnQgKyBwYWdlc1BhZGRpbmcgKyAxO1xuXG4gICAgICBpZiAobWluRGVsdGEgPCAwKSB7XG4gICAgICAgIHJldHVybiByYW5nZSgwLCBjdXJyZW50UmVmaW5lbWVudCArIHBhZ2VzUGFkZGluZyArIE1hdGguYWJzKG1pbkRlbHRhKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhEZWx0YSA+IG5iUGFnZXMpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlKFxuICAgICAgICAgIGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nIC0gKG1heERlbHRhIC0gbmJQYWdlcyksXG4gICAgICAgICAgbmJQYWdlc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmFuZ2UoXG4gICAgICAgIGN1cnJlbnRSZWZpbmVtZW50IC0gcGFnZXNQYWRkaW5nLFxuICAgICAgICBjdXJyZW50UmVmaW5lbWVudCArIHBhZ2VzUGFkZGluZyArIDFcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2VzQXJyYXk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdQYWdpbmF0aW9uJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFBhZ2luYXRpb24sIHtcbiAgICAgIG1heFBhZ2VzOiBwYXJzZU51bWJlcklucHV0KHRoaXMudG90YWxQYWdlcyksXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZpbmUoZXZlbnQ6IE1vdXNlRXZlbnQsIHBhZ2U6IG51bWJlcikge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoXG4gICAgICBwYWdlIDwgMCB8fFxuICAgICAgcGFnZSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UmVmaW5lbWVudCB8fFxuICAgICAgcGFnZSA+PSB0aGlzLnN0YXRlLm5iUGFnZXNcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLnJlZmluZShwYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzUGFnaW5hdGlvbl0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUGFnaW5hdGlvbl0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1BhZ2luYXRpb25dLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNQYWdpbmF0aW9uTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0UmFuZ2UgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcblxuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlcklucHV0LCBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBSYW5nZVNsaWRlclN0YXRlID0ge1xuICByYW5nZTogeyBtaW46IG51bWJlcjsgbWF4OiBudW1iZXIgfTtcbiAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgc3RhcnQ6IG51bWJlcltdO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJhbmdlLXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPGRpdiBbY2xhc3NdPVwiY3goJ2JvZHknKVwiPlxuICAgICAgICA8ZGl2ICNzbGlkZXJDb250YWluZXI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYW5nZVNsaWRlciBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBAVmlld0NoaWxkKCdzbGlkZXJDb250YWluZXInKSBwdWJsaWMgc2xpZGVyQ29udGFpbmVyOiBhbnk7XG5cbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIHBpcHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1pbj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHByZWNpc2lvbjogbnVtYmVyIHwgc3RyaW5nID0gMjtcblxuICBwdWJsaWMgc3RhdGU6IFJhbmdlU2xpZGVyU3RhdGUgPSB7XG4gICAgcmFuZ2U6IHsgbWluOiAwLCBtYXg6IDEgfSxcbiAgICByZWZpbmU6IG5vb3AsXG4gICAgc3RhcnQ6IFswLCAxXSxcbiAgfTtcblxuICBwcml2YXRlIHNsaWRlcjogYW55O1xuXG4gIGdldCBzdGVwKCkge1xuICAgIC8vIGNvbXB1dGUgc3RlcCBmcm9tIHRoZSBwcmVjaXNpb24gdmFsdWVcbiAgICBjb25zdCBwcmVjaXNpb24gPSBwYXJzZU51bWJlcklucHV0KHRoaXMucHJlY2lzaW9uKSB8fCAyO1xuICAgIHJldHVybiAxIC8gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdSYW5nZVNsaWRlcicpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RSYW5nZSwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBtYXg6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5tYXgpLFxuICAgICAgbWluOiBwYXJzZU51bWJlcklucHV0KHRoaXMubWluKSxcbiAgICAgIHByZWNpc2lvbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbiksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVN0YXRlID0gKHN0YXRlLCBpc0ZpcnN0UmVuZGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgaWYgKGlzRmlyc3RSZW5kZXJpbmcpIHtcbiAgICAgIC8vIGNyZWF0ZSBzbGlkZXJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgYW5pbWF0ZTogZmFsc2UsXG4gICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxuICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICByYW5nZTogeyBtaW46IDAsIG1heDogMSB9LFxuICAgICAgICBzdGFydDogWzAsIDFdLFxuICAgICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzICYmIFtcbiAgICAgICAgICB7IHRvOiB0aGlzLmZvcm1hdFRvb2x0aXAgfSxcbiAgICAgICAgICB7IHRvOiB0aGlzLmZvcm1hdFRvb2x0aXAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLnBpcHMgPT09IHRydWUgfHwgdHlwZW9mIHRoaXMucGlwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHtcbiAgICAgICAgICBwaXBzOiB7XG4gICAgICAgICAgICBkZW5zaXR5OiAzLFxuICAgICAgICAgICAgbW9kZTogJ3Bvc2l0aW9ucycsXG4gICAgICAgICAgICBzdGVwcGVkOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWVzOiBbMCwgNTAsIDEwMF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGlwcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB7IHBpcHM6IHRoaXMucGlwcyB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuXG4gICAgICAvLyByZWdpc3RlciBsaXN0ZW4gZXZlbnRzXG4gICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm5vVWlTbGlkZXIub24oXG4gICAgICAgICdjaGFuZ2UnLFxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgY29tcG9uZW50IGlubmVyIHN0YXRlXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBzbGlkZXIgc3RhdGVcbiAgICBjb25zdCB7XG4gICAgICByYW5nZTogeyBtaW4sIG1heCB9LFxuICAgICAgc3RhcnQsXG4gICAgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZGlzYWJsZWQgPSBtaW4gPT09IG1heDtcbiAgICBjb25zdCByYW5nZSA9IGRpc2FibGVkID8geyBtaW4sIG1heDogbWF4ICsgMC4wMDAxIH0gOiB7IG1pbiwgbWF4IH07XG5cbiAgICB0aGlzLnNsaWRlci51cGRhdGVPcHRpb25zKHsgZGlzYWJsZWQsIHJhbmdlLCBzdGFydCB9KTtcbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlQ2hhbmdlID0gKHZhbHVlczogc3RyaW5nW10gfCBudW1iZXJbXSkgPT4ge1xuICAgIHRoaXMuc3RhdGUucmVmaW5lKHZhbHVlcyk7XG4gIH07XG5cbiAgcHVibGljIGZvcm1hdFRvb2x0aXAgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1JhbmdlU2xpZGVyIH0gZnJvbSAnLi9yYW5nZS1zbGlkZXInO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JhbmdlU2xpZGVyXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNSYW5nZVNsaWRlcl0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1JhbmdlU2xpZGVyXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmFuZ2VTbGlkZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdFJlZmluZW1lbnRMaXN0IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgcGFyc2VOdW1iZXJJbnB1dCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgY2FuUmVmaW5lOiBib29sZWFuO1xuICBjYW5Ub2dnbGVTaG93TW9yZTogYm9vbGVhbjtcbiAgY3JlYXRlVVJMOiBGdW5jdGlvbjtcbiAgaXNTaG93aW5nTW9yZTogYm9vbGVhbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG4gIHRvZ2dsZVNob3dNb3JlOiBGdW5jdGlvbjtcbiAgc2VhcmNoRm9ySXRlbXM6IEZ1bmN0aW9uO1xuICBpc0Zvcm1TZWFyY2g6IGJvb2xlYW47XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcmVmaW5lbWVudC1saXN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdJZj1cInNlYXJjaGFibGVcIlxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlYXJjaEJveCcpXCJcbiAgICAgID5cbiAgICAgICAgPGFpcy1mYWNldHMtc2VhcmNoXG4gICAgICAgICAgW3NlYXJjaF09XCJzdGF0ZS5zZWFyY2hGb3JJdGVtc1wiXG4gICAgICAgICAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cInNlYXJjaFBsYWNlaG9sZGVyXCJcbiAgICAgICAgPlxuICAgICAgICA8L2Fpcy1mYWNldHMtc2VhcmNoPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbUNsYXNzKGl0ZW0pXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgKGNsaWNrKT1cInJlZmluZSgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxsYWJlbCBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2NoZWNrYm94JylcIlxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICB2YWx1ZT1cInt7aXRlbS52YWx1ZX19XCJcbiAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXRlbS5pc1JlZmluZWRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWxUZXh0JylcIj5cbiAgICAgICAgICAgICAgPGFpcy1oaWdobGlnaHQgYXR0cmlidXRlPVwiaGlnaGxpZ2h0ZWRcIiBbaGl0XT1cIml0ZW1cIj48L2Fpcy1oaWdobGlnaHQ+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e2l0ZW0uY291bnR9fTwvc3Bhbj5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICAqbmdJZj1cInNob3dNb3JlTGltaXQgJiYgc3RhdGUuY2FuVG9nZ2xlU2hvd01vcmVcIlxuICAgICAgICAoY2xpY2spPVwic3RhdGUudG9nZ2xlU2hvd01vcmUoKVwiXG4gICAgICA+XG4gICAgICAgIHt7c3RhdGUuaXNTaG93aW5nTW9yZSA/IHNob3dMZXNzTGFiZWwgOiBzaG93TW9yZUxhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JlZmluZW1lbnRMaXN0IGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93TW9yZUxhYmVsOiBzdHJpbmcgPSAnU2hvdyBtb3JlJztcbiAgQElucHV0KCkgcHVibGljIHNob3dMZXNzTGFiZWw6IHN0cmluZyA9ICdTaG93IGxlc3MnO1xuICBASW5wdXQoKSBwdWJsaWMgdHJhbnNmb3JtSXRlbXM/OiBGdW5jdGlvbjtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaGFibGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2ggaGVyZS4uLic7XG5cbiAgLy8gY29ubmVjdG9ycyBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG9wZXJhdG9yOiAnb3InIHwgJ2FuZCcgPSAnb3InO1xuICBASW5wdXQoKSBwdWJsaWMgbGltaXQ6IG51bWJlciB8IHN0cmluZyA9IDEwO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd01vcmVMaW1pdDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc29ydEJ5OiBzdHJpbmdbXSB8ICgoaXRlbTogb2JqZWN0KSA9PiBudW1iZXIpO1xuXG4gIHB1YmxpYyBzdGF0ZTogUmVmaW5lbWVudExpc3RTdGF0ZSA9IHtcbiAgICBjYW5SZWZpbmU6IGZhbHNlLFxuICAgIGNhblRvZ2dsZVNob3dNb3JlOiBmYWxzZSxcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaXNTaG93aW5nTW9yZTogZmFsc2UsXG4gICAgaXRlbXM6IFtdLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICB0b2dnbGVTaG93TW9yZTogbm9vcCxcbiAgICBzZWFyY2hGb3JJdGVtczogbm9vcCxcbiAgICBpc0Zvcm1TZWFyY2g6IGZhbHNlLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1JlZmluZW1lbnRMaXN0Jyk7XG4gIH1cblxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXModGhpcy5zdGF0ZS5pdGVtcylcbiAgICAgIDogdGhpcy5zdGF0ZS5pdGVtcztcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0UmVmaW5lbWVudExpc3QsIHtcbiAgICAgIGxpbWl0OiBwYXJzZU51bWJlcklucHV0KHRoaXMubGltaXQpLFxuICAgICAgc2hvd01vcmVMaW1pdDogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnNob3dNb3JlTGltaXQpLFxuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgICAgZXNjYXBlRmFjZXRWYWx1ZXM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIHJlZmluZShcbiAgICBldmVudDogTW91c2VFdmVudCxcbiAgICBpdGVtOiB7IGlzUmVmaW5lZDogYm9vbGVhbjsgdmFsdWU6IHN0cmluZyB9XG4gICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5jYW5SZWZpbmUpIHtcbiAgICAgIC8vIHVwZGF0ZSBVSSBkaXJlY3RseSwgaXQgd2lsbCB1cGRhdGUgdGhlIGNoZWNrYm94IHN0YXRlXG4gICAgICBpdGVtLmlzUmVmaW5lZCA9ICFpdGVtLmlzUmVmaW5lZDtcblxuICAgICAgLy8gcmVmaW5lIHRocm91Z2ggQWxnb2xpYSBBUElcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtZmFjZXRzLXNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPGZvcm1cbiAgICAgICAgW2NsYXNzXT1cImN4KCdmb3JtJylcIlxuICAgICAgICAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgICAgbm92YWxpZGF0ZVxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ2lucHV0JylcIlxuICAgICAgICAgIGF1dG9jYXBpdGFsaXplPVwib2ZmXCJcbiAgICAgICAgICBhdXRvY29ycmVjdD1cIm9mZlwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e3NlYXJjaFBsYWNlaG9sZGVyfX1cIlxuICAgICAgICAgIHJvbGU9XCJ0ZXh0Ym94XCJcbiAgICAgICAgICBzcGVsbGNoZWNrPVwiZmFsc2VcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBbdmFsdWVdPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgIChpbnB1dCk9XCJoYW5kbGVDaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3N1Ym1pdCcpXCJcbiAgICAgICAgICB0aXRsZT1cIlN1Ym1pdCB0aGUgc2VhcmNoIHF1ZXJ5LlwiXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjeCgnc3VibWl0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAgNDBcIlxuICAgICAgICAgICAgd2lkdGg9XCIxMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0yNi44MDQgMjkuMDFjLTIuODMyIDIuMzQtNi40NjUgMy43NDYtMTAuNDI2IDMuNzQ2QzcuMzMzIDMyLjc1NiAwIDI1LjQyNCAwIDE2LjM3OCAwIDcuMzMzIDcuMzMzIDAgMTYuMzc4IDBjOS4wNDYgMCAxNi4zNzggNy4zMzMgMTYuMzc4IDE2LjM3OCAwIDMuOTYtMS40MDYgNy41OTQtMy43NDYgMTAuNDI2bDEwLjUzNCAxMC41MzRjLjYwNy42MDcuNjEgMS41OS0uMDA0IDIuMjAyLS42MS42MS0xLjU5Ny42MS0yLjIwMi4wMDRMMjYuODA0IDI5LjAxem0tMTAuNDI2LjYyN2M3LjMyMyAwIDEzLjI2LTUuOTM2IDEzLjI2LTEzLjI2IDAtNy4zMi01LjkzNy0xMy4yNTctMTMuMjYtMTMuMjU3QzkuMDU2IDMuMTIgMy4xMiA5LjA1NiAzLjEyIDE2LjM3OGMwIDcuMzIzIDUuOTM2IDEzLjI2IDEzLjI1OCAxMy4yNnpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAgIHR5cGU9XCJyZXNldFwiXG4gICAgICAgICAgdGl0bGU9XCJDbGVhciB0aGUgc2VhcmNoIHF1ZXJ5LlwiXG4gICAgICAgICAgaGlkZGVuXG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjeCgncmVzZXRJY29uJylcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgICAgICAgICB3aWR0aD1cIjEwXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjEwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTguMTE0IDEwTC45NDQgMi44MyAwIDEuODg1IDEuODg2IDBsLjk0My45NDNMMTAgOC4xMTNsNy4xNy03LjE3Ljk0NC0uOTQzTDIwIDEuODg2bC0uOTQzLjk0My03LjE3IDcuMTcgNy4xNyA3LjE3Ljk0My45NDRMMTguMTE0IDIwbC0uOTQzLS45NDMtNy4xNy03LjE3LTcuMTcgNy4xNy0uOTQ0Ljk0M0wwIDE4LjExNGwuOTQzLS45NDNMOC4xMTMgMTB6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNGYWNldHNTZWFyY2gge1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaDogRnVuY3Rpb247XG5cbiAgcHVibGljIGN4ID0gYmVtKCdTZWFyY2hCb3gnKTtcblxuICBwdWJsaWMgc2VhcmNoUXVlcnkgPSAnJztcblxuICBwdWJsaWMgaGFuZGxlQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gdmFsdWU7XG4gICAgdGhpcy5zZWFyY2godmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZVN1Ym1pdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWFyY2godGhpcy5zZWFyY2hRdWVyeSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB9IGZyb20gJy4uL2hpZ2hsaWdodC9oaWdobGlnaHQubW9kdWxlJztcbmltcG9ydCB7IE5nQWlzUmVmaW5lbWVudExpc3QgfSBmcm9tICcuL3JlZmluZW1lbnQtbGlzdCc7XG5pbXBvcnQgeyBOZ0Fpc0ZhY2V0c1NlYXJjaCB9IGZyb20gJy4vZmFjZXRzLXNlYXJjaCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzUmVmaW5lbWVudExpc3QsIE5nQWlzRmFjZXRzU2VhcmNoXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNSZWZpbmVtZW50TGlzdF0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1JlZmluZW1lbnRMaXN0XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmdBaXNIaWdobGlnaHRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JlZmluZW1lbnRMaXN0TW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U2VhcmNoQm94IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXNlYXJjaC1ib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgbm92YWxpZGF0ZVxuICAgICAgICAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcpXCJcbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiXG4gICAgICAgICAgYXV0b2NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCJcbiAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInN0YXRlLnF1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAoZm9jdXMpPVwiZm9jdXMuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgI3NlYXJjaEJveFxuICAgICAgICAvPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3N1Ym1pdCcpXCJcbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICB0aXRsZT1cInt7c3VibWl0VGl0bGV9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdWJtaXRJY29uJylcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCA0MCA0MFwiXG4gICAgICAgICAgICB3aWR0aD1cIjQwXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjQwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI2LjgwNCAyOS4wMWMtMi44MzIgMi4zNC02LjQ2NSAzLjc0Ni0xMC40MjYgMy43NDZDNy4zMzMgMzIuNzU2IDAgMjUuNDI0IDAgMTYuMzc4IDAgNy4zMzMgNy4zMzMgMCAxNi4zNzggMGM5LjA0NiAwIDE2LjM3OCA3LjMzMyAxNi4zNzggMTYuMzc4IDAgMy45Ni0xLjQwNiA3LjU5NC0zLjc0NiAxMC40MjZsMTAuNTM0IDEwLjUzNGMuNjA3LjYwNy42MSAxLjU5LS4wMDQgMi4yMDItLjYxLjYxLTEuNTk3LjYxLTIuMjAyLjAwNEwyNi44MDQgMjkuMDF6bS0xMC40MjYuNjI3YzcuMzIzIDAgMTMuMjYtNS45MzYgMTMuMjYtMTMuMjYgMC03LjMyLTUuOTM3LTEzLjI1Ny0xMy4yNi0xMy4yNTdDOS4wNTYgMy4xMiAzLjEyIDkuMDU2IDMuMTIgMTYuMzc4YzAgNy4zMjMgNS45MzYgMTMuMjYgMTMuMjU4IDEzLjI2elwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgICAgdHlwZT1cInJlc2V0XCJcbiAgICAgICAgICB0aXRsZT1cInt7cmVzZXRUaXRsZX19XCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlUmVzZXQoJGV2ZW50KVwiXG4gICAgICAgICAgW2hpZGRlbl09XCIhc3RhdGUucXVlcnkgfHwgKHN0YXRlLnF1ZXJ5ICYmICFzdGF0ZS5xdWVyeS50cmltKCkpXCI+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3Jlc2V0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgd2lkdGg9XCIyMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04LjExNCAxMEwuOTQ0IDIuODMgMCAxLjg4NSAxLjg4NiAwbC45NDMuOTQzTDEwIDguMTEzbDcuMTctNy4xNy45NDQtLjk0M0wyMCAxLjg4NmwtLjk0My45NDMtNy4xNyA3LjE3IDcuMTcgNy4xNy45NDMuOTQ0TDE4LjExNCAyMGwtLjk0My0uOTQzLTcuMTctNy4xNy03LjE3IDcuMTctLjk0NC45NDNMMCAxOC4xMTRsLjk0My0uOTQzTDguMTEzIDEwelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU2VhcmNoQm94IGV4dGVuZHMgQmFzZVdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdzZWFyY2hCb3gnKSBzZWFyY2hCb3g6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWJtaXRUaXRsZTogc3RyaW5nID0gJ1N1Ym1pdCc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXNldFRpdGxlOiBzdHJpbmcgPSAnUmVzZXQnO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoQXNZb3VUeXBlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGF1dG9mb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIE91dHB1dCBldmVudHNcbiAgLy8gZm9ybVxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzZXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gaW5wdXRcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgcXVlcnk6ICcnLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTZWFyY2hCb3gnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0U2VhcmNoQm94KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b2ZvY3VzKSB7XG4gICAgICB0aGlzLnNlYXJjaEJveC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZShxdWVyeTogc3RyaW5nKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChxdWVyeSk7XG5cbiAgICBpZiAodGhpcy5zZWFyY2hBc1lvdVR5cGUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlU3VibWl0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gc2VuZCBzdWJtaXQgZXZlbnQgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgIHRoaXMuc3VibWl0LmVtaXQoZXZlbnQpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghdGhpcy5zZWFyY2hBc1lvdVR5cGUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKHRoaXMuc3RhdGUucXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVSZXNldChldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIHNlbmQgcmVzZXQgZXZlbnQgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgIHRoaXMucmVzZXQuZW1pdChldmVudCk7XG5cbiAgICAvLyByZXNldCBzZWFyY2hcbiAgICB0aGlzLnN0YXRlLnJlZmluZSgnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1NlYXJjaEJveCB9IGZyb20gJy4vc2VhcmNoLWJveCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzU2VhcmNoQm94XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNTZWFyY2hCb3hdLFxuICBleHBvcnRzOiBbTmdBaXNTZWFyY2hCb3hdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTZWFyY2hCb3hNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U29ydEJ5U2VsZWN0b3IgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtc29ydC1ieScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY3goKVwiPlxuICAgICAgPHNlbGVjdFxuICAgICAgICBbY2xhc3NdPVwiY3goJ3NlbGVjdCcpXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzdGF0ZS5yZWZpbmUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdvcHRpb24nKVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUub3B0aW9uc1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJpdGVtLnZhbHVlID09PSBzdGF0ZS5jdXJyZW50UmVmaW5lbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NvcnRCeSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXRlbXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgfVtdO1xuXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGN1cnJlbnRSZWZpbmVtZW50OiBzdHJpbmcgfCBudWxsO1xuICAgIG9wdGlvbnM6IHt9W107XG4gICAgcmVmaW5lOiBGdW5jdGlvbjtcbiAgfSA9IHtcbiAgICBjdXJyZW50UmVmaW5lbWVudDogbnVsbCxcbiAgICBvcHRpb25zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU29ydEJ5Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFNvcnRCeVNlbGVjdG9yLCB7IGluZGljZXM6IHRoaXMuaXRlbXMgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzU29ydEJ5IH0gZnJvbSAnLi9zb3J0LWJ5JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNTb3J0QnldLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1NvcnRCeV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1NvcnRCeV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NvcnRCeU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RTdGFyUmF0aW5nIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgUmF0aW5nTWVudVN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICBoYXNOb1Jlc3VsdHM6IGJvb2xlYW47XG4gIGl0ZW1zOiB7fVtdO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXJhdGluZy1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPHN2ZyBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cbiAgICAgICAgPHN5bWJvbFxuICAgICAgICAgIGlkPVwiYWlzLVN0YXJSYXRpbmctc3RhclN5bWJvbFwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiAuMjg4bDIuODMzIDguNzE4aDkuMTY3bC03LjQxNyA1LjM4OSAyLjgzMyA4LjcxOC03LjQxNi01LjM4OC03LjQxNyA1LjM4OCAyLjgzMy04LjcxOC03LjQxNi01LjM4OWg5LjE2N3pcIi8+XG4gICAgICAgIDwvc3ltYm9sPlxuICAgICAgICA8c3ltYm9sXG4gICAgICAgICAgaWQ9XCJhaXMtU3RhclJhdGluZy1zdGFyRW1wdHlTeW1ib2xcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgNi43NmwxLjM3OSA0LjI0Nmg0LjQ2NWwtMy42MTIgMi42MjUgMS4zNzkgNC4yNDYtMy42MTEtMi42MjUtMy42MTIgMi42MjUgMS4zNzktNC4yNDYtMy42MTItMi42MjVoNC40NjVsMS4zOC00LjI0NnptMC02LjQ3MmwtMi44MzMgOC43MThoLTkuMTY3bDcuNDE2IDUuMzg5LTIuODMzIDguNzE4IDcuNDE3LTUuMzg4IDcuNDE2IDUuMzg4LTIuODMzLTguNzE4IDcuNDE3LTUuMzg5aC05LjE2N2wtMi44MzMtOC43MTh6XCIvPlxuICAgICAgICA8L3N5bWJvbD5cbiAgICAgIDwvc3ZnPlxuXG4gICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUuaXRlbXNcIlxuICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwie3tzdGF0ZS5jcmVhdGVVUkwoaXRlbS52YWx1ZSl9fVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2xpbmsnKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpdGVtLnZhbHVlKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc3RhciBvZiBpdGVtLnN0YXJzXCJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3N0YXJJY29uJylcIlxuICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dXNlXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzdGFyXCJcbiAgICAgICAgICAgICAgICB4bGluazpocmVmPVwiI2Fpcy1TdGFyUmF0aW5nLXN0YXJTeW1ib2xcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvdXNlPlxuXG4gICAgICAgICAgICAgIDx1c2VcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFzdGFyXCJcbiAgICAgICAgICAgICAgICB4bGluazpocmVmPVwiI2Fpcy1TdGFyUmF0aW5nLXN0YXJFbXB0eVN5bWJvbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC91c2U+XG4gICAgICAgICAgICA8L3N2Zz5cblxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdsYWJlbCcpXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3thbmRVcExhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2NvdW50JylcIj57e2l0ZW0uY291bnR9fTwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1JhdGluZ01lbnUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gcmVuZGVyIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGFuZFVwTGFiZWw6IHN0cmluZyA9ICcmIFVwJztcblxuICAvLyBjb25uZWN0b3JzIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWF4PzogbnVtYmVyID0gNTtcblxuICBwdWJsaWMgc3RhdGU6IFJhdGluZ01lbnVTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgaGFzTm9SZXN1bHRzOiBmYWxzZSxcbiAgICBpdGVtczogW10sXG4gICAgcmVmaW5lOiBub29wLFxuICB9O1xuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5hdXRvSGlkZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1JhdGluZ01lbnUnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0U3RhclJhdGluZywge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBtYXg6IHRoaXMubWF4LFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUodmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNSYXRpbmdNZW51IH0gZnJvbSAnLi9yYXRpbmctbWVudSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzUmF0aW5nTWVudV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzUmF0aW5nTWVudV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1JhdGluZ01lbnVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSYXRpbmdNZW51TW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWYsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RTdGF0cyB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5cbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtc3RhdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogdGVtcGxhdGVDb250ZXh0XCI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPHNwYW4gKm5nSWY9XCIhdGVtcGxhdGVcIiBbY2xhc3NdPVwiY3goJ3RleHQnKVwiPlxuICAgICAgICB7e3N0YXRlLm5iSGl0c319IHJlc3VsdHMgZm91bmQgaW4ge3tzdGF0ZS5wcm9jZXNzaW5nVGltZU1TfX1tcy5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNTdGF0cyBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGU6IGFueTtcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgaGl0UGVyUGFnZTogMCxcbiAgICBuYkhpdHM6IDAsXG4gICAgbmJQYWdlczogMCxcbiAgICBwYWdlOiAwLFxuICAgIHByb2Nlc3NpbmdUaW1lTVM6IDAsXG4gICAgcXVlcnk6ICcnLFxuICB9O1xuXG4gIGdldCB0ZW1wbGF0ZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIHsgc3RhdGU6IHRoaXMuc3RhdGUgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ0Fpc0luc3RhbnRTZWFyY2gpKVxuICAgIHB1YmxpYyBpbnN0YW50U2VhcmNoUGFyZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoJ1N0YXRzJyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFN0YXRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzU3RhdHMgfSBmcm9tICcuL3N0YXRzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNTdGF0c10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nQWlzU3RhdHNdLFxuICBleHBvcnRzOiBbTmdBaXNTdGF0c10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1N0YXRzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFRvZ2dsZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFRvZ2dsZVN0YXRlID0ge1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICB2YWx1ZToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgY291bnQ/OiBudW1iZXI7XG4gICAgaXNSZWZpbmVkPzogYm9vbGVhbjtcbiAgfTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICA8bGFiZWwgW2NsYXNzXT1cImN4KCdsYWJlbCcpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cImN4KCdjaGVja2JveCcpXCJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgdmFsdWU9XCJ7e3N0YXRlLnZhbHVlLm5hbWV9fVwiXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cInN0YXRlLnZhbHVlLmlzUmVmaW5lZFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsVGV4dCcpXCI+XG4gICAgICAgICAgICAgIHt7bGFiZWwgfHwgc3RhdGUudmFsdWUubmFtZX19XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7c3RhdGUudmFsdWUuY291bnR9fTwvc3Bhbj5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNUb2dnbGUgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHZhbHVlczogeyBvbj86IGJvb2xlYW47IG9mZj86IGJvb2xlYW4gfSA9IHsgb246IHRydWUsIG9mZjogdW5kZWZpbmVkIH07XG5cbiAgcHVibGljIHN0YXRlOiBUb2dnbGVTdGF0ZSA9IHtcbiAgICBjcmVhdGVVUkw6IG5vb3AsXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHZhbHVlOiB7fSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdUb2dnbGVSZWZpbmVtZW50Jyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFRvZ2dsZSwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgIHZhbHVlczogdGhpcy52YWx1ZXMsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUodGhpcy5zdGF0ZS52YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Fpc1RvZ2dsZSB9IGZyb20gJy4vdG9nZ2xlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdBaXNUb2dnbGVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1RvZ2dsZV0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1RvZ2dsZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1RvZ2dsZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbm5lY3RSYW5nZSB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IHBhcnNlTnVtYmVySW5wdXQsIG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE51bWVyaWNSYW5nZVN0YXRlID0ge1xuICByYW5nZTogeyBtaW4/OiBudW1iZXI7IG1heD86IG51bWJlciB9O1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICBzdGFydDogbnVtYmVyW107XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcmFuZ2UtaW5wdXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgID5cbiAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY3VycmVuY3knKVwiPnt7Y3VycmVuY3l9fTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnLCAnbWluJylcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBbbWluXT1cInN0YXRlLnJhbmdlLm1pblwiXG4gICAgICAgICAgICBbbWF4XT1cInN0YXRlLnJhbmdlLm1heFwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic3RhdGUucmFuZ2UubWluXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJtaW5JbnB1dFZhbHVlXCJcbiAgICAgICAgICAgIFtzdGVwXT1cInN0ZXBcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJoYW5kbGVDaGFuZ2UoJGV2ZW50LCAnbWluJylcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdzZXBhcmF0b3InKVwiPnt7c2VwYXJhdG9yfX08L3NwYW4+XG5cbiAgICAgICAgPGxhYmVsIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPlxuICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY3VycmVuY3knKVwiPnt7Y3VycmVuY3l9fTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnLCAnbWF4JylcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBbbWluXT1cInN0YXRlLnJhbmdlLm1pblwiXG4gICAgICAgICAgICBbbWF4XT1cInN0YXRlLnJhbmdlLm1heFwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic3RhdGUucmFuZ2UubWF4XCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJtYXhJbnB1dFZhbHVlXCJcbiAgICAgICAgICAgIFtzdGVwXT1cInN0ZXBcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJoYW5kbGVDaGFuZ2UoJGV2ZW50LCAnbWF4JylcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnc3VibWl0JylcIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICB7e3N1Ym1pdExhYmVsfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmFuZ2VJbnB1dCBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgY3VycmVuY3k6IHN0cmluZyA9ICckJztcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcjogc3RyaW5nID0gJ3RvJztcbiAgQElucHV0KCkgcHVibGljIHN1Ym1pdExhYmVsOiBzdHJpbmcgPSAnR28nO1xuXG4gIC8vIGNvbm5lY3RvciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1pbj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG1heD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHByZWNpc2lvbjogbnVtYmVyIHwgc3RyaW5nID0gMjtcblxuICAvLyBpbm5lciBzdGF0ZVxuICBwdWJsaWMgbWluSW5wdXRWYWx1ZT86IG51bWJlciB8IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgbWF4SW5wdXRWYWx1ZT86IG51bWJlciB8IHN0cmluZyA9ICcnO1xuXG4gIGdldCBzdGVwKCkge1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IHBhcnNlTnVtYmVySW5wdXQodGhpcy5wcmVjaXNpb24pIHx8IDI7XG4gICAgcmV0dXJuIDEgLyBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0ZTogTnVtZXJpY1JhbmdlU3RhdGUgPSB7XG4gICAgcmFuZ2U6IHsgbWluOiB1bmRlZmluZWQsIG1heDogdW5kZWZpbmVkIH0sXG4gICAgcmVmaW5lOiBub29wLFxuICAgIHN0YXJ0OiBbMCwgMF0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUmFuZ2VJbnB1dCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RSYW5nZSwge1xuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUsXG4gICAgICBtYXg6IHBhcnNlTnVtYmVySW5wdXQodGhpcy5tYXgpLFxuICAgICAgbWluOiBwYXJzZU51bWJlcklucHV0KHRoaXMubWluKSxcbiAgICAgIHByZWNpc2lvbjogcGFyc2VOdW1iZXJJbnB1dCh0aGlzLnByZWNpc2lvbiksXG4gICAgfSk7XG5cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZShldmVudDogYW55LCB0eXBlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlTnVtYmVySW5wdXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcblxuICAgIGlmICh0eXBlID09PSAnbWluJykge1xuICAgICAgdGhpcy5taW5JbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4SW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVTdWJtaXQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0YXRlLnJlZmluZShbdGhpcy5taW5JbnB1dFZhbHVlLCB0aGlzLm1heElucHV0VmFsdWVdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nQWlzUmFuZ2VJbnB1dCB9IGZyb20gJy4vcmFuZ2UtaW5wdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1JhbmdlSW5wdXRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ0Fpc1JhbmdlSW5wdXRdLFxuICBleHBvcnRzOiBbTmdBaXNSYW5nZUlucHV0XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmFuZ2VJbnB1dE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcGFuZWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhaXMtUGFuZWxcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJoZWFkZXJcIiBjbGFzcz1cImFpcy1QYW5lbC1oZWFkZXJcIj5cbiAgICAgICAge3toZWFkZXJ9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJhaXMtUGFuZWwtYm9keVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cImZvb3RlclwiIGNsYXNzPVwiYWlzLVBhbmVsLWZvb3RlclwiPlxuICAgICAgICB7e2Zvb3Rlcn19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNQYW5lbCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBoZWFkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmb290ZXI/OiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNQYW5lbCB9IGZyb20gJy4vcGFuZWwnO1xuZXhwb3J0IHsgTmdBaXNQYW5lbCB9IGZyb20gJy4vcGFuZWwnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ0Fpc1BhbmVsXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNQYW5lbF0sXG4gIGV4cG9ydHM6IFtOZ0Fpc1BhbmVsXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUGFuZWxNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgVGVzdGFiaWxpdHksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0Q29uZmlndXJlIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQge1xuICBOZ0Fpc0luc3RhbnRTZWFyY2gsXG4gIFNlYXJjaFBhcmFtZXRlcnMsXG59IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtY29uZmlndXJlJyxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0NvbmZpZ3VyZSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICBwcml2YXRlIGludGVybmFsU2VhcmNoUGFyYW1ldGVyczogU2VhcmNoUGFyYW1ldGVycztcbiAgcHJpdmF0ZSBkaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjsgLy8gU2VhcmNoUGFyYW1ldGVycyAoSSBkb24ndCBrbm93IGhvdyB0byBnZXQgdGhlIHZhbHVlcyBvZiB0aGUgdHlwZSlcblxuICBwdWJsaWMgc3RhdGU6IHsgcmVmaW5lOiBGdW5jdGlvbiB9ID0ge1xuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdDb25maWd1cmUnKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzZWFyY2hQYXJhbWV0ZXJzKHZhbHVlczogU2VhcmNoUGFyYW1ldGVycykge1xuICAgIHRoaXMuaW50ZXJuYWxTZWFyY2hQYXJhbWV0ZXJzID0gdmFsdWVzO1xuICAgIGlmICghdGhpcy5kaWZmZXIgJiYgdmFsdWVzKSB7XG4gICAgICB0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHZhbHVlcykuY3JlYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RDb25maWd1cmUsIHtcbiAgICAgIHNlYXJjaFBhcmFtZXRlcnM6IHRoaXMuaW50ZXJuYWxTZWFyY2hQYXJhbWV0ZXJzLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuZGlmZmVyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyk7XG4gICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLnN0YXRlLnJlZmluZSh0aGlzLmludGVybmFsU2VhcmNoUGFyYW1ldGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdBaXNDb25maWd1cmUgfSBmcm9tICcuL2NvbmZpZ3VyZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQWlzQ29uZmlndXJlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdBaXNDb25maWd1cmVdLFxuICBleHBvcnRzOiBbTmdBaXNDb25maWd1cmVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNDb25maWd1cmVNb2R1bGUge31cbiIsImltcG9ydCAqIGFzIGFsZ29saWFzZWFyY2hQcm94eSBmcm9tICdhbGdvbGlhc2VhcmNoL2luZGV4JztcbmltcG9ydCAqIGFzIGVuY29kZVByb3h5IGZyb20gJ3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi92ZXJzaW9uJztcblxuLy8gQU9UICsgUm9sbHVwIHdvcmthcm91bmRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy8xMjY3I2lzc3VlY29tbWVudC0yOTYzOTU3MzRcblxuY29uc3QgYWxnb2xpYXNlYXJjaCA9IGFsZ29saWFzZWFyY2hQcm94eS5kZWZhdWx0IHx8IGFsZ29saWFzZWFyY2hQcm94eTtcbmNvbnN0IGVuY29kZSA9IGVuY29kZVByb3h5LmRlZmF1bHQgfHwgZW5jb2RlUHJveHk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50KHtcbiAgaHR0cENsaWVudCxcbiAgSHR0cEhlYWRlcnMsXG4gIHRyYW5zZmVyU3RhdGUsXG4gIG1ha2VTdGF0ZUtleSxcbn0pIHtcbiAgY29uc29sZS53YXJuKFxuICAgICdgY3JlYXRlU1NSQWxnb2xpYUNsaWVudGAgaXMgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgY3JlYXRlU1NSU2VhcmNoQ2xpZW50YCB0byBiZSBwbHVnZ2VkIHRvIGBzZWFyY2hDbGllbnRgLidcbiAgKTtcblxuICByZXR1cm4gKF8sIGFwcElkLCBhcGlLZXkpID0+XG4gICAgY3JlYXRlU1NSU2VhcmNoQ2xpZW50KHtcbiAgICAgIGFwcElkLFxuICAgICAgYXBpS2V5LFxuICAgICAgaHR0cENsaWVudCxcbiAgICAgIEh0dHBIZWFkZXJzLFxuICAgICAgdHJhbnNmZXJTdGF0ZSxcbiAgICAgIG1ha2VTdGF0ZUtleSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNTUlNlYXJjaENsaWVudCh7XG4gIGFwcElkLFxuICBhcGlLZXksXG4gIGh0dHBDbGllbnQsXG4gIEh0dHBIZWFkZXJzLFxuICB0cmFuc2ZlclN0YXRlLFxuICBtYWtlU3RhdGVLZXksXG59KSB7XG4gIGNvbnN0IGNsaWVudCA9IGFsZ29saWFzZWFyY2goYXBwSWQsIGFwaUtleSwge30pO1xuICBjbGllbnQuYWRkQWxnb2xpYUFnZW50KGBhbmd1bGFyLWluc3RhbnRzZWFyY2ggJHtWRVJTSU9OfWApO1xuXG4gIGNsaWVudC5fcmVxdWVzdCA9IChyYXdVcmwsIG9wdHMpID0+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KFxuICAgICAgJ2NvbnRlbnQtdHlwZScsXG4gICAgICBvcHRzLm1ldGhvZCA9PT0gJ1BPU1QnXG4gICAgICAgID8gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICApO1xuXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdhY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgY29uc3QgdXJsID1cbiAgICAgIHJhd1VybCArIChyYXdVcmwuaW5jbHVkZXMoJz8nKSA/ICcmJyA6ICc/JykgKyBlbmNvZGUob3B0cy5oZWFkZXJzKTtcblxuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGVLZXkgPSBtYWtlU3RhdGVLZXkoYG5nYWlzKCR7b3B0cy5ib2R5fSlgKTtcblxuICAgIGlmICh0cmFuc2ZlclN0YXRlLmhhc0tleSh0cmFuc2ZlclN0YXRlS2V5KSkge1xuICAgICAgY29uc3QgcmVzcCA9IEpTT04ucGFyc2UodHJhbnNmZXJTdGF0ZS5nZXQodHJhbnNmZXJTdGF0ZUtleSwge30pKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaHR0cENsaWVudFxuICAgICAgICAucmVxdWVzdChvcHRzLm1ldGhvZCwgdXJsLCB7XG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICBib2R5OiBvcHRzLmJvZHksXG4gICAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyxcbiAgICAgICAgfSlcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICByZXNwID0+IHtcbiAgICAgICAgICAgIHRyYW5zZmVyU3RhdGUuc2V0KHRyYW5zZmVyU3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3AgPT5cbiAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICBib2R5OiByZXNwLmJvZHksXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3AuaGVhZGVycyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGNsaWVudDtcbn1cbiIsImltcG9ydCB7IEFsZ29saWFTZWFyY2hIZWxwZXIgfSBmcm9tICdhbGdvbGlhc2VhcmNoLWhlbHBlcic7XG5cbi8vIFRyYW5zZm9ybXMgdXJsIHF1ZXJ5IHRvIFNlYXJjaFBhcmFtZXRlcnNcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNlcnZlclJlcXVlc3QocmVxOiB7IHVybDogc3RyaW5nIH0gfCB2b2lkKSB7XG4gIGlmIChyZXEgJiYgcmVxLnVybCAmJiByZXEudXJsLmluY2x1ZGVzKCc/JykpIHtcbiAgICBjb25zdCBxdWVyeSA9IHJlcS51cmwuc3BsaXQoJz8nKVsxXTtcbiAgICByZXR1cm4gQWxnb2xpYVNlYXJjaEhlbHBlci5nZXRDb25maWd1cmF0aW9uRnJvbVF1ZXJ5U3RyaW5nKHF1ZXJ5KTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cbiIsImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIE1vZHVsZXNcbmltcG9ydCB7IE5nQWlzQnJlYWRjcnVtYk1vZHVsZSB9IGZyb20gJy4vYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0JyZWFkY3J1bWJNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzQ2xlYXJSZWZpbmVtZW50c01vZHVsZSB9IGZyb20gJy4vY2xlYXItcmVmaW5lbWVudHMvY2xlYXItcmVmaW5lbWVudHMubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzQ2xlYXJSZWZpbmVtZW50c01vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNDdXJyZW50UmVmaW5lbWVudHNNb2R1bGUgfSBmcm9tICcuL2N1cnJlbnQtcmVmaW5lbWVudHMvY3VycmVudC1yZWZpbmVtZW50cy5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNDdXJyZW50UmVmaW5lbWVudHNNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzSGllcmFyY2hpY2FsTWVudU1vZHVsZSB9IGZyb20gJy4vaGllcmFyY2hpY2FsLW1lbnUvaGllcmFyY2hpY2FsLW1lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSGllcmFyY2hpY2FsTWVudU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNIaXRzUGVyUGFnZU1vZHVsZSB9IGZyb20gJy4vaGl0cy1wZXItcGFnZS9oaXRzLXBlci1wYWdlLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0hpdHNQZXJQYWdlTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0hpdHNNb2R1bGUgfSBmcm9tICcuL2hpdHMvaGl0cy5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNIaXRzTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0luZmluaXRlSGl0c01vZHVsZSB9IGZyb20gJy4vaW5maW5pdGUtaGl0cy9pbmZpbml0ZS1oaXRzLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0luZmluaXRlSGl0c01vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoTW9kdWxlIH0gZnJvbSAnLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaE1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNNZW51TW9kdWxlIH0gZnJvbSAnLi9tZW51L21lbnUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzTWVudU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNOdW1lcmljTWVudU1vZHVsZSB9IGZyb20gJy4vbnVtZXJpYy1tZW51L251bWVyaWMtbWVudS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNOdW1lcmljTWVudU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL251bWVyaWMtc2VsZWN0b3IvbnVtZXJpYy1zZWxlY3Rvci5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNOdW1lcmljU2VsZWN0b3JNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJy4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1BhZ2luYXRpb25Nb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUmFuZ2VTbGlkZXJNb2R1bGUgfSBmcm9tICcuL3JhbmdlLXNsaWRlci9yYW5nZS1zbGlkZXIubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUmFuZ2VTbGlkZXJNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUmVmaW5lbWVudExpc3RNb2R1bGUgfSBmcm9tICcuL3JlZmluZW1lbnQtbGlzdC9yZWZpbmVtZW50LWxpc3QubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUmVmaW5lbWVudExpc3RNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzU2VhcmNoQm94TW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtYm94L3NlYXJjaC1ib3gubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzU2VhcmNoQm94TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1NvcnRCeU1vZHVsZSB9IGZyb20gJy4vc29ydC1ieS9zb3J0LWJ5Lm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc1NvcnRCeU1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNSYXRpbmdNZW51TW9kdWxlIH0gZnJvbSAnLi9yYXRpbmctbWVudS9yYXRpbmctbWVudS5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNSYXRpbmdNZW51TW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc1N0YXRzTW9kdWxlIH0gZnJvbSAnLi9zdGF0cy9zdGF0cy5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNTdGF0c01vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNUb2dnbGVNb2R1bGUgfSBmcm9tICcuL3RvZ2dsZS90b2dnbGUubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzVG9nZ2xlTW9kdWxlIH07XG5pbXBvcnQgeyBOZ0Fpc0hpZ2hsaWdodE1vZHVsZSB9IGZyb20gJy4vaGlnaGxpZ2h0L2hpZ2hsaWdodC5tb2R1bGUnO1xuZXhwb3J0IHsgTmdBaXNIaWdobGlnaHRNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzUmFuZ2VJbnB1dE1vZHVsZSB9IGZyb20gJy4vcmFuZ2UtaW5wdXQvcmFuZ2UtaW5wdXQubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUmFuZ2VJbnB1dE1vZHVsZSB9O1xuaW1wb3J0IHsgTmdBaXNQYW5lbE1vZHVsZSB9IGZyb20gJy4vcGFuZWwvcGFuZWwubW9kdWxlJztcbmV4cG9ydCB7IE5nQWlzUGFuZWxNb2R1bGUgfTtcbmltcG9ydCB7IE5nQWlzQ29uZmlndXJlTW9kdWxlIH0gZnJvbSAnLi9jb25maWd1cmUvY29uZmlndXJlLm1vZHVsZSc7XG5leHBvcnQgeyBOZ0Fpc0NvbmZpZ3VyZU1vZHVsZSB9O1xuXG4vLyBDdXN0b20gU1NSIGFsZ29saWFzZWFyY2hDbGllbnRcbmltcG9ydCB7XG4gIGNyZWF0ZVNTUkFsZ29saWFDbGllbnQsXG4gIGNyZWF0ZVNTUlNlYXJjaENsaWVudCxcbn0gZnJvbSAnLi9jcmVhdGUtc3NyLWFsZ29saWEtY2xpZW50JztcbmV4cG9ydCB7IGNyZWF0ZVNTUkFsZ29saWFDbGllbnQsIGNyZWF0ZVNTUlNlYXJjaENsaWVudCB9O1xuXG5pbXBvcnQgeyBwYXJzZVNlcnZlclJlcXVlc3QgfSBmcm9tICcuL3BhcnNlLXNlcnZlci1yZXF1ZXN0JztcbmV4cG9ydCB7IHBhcnNlU2VydmVyUmVxdWVzdCB9O1xuXG4vLyBDdXN0b20gd2lkZ2V0IHdpdGggQmFzZVdpZGdldCBjbGFzc1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4vYmFzZS13aWRnZXQnO1xuZXhwb3J0IHsgQmFzZVdpZGdldCB9O1xuXG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5leHBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfTtcblxuY29uc3QgTkdJU19NT0RVTEVTID0gW1xuICBOZ0Fpc0luc3RhbnRTZWFyY2hNb2R1bGUsXG4gIE5nQWlzSGl0c01vZHVsZSxcbiAgTmdBaXNTZWFyY2hCb3hNb2R1bGUsXG4gIE5nQWlzQ2xlYXJSZWZpbmVtZW50c01vZHVsZSxcbiAgTmdBaXNNZW51TW9kdWxlLFxuICBOZ0Fpc1BhZ2luYXRpb25Nb2R1bGUsXG4gIE5nQWlzUmVmaW5lbWVudExpc3RNb2R1bGUsXG4gIE5nQWlzSGl0c1BlclBhZ2VNb2R1bGUsXG4gIE5nQWlzU29ydEJ5TW9kdWxlLFxuICBOZ0Fpc051bWVyaWNTZWxlY3Rvck1vZHVsZSxcbiAgTmdBaXNOdW1lcmljTWVudU1vZHVsZSxcbiAgTmdBaXNTdGF0c01vZHVsZSxcbiAgTmdBaXNUb2dnbGVNb2R1bGUsXG4gIE5nQWlzSW5maW5pdGVIaXRzTW9kdWxlLFxuICBOZ0Fpc0N1cnJlbnRSZWZpbmVtZW50c01vZHVsZSxcbiAgTmdBaXNIaWVyYXJjaGljYWxNZW51TW9kdWxlLFxuICBOZ0Fpc1JhdGluZ01lbnVNb2R1bGUsXG4gIE5nQWlzUmFuZ2VTbGlkZXJNb2R1bGUsXG4gIE5nQWlzQnJlYWRjcnVtYk1vZHVsZSxcbiAgTmdBaXNIaWdobGlnaHRNb2R1bGUsXG4gIE5nQWlzUmFuZ2VJbnB1dE1vZHVsZSxcbiAgTmdBaXNQYW5lbE1vZHVsZSxcbiAgTmdBaXNDb25maWd1cmVNb2R1bGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBOR0lTX01PRFVMRVMsXG4gIGltcG9ydHM6IFtOZ0Fpc0luc3RhbnRTZWFyY2hNb2R1bGUuZm9yUm9vdCgpXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdBaXNSb290TW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7IGltcG9ydHM6IE5HSVNfTU9EVUxFUywgZXhwb3J0czogTkdJU19NT0RVTEVTIH0pXG5leHBvcnQgY2xhc3MgTmdBaXNNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IE5nQWlzUm9vdE1vZHVsZSB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiaXNQbGF0Zm9ybUJyb3dzZXIiLCJJbnB1dCIsImFsZ29saWFzZWFyY2hQcm94eS5kZWZhdWx0IiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJPdXRwdXQiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsImNvbm5lY3RCcmVhZGNydW1iIiwiZm9yd2FyZFJlZiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiY29ubmVjdENsZWFyQWxsIiwiY29ubmVjdEN1cnJlbnRSZWZpbmVkVmFsdWVzIiwiY29ubmVjdEhpZXJhcmNoaWNhbE1lbnUiLCJjb25uZWN0SGl0c1BlclBhZ2UiLCJjb25uZWN0SGl0cyIsIkNvbnRlbnRDaGlsZCIsIlRlbXBsYXRlUmVmIiwiY29ubmVjdEluZmluaXRlSGl0cyIsImNvbm5lY3RNZW51IiwiY29ubmVjdE51bWVyaWNSZWZpbmVtZW50TGlzdCIsImNvbm5lY3ROdW1lcmljU2VsZWN0b3IiLCJjb25uZWN0UGFnaW5hdGlvbiIsIm5vVWlTbGlkZXIuY3JlYXRlIiwiY29ubmVjdFJhbmdlIiwiVmlld0NoaWxkIiwiY29ubmVjdFJlZmluZW1lbnRMaXN0IiwiY29ubmVjdFNlYXJjaEJveCIsImNvbm5lY3RTb3J0QnlTZWxlY3RvciIsImNvbm5lY3RTdGFyUmF0aW5nIiwiY29ubmVjdFN0YXRzIiwiY29ubmVjdFRvZ2dsZSIsImNvbm5lY3RDb25maWd1cmUiLCJLZXlWYWx1ZURpZmZlcnMiLCJhbGdvbGlhc2VhcmNoIiwiYWxnb2xpYXNlYXJjaFByb3h5IiwiZW5jb2RlUHJveHkuZGVmYXVsdCIsIkFsZ29saWFTZWFyY2hIZWxwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNwQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvRSx1QkFBMEIsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxJQUFPLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUM7UUFDdEQsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFB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