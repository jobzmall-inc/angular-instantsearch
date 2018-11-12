/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject, forwardRef, ViewChild, ElementRef, } from '@angular/core';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
var NgAisSearchBox = /** @class */ (function (_super) {
    tslib_1.__extends(NgAisSearchBox, _super);
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
export { NgAisSearchBox };
if (false) {
    /** @type {?} */
    NgAisSearchBox.prototype.searchBox;
    /** @type {?} */
    NgAisSearchBox.prototype.placeholder;
    /** @type {?} */
    NgAisSearchBox.prototype.submitTitle;
    /** @type {?} */
    NgAisSearchBox.prototype.resetTitle;
    /** @type {?} */
    NgAisSearchBox.prototype.searchAsYouType;
    /** @type {?} */
    NgAisSearchBox.prototype.autofocus;
    /** @type {?} */
    NgAisSearchBox.prototype.submit;
    /** @type {?} */
    NgAisSearchBox.prototype.reset;
    /** @type {?} */
    NgAisSearchBox.prototype.change;
    /** @type {?} */
    NgAisSearchBox.prototype.focus;
    /** @type {?} */
    NgAisSearchBox.prototype.blur;
    /** @type {?} */
    NgAisSearchBox.prototype.state;
    /** @type {?} */
    NgAisSearchBox.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInNlYXJjaC1ib3gvc2VhcmNoLWJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEVBRVQsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWhDO0lBMkRvQywwQ0FBVTtJQXVCNUMsd0JBRVMsbUJBQXdCO1FBRmpDLFlBSUUsa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSlEseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBdkJqQixpQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixpQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixnQkFBVSxHQUFXLE9BQU8sQ0FBQztRQUM3QixxQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNDLGdCQUFnQjtRQUNoQixPQUFPO1FBQ0csWUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsV0FBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckMsUUFBUTtRQUNFLFlBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLFdBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNCLFVBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdCLFdBQUssR0FBRztZQUNiLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBT0EsS0FBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztJQUN0QyxDQUFDOzs7O0lBRU0sd0NBQWU7OztJQUF0QjtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7O0lBRU0scUNBQVk7Ozs7SUFBbkIsVUFBb0IsS0FBYTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQUVNLHFDQUFZOzs7O0lBQW5CLFVBQW9CLEtBQWlCO1FBQ25DLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7O0lBRU0sb0NBQVc7Ozs7SUFBbEIsVUFBbUIsS0FBaUI7UUFDbEMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDOztnQkF6SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxzakVBdURUO2lCQUNGOzs7Z0RBeUJJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7NEJBdkI3QyxTQUFTLFNBQUMsV0FBVzs4QkFDckIsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7a0NBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUlMLE1BQU07d0JBQ04sTUFBTTt5QkFHTixNQUFNO3dCQUNOLE1BQU07dUJBQ04sTUFBTTs7SUErQ1QscUJBQUM7Q0FBQSxBQTFIRCxDQTJEb0MsVUFBVSxHQStEN0M7U0EvRFksY0FBYzs7O0lBQ3pCLG1DQUE4Qzs7SUFDOUMscUNBQStDOztJQUMvQyxxQ0FBK0M7O0lBQy9DLG9DQUE2Qzs7SUFDN0MseUNBQWdEOztJQUNoRCxtQ0FBMkM7O0lBSTNDLGdDQUFzQzs7SUFDdEMsK0JBQXFDOztJQUdyQyxnQ0FBc0M7O0lBQ3RDLCtCQUFxQzs7SUFDckMsOEJBQW9DOztJQUVwQywrQkFHRTs7SUFHQSw2Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25uZWN0U2VhcmNoQm94IH0gZnJvbSAnaW5zdGFudHNlYXJjaC5qcy9lcy9jb25uZWN0b3JzJztcbmltcG9ydCB7IEJhc2VXaWRnZXQgfSBmcm9tICcuLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQgeyBOZ0Fpc0luc3RhbnRTZWFyY2ggfSBmcm9tICcuLi9pbnN0YW50c2VhcmNoL2luc3RhbnRzZWFyY2gnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLXNlYXJjaC1ib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgbm92YWxpZGF0ZVxuICAgICAgICAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcpXCJcbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiXG4gICAgICAgICAgYXV0b2NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3twbGFjZWhvbGRlcn19XCJcbiAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInN0YXRlLnF1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAoZm9jdXMpPVwiZm9jdXMuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgI3NlYXJjaEJveFxuICAgICAgICAvPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3N1Ym1pdCcpXCJcbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICB0aXRsZT1cInt7c3VibWl0VGl0bGV9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdWJtaXRJY29uJylcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCA0MCA0MFwiXG4gICAgICAgICAgICB3aWR0aD1cIjQwXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjQwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI2LjgwNCAyOS4wMWMtMi44MzIgMi4zNC02LjQ2NSAzLjc0Ni0xMC40MjYgMy43NDZDNy4zMzMgMzIuNzU2IDAgMjUuNDI0IDAgMTYuMzc4IDAgNy4zMzMgNy4zMzMgMCAxNi4zNzggMGM5LjA0NiAwIDE2LjM3OCA3LjMzMyAxNi4zNzggMTYuMzc4IDAgMy45Ni0xLjQwNiA3LjU5NC0zLjc0NiAxMC40MjZsMTAuNTM0IDEwLjUzNGMuNjA3LjYwNy42MSAxLjU5LS4wMDQgMi4yMDItLjYxLjYxLTEuNTk3LjYxLTIuMjAyLjAwNEwyNi44MDQgMjkuMDF6bS0xMC40MjYuNjI3YzcuMzIzIDAgMTMuMjYtNS45MzYgMTMuMjYtMTMuMjYgMC03LjMyLTUuOTM3LTEzLjI1Ny0xMy4yNi0xMy4yNTdDOS4wNTYgMy4xMiAzLjEyIDkuMDU2IDMuMTIgMTYuMzc4YzAgNy4zMjMgNS45MzYgMTMuMjYgMTMuMjU4IDEzLjI2elwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgICAgdHlwZT1cInJlc2V0XCJcbiAgICAgICAgICB0aXRsZT1cInt7cmVzZXRUaXRsZX19XCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlUmVzZXQoJGV2ZW50KVwiXG4gICAgICAgICAgW2hpZGRlbl09XCIhc3RhdGUucXVlcnkgfHwgKHN0YXRlLnF1ZXJ5ICYmICFzdGF0ZS5xdWVyeS50cmltKCkpXCI+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3Jlc2V0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgd2lkdGg9XCIyMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04LjExNCAxMEwuOTQ0IDIuODMgMCAxLjg4NSAxLjg4NiAwbC45NDMuOTQzTDEwIDguMTEzbDcuMTctNy4xNy45NDQtLjk0M0wyMCAxLjg4NmwtLjk0My45NDMtNy4xNyA3LjE3IDcuMTcgNy4xNy45NDMuOTQ0TDE4LjExNCAyMGwtLjk0My0uOTQzLTcuMTctNy4xNy03LjE3IDcuMTctLjk0NC45NDNMMCAxOC4xMTRsLjk0My0uOTQzTDguMTEzIDEwelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzU2VhcmNoQm94IGV4dGVuZHMgQmFzZVdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdzZWFyY2hCb3gnKSBzZWFyY2hCb3g6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdWJtaXRUaXRsZTogc3RyaW5nID0gJ1N1Ym1pdCc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXNldFRpdGxlOiBzdHJpbmcgPSAnUmVzZXQnO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoQXNZb3VUeXBlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGF1dG9mb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIE91dHB1dCBldmVudHNcbiAgLy8gZm9ybVxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzZXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gaW5wdXRcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgcXVlcnk6ICcnLFxuICAgIHJlZmluZTogbm9vcCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdBaXNJbnN0YW50U2VhcmNoKSlcbiAgICBwdWJsaWMgaW5zdGFudFNlYXJjaFBhcmVudDogYW55XG4gICkge1xuICAgIHN1cGVyKCdTZWFyY2hCb3gnKTtcbiAgICB0aGlzLmNyZWF0ZVdpZGdldChjb25uZWN0U2VhcmNoQm94KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b2ZvY3VzKSB7XG4gICAgICB0aGlzLnNlYXJjaEJveC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZShxdWVyeTogc3RyaW5nKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChxdWVyeSk7XG5cbiAgICBpZiAodGhpcy5zZWFyY2hBc1lvdVR5cGUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlU3VibWl0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gc2VuZCBzdWJtaXQgZXZlbnQgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgIHRoaXMuc3VibWl0LmVtaXQoZXZlbnQpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghdGhpcy5zZWFyY2hBc1lvdVR5cGUpIHtcbiAgICAgIHRoaXMuc3RhdGUucmVmaW5lKHRoaXMuc3RhdGUucXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVSZXNldChldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIHNlbmQgcmVzZXQgZXZlbnQgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgIHRoaXMucmVzZXQuZW1pdChldmVudCk7XG5cbiAgICAvLyByZXNldCBzZWFyY2hcbiAgICB0aGlzLnN0YXRlLnJlZmluZSgnJyk7XG4gIH1cbn1cbiJdfQ==