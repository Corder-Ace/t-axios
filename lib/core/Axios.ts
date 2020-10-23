import InterceptorsManger from "./InterceptorManager";
import dispatchRequest from './dispatchRequest';
import mergeConfig from './mergeConfig';
import { AxiosRequestConfig, AxiosResponse } from '../../types';

interface Interceptors {
  request: InterceptorsManger<AxiosRequestConfig>
  response: InterceptorsManger<AxiosResponse>
}

class AxiosInstance {
  interceptors: Interceptors;
  defaults: AxiosRequestConfig;
  constructor(instanceConfig: AxiosRequestConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorsManger<AxiosRequestConfig>(),
      response: new InterceptorsManger<AxiosResponse>()
    };
  }

  request(config: AxiosRequestConfig) {
    config = config || {};

    if (!config.method) config.method = "GET";

    config = mergeConfig(this.defaults, config);
    const chain: any[] = [dispatchRequest, undefined];
    let promise = Promise.resolve(config);

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  get(url: string, params: any, options: AxiosRequestConfig) {
    options.method = "GET";
    return this.request({url, ...options, params });
  }

  post(url: string, data: any, options: AxiosRequestConfig) {
    options.method = "POST";
    return this.request({ url, data, ...options });
  }
}

export default AxiosInstance;
