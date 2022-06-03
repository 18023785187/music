/**
 * 获取专辑详情
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetAlbum?: Canceler
}

const cancelGetAlbum: IC = {}

function getAlbum(id: number | string) {
  return request({
    url: `/album`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetAlbum.cancelGetAlbum = cancel
    })
  })
}

export default getAlbum
export { cancelGetAlbum }
