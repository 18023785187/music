/**
 * 提示框组件
 */
import React, { useState, useEffect, useMemo, memo } from 'react'
import PubSub, { PUBSUB, toastData } from '@/utils/PubSub'
import styles from './styles/index.module.less'

let timer: number
let timeout: number

function Toast() {
  // 数据
  const [txt, setTxt] = useState<string | number | boolean | null | undefined>(null)
  // 是否显示弹窗
  const [show, setShow] = useState<boolean>(false)

  // 订阅PUBSUB.TOAST_SHOW事件，用于显示提示框
  useEffect(() => {
    const token = PubSub.subscribe(PUBSUB.TOAST_SHOW, (_: PUBSUB.TOAST_SHOW, data: toastData) => {
      let { txt: curTxt, timeout: curTimeout } = data

      setTxt(curTxt)
      setShow(true)
      if (curTimeout == null) {
        curTimeout = 2000
      }
      timeout = curTimeout
    })

    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  useEffect(() => {
    if (show) {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setShow(false)
      }, timeout)
    }
  }, [show, txt])

  const showStyle = useMemo(() => ({
    display: show ? 'block' : 'none'
  }), [show])

  return (
    <div className={styles.toast} style={showStyle}>
      <div className='toast-box'>
        {txt}
      </div>
    </div>
  )
}

export default memo(Toast)
