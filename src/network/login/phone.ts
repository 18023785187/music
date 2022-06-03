/**
 * 手机验证码登录请求接口
 */
import request from '../request'
import queryStringConfig from '../query-string-config'
import { timestamp } from 'utils'

/**
 * 获取国家区号列表
 */
function getCountriesCodeList() {
  return request({
    url: `/countries/code/list`,
    ...queryStringConfig({
      timestamp: timestamp()
    })
  })
}

/**
 * 发送验证码
 */
function captchaSent(phone: number | string, ctcode: number | string = 86) {
  return request({
    url: `/captcha/sent`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      timestamp: timestamp(),
      phone,
      ctcode
    })
  })
}

/**
 * 验证验证码
 */
function captchaVerify(
  phone: number | string,
  captcha: number | string,
  ctcode: number | string = 86
) {
  return request({
    url: `/captcha/verify`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      timestamp: timestamp(),
      phone,
      captcha,
      ctcode
    })
  })
}

/**
 * 登录，第一个参数为true为密码登录，第三个参数填密码，否则是验证码登录，第三个参数填验证码
 */
function cellphone(
  isPassword: boolean,
  phone: number | string,
  word: number | string,
  ctcode: number | string = 86
) {
  return request({
    url: `/login/cellphone`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...queryStringConfig({
      timestamp: timestamp(),
      phone,
      [isPassword ? 'password' : 'captcha']: word,
      ctcode
    })
  })
}

export {
  getCountriesCodeList,
  captchaSent,
  captchaVerify,
  cellphone
}
