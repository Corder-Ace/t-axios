"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function combineURLs(baseURL, relativeURL) {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
}
exports.default = combineURLs;
;
