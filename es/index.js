"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = require("./core/Axios");
var defaults_1 = require("./defaults");
var mergeConfig_1 = require("./core/mergeConfig");
var utils_1 = require("./utils");
function createInstance(defaultConfig) {
    var context = new Axios_1.default(defaultConfig);
    var instance = Axios_1.default.prototype.request.bind(context);
    utils_1.extend(instance, context);
    return instance;
}
var axios = createInstance(defaults_1.default);
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig_1.default(axios.defaults, instanceConfig));
};
exports.default = axios;
