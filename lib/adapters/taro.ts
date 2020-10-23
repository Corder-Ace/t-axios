import Taro from '@tarojs/taro'
import buildFullPath from '../core/buildFullPath'
import buildURL from '../helpers/buildURL'
import { AxiosPromise, AxiosRequestConfig } from '../../types/index'
import { isFormData } from '../utils'

export default function taroAdapter(config: AxiosRequestConfig): AxiosPromise<any> {
    return new Promise(function dispatchTaroRequest(resolve, reject) {
        const requestData = config.data
        const requestHeaders = config.headers

        if (isFormData(requestData)) {
            delete requestHeaders['Content-Type']
        }

        const fullPath = buildFullPath(config.baseURL || '', config.url || '')
        const url = buildURL(fullPath, config.params, config.paramsSerializer)

        Taro.request({
            url,
            data: config.data,
            header: config.headers,
            method: config.method,
            success: res => resolve(res),
            fail: err => reject(err)
        })
    })
}
