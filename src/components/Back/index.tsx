/**
 * 返回顶部
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styles from './styles/index.module.less'

function Back() {
  // 用于控制组件显示
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    // 监听窗口滚动
    document.addEventListener('scroll', scrollTo)

    function scrollTo() {
      if (window.pageYOffset === 0) {
        setShow(false)
      } else {
        setShow(true)
      }
    }

    return () => {
      document.removeEventListener('scroll', scrollTo)
    }
  }, [])

  const display = useMemo(() => ({
    display: show ? 'block' : 'none'
  }), [show])

  const TopClick = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={`${styles.back} sprite pointer`} style={display} title='回到顶部' onClick={TopClick}>回到顶部</div>
  )
}

export default Back
