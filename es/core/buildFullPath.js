import isAbsoluteURL from '../helpers/isAbslouteUrl';
import combineURLs from '../helpers/combineURLs';
export default function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
}
