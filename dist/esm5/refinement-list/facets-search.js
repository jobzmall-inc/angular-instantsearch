/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
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
export { NgAisFacetsSearch };
if (false) {
    /** @type {?} */
    NgAisFacetsSearch.prototype.searchPlaceholder;
    /** @type {?} */
    NgAisFacetsSearch.prototype.search;
    /** @type {?} */
    NgAisFacetsSearch.prototype.cx;
    /** @type {?} */
    NgAisFacetsSearch.prototype.searchQuery;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInJlZmluZW1lbnQtbGlzdC9mYWNldHMtc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9CO0lBQUE7UUEyRFMsT0FBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQVcxQixDQUFDOzs7OztJQVRRLHdDQUFZOzs7O0lBQW5CLFVBQW9CLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVNLHdDQUFZOzs7O0lBQW5CLFVBQW9CLEtBQUs7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDgxREFtRFQ7aUJBQ0Y7OztvQ0FFRSxLQUFLO3lCQUNMLEtBQUs7O0lBZVIsd0JBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQWpCWSxpQkFBaUI7OztJQUM1Qiw4Q0FBMEM7O0lBQzFDLG1DQUFpQzs7SUFFakMsK0JBQTZCOztJQUU3Qix3Q0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBiZW0gfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1mYWNldHMtc2VhcmNoJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIlxuICAgICAgICBub3ZhbGlkYXRlXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnKVwiXG4gICAgICAgICAgYXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuICAgICAgICAgIGF1dG9jb3JyZWN0PVwib2ZmXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7c2VhcmNoUGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgICAgcm9sZT1cInRleHRib3hcIlxuICAgICAgICAgIHNwZWxsY2hlY2s9XCJmYWxzZVwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgKGlucHV0KT1cImhhbmRsZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgIC8+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgnc3VibWl0JylcIlxuICAgICAgICAgIHRpdGxlPVwiU3VibWl0IHRoZSBzZWFyY2ggcXVlcnkuXCJcbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdzdWJtaXRJY29uJylcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCA0MCA0MFwiXG4gICAgICAgICAgICB3aWR0aD1cIjEwXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjEwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI2LjgwNCAyOS4wMWMtMi44MzIgMi4zNC02LjQ2NSAzLjc0Ni0xMC40MjYgMy43NDZDNy4zMzMgMzIuNzU2IDAgMjUuNDI0IDAgMTYuMzc4IDAgNy4zMzMgNy4zMzMgMCAxNi4zNzggMGM5LjA0NiAwIDE2LjM3OCA3LjMzMyAxNi4zNzggMTYuMzc4IDAgMy45Ni0xLjQwNiA3LjU5NC0zLjc0NiAxMC40MjZsMTAuNTM0IDEwLjUzNGMuNjA3LjYwNy42MSAxLjU5LS4wMDQgMi4yMDItLjYxLjYxLTEuNTk3LjYxLTIuMjAyLjAwNEwyNi44MDQgMjkuMDF6bS0xMC40MjYuNjI3YzcuMzIzIDAgMTMuMjYtNS45MzYgMTMuMjYtMTMuMjYgMC03LjMyLTUuOTM3LTEzLjI1Ny0xMy4yNi0xMy4yNTdDOS4wNTYgMy4xMiAzLjEyIDkuMDU2IDMuMTIgMTYuMzc4YzAgNy4zMjMgNS45MzYgMTMuMjYgMTMuMjU4IDEzLjI2elwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFtjbGFzc109XCJjeCgncmVzZXQnKVwiXG4gICAgICAgICAgdHlwZT1cInJlc2V0XCJcbiAgICAgICAgICB0aXRsZT1cIkNsZWFyIHRoZSBzZWFyY2ggcXVlcnkuXCJcbiAgICAgICAgICBoaWRkZW5cbiAgICAgICAgPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdyZXNldEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMTBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xMTQgMTBMLjk0NCAyLjgzIDAgMS44ODUgMS44ODYgMGwuOTQzLjk0M0wxMCA4LjExM2w3LjE3LTcuMTcuOTQ0LS45NDNMMjAgMS44ODZsLS45NDMuOTQzLTcuMTcgNy4xNyA3LjE3IDcuMTcuOTQzLjk0NEwxOC4xMTQgMjBsLS45NDMtLjk0My03LjE3LTcuMTctNy4xNyA3LjE3LS45NDQuOTQzTDAgMTguMTE0bC45NDMtLjk0M0w4LjExMyAxMHpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0ZhY2V0c1NlYXJjaCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hQbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoOiBGdW5jdGlvbjtcblxuICBwdWJsaWMgY3ggPSBiZW0oJ1NlYXJjaEJveCcpO1xuXG4gIHB1YmxpYyBzZWFyY2hRdWVyeSA9ICcnO1xuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoUXVlcnkgPSB2YWx1ZTtcbiAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlU3VibWl0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFF1ZXJ5KTtcbiAgfVxufVxuIl19