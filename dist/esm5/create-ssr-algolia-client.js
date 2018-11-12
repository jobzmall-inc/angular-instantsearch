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
var algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
/** @type {?} */
var encode = encodeProxy.default || encodeProxy;
/**
 * @param {?} __0
 * @return {?}
 */
export function createSSRAlgoliaClient(_a) {
    var httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    console.warn('`createSSRAlgoliaClient` is deprecated in favor of `createSSRSearchClient` to be plugged to `searchClient`.');
    return function (_, appId, apiKey) {
        return createSSRSearchClient({
            appId: appId,
            apiKey: apiKey,
            httpClient: httpClient,
            HttpHeaders: HttpHeaders,
            transferState: transferState,
            makeStateKey: makeStateKey,
        });
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createSSRSearchClient(_a) {
    var appId = _a.appId, apiKey = _a.apiKey, httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    /** @type {?} */
    var client = algoliasearch(appId, apiKey, {});
    client.addAlgoliaAgent("angular-instantsearch " + VERSION);
    client._request = function (rawUrl, opts) {
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('content-type', opts.method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json');
        headers = headers.set('accept', 'application/json');
        /** @type {?} */
        var url = rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(opts.headers);
        /** @type {?} */
        var transferStateKey = makeStateKey("ngais(" + opts.body + ")");
        if (transferState.hasKey(transferStateKey)) {
            /** @type {?} */
            var resp = JSON.parse(transferState.get(transferStateKey, {}));
            return Promise.resolve({
                statusCode: resp.status,
                body: resp.body,
                headers: resp.headers,
            });
        }
        return new Promise(function (resolve, reject) {
            httpClient
                .request(opts.method, url, {
                headers: headers,
                body: opts.body,
                observe: 'response',
            })
                .subscribe(function (resp) {
                transferState.set(transferStateKey, JSON.stringify(resp));
                resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            }, function (resp) {
                return reject({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers,
                });
            });
        });
    };
    return client;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNzci1hbGdvbGlhLWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW5zdGFudHNlYXJjaC8iLCJzb3VyY2VzIjpbImNyZWF0ZS1zc3ItYWxnb2xpYS1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxrQkFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7SUFLOUIsYUFBYSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxrQkFBa0I7O0lBQ2hFLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVc7Ozs7O0FBRWpELE1BQU0saUNBQWlDLEVBS3RDO1FBSkMsMEJBQVUsRUFDViw0QkFBVyxFQUNYLGdDQUFhLEVBQ2IsOEJBQVk7SUFFWixPQUFPLENBQUMsSUFBSSxDQUNWLDZHQUE2RyxDQUM5RyxDQUFDO0lBRUYsT0FBTyxVQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTTtRQUN0QixPQUFBLHFCQUFxQixDQUFDO1lBQ3BCLEtBQUssT0FBQTtZQUNMLE1BQU0sUUFBQTtZQUNOLFVBQVUsWUFBQTtZQUNWLFdBQVcsYUFBQTtZQUNYLGFBQWEsZUFBQTtZQUNiLFlBQVksY0FBQTtTQUNiLENBQUM7SUFQRixDQU9FLENBQUM7QUFDUCxDQUFDOzs7OztBQUVELE1BQU0sZ0NBQWdDLEVBT3JDO1FBTkMsZ0JBQUssRUFDTCxrQkFBTSxFQUNOLDBCQUFVLEVBQ1YsNEJBQVcsRUFDWCxnQ0FBYSxFQUNiLDhCQUFZOztRQUVOLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQywyQkFBeUIsT0FBUyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJOztZQUN6QixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQ25CLGNBQWMsRUFDZCxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU07WUFDcEIsQ0FBQyxDQUFDLG1DQUFtQztZQUNyQyxDQUFDLENBQUMsa0JBQWtCLENBQ3ZCLENBQUM7UUFFRixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7WUFFOUMsR0FBRyxHQUNQLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7O1lBRTlELGdCQUFnQixHQUFHLFlBQVksQ0FBQyxXQUFTLElBQUksQ0FBQyxJQUFJLE1BQUcsQ0FBQztRQUU1RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs7Z0JBQ3BDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsVUFBVTtpQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3pCLE9BQU8sU0FBQTtnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLFVBQVU7YUFDcEIsQ0FBQztpQkFDRCxTQUFTLENBQ1IsVUFBQSxJQUFJO2dCQUNGLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLENBQUM7b0JBQ04sVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2lCQUN0QixDQUFDLENBQUM7WUFDTCxDQUFDLEVBQ0QsVUFBQSxJQUFJO2dCQUNGLE9BQUEsTUFBTSxDQUFDO29CQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztpQkFDdEIsQ0FBQztZQUpGLENBSUUsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYWxnb2xpYXNlYXJjaFByb3h5IGZyb20gJ2FsZ29saWFzZWFyY2gvaW5kZXgnO1xuaW1wb3J0ICogYXMgZW5jb2RlUHJveHkgZnJvbSAncXVlcnlzdHJpbmctZXMzL2VuY29kZSc7XG5cbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuL3ZlcnNpb24nO1xuXG4vLyBBT1QgKyBSb2xsdXAgd29ya2Fyb3VuZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzEyNjcjaXNzdWVjb21tZW50LTI5NjM5NTczNFxuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYXNlYXJjaFByb3h5LmRlZmF1bHQgfHwgYWxnb2xpYXNlYXJjaFByb3h5O1xuY29uc3QgZW5jb2RlID0gZW5jb2RlUHJveHkuZGVmYXVsdCB8fCBlbmNvZGVQcm94eTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNTUkFsZ29saWFDbGllbnQoe1xuICBodHRwQ2xpZW50LFxuICBIdHRwSGVhZGVycyxcbiAgdHJhbnNmZXJTdGF0ZSxcbiAgbWFrZVN0YXRlS2V5LFxufSkge1xuICBjb25zb2xlLndhcm4oXG4gICAgJ2BjcmVhdGVTU1JBbGdvbGlhQ2xpZW50YCBpcyBkZXByZWNhdGVkIGluIGZhdm9yIG9mIGBjcmVhdGVTU1JTZWFyY2hDbGllbnRgIHRvIGJlIHBsdWdnZWQgdG8gYHNlYXJjaENsaWVudGAuJ1xuICApO1xuXG4gIHJldHVybiAoXywgYXBwSWQsIGFwaUtleSkgPT5cbiAgICBjcmVhdGVTU1JTZWFyY2hDbGllbnQoe1xuICAgICAgYXBwSWQsXG4gICAgICBhcGlLZXksXG4gICAgICBodHRwQ2xpZW50LFxuICAgICAgSHR0cEhlYWRlcnMsXG4gICAgICB0cmFuc2ZlclN0YXRlLFxuICAgICAgbWFrZVN0YXRlS2V5LFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1NSU2VhcmNoQ2xpZW50KHtcbiAgYXBwSWQsXG4gIGFwaUtleSxcbiAgaHR0cENsaWVudCxcbiAgSHR0cEhlYWRlcnMsXG4gIHRyYW5zZmVyU3RhdGUsXG4gIG1ha2VTdGF0ZUtleSxcbn0pIHtcbiAgY29uc3QgY2xpZW50ID0gYWxnb2xpYXNlYXJjaChhcHBJZCwgYXBpS2V5LCB7fSk7XG4gIGNsaWVudC5hZGRBbGdvbGlhQWdlbnQoYGFuZ3VsYXItaW5zdGFudHNlYXJjaCAke1ZFUlNJT059YCk7XG5cbiAgY2xpZW50Ll9yZXF1ZXN0ID0gKHJhd1VybCwgb3B0cykgPT4ge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG5cbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoXG4gICAgICAnY29udGVudC10eXBlJyxcbiAgICAgIG9wdHMubWV0aG9kID09PSAnUE9TVCdcbiAgICAgICAgPyAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICk7XG5cbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ2FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICBjb25zdCB1cmwgPVxuICAgICAgcmF3VXJsICsgKHJhd1VybC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nKSArIGVuY29kZShvcHRzLmhlYWRlcnMpO1xuXG4gICAgY29uc3QgdHJhbnNmZXJTdGF0ZUtleSA9IG1ha2VTdGF0ZUtleShgbmdhaXMoJHtvcHRzLmJvZHl9KWApO1xuXG4gICAgaWYgKHRyYW5zZmVyU3RhdGUuaGFzS2V5KHRyYW5zZmVyU3RhdGVLZXkpKSB7XG4gICAgICBjb25zdCByZXNwID0gSlNPTi5wYXJzZSh0cmFuc2ZlclN0YXRlLmdldCh0cmFuc2ZlclN0YXRlS2V5LCB7fSkpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IHJlc3Auc3RhdHVzLFxuICAgICAgICBib2R5OiByZXNwLmJvZHksXG4gICAgICAgIGhlYWRlcnM6IHJlc3AuaGVhZGVycyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBodHRwQ2xpZW50XG4gICAgICAgIC5yZXF1ZXN0KG9wdHMubWV0aG9kLCB1cmwsIHtcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IG9wdHMuYm9keSxcbiAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnLFxuICAgICAgICB9KVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIHJlc3AgPT4ge1xuICAgICAgICAgICAgdHJhbnNmZXJTdGF0ZS5zZXQodHJhbnNmZXJTdGF0ZUtleSwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICBib2R5OiByZXNwLmJvZHksXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3AuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcCA9PlxuICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgIGJvZHk6IHJlc3AuYm9keSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVzcC5oZWFkZXJzLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gY2xpZW50O1xufVxuIl19