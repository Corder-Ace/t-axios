import Taro from '@tarojs/taro';
import buildFullPath from '../core/buildFullPath';
import buildURL from '../helpers/buildURL';
import { isFormData } from '../utils';
export default function taroAdapter(config) {
    return new Promise(function dispatchTaroRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (isFormData(requestData)) {
            delete requestHeaders['Content-Type'];
        }
        var fullPath = buildFullPath(config.baseURL || '', config.url || '');
        var url = buildURL(fullPath, config.params, config.paramsSerializer);
        Taro.request({
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
