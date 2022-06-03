/**
 * 弹窗的弹出提示框
 */
import React, { useState, useEffect, memo } from 'react'
import PubSub, { PUBSUB, loginToastData } from '@/utils/PubSub'

let timer: number

function Toast() {
  // 数据
  const [state, setState] = useState<loginToastData>({ txt: '', showWarn: 'ok' })
  // 是否显示提示框
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    // 订阅弹窗事件
    PubSub.subscribe(PUBSUB.LOGIN_TOAST_SHOW, (_: PUBSUB.LOGIN_TOAST_SHOW, data: loginToastData) => {
      setState(data)
      setShow(true)
    })
  }, [])

  useEffect(() => {
    // 弹窗显示2s
    if (show) {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setShow(false)
      }, 2000)
    }
  }, [show, state])

  const showStyle = {
    display: show ? 'block' : 'none'
  }

  return (
    <div className='shade-toast' style={showStyle}>
      <i className={`u-icn ${state.showWarn === 'ok' ? 'u-icn31' : 'u-icn32'}`}></i>
      <span>{state.txt}</span>
    </div>
  )
}

export default memo(Toast)
