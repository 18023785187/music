/**
 * 滚动条
 */
import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, MouseEvent, forwardRef, useImperativeHandle } from 'react'
import { IScrollRef } from '../typing'

interface IProps {
  contentHeight: number,
  changePos: (pos: number) => void,
  flagCallback?: (flag: boolean) => void
}

const Scroll = forwardRef<IScrollRef, IProps>((props: IProps, ref) => {
  // 传入的内容总高，触发方法
  const { contentHeight, changePos, flagCallback } = props

  // 向外暴露事件
  const scrollElRef = useRef<HTMLDivElement>(null)
  // 启动阀
  const flagRef = useRef<boolean>(false)

  // 改变滑动条位置
  const [pos, setPos] = useState<number>(0)
  // 每次启动启动阀记录的位置
  const startPosRef = useRef<number>(0)
  // 每次拖拽结束时记录的本次拖拽最终的位置
  const endPosRef = useRef<number>(0)

  // 拖拽启动
  const MouseDown = useCallback((e: MouseEvent) => {
    flagRef.current = true
    startPosRef.current = e.pageY
    flagCallback && flagCallback(true)
  }, [flagCallback])

  useImperativeHandle(ref, () => ({
    // 供外界控制滑动条，pos移动的百分比 0 ~ 100
    transform: (p: number) => {
      const scrollH: number = scrollElRef.current?.offsetHeight ?? 0
      const scrollRate = (scrollH * (scrollH / contentHeight) / scrollH) * 100

      if (p <= 0) {
        setPos(0)
        endPosRef.current = 0
      } else if (p >= 100 - scrollRate) {
        setPos(((100 - scrollRate) * scrollH) / 100)
        endPosRef.current = ((100 - scrollRate) * scrollH) / 100
      } else {
        setPos((p * scrollH) / 100)
        endPosRef.current = (p * scrollH) / 100
      }
    }
  }))

  // 拖拽时
  useLayoutEffect(() => {
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

  // 结束拖拽
  useEffect(() => {
    document.addEventListener('mouseup', MouseUp)

    function MouseUp() {
      flagRef.current = false
      startPosRef.current = 0
      endPosRef.current = pos
      flagCallback && flagCallback(false)
    }

    return () => {
      document.removeEventListener('mouseup', MouseUp)
    }
  }, [pos, flagCallback])

  // 样式集合
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