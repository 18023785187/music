/**
 * 检查字符串是否为全数字
 */

function checkNum(str: string): boolean {
  return /^[0-9]+$/.test(str)
}

export default checkNum
