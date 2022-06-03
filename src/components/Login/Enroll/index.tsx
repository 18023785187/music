/**
 * 注册组件
 */
import React, { useCallback, useContext } from 'react'
import Footer from '../Footer'
import Context from '../Context'
import { STATUS, ISetStateProps } from '../typing'

function Enroll() {

  const { setStateCallback, showComponent } = useContext(Context) as ISetStateProps

  const mainClick = useCallback(() => { setStateCallback(STATUS.MAIN) }, [setStateCallback])

  return (
    <div className='enroll' style={showComponent(STATUS.ENROLL)}>
      <div className='input-box'>
        <div className='u-err' style={{ textAlign: 'center', fontSize: '14px' }}>
          <i className='u-icn u-icn25'></i>
          <span>抱歉！暂不开发注册组件，敬请期待！</span>
        </div>
      </div>
      <Footer>
        <span className='footer-left pointer' onClick={mainClick}>&lt;&nbsp;&nbsp;返回登录</span>
      </Footer>
    </div>
  )
}

export default Enroll
