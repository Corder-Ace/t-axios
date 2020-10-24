"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptorManager_1 = require("./InterceptorManager");
var dispatchRequest_1 = require("./dispatchRequest");
var mergeConfig_1 = require("./mergeConfig");
var AxiosInstance = /** @class */ (function () {
    function AxiosInstance(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
            request: new InterceptorManager_1.default(),
            response: new InterceptorManager_1.default()
        };
    }
    AxiosInstance.prototype.request = function (config) {
        config = config || {};
        if (!config.method)
            config.method = 'GET';
        config = mergeConfig_1.default(this.defaults, config);
        var chain = [dispatchRequest_1.default, undefined];
        var promise = Promise.resolve(config);
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    };
    AxiosInstance.prototype.get = function (url, params, options) {
        if (options === void 0) { options = {}; }
        options.method = 'GET';
        return this.request(__assign(__assign({ url: url }, options), { params: params }));
    };
    AxiosInstance.prototype.post = function (url, data, options) {
        options.method = 'POST';
        return this.request(__assign({ url: url, data: data }, options));
    };
    return AxiosInstance;
}());
exports.default = AxiosInstance;
