var _toString = Object.prototype.toString;
export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
export function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
export function isString(str) {
    return _toString.call(str) === '[Object String]';
}
export function isArray(arr) {
    return Array.isArray(arr);
}
export function isDate(val) {
    return _toString.call(val) === '[object Date]';
}
export function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
export function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
export function hasOwn(obj, key) {
    if (!isObject(obj))
        return false;
    return Object.prototype.hasOwnProperty.call(obj, key);
}
export function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn && fn.call(null, obj[i], i, obj);
        }
    }
    else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn && fn.call(null, obj[key], key, obj);
            }
        }
    }
}
export function merge() {
    var params = []; /* obj1, obj2, obj3, ... */
    for (var _i = 0 /* obj1, obj2, obj3, ... */; _i < arguments.length /* obj1, obj2, obj3, ... */; _i++ /* obj1, obj2, obj3, ... */) {
        params[_i] = arguments[_i]; /* obj1, obj2, obj3, ... */
    }
    var result = {};
    function assignValue(val, key) {
        if (isObject(result[key]) && isObject(val)) {
            result[key] = merge(result[key], val);
        }
        else if (isObject(val)) {
            result[key] = merge({}, val);
        }
        else if (isArray(val)) {
            result[key] = val.slice();
        }
        else {
            result[key] = val;
        }
    }
    for (var i = 0, l = params.length; i < l; i++) {
        forEach(params[i], assignValue);
    }
    return result;
}
export function extend(target, from) {
    for (var key in from) {
        ;
        target[key] = from[key];
    }
    return target;
}
