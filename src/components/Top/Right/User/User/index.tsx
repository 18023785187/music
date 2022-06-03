/**
 * 登录状态
 */
import React, { useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { USER, MSG } from 'pages/path'
import { logout } from 'network/login/manage-login'
import { IInitData } from '../../../typings'

interface IProps extends IInitData { }

function User(props: IProps) {
  const { profile } = props
  const { avatarUrl, userId } = profile

  const logoutClick = useCallback(() => {
    logout().then(res => {
      window.location.reload()
    })
  }, [])

  return (
    <>
      <div className='head'>
        <img src={avatarUrl + '?param=30y30'} alt="头像" />
      </div>
      {/* 列表 */}
      <div className='m-tlist'>
        <ul>
          <li className='pointer'>
            <Link to={USER.HOME + `?id=${userId}`}>
              <i className='icn icn-hm toplist_img'></i>
              <em>我的主页</em>
            </Link>
          </li>
          <li className='pointer'>
            <Link to={MSG.AT}>
              <i className='icn icn-msg toplist_img'></i>
              <em>我的信息</em>
            </Link>
          </li>
          <li className='pointer'>
            <Link to={USER.LEVEL + `?id=${userId}`}>
              <i className='icn icn-lv toplist_img'></i>
              <em>我的等级</em>
            </Link>
          </li>
          <li className='pointer'>
            <Link to={USER.MUMBER}>
              <i className='icn icn-mbr toplist_img'></i>
              <em>vip会员</em>
            </Link>
          </li>
          <li className='pointer'>
            <Link to={USER.UPDATE}>
              <i className='icn icn-st toplist_img'></i>
              <em>个人设置</em>
            </Link>
          </li>
          <li className='pointer'>
            <a href='https://music.163.com/st/userbasic/?module=st%2Fuserbasic%2F#/nameverify' target='_blank' rel='noreferrer'>
              <i className='icn icn-verify toplist_img'></i>
              <em>实名认证</em>
            </a>
          </li>
          <li className='pointer' onClick={logoutClick}>
            <span>
              <i className='icn icn-ex toplist_img'></i>
              <em>退出</em>
            </span>
          </li>
        </ul>
        <i className='arr toplist_img'></i>
      </div>
    </>
  )
}

export default memo(User)
