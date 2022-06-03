// 登录窗口
import React, { useState, useCallback, memo } from 'react'
import Shade from 'common/Shade'
import MainLogin from './MainLogin'
import QRLogin from './QRLogin'
import EmailLogin from './EmailLogin'
import Phone from './Phone'
import Enroll from './Enroll'
import Context from './Context'
import { STATUS } from './typing'
import PubSub, { PUBSUB, CLOSE } from '@/utils/PubSub'
import styles from './styles/index.module.less'

function Login() {
  const [stateCode, setState] = useState(STATUS.QR)

  // 依据状态切换界面，函数传给子组件使用
  const setStateCallback = useCallback((state: STATUS) => {
    if (state === STATUS.MAIN) {
      if (!window.navigator.onLine) {
        PubSub.publish(PUBSUB.LOGIN_TOAST_SHOW, {
          showWran: 'err',
          txt: '操作失败，请稍后再试'
        })
      }
    }
    setState(state)
  }, [])
  // 组件显示依据函数
  const showComponent = useCallback((s: STATUS) => {
    return {
      display: stateCode === s ? 'block' : 'none'
    }
  }, [stateCode])

  const titleName: () => string = useCallback(() => {
    switch (stateCode) {
      case STATUS.QR:
      case STATUS.MAIN:
        return '登录'
      case STATUS.EMAIL:
        return '邮箱登录'
      case STATUS.PHONE:
        return '手机号登录'
      case STATUS.ENROLL:
        return '手机号注册'
      default:
        return '登录'
    }
  }, [stateCode])

  return (
    <div className={styles['login']}>
      <Shade title={titleName()} closeType={CLOSE.LOGIN}>
        <Context.Provider value={{ setStateCallback, showComponent }}>
          <MainLogin />
          <QRLogin stateCode={stateCode} />
          <EmailLogin />
          <Phone />
          <Enroll />
        </Context.Provider >
      </Shade>
    </div>
  )
}

export default memo(Login)
