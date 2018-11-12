/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as algoliasearchProxy from 'algoliasearch/index';
import * as encodeProxy from 'querystring-es3/encode';
import { VERSION } from './version';
// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
/** @type {?} */
const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
/** @type {?} */
const encode = encodeProxy.default || encodeProxy;
/**
 * @param {?} __0
 * @return {?}
 */
export function createSSRAlgoliaClient({ httpClient, HttpHeaders, transferState, makeStateKey, }) {
    console.warn('`createSSRAlgoliaClient` is deprecated in favor of `createSSRSearchClient` to be plugged to `searchClient`.');
    return (_, appId, apiKey) => createSSRSearchClient({
        appId,
        apiKey,
        httpClient,
        HttpHeaders,
        transferState,
        makeStateKey,
    });
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createSSRSearchClient({ appId, apiKey, httpClient, HttpHeaders, transferState, makeStateKey, }) {
    /** @type {?} */
    const client = algoliasearch(appId, apiKey, {});
    client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);
    client._request = (rawUrl, opts) => {
        /** @type {?} */
        let headers = new HttpHeaders();
        headers = headers.set('content-type', opts.method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json');
        headers = headers.set('accept', 'application/json');
        /** @type {?} */
        const url = rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(opts.headers);
        /** @type {?} */
        const transferStateKey = makeStateKey(`ngais(${opts.body})`);
        if (transferState.hasKey(transferStateKey)) {
            /** @type {?} */
            const resp = JSON.parse(transferState.get(transferStateKey, {}));
            return Promise.resolve({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            });
        }
        return new Promise((resolve, reject) => {
            httpClient
                .request(opts.method, url, {
                headers,
                body: opts.body,
                observe: 'response',
            })
                .subscribe(resp => {
                transferState.set(transferStateKey, JSON.stringify(resp));
                resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            }, resp => reject({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            }));
        });
    };
    return client;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNzci1hbGdvbGlhLWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImNyZWF0ZS1zc3ItYWxnb2xpYS1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxrQkFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7TUFLOUIsYUFBYSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxrQkFBa0I7O01BQ2hFLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVc7Ozs7O0FBRWpELE1BQU0saUNBQWlDLEVBQ3JDLFVBQVUsRUFDVixXQUFXLEVBQ1gsYUFBYSxFQUNiLFlBQVksR0FDYjtJQUNDLE9BQU8sQ0FBQyxJQUFJLENBQ1YsNkdBQTZHLENBQzlHLENBQUM7SUFFRixPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMxQixxQkFBcUIsQ0FBQztRQUNwQixLQUFLO1FBQ0wsTUFBTTtRQUNOLFVBQVU7UUFDVixXQUFXO1FBQ1gsYUFBYTtRQUNiLFlBQVk7S0FDYixDQUFDLENBQUM7QUFDUCxDQUFDOzs7OztBQUVELE1BQU0sZ0NBQWdDLEVBQ3BDLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxhQUFhLEVBQ2IsWUFBWSxHQUNiOztVQUNPLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUUzRCxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFOztZQUM3QixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQ25CLGNBQWMsRUFDZCxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU07WUFDcEIsQ0FBQyxDQUFDLG1DQUFtQztZQUNyQyxDQUFDLENBQUMsa0JBQWtCLENBQ3ZCLENBQUM7UUFFRixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7Y0FFOUMsR0FBRyxHQUNQLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7O2NBRTlELGdCQUFnQixHQUFHLFlBQVksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUU1RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs7a0JBQ3BDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFVBQVU7aUJBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsVUFBVTthQUNwQixDQUFDO2lCQUNELFNBQVMsQ0FDUixJQUFJLENBQUMsRUFBRTtnQkFDTCxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxDQUFDO29CQUNOLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztpQkFDdEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUNELElBQUksQ0FBQyxFQUFFLENBQ0wsTUFBTSxDQUFDO2dCQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFsZ29saWFzZWFyY2hQcm94eSBmcm9tICdhbGdvbGlhc2VhcmNoL2luZGV4JztcbmltcG9ydCAqIGFzIGVuY29kZVByb3h5IGZyb20gJ3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi92ZXJzaW9uJztcblxuLy8gQU9UICsgUm9sbHVwIHdvcmthcm91bmRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy8xMjY3I2lzc3VlY29tbWVudC0yOTYzOTU3MzRcblxuY29uc3QgYWxnb2xpYXNlYXJjaCA9IGFsZ29saWFzZWFyY2hQcm94eS5kZWZhdWx0IHx8IGFsZ29saWFzZWFyY2hQcm94eTtcbmNvbnN0IGVuY29kZSA9IGVuY29kZVByb3h5LmRlZmF1bHQgfHwgZW5jb2RlUHJveHk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTU1JBbGdvbGlhQ2xpZW50KHtcbiAgaHR0cENsaWVudCxcbiAgSHR0cEhlYWRlcnMsXG4gIHRyYW5zZmVyU3RhdGUsXG4gIG1ha2VTdGF0ZUtleSxcbn0pIHtcbiAgY29uc29sZS53YXJuKFxuICAgICdgY3JlYXRlU1NSQWxnb2xpYUNsaWVudGAgaXMgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgY3JlYXRlU1NSU2VhcmNoQ2xpZW50YCB0byBiZSBwbHVnZ2VkIHRvIGBzZWFyY2hDbGllbnRgLidcbiAgKTtcblxuICByZXR1cm4gKF8sIGFwcElkLCBhcGlLZXkpID0+XG4gICAgY3JlYXRlU1NSU2VhcmNoQ2xpZW50KHtcbiAgICAgIGFwcElkLFxuICAgICAgYXBpS2V5LFxuICAgICAgaHR0cENsaWVudCxcbiAgICAgIEh0dHBIZWFkZXJzLFxuICAgICAgdHJhbnNmZXJTdGF0ZSxcbiAgICAgIG1ha2VTdGF0ZUtleSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNTUlNlYXJjaENsaWVudCh7XG4gIGFwcElkLFxuICBhcGlLZXksXG4gIGh0dHBDbGllbnQsXG4gIEh0dHBIZWFkZXJzLFxuICB0cmFuc2ZlclN0YXRlLFxuICBtYWtlU3RhdGVLZXksXG59KSB7XG4gIGNvbnN0IGNsaWVudCA9IGFsZ29saWFzZWFyY2goYXBwSWQsIGFwaUtleSwge30pO1xuICBjbGllbnQuYWRkQWxnb2xpYUFnZW50KGBhbmd1bGFyLWluc3RhbnRzZWFyY2ggJHtWRVJTSU9OfWApO1xuXG4gIGNsaWVudC5fcmVxdWVzdCA9IChyYXdVcmwsIG9wdHMpID0+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KFxuICAgICAgJ2NvbnRlbnQtdHlwZScsXG4gICAgICBvcHRzLm1ldGhvZCA9PT0gJ1BPU1QnXG4gICAgICAgID8gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICApO1xuXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdhY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgY29uc3QgdXJsID1cbiAgICAgIHJhd1VybCArIChyYXdVcmwuaW5jbHVkZXMoJz8nKSA/ICcmJyA6ICc/JykgKyBlbmNvZGUob3B0cy5oZWFkZXJzKTtcblxuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGVLZXkgPSBtYWtlU3RhdGVLZXkoYG5nYWlzKCR7b3B0cy5ib2R5fSlgKTtcblxuICAgIGlmICh0cmFuc2ZlclN0YXRlLmhhc0tleSh0cmFuc2ZlclN0YXRlS2V5KSkge1xuICAgICAgY29uc3QgcmVzcCA9IEpTT04ucGFyc2UodHJhbnNmZXJTdGF0ZS5nZXQodHJhbnNmZXJTdGF0ZUtleSwge30pKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaHR0cENsaWVudFxuICAgICAgICAucmVxdWVzdChvcHRzLm1ldGhvZCwgdXJsLCB7XG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICBib2R5OiBvcHRzLmJvZHksXG4gICAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyxcbiAgICAgICAgfSlcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICByZXNwID0+IHtcbiAgICAgICAgICAgIHRyYW5zZmVyU3RhdGUuc2V0KHRyYW5zZmVyU3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgYm9keTogcmVzcC5ib2R5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3AgPT5cbiAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICBib2R5OiByZXNwLmJvZHksXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3AuaGVhZGVycyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGNsaWVudDtcbn1cbiJdfQ==