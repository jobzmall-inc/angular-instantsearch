/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Inject, Input, Component, ContentChild, TemplateRef, forwardRef, } from '@angular/core';
import { connectHits } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
export class NgAisHits extends BaseWidget {
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
if (false) {
    /** @type {?} */
    NgAisHits.prototype.template;
    /** @type {?} */
    NgAisHits.prototype.transformItems;
    /** @type {?} */
    NgAisHits.prototype.state;
    /** @type {?} */
    NgAisHits.prototype.updateState;
    /** @type {?} */
    NgAisHits.prototype.instantSearchParent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImhpdHMvaGl0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUF1QnBFLE1BQU0sZ0JBQWlCLFNBQVEsVUFBVTs7OztJQVN2QyxZQUVTLG1CQUF3QjtRQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFGUCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQUs7UUFMakMsNkNBQTZDO1FBQ3RDLFVBQUssR0FBZ0MsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztRQVV0RSxnQkFBVyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUF5QixFQUFFLEVBQUU7WUFDakQsSUFBSSxnQkFBZ0I7Z0JBQUUsT0FBTztZQUU3QixJQUFJLENBQUMsS0FBSyxxQkFDTCxLQUFLLElBQ1IsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQ3RCLElBQUksRUFDRixPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtvQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDakMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQ2pCLENBQUM7UUFDSixDQUFDLENBQUM7UUFkQSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7YUFDRjs7OzRDQVdJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozt1QkFUN0MsWUFBWSxTQUFDLFdBQVc7NkJBR3hCLEtBQUs7Ozs7SUFITiw2QkFBOEQ7O0lBRzlELG1DQUFtQzs7SUFHbkMsMEJBQXNFOztJQVV0RSxnQ0FXRTs7SUFsQkEsd0NBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdEhpdHMgfSBmcm9tICdpbnN0YW50c2VhcmNoLmpzL2VzL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4uL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7IE5nQWlzSW5zdGFudFNlYXJjaCB9IGZyb20gJy4uL2luc3RhbnRzZWFyY2gvaW5zdGFudHNlYXJjaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1oaXRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHN0YXRlXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gZGVmYXVsdCByZW5kZXJpbmcgaWYgbm8gdGVtcGxhdGUgc3BlY2lmaWVkIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPlxuICAgICAgICA8dWwgW2NsYXNzXT1cImN4KCdsaXN0JylcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIFtjbGFzc109XCJjeCgnaXRlbScpXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBoaXQgb2Ygc3RhdGUuaGl0c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFpcy1oaWdobGlnaHQgYXR0cmlidXRlPVwibmFtZVwiIFtoaXRdPVwiaGl0XCI+XG4gICAgICAgICAgICA8L2Fpcy1oaWdobGlnaHQ+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpdHMgZXh0ZW5kcyBCYXNlV2lkZ2V0IHtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyByZW5kZXIgb3B0aW9uc1xuICBASW5wdXQoKSB0cmFuc2Zvcm1JdGVtcz86IEZ1bmN0aW9uO1xuXG4gIC8vIGlubmVyIHdpZGdldCBzdGF0ZSByZXR1cm5lZCBmcm9tIGNvbm5lY3RvclxuICBwdWJsaWMgc3RhdGU6IHsgaGl0czoge31bXTsgcmVzdWx0czoge30gfSA9IHsgaGl0czogW10sIHJlc3VsdHM6IHt9IH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignSGl0cycpO1xuICAgIHRoaXMuY3JlYXRlV2lkZ2V0KGNvbm5lY3RIaXRzLCB7IGVzY2FwZUhpdHM6IHRydWUgfSk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSA9IChzdGF0ZSwgaXNGaXJzdFJlbmRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgIGlmIChpc0ZpcnN0UmVuZGVyaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZXN1bHRzOiBzdGF0ZS5yZXN1bHRzLFxuICAgICAgaGl0czpcbiAgICAgICAgdHlwZW9mIHRoaXMudHJhbnNmb3JtSXRlbXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMudHJhbnNmb3JtSXRlbXMoc3RhdGUuaGl0cylcbiAgICAgICAgICA6IHN0YXRlLmhpdHMsXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==