/**
 * 获取推荐歌单
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelPersonalized?: Canceler
}

const cancelPersonalized: IC = {}

function personalized(limit: number = 8) {
  return request({
    url: '/personalized',
    ...queryStringConfig({
      limit
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelPersonalized.cancelPersonalized = cancel
    })
  })
}

export default personalized
export { cancelPersonalized }
