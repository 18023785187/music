/**
 * 获取某类歌单
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetPlaylist?: Canceler
}

const cancelGetPlaylist: IC = {}

/**
 * 
 *  cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
    limit: 取出歌单数量 , 默认为 35
    offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */

// 总数信息也在这个请求
function getPlaylist(cat: string = '全部', offset: number | string = 0) {
  return request({
    url: `/top/playlist`,
    ...queryStringConfig({
      cat,
      offset: 35 * (typeof offset === 'number' ? offset : parseInt(offset)),
      limit: 35,
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetPlaylist.cancelGetPlaylist = cancel
    })
  })
}

export default getPlaylist
export { cancelGetPlaylist }
