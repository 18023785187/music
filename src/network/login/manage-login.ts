/**
 * 登录管理相关请求接口
 */
import axios, { Canceler } from 'axios'
import request from '../request'
import queryStringConfig from '../query-string-config'
import { timestamp } from 'utils'

interface IC {
  cancelGetLoginStatus?: Canceler
}

const cancel: IC = {}

/**
 * 刷新登录
 */
function refreshLogin() {
  return request({
    url: `/login/refresh`,
    ...queryStringConfig({
      timestamp: timestamp()
    })
  })
}

/**
 * 退出登录
 */
function logout() {
  return request({
    url: `/logout`,
    ...queryStringConfig({
      timestamp: timestamp()
    })

  })
}

/**
 * 获取登录状态
 */
function getLoginStatus() {
  return request({
    url: `/login/status`,
    ...queryStringConfig({
      timestamp: timestamp()
    }),
    cancelToken: new axios.CancelToken(function (_cancel) {
      //cancel参数是一个函数，调用该函数取消请求
      cancel.cancelGetLoginStatus = _cancel
    })
  })
}

export {
  cancel,
  refreshLogin,
  logout,
  getLoginStatus
}
