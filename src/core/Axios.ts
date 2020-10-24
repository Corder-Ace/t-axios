import InterceptorsManger from './InterceptorManager'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'
import { AxiosRequestConfig, AxiosResponse } from '../typings'

interface AxiosInterceptorManager {
  request: InterceptorsManger<AxiosRequestConfig>
  response: InterceptorsManger<AxiosResponse>
}

export default class AxiosInstance {
  interceptors: AxiosInterceptorManager
  defaults: AxiosRequestConfig
  constructor(instanceConfig: AxiosRequestConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptorsManger<AxiosRequestConfig>(),
      response: new InterceptorsManger<AxiosResponse>()
    }
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    config = config || {}

    if (!config.method) config.method = 'GET'

    config = mergeConfig(this.defaults, config)
    const chain: any[] = [dispatchRequest, undefined]
    let promise = Promise.resolve(config)

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise as Promise<R>
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    params?: any,
    options: AxiosRequestConfig = {}
  ): Promise<R> {
    options.method = 'GET'
    return this.request({ url, ...options, params })
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    options: AxiosRequestConfig
  ): Promise<R> {
    options.method = 'POST'
    return this.request({ url, data, ...options })
  }
}
