import { isArray, isDate, isPlainObject, isURLSearchParams } from '../utils';
function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
export default function buildURL(url, params, paramsSerializer) {
    if (!params)
        return url;
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    }
    else if (isURLSearchParams(params)) {
        serializedParams = params.toString();
    }
    else {
        var parts_1 = [];
        var _loop_1 = function (key) {
            var val = params[key];
            if (val === null || typeof val === 'undefined')
                return "continue";
            if (isArray(val)) {
                key += '[]';
            }
            else {
                val = [val];
            }
            val.forEach(function (v) {
                if (isPlainObject(v)) {
                    v = JSON.stringify(v);
                }
                else if (isDate(v)) {
                    v = v.toISOString();
                }
                parts_1.push(encode(key) + "=" + encode(v));
            });
        };
        for (var key in params) {
            _loop_1(key);
        }
        serializedParams = parts_1.join('&');
        if (serializedParams) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
    }
    return url;
}
