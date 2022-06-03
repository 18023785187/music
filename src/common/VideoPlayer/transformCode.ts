/**
 * 转义分辨率
 */

function transformCode(code: number): string {
  switch (code) {
    case 1080:
      return '1080P'
    case 720:
      return '超 清'
    case 480:
      return '高 清'
    case 240:
      return '标 清'
    default:
      return '1080P'
  }
}

export default transformCode
