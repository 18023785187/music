/**
 * 配置axios
 * @param {AxiosRequestConfig}config
 * @returns {AxiosPromise<any>}
 */
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import { BASE_URL, TIMEOUT } from './constant'

function request(config: AxiosRequestConfig): AxiosPromise<any> {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
  })

  // 请求拦截
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config
    },
    (error: any) => {
      console.log(error)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      return response.data
    },
    (error: any) => {

    }
  )

  return instance(config)
}

export default request
