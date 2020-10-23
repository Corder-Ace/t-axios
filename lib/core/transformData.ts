import { isArray } from "../utils"

export interface AxiosTransformer {
    (data: any, headers?: any): any
}

export default function transformData(data: any, headers: any, fns: any) {
    fns = isArray(fns) ? fns : [fns];
    fns.forEach((fn: (arg0: any, arg1: any) => any) => {
        if (!fn) return;
        data = fn(data, headers)
    })
    return data;
}
