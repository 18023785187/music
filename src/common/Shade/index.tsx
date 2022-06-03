/**
 * 弹窗容器
 */
// 登录窗口
import React, { useRef, useEffect, useCallback, memo } from 'react'
import Title from './Title'
import Toast from './Toast'
import PubSub, { CLOSE } from '@/utils/PubSub'
import styles from './styles/index.module.less'

interface IProps {
  title: string,
  children: JSX.Element,
  closeType: CLOSE
}

function Shade(props: IProps) {
  const { title, children, closeType } = props
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    boxRef.current!.style.top = window.innerHeight / 2 - boxRef.current!.offsetHeight / 2 + 'px'
    boxRef.current!.style.left = window.innerWidth / 2 - boxRef.current!.offsetWidth / 2 + 'px'
    boxRef.current!.style.visibility = 'visible'
  }, [])

  //关闭窗体
  const closeClick = useCallback(() => {
    PubSub.publish(closeType, true)
  }, [closeType])

  return (
    <div className={styles['shade']}>
      <div className='shade-box' ref={boxRef} style={{ visibility: 'hidden' }}>
        <div className='shade-pos'>
          <Title target={boxRef} title={title} />
          <div className='shade-content'>
            {children}
          </div>
          <span className='shade-btn pointer' title='关闭窗体' onClick={closeClick}>×</span>
          <Toast />
        </div>
      </div>
    </div>
  )
}

export default memo(Shade)
