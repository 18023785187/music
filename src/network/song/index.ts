/**
 * 歌相关接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'

interface IC {
  cancelGetSongDetail?: Canceler,
  cancelGetSongUrl?: Canceler,
  cancelGetCheckMusic?: Canceler,
  cancelGetLyric?: Canceler,
  cancelGetSimiSong?: Canceler
}

const cancelGetSong: IC = {}

/**
 * 获取歌曲详情
 */
function getSongDetail(ids: number | string) {
  return request({
    url: `/song/detail`,
    ...queryStringConfig({
      ids
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetSong.cancelGetSongDetail = cancel
    })
  })
}

/**
 * 获取音乐url
 */
function getSongUrl(id: number | string) {
  return request({
    url: `/song/url`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetSong.cancelGetSongUrl = cancel
    })
  })
}

/**
 * 音乐是否可用
 */
function getCheckMusic(id: number | string) {
  return request({
    url: `/check/music`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetSong.cancelGetCheckMusic = cancel
    })
  })
}

/**
 * 获取歌词
 */
function getLyric(id: number | string) {
  return request({
    url: `/lyric`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetSong.cancelGetLyric = cancel
    })
  })
}

/**
 * 获取相似歌曲
 */
function getSimiSong(id: number | string) {
  return request({
    url: `/simi/song`,
    ...queryStringConfig({
      id
    }),
    cancelToken: new axios.CancelToken(function (cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelGetSong.cancelGetSimiSong = cancel
    })
  })
}

export {
  getSongDetail,
  getSongUrl,
  getCheckMusic,
  getLyric,
  getSimiSong,
  cancelGetSong
}
