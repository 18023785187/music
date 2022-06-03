/**
 * 类型声明
 */
type params = {
  [propName: string]: any
}

type paramsSerializer = (params: params) => string

type qSConfig = {
  params: params,
  paramsSerializer: paramsSerializer
}

export type {
  params,
  paramsSerializer,
  qSConfig
}