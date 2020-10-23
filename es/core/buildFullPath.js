"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAbslouteUrl_1 = require("../helpers/isAbslouteUrl");
var combineURLs_1 = require("../helpers/combineURLs");
function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbslouteUrl_1.default(requestedURL)) {
        return combineURLs_1.default(baseURL, requestedURL);
    }
    return requestedURL;
}
exports.default = buildFullPath;
