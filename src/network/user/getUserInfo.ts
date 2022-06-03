/**
 * 获取用户信息集合
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'
import { timestamp } from 'utils'

interface IC {
  cancelGetUserDetail?: Canceler,
  cancelGetUserStatus?: Canceler,
  cancelGetUserAccount?: Canceler,
  cancelGetUserSubcount?: Canceler,
  cancelGetUserLevel?: Canceler,
  cancelGetUserBinding?: Canceler,
  cancelGetUserVip?: Canceler,
  cancelDailySignin?: Canceler
}

const cancelUser: IC = {}

/**
 * 获取用户详情，登录后调用
 */
function getUserDetail(uid: number) {
  return request({
    url: `/user/detail`,
    ...queryStringConfig({
      uid
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserDetail = _cancel
    })
  })
}

/**
 * 获取登录状态
 */
function getUserStatus() {
  return request({
    url: `/login/status`,
    ...queryStringConfig({
      timestamp: timestamp()
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserStatus = _cancel
    })
  })
}

/**
 * 获取账号信息
 */
function getUserAccount() {
  return request({
    url: `/user/account`,
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserAccount = _cancel
    })
  })
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
function getUserSubcount() {
  return request({
    url: `/user/subcount`,
    ...queryStringConfig({
      timestamp: timestamp()
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserSubcount = _cancel
    })
  })
}

/**
 * 获取用户等级
 */
function getUserLevel() {
  return request({
    url: `/user/level`,
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserLevel = _cancel
    })
  })
}

/**
 * 获取用户绑定信息
 */
function getUserBinding(uid: number) {
  return request({
    url: `/user/binding`,
    ...queryStringConfig({
      uid
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserBinding = _cancel
    })
  })
}

/**
 * 获取vip信息
 */
function getUserVip() {
  return request({
    url: `/vip/info`,
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelGetUserVip = _cancel
    })
  })
}

// 用户签到 ,type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
function dailySignin(type: number = 1) {
  return request({
    url: `/daily_signin`,
    ...queryStringConfig({
      timestamp: timestamp(),
      type
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancelUser.cancelDailySignin = _cancel
    })
  })
}

export {
  getUserDetail,
  getUserStatus,
  getUserAccount,
  getUserSubcount,
  getUserLevel,
  getUserBinding,
  getUserVip,
  dailySignin,
  cancelUser
}
