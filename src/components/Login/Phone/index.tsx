/**
 * 手机登录的公共组件
 */
import React, { useState, useContext, useEffect, useCallback, useMemo, MouseEvent, FormEvent } from 'react'
import Footer from '../Footer'
import Context from '../Context'
import { getCountriesCodeList, captchaSent, captchaVerify, cellphone } from 'network/login/phone'
import { STATUS, ISetStateProps } from '../typing'
import wLocalStorage, { COUNTRIES_CODE_LIST } from '@/utils/localStorage'
import PubSub, { PUBSUB } from '@/utils/PubSub'

const phoneExp: RegExp = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/
enum ERROR_STYLE {
  PHONE,
  PASSWORD,
  NULL
}

function Phone() {
  const { setStateCallback, showComponent } = useContext(Context) as ISetStateProps
  // 确认发送方式的状态
  const [state, setState] = useState<boolean>(true)
  // 国家区号列表
  const [codeList, setCodeList] = useState([])
  // 确定是否显示国家区号列表
  const [showList, setShowList] = useState<boolean>(false)
  // 当前区号
  const [code, setCode] = useState<string>('+86')
  // 输入框值
  const [user, setUser] = useState({ phone: '', verify: '', password: '' })
  // 报错信息
  const [errMsg, setErrMsg] = useState<string>('')
  // 登录按钮字样
  const [loginText, setLoginText] = useState<string>('登 录')
  // 报错框样式
  const [errStyle, setErrStyle] = useState<ERROR_STYLE>(ERROR_STYLE.NULL)

  const showEvent = useCallback(() => setShowList(false), [])

  useEffect(() => {
    document.addEventListener('click', showEvent)
    const list = wLocalStorage.getItem(COUNTRIES_CODE_LIST)
    if (list) {
      setCodeList(JSON.parse(list))
    } else {
      c()
    }

    // 获取国家区号列表
    async function c() {
      try {
        const res = (await getCountriesCodeList()).data
        wLocalStorage.setItem(COUNTRIES_CODE_LIST, JSON.stringify(res))
        setCodeList(res)
      } catch (e) {
        console.log(e)
      }
    }
    return () => {
      document.removeEventListener('click', showEvent)
    }
  }, [showEvent])

  // 切换界面
  const mainClick = useCallback(() => { setStateCallback(STATUS.MAIN) }, [setStateCallback])
  const enrollClick = useCallback(() => { setStateCallback(STATUS.ENROLL) }, [setStateCallback])
  const cutClick = useCallback(() => {
    setState(!state)
    setErrMsg('')
  }, [state])

  // 点击显示国家区号列表
  const showListClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    setShowList(!showList)
  }, [showList])
  // 点击切换国家区号
  const setCodeClick = useCallback((code: string) => {
    setShowList(false)
    setCode(code)
  }, [])

  // 发登录请求
  const loginClick = async () => {
    setErrStyle(ERROR_STYLE.NULL)
    setErrMsg('')
    const { phone, password, verify } = user
    const c = code.substring(1)
    if (!phone) {
      setErrMsg('请输入手机号')
      setErrStyle(ERROR_STYLE.PHONE)
    } else {
      // 验证手机号
      if (!phoneExp.test(phone)) {
        setErrMsg('请输入正确的手机号')
        setErrStyle(ERROR_STYLE.PHONE)
      } else if (state) {
        // 验证验证码
        if (!verify) {
          setErrMsg('请输入验证码')
          setErrStyle(ERROR_STYLE.PASSWORD)
          return
        }
        setLoginText('登录中...')
        const isOk = await captchaVerify(phone, verify, c)
        if (!isOk) {
          setLoginText('登 录')
          setErrMsg('验证码错误')
        } else {
          const res: any = await cellphone(false, phone, verify, c)
          console.log(res)
          if (res.code === 200) {
            window.location.reload()
            window.scrollTo(0, 0)
          } else {
            setLoginText('登 录')
          }
        }
      } else {
        // 验证密码
        if (!password) {
          setErrMsg('请输入密码')
          setErrStyle(ERROR_STYLE.PASSWORD)
          return
        }
        setLoginText('登录中...')
        const res: any = await cellphone(true, phone, password, c)
        try {
          if (res.code === 502) {
            setLoginText('登 录')
            setErrMsg(res.msg)
          } else {
            window.location.reload()
            window.scrollTo(0, 0)
          }
        } catch {
          setLoginText('登 录')
        }
        console.log(res)
      }
    }
  }
  // 发验证码
  const captchaSentClick = async () => {
    const { phone } = user
    if (phone && phoneExp.test(phone)) {
      const res: any = await captchaSent(user.phone, code.substring(1))
      console.log(res)
      if (!res) {
        setErrMsg('发送验证码间隔过短或网络错误')
        return
      } else if (res.code === 400) {
        setErrMsg(res.message)
        return
      }
      PubSub.publish(PUBSUB.LOGIN_TOAST_SHOW, {
        showWarn: 'ok',
        txt: '验证码已发送'
      })
    } else {
      setErrMsg('请输入正确的手机号')
      setErrStyle(ERROR_STYLE.PHONE)
    }
  }

  // 更新手机号
  const phoneChange = useCallback((e: FormEvent) => {
    const phone = (e.target as HTMLInputElement).value
    setUser({
      ...user,
      phone
    })
  }, [user])
  // 更新验证码
  const verifyChange = useCallback((e: FormEvent) => {
    const verify = (e.target as HTMLInputElement).value
    setUser({
      ...user,
      verify
    })
  }, [user])
  // 更新密码
  const passwordChange = useCallback((e: FormEvent) => {
    const password = (e.target as HTMLInputElement).value
    setUser({
      ...user,
      password
    })
  }, [user])

  // 清除错误样式
  const clearErrStyle = useCallback(() => { setErrStyle(ERROR_STYLE.NULL) }, [])

  const showListStyle: React.CSSProperties = useMemo(() => { return { display: showList ? 'block' : 'none' } }, [showList])

  // 验证码框组件
  const Verify = (
    <div className='verify'>
      <input value={user.verify} key='verify' onClick={clearErrStyle} onKeyDown={(e) => { if (e.key === 'Enter') loginClick() }} className={`${errStyle === ERROR_STYLE.PASSWORD ? 'input-err-b input-err-c' : ''}`} type="text" placeholder="请输入验证码" autoComplete="off" onChange={verifyChange} />
      <div className="u-btn2 btn-img verify-btn pointer login-btn3">
        <span className='btn-img login-btn4' onClick={captchaSentClick}>获取验证码</span>
      </div>
    </div>
  )
  // 密码组件
  const Password = (
    <div className='password' onClick={clearErrStyle}>
      <input value={user.password} key='password' onKeyDown={(e) => { if (e.key === 'Enter') loginClick() }} className={`password-input ${errStyle === ERROR_STYLE.PASSWORD ? 'input-err-b input-err-c' : ''}`} type="password" placeholder="请输入密码" autoComplete="new-password" onChange={passwordChange} />
      <span className='pointer hover'>忘记密码？</span>
    </div>
  )

  return (
    <div className='phone' style={showComponent(STATUS.PHONE)}>
      <div className='input-box'>
        <div
          className={`input-phone ${errStyle === ERROR_STYLE.PHONE ? 'input-err-b' : ''}`}
          onClick={clearErrStyle}
        >
          <div className='countries-code pointer' onClick={showListClick}>
            <span className='code'>{code}</span>
            <span className='icon2 code-down'></span>
          </div>
          <div className='input'>
            <input value={user.phone} className={`${errStyle === ERROR_STYLE.PHONE ? 'input-err-c' : ''}`} onChange={phoneChange} type="text" placeholder="请输入手机号" autoComplete="off" />
          </div>
          {/* {展示国家区号列表} */}
          <ul className='options' style={showListStyle}>
            {
              codeList.map((cl: any) => {
                const countryList = cl.countryList
                return countryList.map((item: any) => {
                  const { zh, code } = item
                  return (
                    <li className='item pointer' key={code} onClick={() => { setCodeClick(`+${code}`) }}>
                      <span className='code'>{zh}</span>
                      <span className='countries'>{`+${code}`}</span>
                    </li>
                  )
                })
              })
            }
          </ul>
        </div>
        <div className='f-mgt10'>
          {state ? Verify : Password}
        </div>
        <div className="u-err" style={{ display: errMsg ? 'block' : 'none' }}>
          <i className="u-icn u-icn25"></i>
          <span>{errMsg}</span>
        </div>
        <div className="f-mgt10 actionbox">
          <span className="pwdlogin hover pointer" onClick={cutClick}>{state ? '密码登录' : '短信登录'}</span>
          <label>
            <input type="checkbox" defaultChecked className="u-auto" />自动登录
          </label>
        </div>
        <div className="f-mgt20">
          <div className='login-btn-style login-btn1 btn-img pointer'>
            <span className='login-btn2 btn-img' onClick={loginClick}>{loginText}</span>
          </div>
        </div>
      </div>
      <Footer>
        <span className='footer-left pointer' onClick={mainClick}>&lt;&nbsp;&nbsp;其他登录方式</span>
        <span className='footer-right pointer' onClick={enrollClick}>没有帐号？免费注册&nbsp;&nbsp;&gt;</span>
      </Footer>
    </div>

  )
}

export default Phone
