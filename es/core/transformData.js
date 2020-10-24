import { isArray } from "../utils";
export default function transformData(data, headers, fns) {
    fns = isArray(fns) ? fns : [fns];
    fns.forEach(function (fn) {
        if (!fn)
            return;
        data = fn(data, headers);
    });
    return data;
}
