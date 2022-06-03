/**
 * 评论接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetComment?: Canceler
}

const cancelGetComment: IC = {}

/**
 * 热门评论
    必选参数 :
        id : 资源 id, 如歌曲 id,mv id
        type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
            0: 歌曲
            1: mv
            2: 歌单
            3: 专辑
            4: 电台
            5: 视频
            6: 动态
    可选参数 :
        pageNo:分页参数,第N页,默认为1
        pageSize:分页参数,每页多少条数据,默认20
        sortType: 排序方式,1:按推荐排序,2:按热度排序,3:按时间排序
        cursor: 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
 */
function getComment(
  id: string | number,
  type: string | number = 2,
  sortType: string | number = 2,
  pageNo: string | number = 1,
  pageSize: string | number = 15,
  cursor?: string | number
) {
  return request({
    url: `/comment/new`,
    ...queryStringConfig({
      id,
      type,
      sortType,
      pageNo,
      pageSize,
      cursor: cursor ? cursor : 0
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetComment.cancelGetComment = cancel
    })
  })
}

export default getComment
export { cancelGetComment }