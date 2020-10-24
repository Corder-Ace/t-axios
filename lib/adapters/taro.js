"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("@tarojs/taro");
var buildFullPath_1 = require("../core/buildFullPath");
var buildURL_1 = require("../helpers/buildURL");
var utils_1 = require("../utils");
function taroAdapter(config) {
    return new Promise(function dispatchTaroRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils_1.isFormData(requestData)) {
            delete requestHeaders['Content-Type'];
        }
        var fullPath = buildFullPath_1.default(config.baseURL || '', config.url || '');
        var url = buildURL_1.default(fullPath, config.params, config.paramsSerializer);
        taro_1.default.request({
            url: url,
            data: config.data,
            header: config.headers,
            method: config.method,
            success: function (res) {
                resolve({
                    data: res.data,
                    status: res.statusCode,
                    headers: res.header,
                    config: config,
                });
            },
            fail: function (err) { return reject(err); }
        });
    });
}
exports.default = taroAdapter;
