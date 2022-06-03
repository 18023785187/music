/**
 *  mv相关请求
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetMvDetail?: Canceler,
  cancelGetMvUrl?: Canceler,
  cancelGetVideoDetail?: Canceler,
  cancelGetVideoUrl?: Canceler,
  cancelRelated?: Canceler
}

const cancelMv: IC = {}

/**
 * 
 * 获取mv详情
 */
function getMvDetail(mvid: number | string) {
  return request({
    url: `/mv/detail`,
    ...queryStringConfig({
      mvid
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelMv.cancelGetMvDetail = cancel
    })
  })
}

/**
 * 获取mv的url
 */
function getMvUrl(id: number | string, r: number = 1080) {
  return request({
    url: `/mv/url`,
    ...queryStringConfig({
      id,
      r
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelMv.cancelGetMvUrl = cancel
    })
  })
}

/**
 * 获取视频详情
 */
function getVideoDetail(id: number | string) {
  return request({
    url: `/video/detail`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelMv.cancelGetVideoDetail = cancel
    })
  })
}

/**
 * 获取视频地址
 */
function getVideoUrl(id: number | string) {
  return request({
    url: `/video/url`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelMv.cancelGetVideoUrl = cancel
    })
  })
}

/**
 * 获取推荐视频或MV
 */
function related(id: number | string) {
  return request({
    url: `/related/allvideo`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelMv.cancelRelated = cancel
    })
  })
}

export {
  getMvDetail,
  getMvUrl,
  getVideoDetail,
  getVideoUrl,
  related,
  cancelMv
}
