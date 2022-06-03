/**
 * 获取歌单或排行榜详情动态部分,如评论数,是否收藏,播放数
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetDynamic?: Canceler
}

const cancelGetDynamic: IC = {}

function getDynamic(id: number | string) {
  return request({
    url: `/playlist/detail/dynamic`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetDynamic.cancelGetDynamic = cancel
    })
  })
}

export default getDynamic
export { cancelGetDynamic }
