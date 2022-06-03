// 登录窗口入口
import React, { useState, useEffect, Fragment } from 'react'
import Login from './Login'
import PubSub, { CLOSE, loginWindowClose } from '@/utils/PubSub'

function Temp() {
  // 关闭窗体用
  const [close, setClose] = useState<boolean>(true)

  useEffect(() => {
    // 暴露订阅器用于弹出登录窗体
    const token = PubSub.subscribe(CLOSE.LOGIN, (_: CLOSE.LOGIN, close: loginWindowClose) => {
      setClose(close)
    })

    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <>
      {
        !close ? <Login /> : <Fragment></Fragment>
      }
    </>
  )
}

export default Temp
