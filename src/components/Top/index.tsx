/**
 * 顶部导航栏
 */
import React, { useMemo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { NAVPATH } from './typings'
import Left from './Left'
import Right from './Right'
import BottomNav from './BottomNav'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps { }

function Top(props: IProps) {
  // 路由
  const { location } = props

  // 处理导航显示
  const navPathList: NAVPATH[] = useMemo(() => {
    return Object.values(NAVPATH).filter(path => path !== NAVPATH.ROOT && path !== NAVPATH.NULL)
  }, [])
  const showRootNav: boolean = useMemo(() => {
    return !navPathList.includes(location.pathname as NAVPATH)
  }, [location.pathname, navPathList])

  return (
    <nav className={styles.top}>
      <div className='top-box'>
        <div className='top-content'>
          {/* 左边 */}
          <Left showRootNav={showRootNav} location={location} />
          {/* 右边 */}
          <Right />
        </div>
      </div>
      {/* 底部导航栏 */}
      <BottomNav showRootNav={showRootNav} location={location} />
    </nav>
  )
}

export default withRouter(Top)
