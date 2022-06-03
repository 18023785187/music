/**
 * 手动轮播图
 * 向外暴露切换方法，外部需要通过useRef获取，明确类型在typings.ts文件中
 */
import React, { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import { ISlideRef } from './typings'
import styles from './styles/index.module.less'

interface IProps {
  children: JSX.Element[] | JSX.Element | string,
  renderCallback?: () => void
}

enum TRANSITION {
  EASE = 'all 1s ease-out 0s',
  NONE = 'none'
}

const Slide = forwardRef<ISlideRef, IProps>((props, ref) => {
  const { children, renderCallback } = props
  const [idx, setIdx] = useState(0)
  const [changeStyle, setChangeStyle] = useState<TRANSITION>(TRANSITION.EASE)
  const flagRef = useRef<boolean | null>(true)

  useEffect(() => {
    renderCallback && renderCallback()
  })

  useImperativeHandle(ref, () => ({
    transform: (isNext) => {
      if (flagRef.current) {
        flagRef.current = false

        try {
          change(isNext)
        } catch (e) { console.log(e) }

        window.setTimeout(() => {
          flagRef.current = true
        }, 1000)
      }
    }
  }))

  const change = useCallback((isNext: boolean) => {
    const curIdx = isNext ? idx + 1 : idx - 1
    if (curIdx < 0) {
      window.setTimeout(() => {
        setIdx((children as JSX.Element[]).length - 1)
        setChangeStyle(TRANSITION.NONE)
      }, 1000)
    } else if (curIdx > (children as JSX.Element[]).length - 1) {
      window.setTimeout(() => {
        setIdx(0)
        setChangeStyle(TRANSITION.NONE)
      }, 1000)
    }
    setIdx(curIdx)
    setChangeStyle(TRANSITION.EASE)
  }, [idx, children])

  const layout = useCallback(function (): string | JSX.Element | JSX.Element[] {
    if (Object.prototype.toString.call(children) === '[object Array]') {
      const head = (children as JSX.Element[])[(children as JSX.Element[]).length - 1]
      const tail = (children as JSX.Element[])[0]
      return (
        <>
          {head}
          {children}
          {tail}
        </>
      )
    } else {
      return children
    }
  }, [children])

  return (
    <div className={styles.slide}>
      <div className='slide-content' style={{ transform: `translate3d(${-100 - (100 * idx)}%,0,0)`, transition: changeStyle }}>
        {layout()}
      </div>
    </div>
  )
})

export default Slide
