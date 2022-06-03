/**
 * 我的信息组件
 */
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PubSub, { CLOSE } from '@/utils/PubSub'
import LazyLoad from '@/utils/LazyLoad'
import { getLoginStatus, cancel } from 'network/login/manage-login'
import { getUserLevel, getUserVip, cancelUser } from 'network/user/getUserInfo'
import { USER } from 'pages/path'

function MyInfo() {
  const [profile, setProfile] = useState<{ [propName: string]: any }>()
  const [vip, setVip] = useState<{ [propName: string]: any }>({})
  const [level, setLevel] = useState<{ [propName: string]: any }>({})

  useEffect(() => {
    _getLoginStatus()

    async function _getLoginStatus() {
      const statusRes = await getLoginStatus()
      try {
        setProfile(statusRes.data)

        LazyLoad.update()
        const vipRes = await getUserVip()
        const levelRes = await getUserLevel()
        try {
          setVip(vipRes.data)
          setLevel(levelRes.data)
        } catch (e) {
          // console.log(e)
        }
      } catch (e) {
        // console.log(e)
        // _getLoginStatus()
      }
    }

    return (() => {
      cancel.cancelGetLoginStatus && cancel.cancelGetLoginStatus()
      cancelUser.cancelGetUserVip && cancelUser.cancelGetUserVip()
      cancelUser.cancelGetUserLevel && cancelUser.cancelGetUserLevel()
    })
  }, [])

  const showLogin = () => {
    PubSub.publish(CLOSE.LOGIN, false)
  }

  const infoElement = useCallback((): JSX.Element => {
    if (!profile?.profile) {
      return (
        <div className='info1 v-hd2 s-bg-1'>
          <p className="note">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <i className='pointer btn v-hd2 s-bg-2' onClick={showLogin}>用户登录</i>
        </div>
      )
    } else {
      const { userId, avatarUrl, nickname } = profile.profile
      const { redVipDynamicIconUrl } = vip
      const { level: l } = level

      return (
        <div className='info2 v-hd2 s-bg-5'>
          <div className='user-info'>
            <Link className='img' to={`${USER.HOME}?id=${userId}`}>
              <img data-src={avatarUrl + '?param=80y80'} alt="用户头像" width={80} height={80} />
            </Link>
            <div className='info'>
              <h4 style={{ overflow: 'hidden' }}>
                <Link className='f-thide nm' to={`${USER.HOME}?id=${userId}`}>{nickname}</Link>
                <span className='vip-level' style={{ backgroundImage: `url(${redVipDynamicIconUrl})` }}></span>
              </h4>
              <p>
                <Link className='u-lv icon2 u-icn2-lv' to={USER.LEVEL}>{l}</Link>
                <i className='icon2 u-icn2-lvright'></i>
              </p>
              <div className='btnwrap'>
                <i className='box login-btn1 btn-img pointer'>
                  <i className='box-r login-btn2 btn-img pointer'>签 到</i>
                </i>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }, [profile, vip, level])

  return (
    <div className='my-info' style={{ visibility: profile ? 'visible' : 'hidden' }}>
      {infoElement()}
    </div>
  )
}

export default MyInfo
