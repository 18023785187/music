/**
 * 获取所有榜单
 */
import axios, { Canceler } from 'axios'
import request from '../request'

interface IC {
  cancelGetToplist?: Canceler
}

const cancelGetToplist: IC = {}

function getToplist() {
  return request({
    url: '/toplist',
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetToplist.cancelGetToplist = cancel
    })
  })
}

export default getToplist
export { cancelGetToplist }
