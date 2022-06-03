/**
 * 用户
 */
import React, { useEffect, useState } from 'react'
import Login from './Login'
import LUser from './User'
import { getUserStatus, cancelUser } from 'network/user/getUserInfo'
import { IInitData } from '../../typings'

const initData: IInitData = {
  profile: {},
  code: 200,
  account: {}
}

function User() {
  const [data, setData] = useState<IInitData>(initData)

  // 检查登录状态
  useEffect(() => {
    getUserStatus().then(res => {
      setData(res.data)
    }).catch(rej => {

    })

    return () => {
      cancelUser.cancelGetUserStatus && cancelUser.cancelGetUserStatus()
    }
  }, [])

  return (
    <div className='top-login'>
      {(data.profile ?? {}).avatarUrl ? <LUser {...data} /> : <Login />}
    </div>
  )
}

export default User
