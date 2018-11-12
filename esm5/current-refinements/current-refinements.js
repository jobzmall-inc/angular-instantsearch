/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectCurrentRefinedValues } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop, capitalize } from '../utils';
var NgAisCurrentRefinements = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisCurrentRefinements, _super);
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
                var type = _a.type, attributeName = _a.attributeName, refinement = tslib_1.__rest(_a, ["type", "attributeName"]);
                /** @type {?} */
                var match = res.find(function (r) { return r.attributeName === attributeName && r.type === type; });
                if (match) {
                    match.items.push(tslib_1.__assign({ type: type, attributeName: attributeName }, refinement));
                }
                else {
                    res.push({
                        type: type,
                        attributeName: attributeName,
                        label: capitalize(attributeName),
                        items: [tslib_1.__assign({ type: type, attributeName: attributeName }, refinement)],
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
export { NgAisCurrentRefinements };
if (false) {
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearRefinements;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearRefinementsLabel;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.transformItems;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.onlyListedAttributes;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.clearsQuery;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.attributes;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.state;
    /** @type {?} */
    NgAisCurrentRefinements.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1yZWZpbmVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImN1cnJlbnQtcmVmaW5lbWVudHMvY3VycmVudC1yZWZpbmVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBVzVDO0lBd0M2QyxtREFBVTtJQXlEckQsaUNBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sb0JBQW9CLENBQUMsU0FDNUI7UUFIUSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUExRGpDLGlCQUFpQjtRQUNELHNCQUFnQixHQUFpQyxPQUFPLENBQUM7UUFDekQsMkJBQXFCLEdBQVcsbUJBQW1CLENBQUM7UUFHcEUsb0JBQW9CO1FBQ0osMEJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXRDLGdCQUFVLEdBR1gsRUFBRSxDQUFDO1FBRUYsV0FBSyxHQUE0QjtZQUN0QyxVQUFVLEVBQUUsRUFBRTtZQUNkLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFDOztJQXdDRixDQUFDO0lBdENELHNCQUFJLDZDQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUks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QUVULHdDQU9FOztJQW9DQSxzREFDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEN1cnJlbnRSZWZpbmVkVmFsdWVzIH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCwgY2FwaXRhbGl6ZSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgQ3VycmVudFJlZmluZW1lbnRzU3RhdGUgPSB7XG4gIGF0dHJpYnV0ZXM6IHt9O1xuICBjbGVhckFsbENsaWNrOiBGdW5jdGlvbjtcbiAgY2xlYXJBbGxVUkw6IEZ1bmN0aW9uO1xuICBjcmVhdGVVUkw6IEZ1bmN0aW9uO1xuICByZWZpbmU6IEZ1bmN0aW9uO1xuICByZWZpbmVtZW50czoge31bXTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1jdXJyZW50LXJlZmluZW1lbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwiY3goKVwiXG4gICAgICAqbmdJZj1cIiFpc0hpZGRlblwiXG4gICAgPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xlYXJBbGxDbGljaygkZXZlbnQpXCJcbiAgICAgICAgKm5nSWY9XCJjbGVhclJlZmluZW1lbnRzID09PSAnYmVmb3JlJyB8fCBjbGVhclJlZmluZW1lbnRzID09PSB0cnVlXCI+XG4gICAgICAgIHt7Y2xlYXJSZWZpbmVtZW50c0xhYmVsfX1cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8dWxcbiAgICAgICAgW2NsYXNzXT1cImN4KCdsaXN0JylcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgcmVmaW5lbWVudCBvZiByZWZpbmVtZW50c1wiXG4gICAgICA+XG4gICAgICAgIDxsaSBbY2xhc3NdPVwiY3goJ2l0ZW0nKVwiPlxuICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnbGFiZWwnKVwiPnt7cmVmaW5lbWVudC5sYWJlbH19Ojwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBbY2xhc3NdPVwiY3goJ2NhdGVnb3J5JylcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVmaW5lbWVudC5pdGVtc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImN4KCdjYXRlZ29yeUxhYmVsJylcIj57e2l0ZW0ubmFtZX19PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBbY2xhc3NdPVwiY3goJ2RlbGV0ZScpXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbSlcIj7inJU8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgIChjbGljayk9XCJoYW5kbGVDbGVhckFsbENsaWNrKCRldmVudClcIlxuICAgICAgICAqbmdJZj1cImNsZWFyUmVmaW5lbWVudHMgPT09ICdhZnRlcidcIj5cbiAgICAgICAge3tjbGVhclJlZmluZW1lbnRzTGFiZWx9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzQ3VycmVudFJlZmluZW1lbnRzIGV4dGVuZHMgQmFzZVdpZGdldCB7XG4gIC8vIHJlbmRlciBvcHRpb25zXG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhclJlZmluZW1lbnRzOiAnYmVmb3JlJyB8ICdhZnRlcicgfCBib29sZWFuID0gJ2FmdGVyJztcbiAgQElucHV0KCkgcHVibGljIGNsZWFyUmVmaW5lbWVudHNMYWJlbDogc3RyaW5nID0gJ0NsZWFyIHJlZmluZW1lbnRzJztcbiAgQElucHV0KCkgcHVibGljIHRyYW5zZm9ybUl0ZW1zPzogRnVuY3Rpb247XG5cbiAgLy8gY29ubmVjdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgcHVibGljIG9ubHlMaXN0ZWRBdHRyaWJ1dGVzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcnNRdWVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYXR0cmlidXRlczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICB9W10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGU6IEN1cnJlbnRSZWZpbmVtZW50c1N0YXRlID0ge1xuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIGNsZWFyQWxsQ2xpY2s6IG5vb3AsXG4gICAgY2xlYXJBbGxVUkw6IG5vb3AsXG4gICAgY3JlYXRlVVJMOiBub29wLFxuICAgIHJlZmluZTogbm9vcCxcbiAgICByZWZpbmVtZW50czogW10sXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnJlZmluZW1lbnRzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IHJlZmluZW1lbnRzKCkge1xuICAgIGNvbnN0IGl0ZW1zID1cbiAgICAgIHR5cGVvZiB0aGlzLnRyYW5zZm9ybUl0ZW1zID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdGhpcy50cmFuc2Zvcm1JdGVtcyh0aGlzLnN0YXRlLnJlZmluZW1lbnRzKVxuICAgICAgICA6IHRoaXMuc3RhdGUucmVmaW5lbWVudHM7XG5cbiAgICAvLyBncm91cCByZWZpbmVtZW50cyBieSBjYXRlZ29yeT8gKGF0dHJpYnV0ZU5hbWUgJiYgdHlwZSlcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKChyZXMsIHsgdHlwZSwgYXR0cmlidXRlTmFtZSwgLi4ucmVmaW5lbWVudCB9KSA9PiB7XG4gICAgICBjb25zdCBtYXRjaCA9IHJlcy5maW5kKFxuICAgICAgICByID0+IHIuYXR0cmlidXRlTmFtZSA9PT0gYXR0cmlidXRlTmFtZSAmJiByLnR5cGUgPT09IHR5cGVcbiAgICAgICk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaXRlbXMucHVzaCh7IHR5cGUsIGF0dHJpYnV0ZU5hbWUsIC4uLnJlZmluZW1lbnQgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMucHVzaCh7XG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBhdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgIGxhYmVsOiBjYXBpdGFsaXplKGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCAuLi5yZWZpbmVtZW50IH1dLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZ2V0IGpzb24oKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucmVmaW5lbWVudHMsIG51bGwsIDQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignQ3VycmVudFJlZmluZW1lbnRzJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdEN1cnJlbnRSZWZpbmVkVmFsdWVzLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICBjbGVhcnNRdWVyeTogdGhpcy5jbGVhcnNRdWVyeSxcbiAgICAgIG9ubHlMaXN0ZWRBdHRyaWJ1dGVzOiB0aGlzLm9ubHlMaXN0ZWRBdHRyaWJ1dGVzLFxuICAgIH0pO1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHJlZmluZW1lbnQ6IHt9KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0YXRlLnJlZmluZShyZWZpbmVtZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGVhckFsbENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0YXRlLmNsZWFyQWxsQ2xpY2soKTtcbiAgfVxufVxuIl19