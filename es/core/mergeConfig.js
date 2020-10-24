import { isPlainObject, isArray, hasOwn, merge } from '../utils';
function deepClone(obj, hash) {
    if (hash === void 0) { hash = new WeakMap(); }
    if (obj === null)
        return obj;
    if (!isPlainObject(obj))
        return obj;
    if (hash.has(obj))
        return hash.get(obj);
    var target = isArray(obj) ? [] : {};
    hash.set(obj, obj);
    for (var key in obj) {
        if (hasOwn(obj, key)) {
            target[key] = deepClone(obj[key], hash);
        }
    }
    return target;
}
function getMergedValue(target, source) {
    if (isPlainObject(target) && isPlainObject(source)) {
        return merge(target, source);
    }
    else if (isPlainObject(source)) {
        return merge({}, source);
    }
    else if (isArray(source)) {
        return source.slice();
    }
    return source;
}
export default function mergeConfig(config1, config2) {
    var target = deepClone(config1);
    var source = deepClone(config2);
    Object.keys(source).forEach(function (key) {
        if (hasOwn(target, key)) {
            target[key] = getMergedValue(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    });
    return target;
}
