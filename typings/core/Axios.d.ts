import InterceptorsManger from './InterceptorManager';
import { AxiosRequestConfig, AxiosResponse } from '../typings';
interface AxiosInterceptorManager {
    request: InterceptorsManger<AxiosRequestConfig>;
    response: InterceptorsManger<AxiosResponse>;
}
export default class AxiosInstance {
    interceptors: AxiosInterceptorManager;
    defaults: AxiosRequestConfig;
    constructor(instanceConfig: AxiosRequestConfig);
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, params?: any, options?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data: any, options: AxiosRequestConfig): Promise<R>;
}
export {};
