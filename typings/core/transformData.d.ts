export interface AxiosTransformer {
    (data: any, headers?: any): any;
}
export default function transformData(data: any, headers: any, fns: any): any;
