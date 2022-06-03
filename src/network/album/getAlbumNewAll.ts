/**
 * 获取所有新碟
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetAlbumNewAll?: Canceler
}

const cancelGetAlbumNewAll: IC = {}

/**
    area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
    offset : 偏移量
 */
function getAlbumNewAll(area: string, offset: number | string = 0) {
  return request({
    url: `/album/new`,
    ...queryStringConfig({
      limit: 35,
      area,
      offset: 35 * (typeof offset === 'number' ? offset : parseInt(offset))
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetAlbumNewAll.cancelGetAlbumNewAll = cancel
    })
  })
}

export default getAlbumNewAll
export { cancelGetAlbumNewAll }
