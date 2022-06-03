/**
 * pubsub-js
 */
import PubSub from 'pubsub-js'

enum PUBSUB {
  TOAST_SHOW = 'toast_show', // 提示框
  LOGIN_TOAST_SHOW = 'login_toast_show', // 登录界面提示框
  PLAYER_SHOW = 'player_show' // 音乐播放器显示
}

enum CLOSE {
  LOGIN = 'login'
}

// 提示框
type toastData = {
  txt: string | number | boolean | null | undefined,
  timeout?: number
}
// 登录界面提示框
type loginToastData = {
  txt: string | number | boolean | null | undefined,
  showWarn: 'ok' | 'err'
}
// 登录窗体
type loginWindowClose = boolean

export default PubSub
export {
  PUBSUB,
  CLOSE
}
export type {
  toastData,
  loginToastData,
  loginWindowClose
}
