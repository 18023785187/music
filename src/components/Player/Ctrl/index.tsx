/**
 * 控制器
 */
import React, { useState, useCallback, useRef, useEffect, MouseEvent } from 'react'
import wLocalStoreage, { PLAY_MODE, PLAY_VOLUME } from '@/utils/localStorage'
import { changeAudioVolume } from '../audio'

const POS = 81
const LINE = 93

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
  const volume = Number(wLocalStoreage.getItem(PLAY_VOLUME))
  changeAudioVolume(volume)

  const [state, setState] = useState<number>(Number(wLocalStoreage.getItem(PLAY_MODE)) ?? 0)
  const [show, setShow] = useState<boolean>(false)
  const [vShow, setVShow] = useState<boolean>(false)
  const [pos, setPos] = useState<number>((1 - volume) * POS)
  const [line, setLine] = useState<number>(volume * LINE)
  const timerRef = useRef<number>()
  const flagRef = useRef<boolean>(false)
  const startPosRef = useRef<number>(0)
  const endPosRef = useRef<number>(0)

  // 改变播放模式
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

  // 显示音量调节器
  const vShowClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()

    vShow ? setVShow(false) : setVShow(true)
  }, [vShow])

  // 调节器被鼠标按下
  const vMouseDown = useCallback((e: MouseEvent) => {
    flagRef.current = true
    startPosRef.current = e.pageY
  }, [])

  const MouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()

    if (flagRef.current === true) {
      // 移动的像素
      const pos = e.pageY - startPosRef.current + endPosRef.current

      if (pos <= 0) {
        setPos(0)
        setLine(LINE)
        changeAudioVolume(1)
        wLocalStoreage.setItem(PLAY_VOLUME, (1).toString())
      }
      else if (pos >= POS) {
        setPos(POS)
        setLine(0)
        changeAudioVolume(0)
        wLocalStoreage.setItem(PLAY_VOLUME, (0).toString())
      }
      else {
        const line = POS - pos

        setPos(pos)
        setLine(line * (LINE / POS))
        changeAudioVolume(1 - pos / POS)
        wLocalStoreage.setItem(PLAY_VOLUME, (1 - pos / POS).toString())
      }
    }
  }, [])

  //
  useEffect(() => {
    document.addEventListener('mouseup', MouseUp)

    function MouseUp() {
      flagRef.current = false
      startPosRef.current = 0
      endPosRef.current = pos
    }

    return () => {
      document.removeEventListener('mouseup', MouseUp)
    }
  }, [pos])

  useEffect(() => {
    document.addEventListener('click', vShowClick)

    function vShowClick() {

      setVShow(false)
    }

    return () => {
      document.removeEventListener('click', vShowClick)
    }
  }, [])

  return (
    <div className='ctrl playbar-img'>
      {/* 音量调节器 */}
      <div className='m-vol playbar-img' style={{ visibility: vShow ? 'visible' : 'hidden' }} onClick={(e) => e.stopPropagation()} onMouseMove={MouseMove}>
        <div className='vbg'>
          <div className='curr playbar-img' style={{ height: line + 'px' }}></div>
          <span className='btn hover iconall' style={{ transform: `translate3d(0,${pos}px,0)` }} onMouseDown={vMouseDown}></span>
        </div>
      </div>
      <i className={`playbar-img icn pointer ${pos !== 81 ? 'icn-vol' : 'icn-volno'}`} onClick={vShowClick}></i>
      <i className={`playbar-img icn pointer ${titles[state].className}`} title={titles[state].title} onClick={changeClick}>{titles[state].title}</i>
      {/* 播放模式提示框 */}
      <div className='tip-1 playbar-img' style={{ display: show ? 'block' : 'none' }}>{titles[state].title}</div>
    </div>
  )
}

export default Ctrl
