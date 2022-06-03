/**
 * 选择登录界面
 */
import React, { useState, useContext, MouseEvent, useCallback } from 'react'
import Context from '../Context'
import { STATUS, ISetStateProps } from '../typing'
import PubSub, { PUBSUB } from '@/utils/PubSub'

function MainLogin() {
  const { setStateCallback, showComponent } = useContext(Context) as ISetStateProps;
  // 锁界面
  const [checked, setChecked] = useState<boolean>(false)

  // 以checked变量作参考的节流阀函数
  const flagChecked = useCallback(function (state: STATUS) {
    if (!checked) {
      PubSub.publish(
        PUBSUB.TOAST_SHOW,
        { txt: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》' }
      )
      return
    }
    setStateCallback(state)
  }, [checked, setStateCallback])

  // 切换界面
  const qrClick = useCallback(() => {
    flagChecked(STATUS.QR)
  }, [flagChecked])
  const verifyClick = useCallback(() => {
    flagChecked(STATUS.PHONE)
  }, [flagChecked])
  const enrollClick = useCallback(() => {
    flagChecked(STATUS.ENROLL)
  }, [flagChecked])
  const emailClick = useCallback(() => {
    flagChecked(STATUS.EMAIL)
  }, [flagChecked])
  const preventDefaultClick = (e: MouseEvent) => {
    if (!checked) {
      PubSub.publish(
        PUBSUB.TOAST_SHOW,
        { txt: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》' }
      )
      e.preventDefault()
    }
  }
  //选择框
  const checkedClick = useCallback(() => {
    setChecked(!checked)
  }, [checked])

  // 内联样式
  const labelStyle: React.CSSProperties = { marginLeft: '2px' }
  const protocolStyle: React.CSSProperties = { color: '#507DAF' }

  return (
    <div className='login-main' style={showComponent(STATUS.MAIN)}>
      <div className='login-log'>
        <div className='login-left'>
          <div className='login-platform'></div>
          <div className='login-btn1 btn pointer btn-img'>
            <span className='login-btn2 btn-img' onClick={verifyClick}>手机号登录</span>
          </div>
          <div className='login-enroll btn pointer btn-img'>
            <span className='btn-enroll btn-img' onClick={enrollClick}>注　册</span>
          </div>
        </div>
        <div className='login-right'>
          <ul>
            <li>
              <a
                onClick={preventDefaultClick}
                className='hover'
                href="https://music.163.com/api/sns/authorize?snsType=10&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                target="_blank"
                rel="noreferrer"
              >
                <i className="u-wx"></i>微信登录
              </a>
            </li>
            <li>
              <a
                onClick={preventDefaultClick}
                className='hover'
                href="https://music.163.com/api/sns/authorize?snsType=5&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                target="_blank"
                rel="noreferrer"
              >
                <i className="u-qq"></i>QQ登录
              </a>
            </li>
            <li>
              <a
                onClick={preventDefaultClick}
                className='hover'
                href="https://music.163.com/api/sns/authorize?snsType=2&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                target="_blank"
                rel="noreferrer"
              ><i className="u-sn"></i>微博登录
              </a>
            </li>
            <li>
              <span
                className='hover pointer' onClick={emailClick}>
                <i className="u-wy"></i>
                网易邮箱帐号登录
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className='login-official-protocol'>
        <input type="checkbox" id="j-official-terms" onClick={checkedClick} onChange={() => { }} checked={checked} />
        <label htmlFor="j-official-terms" style={labelStyle}>同意</label>
        <a className='hover' style={protocolStyle} href="http://st.music.163.com/official-terms/service" target="_blank" rel="noreferrer">《服务条款》</a>
        <a className='hover' style={protocolStyle} href="http://st.music.163.com/official-terms/privacy" target="_blank" rel="noreferrer">《隐私政策》</a>
        <a className='hover' style={protocolStyle} href="https://st.music.163.com/official-terms/children" target="_blank" rel="noreferrer">《儿童隐私政策》</a>
      </div>
      <div className='login-scan pointer' onClick={qrClick}></div>
    </div>
  )
}

export default MainLogin
