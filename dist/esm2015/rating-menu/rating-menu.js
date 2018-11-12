/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectStarRating } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisRatingMenu extends BaseWidget {
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
if (false) {
    /** @type {?} */
    NgAisRatingMenu.prototype.andUpLabel;
    /** @type {?} */
    NgAisRatingMenu.prototype.attribute;
    /** @type {?} */
    NgAisRatingMenu.prototype.max;
    /** @type {?} */
    NgAisRatingMenu.prototype.state;
    /** @type {?} */
    NgAisRatingMenu.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJyYXRpbmctbWVudS9yYXRpbmctbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQXdFaEMsTUFBTSxzQkFBdUIsU0FBUSxVQUFVOzs7O0lBbUI3QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFwQmpDLGlCQUFpQjtRQUNELGVBQVUsR0FBVyxNQUFNLENBQUM7UUFJNUIsUUFBRyxHQUFZLENBQUMsQ0FBQztRQUUxQixVQUFLLEdBQW9CO1lBQzlCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFXRixDQUFDOzs7O0lBVEQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNqRSxDQUFDOzs7O0lBU00sUUFBUTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUU7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNkLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBaUIsRUFBRSxLQUFhO1FBQ2pELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7O1lBdEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkRUO2FBQ0Y7Ozs0Q0FxQkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7O3lCQWxCN0MsS0FBSzt3QkFHTCxLQUFLO2tCQUNMLEtBQUs7Ozs7SUFKTixxQ0FBNEM7O0lBRzVDLG9DQUFrQzs7SUFDbEMsOEJBQWlDOztJQUVqQyxnQ0FLRTs7SUFPQSw4Q0FDK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFN0YXJSYXRpbmcgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBSYXRpbmdNZW51U3RhdGUgPSB7XG4gIGNyZWF0ZVVSTDogRnVuY3Rpb247XG4gIGhhc05vUmVzdWx0czogYm9vbGVhbjtcbiAgaXRlbXM6IHt9W107XG4gIHJlZmluZTogRnVuY3Rpb247XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtcmF0aW5nLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJjeCgpXCJcbiAgICAgICpuZ0lmPVwiIWlzSGlkZGVuXCJcbiAgICA+XG4gICAgICA8c3ZnIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPlxuICAgICAgICA8c3ltYm9sXG4gICAgICAgICAgaWQ9XCJhaXMtU3RhclJhdGluZy1zdGFyU3ltYm9sXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgID5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIC4yODhsMi44MzMgOC43MThoOS4xNjdsLTcuNDE3IDUuMzg5IDIuODMzIDguNzE4LTcuNDE2LTUuMzg4LTcuNDE3IDUuMzg4IDIuODMzLTguNzE4LTcuNDE2LTUuMzg5aDkuMTY3elwiLz5cbiAgICAgICAgPC9zeW1ib2w+XG4gICAgICAgIDxzeW1ib2xcbiAgICAgICAgICBpZD1cImFpcy1TdGFyUmF0aW5nLXN0YXJFbXB0eVN5bWJvbFwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiA2Ljc2bDEuMzc5IDQuMjQ2aDQuNDY1bC0zLjYxMiAyLjYyNSAxLjM3OSA0LjI0Ni0zLjYxMS0yLjYyNS0zLjYxMiAyLjYyNSAxLjM3OS00LjI0Ni0zLjYxMi0yLjYyNWg0LjQ2NWwxLjM4LTQuMjQ2em0wLTYuNDcybC0yLjgzMyA4LjcxOGgtOS4xNjdsNy40MTYgNS4zODktMi44MzMgOC43MTggNy40MTctNS4zODggNy40MTYgNS4zODgtMi44MzMtOC43MTggNy40MTctNS4zODloLTkuMTY3bC0yLjgzMy04LjcxOHpcIi8+XG4gICAgICAgIDwvc3ltYm9sPlxuICAgICAgPC9zdmc+XG5cbiAgICAgIDx1bCBbY2xhc3NdPVwiY3goJ2xpc3QnKVwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5pdGVtc1wiXG4gICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzcyhpdGVtKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgaXRlbS52YWx1ZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCJ7e3N0YXRlLmNyZWF0ZVVSTChpdGVtLnZhbHVlKX19XCJcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnbGluaycpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsIGl0ZW0udmFsdWUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzdGFyIG9mIGl0ZW0uc3RhcnNcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJjeCgnc3Rhckljb24nKVwiXG4gICAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx1c2VcbiAgICAgICAgICAgICAgICAqbmdJZj1cInN0YXJcIlxuICAgICAgICAgICAgICAgIHhsaW5rOmhyZWY9XCIjYWlzLVN0YXJSYXRpbmctc3RhclN5bWJvbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC91c2U+XG5cbiAgICAgICAgICAgICAgPHVzZVxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIXN0YXJcIlxuICAgICAgICAgICAgICAgIHhsaW5rOmhyZWY9XCIjYWlzLVN0YXJSYXRpbmctc3RhckVtcHR5U3ltYm9sXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L3VzZT5cbiAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY3goJ2xhYmVsJylcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57e2FuZFVwTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjeCgnY291bnQnKVwiPnt7aXRlbS5jb3VudH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nQWlzUmF0aW5nTWVudSBleHRlbmRzIEJhc2VXaWRnZXQge1xuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYW5kVXBMYWJlbDogc3RyaW5nID0gJyYgVXAnO1xuXG4gIC8vIGNvbm5lY3RvcnMgb3B0aW9uc1xuICBASW5wdXQoKSBwdWJsaWMgYXR0cmlidXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg/OiBudW1iZXIgPSA1O1xuXG4gIHB1YmxpYyBzdGF0ZTogUmF0aW5nTWVudVN0YXRlID0ge1xuICAgIGNyZWF0ZVVSTDogbm9vcCxcbiAgICBoYXNOb1Jlc3VsdHM6IGZhbHNlLFxuICAgIGl0ZW1zOiBbXSxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmF1dG9IaWRlQ29udGFpbmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignUmF0aW5nTWVudScpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RTdGFyUmF0aW5nLCB7XG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZSxcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgfSk7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnN0YXRlLnJlZmluZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==