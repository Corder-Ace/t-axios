const _toString = Object.prototype.toString

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isString(str: string): boolean {
  return _toString.call(str) === '[Object String]'
}

export function isArray(arr: any[]): boolean {
  return Array.isArray(arr)
}

export function isDate(val: any): boolean {
  return _toString.call(val) === '[object Date]'
}

export function isURLSearchParams(val: any): boolean {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

export function isFormData(val: any): boolean {
  return typeof FormData !== 'undefined' && val instanceof FormData
}

export function hasOwn(obj: Object, key: any): boolean {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function forEach(obj: any, fn: Function): void {
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn && fn.call(null, obj[i], i, obj)
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn && fn.call(null, obj[key], key, obj)
      }
    }
  }
}

export function merge(...params: any[] /* obj1, obj2, obj3, ... */) {
  const result: any = {}

  function assignValue(val: any, key: string) {
    if (isObject(result[key]) && isObject(val)) {
      result[key] = merge(result[key], val)
    } else if (isObject(val)) {
      result[key] = merge({}, val)
    } else if (isArray(val)) {
      result[key] = val.slice()
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = params.length; i < l; i++) {
    forEach(params[i], assignValue)
  }

  return result
}

export function extend<T, U>(target: T, from: U): T & U {
  for (const key in from) {
    ;(target as T & U)[key] = from[key] as any
  }
  return target as T & U
}
