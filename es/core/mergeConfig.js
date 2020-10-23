"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function deepClone(obj, hash) {
    if (hash === void 0) { hash = new WeakMap(); }
    if (obj === null)
        return obj;
    if (!utils_1.isPlainObject(obj))
        return obj;
    if (hash.has(obj))
        return hash.get(obj);
    var target = utils_1.isArray(obj) ? [] : {};
    hash.set(obj, obj);
    for (var key in obj) {
        if (utils_1.hasOwn(obj, key)) {
            target[key] = deepClone(obj[key], hash);
        }
    }
    return target;
}
function getMergedValue(target, source) {
    if (utils_1.isPlainObject(target) && utils_1.isPlainObject(source)) {
        return utils_1.merge(target, source);
    }
    else if (utils_1.isPlainObject(source)) {
        return utils_1.merge({}, source);
    }
    else if (utils_1.isArray(source)) {
        return source.slice();
    }
    return source;
}
function mergeConfig(config1, config2) {
    var target = deepClone(config1);
    var source = deepClone(config2);
    Object.keys(source).forEach(function (key) {
        if (utils_1.hasOwn(target, key)) {
            target[key] = getMergedValue(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    });
    return target;
}
exports.default = mergeConfig;
