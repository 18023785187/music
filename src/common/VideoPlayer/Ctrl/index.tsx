/**
 * 控制器
 */
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef, MouseEvent, forwardRef, useImperativeHandle } from 'react'
import { ICtrlRef } from '../typing'
import { formatDate } from 'utils'
import Volume from './Volume'
import ResolutionRatio from './ResolutionRatio'

interface IProps {
  duration?: number,
  videoEl: HTMLVideoElement | null,
  fullscreenEl: HTMLDivElement | null,
  callback: (flag: boolean) => void
}

const Ctrl = forwardRef<ICtrlRef, IProps>((props, ref) => {
  const { duration, videoEl, fullscreenEl, callback } = props

  const [flag, setFlag] = useState<boolean>(false)
  // 当前时长
  const [curTime, setCurTime] = useState<number>(0)
  // 当前位置
  const [curPos, setCurPos] = useState<number>(0)
  // 进度条元素
  const progressElRef = useRef<HTMLDivElement>(null)

  // 提示器显示
  const [show, setShow] = useState<boolean>(false)
  // 提示时间
  const [hintTime, setHintTime] = useState<number>(0)
  // 位移
  const [hintPos, setHintPos] = useState<number>(0)
  // 箭头位移
  const [arrowPos, setArrowPos] = useState<number>(0)
  // 提示器元素
  const hintElRef = useRef<HTMLSpanElement>(null)

  // 显示控制器
  const [ctrlShow, setCtrlShow] = useState<boolean>(false)
  const [ctrlShowD, setCtrlShowD] = useState<boolean>(false)
  const ctrlFlagTimer = useRef<number>()
  const ctrlDFlagTimer = useRef<number>()

  const flagRef = useRef<boolean>(false)
  const startPosRef = useRef<number>(0)
  const endPosRef = useRef<number>(0)

  // 暴露方法
  useImperativeHandle(ref, () => ({
    flagCallback(flag: boolean) {
      callback(flag)
      setFlag(flag)
      flag ? videoEl!.play() : videoEl!.pause()
    },
    ctrlShowFlag(flag: boolean) {
      setCtrlShow(flag)
    }
  }))

  useEffect(() => {
    window.clearTimeout(ctrlFlagTimer.current)

    if (!ctrlShow) {
      ctrlFlagTimer.current = window.setTimeout(() => {
        setCtrlShowD(false)
      }, 200)
    } else {
      setCtrlShowD(true)
    }
  }, [ctrlShow])

  // 点击暂止和播放
  const flagClick = useCallback(() => {
    if (!flag) {
      videoEl!.play()
      setFlag(true)
      callback(false)
    } else {
      videoEl!.pause()
      setFlag(false)
      callback(true)
    }
  }, [flag, videoEl, callback])

  // 播放事件
  useEffect(() => {
    videoEl?.addEventListener('play', play)

    function play() {
      setFlag(true)
      callback(false)
    }

    return () => {
      videoEl?.removeEventListener('play', play)
    }
  }, [videoEl, callback])
  // 暂停事件
  useEffect(() => {
    videoEl?.addEventListener('pause', pause)

    function pause() {
      setFlag(false)
      callback(true)
    }

    return () => {
      videoEl?.removeEventListener('pause', pause)
    }
  }, [videoEl, callback])
  // 更新当前时长事件
  useLayoutEffect(() => {
    videoEl?.addEventListener('timeupdate', timeupdate)

    function timeupdate() {
      if (!flagRef.current) {
        const pos: number = videoEl ? videoEl.currentTime * 1000 : 0
        setCurTime(pos)

        pos >= (duration ?? 0) ? setCurPos(100) : setCurPos(duration ? (pos / duration) * 100 : 0)
      }
    }

    return () => {
      videoEl?.removeEventListener('timeupdate', timeupdate)
    }
  }, [videoEl, duration])

  // 调节器被鼠标按下
  const MouseDown = useCallback((e: MouseEvent) => {
    flagRef.current = true
    startPosRef.current = e.pageX
  }, [])

  //
  useLayoutEffect(() => {
    document.addEventListener('mousemove', MouseMove)

    function MouseMove(e: globalThis.MouseEvent) {
      // e.preventDefault()

      if (flagRef.current) {
        setCtrlShow(true)

        const countW = progressElRef.current?.offsetWidth ?? 0
        const pos = e.pageX - startPosRef.current + (endPosRef.current * countW / 100)
        const time = Math.floor((pos / countW) * (duration ?? 0))

        if (pos <= 0) {
          setCurPos(0)
          setCurTime(0)
        } else if (pos >= countW) {
          setCurPos(100)
          setCurTime(duration ?? 0)
        } else {
          setCurPos((pos / countW) * 100)
          setCurTime(time)
        }

        videoEl && (videoEl.currentTime = time / 1000)
      }
    }

    return () => {
      document.removeEventListener('mousemove', MouseMove)
    }
  }, [videoEl, duration])

  //
  useEffect(() => {
    document.addEventListener('mouseup', MouseUp)

    function MouseUp() {
      window.clearTimeout(ctrlDFlagTimer.current)

      flagRef.current = false
      startPosRef.current = 0
      endPosRef.current = curPos

      ctrlDFlagTimer.current = window.setTimeout(() => {
        setCtrlShow(false)
      }, 3000)
    }

    return () => {
      document.removeEventListener('mouseup', MouseUp)
      window.clearTimeout(ctrlDFlagTimer.current)
    }
  }, [curPos])

  const showMouseMove = useCallback((e: MouseEvent) => {
    setShow(true)

    const hintElW = hintElRef.current?.offsetWidth ?? 0

    const countW = progressElRef.current?.offsetWidth ?? Infinity
    const pos = e.pageX - progressElRef.current!.getClientRects()[0].left

    const time = (pos / countW) * (duration ?? 0)

    setHintTime(time)

    if (pos <= hintElW / 2) {
      setArrowPos(pos - hintElW / 2 + 4)
      setHintPos(0)
    } else if (pos >= countW - hintElW / 2) {
      setArrowPos(pos - countW + hintElW / 2 - 4)
      setHintPos(countW - hintElW)
    } else {
      setArrowPos(0)
      setHintPos(pos - hintElW / 2)
    }
  }, [duration])

  const showMouseOut = useCallback(() => {
    setShow(false)
  }, [])

  // 点击进度瞬移
  const progressClick = useCallback((e: MouseEvent) => {
    e.preventDefault()

    const countW = progressElRef.current?.offsetWidth ?? Infinity
    const pos = (e.pageX - progressElRef.current!.getClientRects()[0].left) / countW
    const time = pos * (duration ?? 0)

    setCurPos(pos * 100)
    setCurTime(time)
    endPosRef.current = pos * 100

    videoEl && (videoEl.currentTime = time / 1000)
  }, [duration, videoEl])

  // 全屏事件
  const fullscreenClick = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      fullscreenEl!.requestFullscreen()
    }
  }, [fullscreenEl])

  return (
    <div className='controls' style={{ transform: ctrlShow ? '' : 'translate3d(0,100%,0)' }}>
      {/* 进度条 */}
      <div className='progress progress-1' style={{ display: ctrlShowD ? 'none' : 'block' }}>
        <div className='j-out1 out out-1' style={{ width: curPos + '%' }}></div>
        <div className='j-out2 out out-2'></div>
      </div>
      <div className='wrap'>
        <div className='foh'>
          {/* 播放按钮 */}
          <div className='left'>
            <i className={`btn pointer ${flag ? 'play' : 'stop'}`} onClick={flagClick}></i>
            <span className='time'>{formatDate(new Date(curTime), 'mm:ss')}</span>
          </div>
          {/* 进度条 */}
          <div className='progresswrap'>
            <div className='progress progress-2' ref={progressElRef} onClick={progressClick} onMouseMove={showMouseMove} onMouseOut={showMouseOut}>
              {/* 提示器 */}
              <div className='j-ht' style={{ opacity: show ? '1' : '0', transform: `translate3d(${hintPos}px,0,0)` }}>
                <span className='hovertime' ref={hintElRef}>{formatDate(new Date(hintTime), 'mm:ss')}</span>
                <span className='arrow' style={{ left: arrowPos + 'px' }}></span>
              </div>
              {/* 当前时间 */}
              <div className='out out-1' style={{ width: curPos + '%' }}>
                <div className='in'>
                  <span className='dot' onMouseDown={MouseDown} onMouseOut={showMouseOut}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 进度条右边 */}
        <div className='right'>
          <div className='duration'>{formatDate(new Date(duration ?? 0), 'mm:ss')}</div>
          {/* 音量调节器 */}
          <Volume changeVolume={(v) => { videoEl!.volume = v }} />
          {/* 分辩率 */}
          <ResolutionRatio />
          <i className='full pointer' onClick={fullscreenClick}></i>
        </div>
      </div>
    </div>
  )
})

export default Ctrl
