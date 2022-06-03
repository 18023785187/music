/**
 * 播放切换按钮
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { usePrev, useNext, usePlay, useStop } from '../useFunc'
import setState from '../setState'
import { addAudio } from '../audio'

/* 初始化音频 */
addAudio()

function Btns() {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const flagRef = useRef<boolean>(true)
  const playFlagRef = useRef<boolean>(true)

  setState.setIsPlay = setIsPlay

  const prev = usePrev()
  const next = useNext()
  const stop = useStop()
  const play = usePlay()

  /* 播放/停止 */
  const ply = useCallback(() => {

    if (isPlay) {
      stop()
    } else {
      play()
    }

  }, [isPlay, stop, play])
  /* 上一首 */
  const pre = useCallback(() => {
    if (flagRef.current) {
      flagRef.current = false

      prev()

      window.setTimeout(() => {
        flagRef.current = true
      }, 1000)
    }
  }, [prev])
  /* 下一首 */
  const nxt = useCallback(() => {
    if (flagRef.current) {
      flagRef.current = false

      next()
      window.setTimeout(() => {
        flagRef.current = true
      }, 1000)
    }
  }, [next])

  useEffect(() => {
    document.addEventListener('keydown', keyDown, false)

    function keyDown(e: KeyboardEvent) {
      const key: string = e.key

      if (key === 'ArrowLeft' && e.ctrlKey) {
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

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('keydown', keyDown, false)
    document.addEventListener('keyup', keyUp, false)

    function keyDown(e: KeyboardEvent) {
      if (playFlagRef.current) {
        playFlagRef.current = false

        const key: string = e.key

        if (key === 'p' || key === 'P') {
          /* 播放逻辑 */
          isPlay ? stop() : play()
        }
      } else {
        // e.preventDefault()
      }
    }

    function keyUp() {
      playFlagRef.current = true
    }

    return () => {
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('keyup', keyUp)
    }

  }, [isPlay, stop, play])

  return (
    <div className='btns'>
      <span className='prv playbar-img' title="上一首(ctrl+←)" onClick={pre}>上一首</span>
      <span className={`ply playbar-img ${isPlay ? 'pas' : ''}`} title="播放/暂停(p)" onClick={ply}>播放/暂停</span>
      <span className='nxt playbar-img' title="下一首(ctrl+→)" onClick={nxt}>下一首</span>
    </div>
  )
}

export default Btns
