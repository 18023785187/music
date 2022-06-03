/**
 * 获取歌手列表，在首页右侧和歌手的页面中使用到
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

/**

    limit: 返回数量，默认100不用改，首页的是5

    type:
        -1:全部
        1:男歌手
        2:女歌手
        3:乐队
    
    area:
        -1:全部
        7华语
        96欧美
        8:日本
        16韩国
        0:其他

    initial: 返回以英文或拼音首字母开头的数据，热门为 -1，其他为 0

 */
interface IC {
  cancelGetArtistList?: Canceler
}

const cancel: IC = {}

function getArtistList(
  limit: number = 100,
  type: number = -1,
  area: number = -1,
  initial: string | number = -1
) {
  return request({
    url: '/artist/list',
    ...queryStringConfig({
      limit,
      type,
      area,
      initial
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancel.cancelGetArtistList = _cancel
    })
  })
}

export default getArtistList
export { cancel }