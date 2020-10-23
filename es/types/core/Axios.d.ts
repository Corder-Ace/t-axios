import InterceptorsManger from "./InterceptorManager";
import { AxiosRequestConfig, AxiosResponse } from '../../types';
interface Interceptors {
    request: InterceptorsManger<AxiosRequestConfig>;
    response: InterceptorsManger<AxiosResponse>;
}
declare class AxiosInstance {
    interceptors: Interceptors;
    defaults: AxiosRequestConfig;
    constructor(instanceConfig: AxiosRequestConfig);
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    get(url: string, params: any, options: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    post(url: string, data: any, options: AxiosRequestConfig): Promise<AxiosRequestConfig>;
}
export default AxiosInstance;
