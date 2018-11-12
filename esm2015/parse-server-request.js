/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { AlgoliaSearchHelper } from 'algoliasearch-helper';
// Transforms url query to SearchParameters
/**
 * @param {?} req
 * @return {?}
 */
export function parseServerRequest(req) {
    if (req && req.url && req.url.includes('?')) {
        /** @type {?} */
        const query = req.url.split('?')[1];
        return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Utc2VydmVyLXJlcXVlc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluc3RhbnRzZWFyY2gvIiwic291cmNlcyI6WyJwYXJzZS1zZXJ2ZXItcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQUczRCxNQUFNLDZCQUE2QixHQUEyQjtJQUM1RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztjQUNyQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sbUJBQW1CLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkU7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbGdvbGlhU2VhcmNoSGVscGVyIH0gZnJvbSAnYWxnb2xpYXNlYXJjaC1oZWxwZXInO1xuXG4vLyBUcmFuc2Zvcm1zIHVybCBxdWVyeSB0byBTZWFyY2hQYXJhbWV0ZXJzXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZXJ2ZXJSZXF1ZXN0KHJlcTogeyB1cmw6IHN0cmluZyB9IHwgdm9pZCkge1xuICBpZiAocmVxICYmIHJlcS51cmwgJiYgcmVxLnVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgY29uc3QgcXVlcnkgPSByZXEudXJsLnNwbGl0KCc/JylbMV07XG4gICAgcmV0dXJuIEFsZ29saWFTZWFyY2hIZWxwZXIuZ2V0Q29uZmlndXJhdGlvbkZyb21RdWVyeVN0cmluZyhxdWVyeSk7XG4gIH1cblxuICByZXR1cm4ge307XG59XG4iXX0=