"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = exports.merge = exports.forEach = exports.hasOwn = exports.isFormData = exports.isURLSearchParams = exports.isDate = exports.isArray = exports.isString = exports.isPlainObject = exports.isObject = void 0;
var _toString = Object.prototype.toString;
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function isString(str) {
    return _toString.call(str) === '[Object String]';
}
exports.isString = isString;
function isArray(arr) {
    return Array.isArray(arr);
}
exports.isArray = isArray;
function isDate(val) {
    return _toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
exports.isURLSearchParams = isURLSearchParams;
function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
exports.isFormData = isFormData;
function hasOwn(obj, key) {
    if (!isObject(obj))
        return false;
    return Object.prototype.hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;
function forEach(obj, fn) {
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
exports.forEach = forEach;
function merge() {
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
exports.merge = merge;
function extend(target, from) {
    for (var key in from) {
        ;
        target[key] = from[key];
    }
    return target;
}
exports.extend = extend;
