/**
 * 播放切换按钮
 */
import React, { useEffect, useCallback } from 'react'
import { usePrev, useNext } from './useFunc'
import { addAudio } from './audio'


function Btns() {
    const prev = usePrev()
    const next = useNext()

    /* 播放/停止 */
    const play = useCallback(() => {
        addAudio()
    }, [])
    /* 上一首 */
    const pre = useCallback(() => {
        prev()
    }, [prev])
    /* 下一首 */
    const nxt = useCallback(() => {
        next()
    }, [next])

    useEffect(() => {

        document.addEventListener('keydown', keyDown, true)

        function keyDown(e: KeyboardEvent) {
            const key: string = e.key
            if (key === 'p' || key === 'P') {
                /* 播放逻辑 */
                play()
            } else if (key === 'ArrowLeft' && e.ctrlKey) {
                /* 上一首逻辑 */
                pre()
            } else if (key === 'ArrowRight' && e.ctrlKey) {
                /* 下一首逻辑 */
                nxt()
            }
        }

        return () => {
            document.removeEventListener('keydown', keyDown)
        }

    }, [play, pre, nxt])

    return (
        <div className='btns'>
            <span className='prv playbar-img' title="上一首(ctrl+←)" onClick={pre}>上一首</span>
            <span className='ply playbar-img' title="播放/暂停(p)" onClick={play}>播放/暂停</span>
            <span className='nxt playbar-img' title="下一首(ctrl+→)" onClick={nxt}>下一首</span>
        </div>
    )
}

export default Btns
