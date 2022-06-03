/**
 * 首页右侧导航栏
 */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/index.module.less'

interface IProps {
  name: string,
  path?: string
}

function Navbar(props: IProps) {
  const { name, path } = props

  return (
    <h3 className={styles['navbar']}>
      <span>{name}</span>
      {path && <Link className='hover' to={path}>查看全部 &gt;</Link>}
    </h3>
  )
}

export default Navbar
