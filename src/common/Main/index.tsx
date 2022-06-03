/**
 * 主体内容包裹组件
 */
import React, { memo } from 'react'
import styles from './styles/index.module.less'

interface IProps {
  children: [JSX.Element, JSX.Element]
}

function Main(props: IProps) {
  const { children } = props

  return (
    <main className={`w ${styles.main}`}>
      <div className='left'>{children[0]}</div>
      <div className='right'>{children[1]}</div>
    </main>
  )
}

export default memo(Main)
