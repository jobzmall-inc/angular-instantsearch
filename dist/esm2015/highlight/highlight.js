/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const get = require('lodash/get');
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
export class NgAisHighlight {
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
if (false) {
    /** @type {?} */
    NgAisHighlight.prototype.attribute;
    /** @type {?} */
    NgAisHighlight.prototype.hit;
    /** @type {?} */
    NgAisHighlight.prototype.tagName;
    /** @type {?} */
    NgAisHighlight.prototype.cx;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsiaGlnaGxpZ2h0L2hpZ2hsaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFNL0IsTUFBTTtJQUpOO1FBT1csWUFBTyxHQUFXLElBQUksQ0FBQztRQUVoQyxPQUFFLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBOEN4QixDQUFDOzs7O0lBNUNDLElBQUksT0FBTztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxhQUFhLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNwQjtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTs7a0JBQ3pDLG9CQUFvQixHQUFHLEdBQUcsQ0FDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FDZjtZQUVELGtEQUFrRDtZQUNsRCxJQUNFLG9CQUFvQixLQUFLLFNBQVM7Z0JBQ2xDLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDOUM7Z0JBQ0EsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUQ7U0FDRjs7Y0FFSyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTyxDQUFDLElBQUksQ0FDViw2QkFDRSxJQUFJLENBQUMsU0FDUCxrREFBa0QsQ0FDbkQsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLEtBQWE7UUFDOUIsT0FBTyxLQUFLO2FBQ1QsT0FBTyxDQUNOLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxXQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDdEQ7YUFDQSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLG9EQUFvRDthQUMvRDs7O3dCQUVFLEtBQUs7a0JBQ0wsS0FBSztzQkFDTCxLQUFLOzs7O0lBRk4sbUNBQTJCOztJQUMzQiw2QkFBOEU7O0lBQzlFLGlDQUFnQzs7SUFFaEMsNEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0ID0gcmVxdWlyZSgnbG9kYXNoL2dldCcpO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGlnaGxpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiBbY2xhc3NdPVwiY3goKVwiIFtpbm5lckh0bWxdPVwiY29udGVudFwiPjwvc3Bhbj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZ2hsaWdodCB7XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBoaXQ6IHsgX2hpZ2hsaWdodFJlc3VsdD86IHt9OyBsYWJlbD86IHN0cmluZzsgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmcgfTtcbiAgQElucHV0KCkgdGFnTmFtZTogc3RyaW5nID0gJ2VtJztcblxuICBjeCA9IGJlbSgnSGlnaGxpZ2h0Jyk7XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlID09PSAnaGlnaGxpZ2h0ZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXQuaGlnaGxpZ2h0ZWRcbiAgICAgICAgPyB0aGlzLnJlcGxhY2VXaXRoVGFnTmFtZSh0aGlzLmhpdC5oaWdobGlnaHRlZClcbiAgICAgICAgOiB0aGlzLmhpdC5sYWJlbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaXQuaGFzT3duUHJvcGVydHkoJ19oaWdobGlnaHRSZXN1bHQnKSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgPSBnZXQoXG4gICAgICAgIHRoaXMuaGl0Ll9oaWdobGlnaHRSZXN1bHQsXG4gICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICApO1xuXG4gICAgICAvLyBjaGVjayB0aGF0IHRoZSBhdHRyaWJ1dGVIaWdobGlnaHRlZCBpcyBhIHN0cmluZ1xuICAgICAgaWYgKFxuICAgICAgICBhdHRyaWJ1dGVIaWdobGlnaHRlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBhdHRyaWJ1dGVIaWdobGlnaHRlZC52YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlV2l0aFRhZ05hbWUoYXR0cmlidXRlSGlnaGxpZ2h0ZWQudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0KHRoaXMuaGl0LCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgaWYgKCFmYWxsYmFjaykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgQ291bGQgbm90IGZpbmQgYXR0cmlidXRlIFske1xuICAgICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICAgIH1dIGludG8gaGl0IG9iamVjdCwgd2lsbCBkaXNwbGF5IGFuIGVtcHR5IHN0cmluZy5gXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG5cbiAgcmVwbGFjZVdpdGhUYWdOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKCc8ZW0+JywgJ2cnKSxcbiAgICAgICAgYDwke3RoaXMudGFnTmFtZX0gY2xhc3M9XCIke3RoaXMuY3goJ2hpZ2hsaWdodGVkJyl9XCI+YFxuICAgICAgKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnPC9lbT4nLCAnZycpLCBgPC8ke3RoaXMudGFnTmFtZX0+YCk7XG4gIH1cbn1cbiJdfQ==