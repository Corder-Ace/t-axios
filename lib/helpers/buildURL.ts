import { isArray, isDate, isPlainObject, isURLSearchParams } from '../utils';

function encode(val: string): string {
	return encodeURIComponent(val)
		.replace(/%40/gi, '@')
		.replace(/%3A/gi, ':')
		.replace(/%24/g, '$')
		.replace(/%2C/gi, ',')
		.replace(/%20/g, '+')
		.replace(/%5B/gi, '[')
		.replace(/%5D/gi, ']');
}

export default function buildURL(url: string, params: any, paramsSerializer?: Function): string {
	if (!params) return url;
	let serializedParams;
	if (paramsSerializer) {
		serializedParams = paramsSerializer(params);
	} else if (isURLSearchParams(params)) {
		serializedParams = params.toString();
	} else {
		const parts: any[] = [];
		for (let key in params) {
			let val = params[key];
			if (val === null || typeof val === 'undefined') continue;
			if (isArray(val)) {
				key += '[]';
			} else {
				val = [val];
			}

			val.forEach((v: any) => {
				if (isPlainObject(v)) {
					v = JSON.stringify(v);
				} else if (isDate(v)) {
					v = v.toISOString();
				}
				parts.push(`${encode(key)}=${encode(v)}`);
			});
		}
		serializedParams = parts.join('&');

		if (serializedParams) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
		}
	}
	return url;
}
