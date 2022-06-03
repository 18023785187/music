/**
 * 找不到页面组件
 */
import React from 'react'
import styles from './styles/index.module.less'

function NotFound() {
  return (
    <div className={`${styles['not-found']} w`}>
      <div className='f-content'>
        <div className='f-404'>
          <i className='icon'></i>
          <p className="note">很抱歉，你要查找的网页找不到</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
