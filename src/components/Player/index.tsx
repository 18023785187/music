/**
 * 播放器
 */
import React, { useState, useCallback, useEffect } from 'react'
import wLocalStoreage, { PLAY_LOCK } from '@/localStorage'
import styles from './styles/index.module.less'

const transition = {
    in: 'bottom .1s',
    out: 'bottom .7s ease .7s'
}

if (wLocalStoreage.getItem(PLAY_LOCK) === undefined) {
    wLocalStoreage.setItem(PLAY_LOCK, '0')
}

function Player() {
    const [lock, setLock] = useState<boolean>(Boolean(Number(wLocalStoreage.getItem(PLAY_LOCK))))
    const [isDown, setIsDown] = useState<boolean>(false)

    const lockClick = useCallback(() => {
        setLock(!lock)
        wLocalStoreage.setItem(PLAY_LOCK, !lock ? '1' : '0')
    }, [lock])
    const isDownMouseMove = useCallback(() => {
        if (!lock) {
            setIsDown(false)
        }
    }, [lock])

    const isDownMouseOut = useCallback(() => {
        if (!lock) {
            setIsDown(true)
        }
    }, [lock])

    useEffect(() => {
        const timer = window.setTimeout(isDownMouseOut, 1000)

        return () => {
            window.clearTimeout(timer)
        }
    }, [isDownMouseOut])

    return (
        <div className={`${styles['playbar']} ${isDown ? styles['down'] : ''}`} style={{ transition: isDown ? transition['out'] : transition['in'] }} onMouseMove={isDownMouseMove} onMouseOut={isDownMouseOut}>
            {/* 右侧锁样式 */}
            <div className="updn">
                <div className="left playbar-img">
                    <i className={`pointer playbar-img ${lock ? 'btn' : 'btn-lock'}`} onClick={lockClick}></i>
                </div>
                <div className="right playbar-img"></div>
            </div>
            {/* 提示框 */}
            <div className="hand pointer" title="展开播放条"></div>
            {/* 背景 */}
            <div className='bg playbar-img'></div>
            {/* 逻辑样式往下写 */}
            <div className='w wrap'>

            </div>
        </div>
    )
}

export default Player
