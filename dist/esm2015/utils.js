/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @param {?} widgetName
 * @return {?}
 */
export function bem(widgetName) {
    /** @type {?} */
    const cx = function (element, subElement) {
        if (element) {
            /** @type {?} */
            const scoppedWidgetName = `ais-${widgetName}-${element}`;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === 'header' || element === 'body' || element === 'footer') {
                /** @type {?} */
                const nonScoppedWidgetName = `ais-${element}`;
                return `${scoppedWidgetName} ${nonScoppedWidgetName}`;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return `${scoppedWidgetName}--${subElement}`;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        // output `ais-Widget`
        return `ais-${widgetName}`;
    };
    return cx;
}
/**
 * @param {?=} input
 * @return {?}
 */
export function parseNumberInput(input) {
    return typeof input === 'string' ? parseInt(input, 10) : input;
}
/**
 * @param {...?} args
 * @return {?}
 */
export function noop(...args) { }
/**
 * @param {?} s
 * @return {?}
 */
export function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sY0FBYyxVQUFrQjs7VUFDOUIsRUFBRSxHQUFHLFVBQVMsT0FBZ0IsRUFBRSxVQUFtQjtRQUN2RCxJQUFJLE9BQU8sRUFBRTs7a0JBQ0wsaUJBQWlCLEdBQUcsT0FBTyxVQUFVLElBQUksT0FBTyxFQUFFO1lBRXhELGdFQUFnRTtZQUNoRSxJQUFJLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFOztzQkFDaEUsb0JBQW9CLEdBQUcsT0FBTyxPQUFPLEVBQUU7Z0JBQzdDLE9BQU8sR0FBRyxpQkFBaUIsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO2FBQ3ZEO1lBRUQsK0JBQStCO1lBQy9CLElBQUksVUFBVSxFQUFFO2dCQUNkLE9BQU8sR0FBRyxpQkFBaUIsS0FBSyxVQUFVLEVBQUUsQ0FBQzthQUM5QztZQUVELDBCQUEwQjtZQUMxQixPQUFPLGlCQUFpQixDQUFDO1NBQzFCO1FBRUQsc0JBQXNCO1FBQ3RCLE9BQU8sT0FBTyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7OztBQUVELE1BQU0sMkJBQTJCLEtBQXVCO0lBQ3RELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDakUsQ0FBQzs7Ozs7QUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFXLElBQVMsQ0FBQzs7Ozs7QUFFN0MsTUFBTSxxQkFBcUIsQ0FBQztJQUMxQixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGJlbSh3aWRnZXROYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgY3ggPSBmdW5jdGlvbihlbGVtZW50Pzogc3RyaW5nLCBzdWJFbGVtZW50Pzogc3RyaW5nKSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNjb3BwZWRXaWRnZXROYW1lID0gYGFpcy0ke3dpZGdldE5hbWV9LSR7ZWxlbWVudH1gO1xuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtSGVhZGVyfEJvZHl8Rm9vdGVyIGFpcy1IZWFkZXJ8Qm9keXxGb290ZXJgXG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ2hlYWRlcicgfHwgZWxlbWVudCA9PT0gJ2JvZHknIHx8IGVsZW1lbnQgPT09ICdmb290ZXInKSB7XG4gICAgICAgIGNvbnN0IG5vblNjb3BwZWRXaWRnZXROYW1lID0gYGFpcy0ke2VsZW1lbnR9YDtcbiAgICAgICAgcmV0dXJuIGAke3Njb3BwZWRXaWRnZXROYW1lfSAke25vblNjb3BwZWRXaWRnZXROYW1lfWA7XG4gICAgICB9XG5cbiAgICAgIC8vIG91dHB1dCBgYWlzLVdpZGdldC1YeXotLWFiY2BcbiAgICAgIGlmIChzdWJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBgJHtzY29wcGVkV2lkZ2V0TmFtZX0tLSR7c3ViRWxlbWVudH1gO1xuICAgICAgfVxuXG4gICAgICAvLyBvdXRwdXQgYGFpcy1XaWRnZXQtWHl6YFxuICAgICAgcmV0dXJuIHNjb3BwZWRXaWRnZXROYW1lO1xuICAgIH1cblxuICAgIC8vIG91dHB1dCBgYWlzLVdpZGdldGBcbiAgICByZXR1cm4gYGFpcy0ke3dpZGdldE5hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGN4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOdW1iZXJJbnB1dChpbnB1dD86IG51bWJlciB8IHN0cmluZykge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlucHV0LCAxMCkgOiBpbnB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoLi4uYXJnczogYW55W10pOiB2b2lkIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHMpIHtcbiAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufVxuIl19