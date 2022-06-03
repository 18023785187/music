/**
 * 视频和mv的关于组件
 */
import React from 'react'
import { downLoad } from './constant'
import styles from './styles/index.module.less'

function MvAbout() {


  return (
    <div className={styles['mv-about']}>
      {/* 下载 */}
      <div className='m-multi'>
        <h3 className='u-hd3'>
          <span>网易云音乐多端下载</span>
        </h3>
        <div className='bg sprite'>
          {
            downLoad.map(item => {
              const { link, className, name } = item

              return (
                <li key={link}>
                  <a href={link} className={`${className} sprite`} target="_blank" rel="noreferrer">{name}</a>
                </li>
              )
            })
          }
        </div>
        <p className="s-fc4">同步歌单，随时畅听320k好音乐</p>
      </div>

      <div className='m-pubcode'>
        <h3 className="u-hd3">
          <span>网易云音乐公众号</span>
        </h3>
        <div className='flex'>
          <span className='code sprite'></span>
          <p className="tip s-fc4">关注我，我们才能<br />真正拥有彼此啊~</p>
        </div>
      </div>
    </div>
  )
}

export default MvAbout
