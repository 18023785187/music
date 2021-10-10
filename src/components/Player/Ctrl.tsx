/**
 * 控制器
 */
import React, { useState, useCallback, useRef } from 'react'
import wLocalStoreage, { PLAY_MODE } from '@/localStorage'

const titles = [
    {
        title: '单曲循环',
        className: 'icn-one'
    },
    {
        title: '循环',
        className: 'icn-loop'
    },
    {
        title: '随机',
        className: 'icn-shuffle'
    },
]

function Ctrl() {
    const [state, setState] = useState<number>(Number(wLocalStoreage.getItem(PLAY_MODE)) ?? 0)
    const [show, setShow] = useState<boolean>(false)
    const timerRef = useRef<number>()

    const changeClick = useCallback(() => {
        window.clearTimeout(timerRef.current)
        const curMode: number = Number(wLocalStoreage.getItem(PLAY_MODE))

        if (curMode === 2) {
            setState(0)
            wLocalStoreage.setItem(PLAY_MODE, (0).toString())
        } else {
            setState(curMode + 1)
            wLocalStoreage.setItem(PLAY_MODE, (curMode + 1).toString())
        }

        setShow(true)
        timerRef.current = window.setTimeout(() => {
            setShow(false)
        }, 2000)
    }, [])

    return (
        <div className='ctrl playbar-img'>
            <i className='playbar-img icn-vol icn pointer'></i>
            <i className={`playbar-img icn pointer ${titles[state].className}`} title={titles[state].title} onClick={changeClick}>{titles[state].title}</i>
            <div className='tip-1 playbar-img' style={{ display: show ? 'block' : 'none' }}>{titles[state].title}</div>
        </div>
    )
}

export default Ctrl
