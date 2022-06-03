/**
 * 首页发现新碟上架请求
 */
import axios, { Canceler } from 'axios'
import request from "../request";

interface IC {
  cancelNewest?: Canceler
}

const cancelNewest: IC = {}

function newest() {
  return request({
    url: '/album/newest',
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelNewest.cancelNewest = cancel
    })
  })
}

export default newest
export { cancelNewest }
