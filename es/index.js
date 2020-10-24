import Axios from './core/Axios';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';
import { extend } from './utils';
function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = Axios.prototype.request.bind(context);
    extend(instance, context);
    return instance;
}
var axios = createInstance(defaults);
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
export default axios;
