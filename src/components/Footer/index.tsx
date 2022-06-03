/**
 * 底部
 */
import React, { Fragment } from 'react'
import { protocol, enter } from './constant'
import styles from './styles/index.module.less'

function Footer() {

  return (
    <footer className={styles.footer}>
      <div className='w'>
        <div className='footer-content'>
          {/* 左 */}
          <div className='copy'>
            <p className='link'>
              {
                protocol.map((item, index) => {
                  const { name, link } = item
                  if (index === protocol.length - 1) {
                    return (
                      <a key={name} className='hover' href={link} target="_blank" rel="noreferrer">{name}</a>
                    )
                  } else {
                    return (
                      <Fragment key={name}>
                        <a className='hover' href={link} target="_blank" rel="noreferrer">{name}</a>
                        <span className='line'>|</span>
                      </Fragment>
                    )
                  }
                })
              }
            </p>
            <p>
              <span className='m-right'>网易公司版权所有©1997-2021</span>
              <span>杭州乐读科技有限公司运营：</span>
              <a className='hover' href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" rel="noreferrer">浙网文[2021] 1186-054号</a>
            </p>
            <p className="contact">
              <span className="m-right">违法和不良信息举报电话：0571-89853516</span>
              <span>举报邮箱：</span>
              <a className="hover" href="mailto:ncm5990@163.com">ncm5990@163.com</a>
            </p>
            <p className='police'>
              <a className='hover' href="https://beian.miit.gov.cn/#/Integrated/index" rel="noopener noreferrer" target="_blank">粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站</a>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" rel="noopener noreferrer" target="_blank">
                <span className="police-logo police-img"></span>
                <span className="police-text hover">浙公网安备 33010902002564号</span>
              </a>
            </p>
          </div>
          {/* 右 */}
          <ul className='enter'>
            {
              enter.map((item, index) => {
                const { name, link, imgPos, fontPos } = item
                return (
                  <li className='unit' key={link}>
                    <a className='foot-img' href={link} style={{ backgroundPosition: imgPos }} target="_blank" rel="noreferrer">{name}</a>
                    <span className={`foot-font ${index === 0 ? 'amped' : ''}`} style={{ backgroundPosition: fontPos }}></span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
