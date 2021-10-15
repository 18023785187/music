/**
 *  mv相关请求
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
    cancelGetMvDetail?: Canceler,
    cancelGetMvUrl?: Canceler,
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
function getMvUrl(id: number | string) {
    return request({
        url: `/mv/url`,
        ...queryStringConfig({
            id
        }),
        cancelToken: new axios.CancelToken(function (cancel) {
            //cancel参数是一个函数，调用该函数取消请求
            cancelMv.cancelGetMvUrl = cancel
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
    related,
    cancelMv
}
