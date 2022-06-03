/**
 * 网易邮箱登录请求接口
 */
import request from '../request'
import queryStringConfig from '../query-string-config'
import { timestamp } from 'utils'

/**
 * 网易邮箱登录
 */
function emailLogin(email: string, password: string) {
  return request({
    url: `/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      timestamp: timestamp(),
      email,
      password
    })
  })
}

export {
  emailLogin
}
