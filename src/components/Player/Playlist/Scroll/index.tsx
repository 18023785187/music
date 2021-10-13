/**
 * 滚动条
 */
import React, { useState, useRef, useEffect, useMemo, useCallback, MouseEvent, forwardRef, useImperativeHandle } from 'react'
import { IScrollRef } from '../typing'

interface IProps {
    contentHeight: number
    changePos: (pos: number) => void
}

const Scroll = forwardRef<IScrollRef, IProps>((props: IProps, ref) => {
    const { contentHeight, changePos } = props

    const scrollElRef = useRef<HTMLDivElement>(null)
    const flagRef = useRef<boolean>(false)

    const [pos, setPos] = useState<number>(0)
    const startPosRef = useRef<number>(0)
    const endPosRef = useRef<number>(0)

    const MouseDown = useCallback((e: MouseEvent) => {
        flagRef.current = true
        startPosRef.current = e.pageY
    }, [])

    useImperativeHandle(ref, () => ({
        // 供外界控制滑动条，pos移动的百分比 0 ~ 100
        transform: (pos: number) => {
            const scrollH: number = scrollElRef.current?.offsetHeight ?? 0

            if (pos <= 0) {
                setPos(0)
                endPosRef.current = 0 * scrollH
            } else if (pos >= 100 - (scrollH / contentHeight) * 100) {
                setPos(100 - (scrollH / contentHeight) * 100)
                endPosRef.current = (100 - (scrollH / contentHeight) * 100) * scrollH
            } else {
                setPos(pos * scrollH)
                endPosRef.current = pos * scrollH
            }
        }
    }))

    useEffect(() => {
        document.addEventListener('mousemove', mousemove)

        function mousemove(e: globalThis.MouseEvent) {

            if (flagRef.current) {
                e.preventDefault()

                const scrollH: number = scrollElRef.current?.offsetHeight ?? 0
                const pos = e.pageY - startPosRef.current + endPosRef.current

                if (pos <= 0) {
                    setPos(0)
                    changePos(0)
                } else if (pos >= scrollH - (scrollH * (scrollH / contentHeight))) {
                    const p = scrollH - (scrollH * (scrollH / contentHeight))
                    setPos(p)
                    changePos(1 - (scrollH / contentHeight))
                } else {
                    setPos(pos)
                    changePos(pos / scrollH)
                }
            }
        }

        return () => {
            document.removeEventListener('mousemove', mousemove)
        }
    }, [contentHeight, changePos])

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

    const style = useMemo(() => {
        const scrollH: number = scrollElRef.current?.offsetHeight ?? 0

        const height: number = scrollH >= contentHeight ? 0 : scrollH * (scrollH / contentHeight)

        return {
            height,
            display: height ? 'block' : 'none',
            transform: `translate3d(0,${pos}px,0)`
        }
    }, [contentHeight, pos])

    return (
        <div className='scroll' ref={scrollElRef}>
            <div className='scrol' style={style} onMouseDown={MouseDown}></div>
        </div>
    )
})

export default Scroll