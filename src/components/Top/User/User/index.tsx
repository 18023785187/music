/**
 * 登录状态
 */
import React, { useCallback } from 'react'
import { logout } from 'network/login/manage-login'
import { IInitData } from '../../typings'

interface IProps extends IInitData { }

function User(props: IProps) {
    const { profile, account } = props
    const { avatarUrl } = profile
    console.log(profile, account)

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

export default User
