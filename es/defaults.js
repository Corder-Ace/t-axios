"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("./adapters/taro");
var normalizeHeaderName_1 = require("./helpers/normalizeHeaderName");
// const DEFAULT_CONTENT_TYPE = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// };
function getDefaultAdapter() {
    return taro_1.default;
}
exports.default = {
    baseURL: '',
    method: 'GET',
    mode: 'no-cors',
    headers: { common: {} },
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName_1.default(headers, 'Content-Type');
            return data;
        }
    ]
};
