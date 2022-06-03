/**
 * 首页发现
 */
import React, { Fragment } from 'react'
import Banner from './Banner'
import Main from 'common/Main'
//左
import Recommend from './Recommend'
import Album from './Album'
import Toplist from './Toplist'
//右
import MyInfo from './MyInfo'
import Singer from './Singer'
import Anchor from './Anchor'
import styles from './styles/index.module.less'

function Discover() {
  return (
    <main className={styles.discover}>
      <Banner />
      <Main>
        <Fragment>
          <Recommend />
          <Album />
          <Toplist />
        </Fragment>
        <Fragment>
          <MyInfo />
          <Singer />
          <Anchor />
        </Fragment>
      </Main>
    </main>
  )
}

export default Discover
