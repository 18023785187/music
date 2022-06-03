/**
 * 未登录状态
 */
import React, { useCallback } from 'react'
import PubSub, { CLOSE } from '@/utils/PubSub'

function Login() {
  // 显示登录弹窗
  const showLoginClick = useCallback(() => {
    PubSub.publish(CLOSE.LOGIN, false)
  }, [])

  return <span className='login pointer hover' onClick={showLoginClick}>登录</span>
}

export default Login
