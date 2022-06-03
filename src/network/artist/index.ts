/**
 * 歌手相关接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetArtistDetail?: Canceler,
  cancelGetSimiArtist?: Canceler,
  cancelGetArtists?: Canceler,
  cancelGetArtistMv?: Canceler,
  cancelGetArtistAlbum?: Canceler,
  cancelGetArtistDesc?: Canceler
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

/**
 *  获取歌手单曲
 */
function getArtists(id: string | number) {
  return request({
    url: '/artists',
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelArtist.cancelGetArtists = _cancel
    })
  })
}

/**
 *  获取歌手mv
 */
function getArtistMv(id: string | number, offset: string | number) {
  return request({
    url: '/artist/mv',
    ...queryStringConfig({
      id,
      offset: 12 * (typeof offset === 'number' ? offset : parseInt(offset)),
      limit: 12,
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelArtist.cancelGetArtistMv = _cancel
    })
  })
}

/**
 *  获取歌手专辑
 */
function getArtistAlbum(id: string | number, offset: string | number) {
  return request({
    url: '/artist/album',
    ...queryStringConfig({
      id,
      offset: 12 * (typeof offset === 'number' ? offset : parseInt(offset)),
      limit: 12,
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelArtist.cancelGetArtistAlbum = _cancel
    })
  })
}

/**
 *  获取歌手描述
 */
function getArtistDesc(id: string | Number) {
  return request({
    url: '/artist/desc',
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelArtist.cancelGetArtistDesc = _cancel
    })
  })
}

export {
  getArtistDetail,
  getSimiArtist,
  getArtists,
  getArtistMv,
  getArtistAlbum,
  getArtistDesc,
  cancelArtist
}