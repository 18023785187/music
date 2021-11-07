/**
 * 歌手相关接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
    cancelGetArtistDetail?: Canceler,
    cancelGetSimiArtist?: Canceler
}

const cancelArtist: IC = {}

/**
 * 获取歌手详情
 */
function getArtistDetail(id: string | number) {
    return request({
        url: '/artist/detail',
        ...queryStringConfig({
            id
        }),
        cancelToken: new axios.CancelToken(function (_cancel) {
            //cancel参数是一个函数，调用该函数取消请求
            cancelArtist.cancelGetArtistDetail = _cancel
        })
    })
}

/**
 * 相似歌手
 */
function getSimiArtist(id: string | number) {
    return request({
        url: '/simi/artist',
        ...queryStringConfig({
            id
        }),
        cancelToken: new axios.CancelToken(function (_cancel) {
            //cancel参数是一个函数，调用该函数取消请求
            cancelArtist.cancelGetSimiArtist = _cancel
        })
    })
}

export {
    getArtistDetail,
    getSimiArtist,
    cancelArtist
}