/**
 * 首页轮播图请求
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelgetBanner?: Canceler
}

const cancelgetBanner: IC = {}

function getBanner(type: number = 0) {
  return request({
    url: '/banner',
    ...queryStringConfig({
      type
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelgetBanner.cancelgetBanner = cancel
    })
  })
}

export default getBanner
export { cancelgetBanner }
