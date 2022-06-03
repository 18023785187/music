/**
 * 
 */

// 等待和成功状态
enum AWAIT {
  PENDING,
  FULLFILLED
}

// 5个状态，对应主界面、二维码登录、(手机验证码登录、手机密码登录)、网易邮箱登录、注册
enum STATUS {
  MAIN = 'main',
  QR = 'qr',
  PHONE = 'phone',
  EMAIL = 'email',
  ENROLL = 'enroll'
}

// input错误
enum ERROR {
  TRUE = 'input-err',
  FALSE = ''
}

interface ISetStateProps {
  setStateCallback: (state: STATUS) => void
  showComponent: (state: STATUS) => { display: string }
}

export {
  AWAIT,
  STATUS,
  ERROR
}

export type {
  ISetStateProps
}
