/**
 * 排行榜单、歌单详情接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetPlaylistDetail?: Canceler
}

const cancelGetPlaylistDetail: IC = {}

function getPlaylistDetail(id: number | string) {
  return request({
    url: '/playlist/detail',
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetPlaylistDetail.cancelGetPlaylistDetail = cancel
    })
  })
}

export default getPlaylistDetail
export { cancelGetPlaylistDetail }
