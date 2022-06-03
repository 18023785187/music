/**
 * 将特殊的符号转义为URL编码
 */
type typeKeys = ['&']
const map = {
  '&': '%26'
}
const keys: typeKeys = Object.keys(map) as typeKeys

function escapeSymbol(queryString: string) {
  keys.forEach(key => {
    queryString = queryString.replace(new RegExp(`\\${key}`, 'g'), map[key])
  })
  return queryString
}

export default escapeSymbol
