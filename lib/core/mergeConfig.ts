import { isPlainObject, isArray, hasOwn, merge } from '../utils'

function deepClone(
    obj: any,
    hash: WeakMap<any, any> = new WeakMap()
): any {
    if (obj === null) return obj;
    if (!isPlainObject(obj)) return obj;
    if (hash.has(obj)) return hash.get(obj);
    const target: any = isArray(obj) ? [] : {};
    hash.set(obj, obj);
    for (let key in obj) {
        if (hasOwn(obj, key)) {
            target[key] = deepClone(obj[key], hash);
        }
    }
    return target;
}

function getMergedValue(target: any, source: any) {
    if (isPlainObject(target) && isPlainObject(source)) {
        return merge(target, source);
    } else if (isPlainObject(source)) {
        return merge({}, source);
    } else if (isArray(source)) {
        return source.slice();
    }
    return source;
}

export default function mergeConfig(config1: any, config2: any) {
    const target = deepClone(config1);
    const source = deepClone(config2);

    Object.keys(source).forEach(key => {
        if (hasOwn(target, key)) {
            target[key] = getMergedValue(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    });

    return target;
}
