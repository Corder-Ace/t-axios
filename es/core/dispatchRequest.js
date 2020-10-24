import transformData from './transformData';
import defaults from '../defaults';
import { merge } from '../utils';
export default function dispatchRequest(config) {
    config.headers = config.headers || {};
    config.data = transformData(config.data, config.headers, config.transformRequest);
    config.headers = merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    var cleanHeaders = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
    cleanHeaders.forEach(function (method) { return delete config.headers[method]; });
    var adapter = (config.adapter || defaults.adapter);
    return adapter(config);
}
