// 登录窗口入口
import React, { useState, useEffect, Fragment } from 'react'
import Login from './Login'
import PubSub, { CLOSE, loginWindowClose } from '@/PubSub'

function Temp() {
    // 关闭窗体用
    const [close, setClose] = useState<boolean>(true)

    useEffect(() => {
        // 暴露订阅器用于弹出登录窗体
        PubSub.subscribe(CLOSE.LOGIN, (_: CLOSE.LOGIN, close: loginWindowClose) => {
            setClose(close)
        })
    }, [])

    return (
        <>
            {
                !close ? <Login /> : <Fragment></Fragment>
            }
        </>
    )
}

export default Temp
