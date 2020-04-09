import Taro from "@tarojs/taro"
import BASE_URL from "./config"
import interceptors from "./interceptors.js"

interceptors.forEach(i => Taro.addInterceptor(i))

export default {
  baseOptions (params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: url.indexOf('http') !== -1 ? url : BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType
      }
    }
    console.log(option)
    return Taro.request(option)
  },
  get (url, data = "") {
    console.log(1111);
    let option = { url, data }
    console.log(option);
    return this.baseOptions(option)
  },
  post (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put (url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete (url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}