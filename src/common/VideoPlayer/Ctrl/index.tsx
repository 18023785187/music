/**
 * 控制器
 */
import React, { useState, useCallback, useEffect, useRef, MouseEvent, forwardRef, useImperativeHandle } from 'react'
import { ICtrlRef } from '../typing'
import { formatDate } from 'utils'

interface IProps {
    duration?: number,
    videoEl: HTMLVideoElement | null,
    callback: (flag: boolean) => void
}

const Ctrl = forwardRef<ICtrlRef, IProps>((props, ref) => {
    const { duration, videoEl, callback } = props

    const [flag, setFlag] = useState<boolean>(false)
    // 当前时长
    const [curTime, setCurTime] = useState<number>(0)
    // 当前位置
    const [curPos, setCurPos] = useState<number>(0)
    // 进度条元素
    const progressElRef = useRef<HTMLDivElement>(null)

    const flagRef = useRef<boolean>(false)
    const startPosRef = useRef<number>(0)
    const endPosRef = useRef<number>(0)

    // 暴露方法
    useImperativeHandle(ref, () => ({
        flagCallback(flag: boolean) {
            callback(flag)
            setFlag(flag)
            flag ? videoEl!.play() : videoEl!.pause()
        }
    }))

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
        }

        return () => {
            videoEl?.removeEventListener('play', play)
        }
    }, [videoEl])
    // 暂停事件
    useEffect(() => {
        videoEl?.addEventListener('pause', pause)

        function pause() {
            setFlag(false)
        }

        return () => {
            videoEl?.removeEventListener('pause', pause)
        }
    }, [videoEl])
    // 更新当前时长事件
    useEffect(() => {
        videoEl?.addEventListener('timeupdate', timeupdate)

        function timeupdate() {
            if (!flagRef.current) {
                const pos: number = videoEl ? videoEl.currentTime * 1000 : 0
                setCurTime(pos)

                setCurPos(duration ? (pos / duration) * 100 : 0)
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
    useEffect(() => {
        document.addEventListener('mousemove', MouseMove)

        function MouseMove(e: globalThis.MouseEvent) {
            e.preventDefault()

            if (flagRef.current) {
                const countW = progressElRef.current?.offsetWidth ?? 0
                const pos = e.pageX - startPosRef.current + (endPosRef.current * countW / 100)
                const time = Math.floor((pos / countW) * (duration ?? 0))

                setCurPos((pos / countW) * 100)
                setCurTime(time)

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
            flagRef.current = false
            startPosRef.current = 0
            endPosRef.current = curPos
        }

        return () => {
            document.removeEventListener('mouseup', MouseUp)
        }
    }, [curPos])

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

    return (
        <div className='controls'>
            <div className='wrap'>
                <div className='foh'>
                    {/* 播放按钮 */}
                    <div className='left'>
                        <i className={`btn pointer ${flag ? 'play' : 'stop'}`} onClick={flagClick}></i>
                        <span className='time'>{formatDate(new Date(curTime), 'mm:ss')}</span>
                    </div>
                    {/* 进度条 */}
                    <div className='progresswrap'>
                        <div className='progress progress-2' ref={progressElRef} onClick={progressClick}>
                            {/* 当前时间 */}
                            <div className='out out-1' style={{ width: curPos + '%' }}>
                                <div className='in'>
                                    <span className='dot' onMouseDown={MouseDown}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 进度条右边 */}
                <div className='right'>
                    <div className='duration'>{formatDate(new Date(duration ?? 0), 'mm:ss')}</div>
                    <div className='volume'>
                        <i className='mute pointer'></i>
                    </div>
                    <div className='brs'></div>
                    <i className='full pointer'></i>
                </div>
            </div>
        </div>
    )
})

export default Ctrl
