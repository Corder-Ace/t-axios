import Axios from './core/Axios'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import { extend } from './utils'
import { AxiosRequestConfig, AxiosStatic } from './typings'

function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(instanceConfig: AxiosRequestConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
}

export default axios
