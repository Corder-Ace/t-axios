import isAbsoluteURL from '../helpers/isAbslouteUrl';
import combineURLs from '../helpers/combineURLs';

export default function buildFullPath(baseURL: string, requestedURL:string): string {
    if (baseURL && !isAbsoluteURL(requestedURL)){
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
}