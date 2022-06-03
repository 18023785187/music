/**
 * 推荐组件导航栏
 */
import React, { memo } from 'react'
import styles from './styles/index.module.less'

interface IProps {
  left?: JSX.Element,
  center?: JSX.Element,
  right?: JSX.Element
}

function Navbar(props: IProps) {
  const { left, center, right } = props

  return (
    <div className={`v-hd2 ${styles.navbar}`}>
      <div className='nav-left f-ff2'>{left}</div>
      <div className='nav-center'>{center}</div>
      <div className='nav-right'>{right}</div>
    </div>
  )
}

export default memo(Navbar)
