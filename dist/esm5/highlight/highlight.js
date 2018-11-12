/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var get = require('lodash/get');
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
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
export { NgAisHighlight };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbnN0YW50c2VhcmNoLyIsInNvdXJjZXMiOlsiaGlnaGxpZ2h0L2hpZ2hsaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0I7SUFBQTtRQU9XLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFFaEMsT0FBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQThDeEIsQ0FBQztJQTVDQyxzQkFBSSxtQ0FBTzs7OztRQUFYO1lBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLGFBQWEsRUFBRTtnQkFDcEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7b0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNwQjtZQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTs7b0JBQ3pDLG9CQUFvQixHQUFHLEdBQUcsQ0FDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FDZjtnQkFFRCxrREFBa0Q7Z0JBQ2xELElBQ0Usb0JBQW9CLEtBQUssU0FBUztvQkFDbEMsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUM5QztvQkFDQSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUQ7YUFDRjs7Z0JBRUssUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDOUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixPQUFPLENBQUMsSUFBSSxDQUNWLCtCQUNFLElBQUksQ0FBQyxTQUFTLHFEQUNrQyxDQUNuRCxDQUFDO2dCQUVGLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDOzs7T0FBQTs7Ozs7SUFFRCwyQ0FBa0I7Ozs7SUFBbEIsVUFBbUIsS0FBYTtRQUM5QixPQUFPLEtBQUs7YUFDVCxPQUFPLENBQ04sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUN2QixNQUFJLElBQUksQ0FBQyxPQUFPLGlCQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQUksQ0FDdEQ7YUFDQSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE9BQUssSUFBSSxDQUFDLE9BQU8sTUFBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Z0JBdERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHdEQUFvRDtpQkFDL0Q7Ozs0QkFFRSxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFnRFIscUJBQUM7Q0FBQSxBQXZERCxJQXVEQztTQW5EWSxjQUFjOzs7SUFDekIsbUNBQTJCOztJQUMzQiw2QkFBOEU7O0lBQzlFLGlDQUFnQzs7SUFFaEMsNEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0ID0gcmVxdWlyZSgnbG9kYXNoL2dldCcpO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmVtIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhaXMtaGlnaGxpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiBbY2xhc3NdPVwiY3goKVwiIFtpbm5lckh0bWxdPVwiY29udGVudFwiPjwvc3Bhbj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0Fpc0hpZ2hsaWdodCB7XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBoaXQ6IHsgX2hpZ2hsaWdodFJlc3VsdD86IHt9OyBsYWJlbD86IHN0cmluZzsgaGlnaGxpZ2h0ZWQ/OiBzdHJpbmcgfTtcbiAgQElucHV0KCkgdGFnTmFtZTogc3RyaW5nID0gJ2VtJztcblxuICBjeCA9IGJlbSgnSGlnaGxpZ2h0Jyk7XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlID09PSAnaGlnaGxpZ2h0ZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXQuaGlnaGxpZ2h0ZWRcbiAgICAgICAgPyB0aGlzLnJlcGxhY2VXaXRoVGFnTmFtZSh0aGlzLmhpdC5oaWdobGlnaHRlZClcbiAgICAgICAgOiB0aGlzLmhpdC5sYWJlbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaXQuaGFzT3duUHJvcGVydHkoJ19oaWdobGlnaHRSZXN1bHQnKSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlSGlnaGxpZ2h0ZWQgPSBnZXQoXG4gICAgICAgIHRoaXMuaGl0Ll9oaWdobGlnaHRSZXN1bHQsXG4gICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICApO1xuXG4gICAgICAvLyBjaGVjayB0aGF0IHRoZSBhdHRyaWJ1dGVIaWdobGlnaHRlZCBpcyBhIHN0cmluZ1xuICAgICAgaWYgKFxuICAgICAgICBhdHRyaWJ1dGVIaWdobGlnaHRlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBhdHRyaWJ1dGVIaWdobGlnaHRlZC52YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlV2l0aFRhZ05hbWUoYXR0cmlidXRlSGlnaGxpZ2h0ZWQudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0KHRoaXMuaGl0LCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgaWYgKCFmYWxsYmFjaykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgQ291bGQgbm90IGZpbmQgYXR0cmlidXRlIFske1xuICAgICAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgICAgIH1dIGludG8gaGl0IG9iamVjdCwgd2lsbCBkaXNwbGF5IGFuIGVtcHR5IHN0cmluZy5gXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG5cbiAgcmVwbGFjZVdpdGhUYWdOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKCc8ZW0+JywgJ2cnKSxcbiAgICAgICAgYDwke3RoaXMudGFnTmFtZX0gY2xhc3M9XCIke3RoaXMuY3goJ2hpZ2hsaWdodGVkJyl9XCI+YFxuICAgICAgKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnPC9lbT4nLCAnZycpLCBgPC8ke3RoaXMudGFnTmFtZX0+YCk7XG4gIH1cbn1cbiJdfQ==