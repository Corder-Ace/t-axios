"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function transformData(data, headers, fns) {
    fns = utils_1.isArray(fns) ? fns : [fns];
    fns.forEach(function (fn) {
        if (!fn)
            return;
        data = fn(data, headers);
    });
    return data;
}
exports.default = transformData;
