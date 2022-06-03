/**
 * 将对象转化为查询参数（queryString）
 * @param {{ [propName: string]: any }}data 
 * @returns {string}
 */

function urlSearchParams(data: { [propName: string]: any }): string {
  const urlSearchParams = new window.URLSearchParams()
  for (const key in data) {
    urlSearchParams.append(key, data[key])
  }
  return urlSearchParams.toString()
}

export default urlSearchParams
