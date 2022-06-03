/**
 * 搜索相关接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelSearch?: Canceler,
  cancelSearchSuggest?: Canceler
}

const cancelSearch: IC = {}

/**
 * 搜索
 * type: 
 *  搜索类型；默认为 1 即单曲 ,
 *  取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * 
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */

function filter(type: number | string): number {
  switch (Number(type)) {
    case 1:
      return 30
    case 100:
      return 90
    case 10:
      return 75
    case 1014:
      return 20
    case 1006:
      return 30
    case 1000:
      return 30
    case 1009:
      return 30
    case 1002:
      return 30
    default:
      return 30
  }
}

function search(keywords: string, type: number | string, offset: number | string) {
  return request({
    url: `/search`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      keywords,
      type,
      limit: filter(type),
      offset: filter(type) * (typeof offset === 'number' ? offset : parseInt(offset))
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelSearch.cancelSearch = cancel
    })
  })
}

/**
 * 搜索建议，在输入栏中使用
 * type=mobile, 返回移动端的数据
 */
function searchSuggest(keywords: string, type: string = '') {
  return request({
    url: `/search/suggest`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      keywords,
      type
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelSearch.cancelSearchSuggest = cancel
    })
  })
}

export {
  filter,
  search,
  searchSuggest,
  cancelSearch
}
