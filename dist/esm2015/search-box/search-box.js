/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Inject, forwardRef, ViewChild, ElementRef, } from '@angular/core';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';
export class NgAisSearchBox extends BaseWidget {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbInNlYXJjaC1ib3gvc2VhcmNoLWJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFFVCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUE2RGhDLE1BQU0scUJBQXNCLFNBQVEsVUFBVTs7OztJQXVCNUMsWUFFUyxtQkFBd0I7UUFFL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRlosd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFLO1FBdkJqQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixlQUFVLEdBQVcsT0FBTyxDQUFDO1FBQzdCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0MsZ0JBQWdCO1FBQ2hCLE9BQU87UUFDRyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyQyxRQUFRO1FBQ0UsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0IsVUFBSyxHQUFHO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFPQSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQUVNLFlBQVksQ0FBQyxLQUFpQjtRQUNuQyx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7OztJQUVNLFdBQVcsQ0FBQyxLQUFpQjtRQUNsQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7OztZQXpIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdURUO2FBQ0Y7Ozs0Q0F5QkksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7O3dCQXZCN0MsU0FBUyxTQUFDLFdBQVc7MEJBQ3JCLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFJTCxNQUFNO29CQUNOLE1BQU07cUJBR04sTUFBTTtvQkFDTixNQUFNO21CQUNOLE1BQU07Ozs7SUFmUCxtQ0FBOEM7O0lBQzlDLHFDQUErQzs7SUFDL0MscUNBQStDOztJQUMvQyxvQ0FBNkM7O0lBQzdDLHlDQUFnRDs7SUFDaEQsbUNBQTJDOztJQUkzQyxnQ0FBc0M7O0lBQ3RDLCtCQUFxQzs7SUFHckMsZ0NBQXNDOztJQUN0QywrQkFBcUM7O0lBQ3JDLDhCQUFvQzs7SUFFcEMsK0JBR0U7O0lBR0EsNkNBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29ubmVjdFNlYXJjaEJveCB9IGZyb20gJ2luc3RhbnRzZWFyY2guanMvZXMvY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi4vYmFzZS13aWRnZXQnO1xuaW1wb3J0IHsgTmdBaXNJbnN0YW50U2VhcmNoIH0gZnJvbSAnLi4vaW5zdGFudHNlYXJjaC9pbnN0YW50c2VhcmNoJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fpcy1zZWFyY2gtYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjeCgpXCI+XG4gICAgICA8Zm9ybVxuICAgICAgICBbY2xhc3NdPVwiY3goJ2Zvcm0nKVwiXG4gICAgICAgIG5vdmFsaWRhdGVcbiAgICAgICAgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIFtjbGFzc109XCJjeCgnaW5wdXQnKVwiXG4gICAgICAgICAgYXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuICAgICAgICAgIGF1dG9jb3JyZWN0PVwib2ZmXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgICAgcm9sZT1cInRleHRib3hcIlxuICAgICAgICAgIHNwZWxsY2hlY2s9XCJmYWxzZVwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJzdGF0ZS5xdWVyeVwiXG4gICAgICAgICAgKGlucHV0KT1cImhhbmRsZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgKGZvY3VzKT1cImZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICNzZWFyY2hCb3hcbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2NsYXNzXT1cImN4KCdzdWJtaXQnKVwiXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3N1Ym1pdFRpdGxlfX1cIlxuICAgICAgICAgIChjbGljayk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjeCgnc3VibWl0SWNvbicpXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAgNDBcIlxuICAgICAgICAgICAgd2lkdGg9XCI0MFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCI0MFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0yNi44MDQgMjkuMDFjLTIuODMyIDIuMzQtNi40NjUgMy43NDYtMTAuNDI2IDMuNzQ2QzcuMzMzIDMyLjc1NiAwIDI1LjQyNCAwIDE2LjM3OCAwIDcuMzMzIDcuMzMzIDAgMTYuMzc4IDBjOS4wNDYgMCAxNi4zNzggNy4zMzMgMTYuMzc4IDE2LjM3OCAwIDMuOTYtMS40MDYgNy41OTQtMy43NDYgMTAuNDI2bDEwLjUzNCAxMC41MzRjLjYwNy42MDcuNjEgMS41OS0uMDA0IDIuMjAyLS42MS42MS0xLjU5Ny42MS0yLjIwMi4wMDRMMjYuODA0IDI5LjAxem0tMTAuNDI2LjYyN2M3LjMyMyAwIDEzLjI2LTUuOTM2IDEzLjI2LTEzLjI2IDAtNy4zMi01LjkzNy0xMy4yNTctMTMuMjYtMTMuMjU3QzkuMDU2IDMuMTIgMy4xMiA5LjA1NiAzLjEyIDE2LjM3OGMwIDcuMzIzIDUuOTM2IDEzLjI2IDEzLjI1OCAxMy4yNnpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbY2xhc3NdPVwiY3goJ3Jlc2V0JylcIlxuICAgICAgICAgIHR5cGU9XCJyZXNldFwiXG4gICAgICAgICAgdGl0bGU9XCJ7e3Jlc2V0VGl0bGV9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhhbmRsZVJlc2V0KCRldmVudClcIlxuICAgICAgICAgIFtoaWRkZW5dPVwiIXN0YXRlLnF1ZXJ5IHx8IChzdGF0ZS5xdWVyeSAmJiAhc3RhdGUucXVlcnkudHJpbSgpKVwiPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImN4KCdyZXNldEljb24nKVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xMTQgMTBMLjk0NCAyLjgzIDAgMS44ODUgMS44ODYgMGwuOTQzLjk0M0wxMCA4LjExM2w3LjE3LTcuMTcuOTQ0LS45NDNMMjAgMS44ODZsLS45NDMuOTQzLTcuMTcgNy4xNyA3LjE3IDcuMTcuOTQzLjk0NEwxOC4xMTQgMjBsLS45NDMtLjk0My03LjE3LTcuMTctNy4xNyA3LjE3LS45NDQuOTQzTDAgMTguMTE0bC45NDMtLjk0M0w4LjExMyAxMHpcIj48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc1NlYXJjaEJveCBleHRlbmRzIEJhc2VXaWRnZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoQm94Jykgc2VhcmNoQm94OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2gnO1xuICBASW5wdXQoKSBwdWJsaWMgc3VibWl0VGl0bGU6IHN0cmluZyA9ICdTdWJtaXQnO1xuICBASW5wdXQoKSBwdWJsaWMgcmVzZXRUaXRsZTogc3RyaW5nID0gJ1Jlc2V0JztcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEFzWW91VHlwZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvZm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBPdXRwdXQgZXZlbnRzXG4gIC8vIGZvcm1cbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIGlucHV0XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHN0YXRlID0ge1xuICAgIHF1ZXJ5OiAnJyxcbiAgICByZWZpbmU6IG5vb3AsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nQWlzSW5zdGFudFNlYXJjaCkpXG4gICAgcHVibGljIGluc3RhbnRTZWFyY2hQYXJlbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcignU2VhcmNoQm94Jyk7XG4gICAgdGhpcy5jcmVhdGVXaWRnZXQoY29ubmVjdFNlYXJjaEJveCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9mb2N1cykge1xuICAgICAgdGhpcy5zZWFyY2hCb3gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQocXVlcnkpO1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZVN1Ym1pdChldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIHNlbmQgc3VibWl0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KGV2ZW50KTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMuc2VhcmNoQXNZb3VUeXBlKSB7XG4gICAgICB0aGlzLnN0YXRlLnJlZmluZSh0aGlzLnN0YXRlLnF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlUmVzZXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvLyBzZW5kIHJlc2V0IGV2ZW50IHRvIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLnJlc2V0LmVtaXQoZXZlbnQpO1xuXG4gICAgLy8gcmVzZXQgc2VhcmNoXG4gICAgdGhpcy5zdGF0ZS5yZWZpbmUoJycpO1xuICB9XG59XG4iXX0=