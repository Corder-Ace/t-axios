import { AxiosRequestConfig, AxiosAdapter } from './typings'
import taroAdapter from './adapters/taro'
import normalizeHeaderName from './helpers/normalizeHeaderName'
// const DEFAULT_CONTENT_TYPE = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// };
function getDefaultAdapter(): AxiosAdapter {
  return taroAdapter
}

export default {
  baseURL: '',
  method: 'GET',
  mode: 'no-cors',
  headers: { common: {} },
  adapter: getDefaultAdapter(),
  transformRequest: [
    function transformRequest(data: any, headers: any) {
      normalizeHeaderName(headers, 'Content-Type')
      return data
    }
  ]
} as AxiosRequestConfig
