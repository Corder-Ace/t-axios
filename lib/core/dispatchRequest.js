"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transformData_1 = require("./transformData");
var defaults_1 = require("../defaults");
var utils_1 = require("../utils");
function dispatchRequest(config) {
    config.headers = config.headers || {};
    config.data = transformData_1.default(config.data, config.headers, config.transformRequest);
    config.headers = utils_1.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    var cleanHeaders = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
    cleanHeaders.forEach(function (method) { return delete config.headers[method]; });
    var adapter = (config.adapter || defaults_1.default.adapter);
    return adapter(config);
}
exports.default = dispatchRequest;
