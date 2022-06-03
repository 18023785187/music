import React, { useState, useContext, useRef, useEffect, useMemo, useCallback, memo, FormEvent } from "react";
import Footer from "../Footer";
import Context from '../Context'
import { emailLogin } from 'network/login/email'
import { STATUS, ERROR, ISetStateProps } from '../typing'

const emailSuffix = ['@163.com', '@126.com', '@yeah.net', '@vip.163.com', '@vip.126.com', '@188.com']

function EmailLogin() {
  const { setStateCallback, showComponent } = useContext(Context) as ISetStateProps;
  // 输入框值
  const [user, setUser] = useState({ account: '', password: '' })
  // 账号提示框指针
  const [pos, setPos] = useState<number>(0)
  // 是否显示账号提示框
  const [show, setShow] = useState<boolean>(false)
  // 确定报错框位置
  const [err, setErr] = useState<{ account: ERROR, password: ERROR }>({ account: ERROR.FALSE, password: ERROR.FALSE })
  // 报错信息
  const [errMassage, setErrMassage] = useState<string>('')
  // 登录按钮字样
  const [loginText, setLoginText] = useState<string>('登 录')
  // 输入框
  const accountInputRef = useRef<HTMLInputElement>(null)

  // 筛选出账号以'@'为界的后缀，用于过滤li标签
  const accountSuffix: string = useMemo(() => {
    const accountSuffixIdx: number = user.account.indexOf('@')
    return accountSuffixIdx === -1 ? '' : user.account.substring(accountSuffixIdx)
  }, [user.account])
  const filter: string[] = useMemo(() => {
    return emailSuffix.filter(item => item.indexOf(accountSuffix) === 0)
  }, [accountSuffix])

  useEffect(() => {
    if (!filter.length) setShow(false)
  }, [filter.length])

  // 切换界面
  const mainClick = useCallback(() => {
    setStateCallback(STATUS.MAIN)
  }, [setStateCallback])

  // 更新账号
  const accountChange = useCallback((e: FormEvent) => {
    if ((e.target as HTMLInputElement).value !== '' && filter.length) {
      setShow(true)
    } else {
      setShow(false)
    }
    setUser({
      account: (e.target as HTMLInputElement).value,
      password: user.password
    })
  }, [user.password, filter.length])
  // 更新密码
  const passwordChange = useCallback((e: FormEvent) => {
    setUser({
      account: user.account,
      password: (e.target as HTMLInputElement).value
    })
  }, [user.account])
  // 通过焦点启动li标签
  const accountFocus = useCallback(() => {
    setErrMassage('')
    setErr({ account: ERROR.FALSE, password: ERROR.FALSE })
    if (user.account !== '') {
      setPos(0)
      setShow(true)
    }
  }, [user.account])
  const passwordFocus = useCallback(() => {
    setErrMassage('')
    setErr({ account: ERROR.FALSE, password: ERROR.FALSE })
  }, [])
  // 通过失去焦点确认账号密码
  const accountBlur = useCallback(() => {
    if (user.account !== '') {
      let account: string

      if (filter.length) {
        account = user.account + filter[pos].substring(accountSuffix.length)
      } else {
        account = user.account
      }

      accountInputRef.current!.value = account
      setUser({
        account,
        password: user.password
      })
    }
    setShow(false)
  }, [user.account, user.password, filter, pos, accountSuffix.length])
  // 提交表单
  const loginClick = async () => {
    const { account, password } = user
    if (!account) {
      setErrMassage('请输入邮箱帐号')
      setErr({ account: ERROR.TRUE, password: ERROR.FALSE })
      return
    }
    if (!password) {
      setErrMassage('请输入登录密码')
      setErr({ account: ERROR.FALSE, password: ERROR.TRUE })
      return
    }
    setLoginText('登录中...')
    const res: any = await emailLogin(user.account, user.password)

    if (!res) {
      setLoginText('登 录')
      setErrMassage('抱歉！目前只支持@163.com的邮箱登录。服务器返回异常状态[0]!')
      return
    }
    if (res.code === 502) {
      setLoginText('登 录')
      setErrMassage(res.msg)
    } else {
      window.location.reload()
      window.scrollTo(0, 0)
    }
  }

  // li高亮样式
  const liOnMouseMove = useCallback((index: number) => {
    setPos(index)
  }, [])

  return (
    <div className='email' style={showComponent(STATUS.EMAIL)}>
      <div className='input-box'>
        <div className='input-account'>
          <input
            className={`input ${err.account === ERROR.TRUE && 'input-err-b'}`}
            ref={accountInputRef}
            onFocus={accountFocus}
            onChange={accountChange}
            onBlur={accountBlur}
            value={user.account}
            type="text" name="e" id="e" placeholder="请输入帐号" autoComplete="off" />
          <ul style={{ visibility: show ? 'visible' : 'hidden' }}>
            {
              filter.map((item, index) => {

                return (
                  <li
                    key={item}
                    className={`pointer ${index === pos && 'high'}`}
                    onMouseMove={() => { liOnMouseMove(index) }}
                  >{user.account + item.substring(accountSuffix.length)}</li>
                )
              })
            }
          </ul>
        </div>
        <div className="f-mgt10 f-mgb15">
          <input
            className={`input ${err.password === ERROR.TRUE && 'input-err-b'}`}
            onFocus={passwordFocus}
            onChange={passwordChange}
            onKeyDown={(e) => { if (e.key === 'Enter') loginClick() }}
            value={user.password}
            type="password" name="epw" id="epw" placeholder="请输入密码" autoComplete="new-password" />
        </div>
        <div className="u-err" style={{ display: errMassage ? 'block' : 'none' }}>
          <i className="u-icn u-icn25"></i>
          <span>{errMassage}</span>
        </div>
        <div className="f-mgt10 settings">
          <label className='s-fc3'>
            <input className='check-box' type="checkbox" defaultChecked />自动登录
          </label>
          <a className='s-fc3 hover' href="https://id.163.com/mail/retrievepassword#/verifyAccount" target="_blank" rel="noreferrer">忘记密码？</a>
        </div>
        <div className="f-mgt20">
          <div className='login-btn-style login-btn1 btn-img pointer'>
            <span className='login-btn2 btn-img' onClick={loginClick}>{loginText}</span>
          </div>
        </div>
      </div>
      <Footer>
        <span className='footer-left pointer' onClick={mainClick}>&lt;&nbsp;&nbsp;返回登录</span>
      </Footer>
    </div>
  )
}

export default memo(EmailLogin)
