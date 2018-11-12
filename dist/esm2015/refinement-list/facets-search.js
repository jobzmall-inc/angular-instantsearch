/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
export class NgAisFacetsSearch {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXRzLXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInJlZmluZW1lbnQtbGlzdC9mYWNldHMtc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBeUQvQixNQUFNO0lBdkROO1FBMkRTLE9BQUUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFXMUIsQ0FBQzs7Ozs7SUFUUSxZQUFZLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0sWUFBWSxDQUFDLEtBQUs7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRFQ7YUFDRjs7O2dDQUVFLEtBQUs7cUJBQ0wsS0FBSzs7OztJQUROLDhDQUEwQzs7SUFDMUMsbUNBQWlDOztJQUVqQywrQkFBNkI7O0lBRTdCLHdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJlbSB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWlzLWZhY2V0cy1zZWFyY2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImN4KClcIj5cbiAgICAgIDxmb3JtXG4gICAgICAgIFtjbGFzc109XCJjeCgnZm9ybScpXCJcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdpbnB1dCcpXCJcbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiXG4gICAgICAgICAgYXV0b2NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3tzZWFyY2hQbGFjZWhvbGRlcn19XCJcbiAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdGl0bGU9XCJTdWJtaXQgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3N1Ym1pdEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQwIDQwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMTBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjYuODA0IDI5LjAxYy0yLjgzMiAyLjM0LTYuNDY1IDMuNzQ2LTEwLjQyNiAzLjc0NkM3LjMzMyAzMi43NTYgMCAyNS40MjQgMCAxNi4zNzggMCA3LjMzMyA3LjMzMyAwIDE2LjM3OCAwYzkuMDQ2IDAgMTYuMzc4IDcuMzMzIDE2LjM3OCAxNi4zNzggMCAzLjk2LTEuNDA2IDcuNTk0LTMuNzQ2IDEwLjQyNmwxMC41MzQgMTAuNTM0Yy42MDcuNjA3LjYxIDEuNTktLjAwNCAyLjIwMi0uNjEuNjEtMS41OTcuNjEtMi4yMDIuMDA0TDI2LjgwNCAyOS4wMXptLTEwLjQyNi42MjdjNy4zMjMgMCAxMy4yNi01LjkzNiAxMy4yNi0xMy4yNiAwLTcuMzItNS45MzctMTMuMjU3LTEzLjI2LTEzLjI1N0M5LjA1NiAzLjEyIDMuMTIgOS4wNTYgMy4xMiAxNi4zNzhjMCA3LjMyMyA1LjkzNiAxMy4yNiAxMy4yNTggMTMuMjZ6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdyZXNldCcpXCJcbiAgICAgICAgICB0eXBlPVwicmVzZXRcIlxuICAgICAgICAgIHRpdGxlPVwiQ2xlYXIgdGhlIHNlYXJjaCBxdWVyeS5cIlxuICAgICAgICAgIGhpZGRlblxuICAgICAgICA+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3goJ3Jlc2V0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgd2lkdGg9XCIxMFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04LjExNCAxMEwuOTQ0IDIuODMgMCAxLjg4NSAxLjg4NiAwbC45NDMuOTQzTDEwIDguMTEzbDcuMTctNy4xNy45NDQtLjk0M0wyMCAxLjg4NmwtLjk0My45NDMtNy4xNyA3LjE3IDcuMTcgNy4xNy45NDMuOTQ0TDE4LjExNCAyMGwtLjk0My0uOTQzLTcuMTctNy4xNy03LjE3IDcuMTctLjk0NC45NDNMMCAxOC4xMTRsLjk0My0uOTQzTDguMTEzIDEwelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzRmFjZXRzU2VhcmNoIHtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2g6IEZ1bmN0aW9uO1xuXG4gIHB1YmxpYyBjeCA9IGJlbSgnU2VhcmNoQm94Jyk7XG5cbiAgcHVibGljIHNlYXJjaFF1ZXJ5ID0gJyc7XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWFyY2hRdWVyeSA9IHZhbHVlO1xuICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoUXVlcnkpO1xuICB9XG59XG4iXX0=