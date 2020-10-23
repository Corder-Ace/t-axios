import transformData from './transformData'
import defaults from '../defaults'
import { AxiosPromise, AxiosRequestConfig } from '../../types'
import { merge } from '../utils'

export default function dispatchRequest<T>(config: AxiosRequestConfig): AxiosPromise {
    config.headers = config.headers || {};

    config.data = transformData(
        config.data, 
        config.headers, 
        config.transformRequest
    )
    
    config.headers = merge(
        config.headers.common || {},
        config.headers[config.method!] || {},
        config.headers
    )
        
    const cleanHeaders = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
    cleanHeaders.forEach(method => delete config.headers[method]);
    const adapter = (config.adapter || defaults.adapter)!

    return adapter(config)
}
