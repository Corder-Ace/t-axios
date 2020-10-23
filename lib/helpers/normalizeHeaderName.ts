import { forEach } from '../utils'

export default function normalizeHeaderName(headers: any, normalizedName: string) {
  forEach(headers, function processHeader(value: any, name: any) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value
      delete headers[name]
    }
  })
}
