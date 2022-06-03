/**
 * 配置axios的 params,paramsSerializer
 * @param {params}params
 * @returns {qSConfig}
 */
import { urlSearchParams } from 'utils'
import { params, qSConfig } from './typing'

function queryStringConfig(
  params: params
): qSConfig {
  return {
    params,
    paramsSerializer: function (params) {
      return urlSearchParams(params)
    }
  }
}

export default queryStringConfig
