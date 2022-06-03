/**
 * 音量调节
 */
import React, { useState, useRef, useEffect, useCallback, MouseEvent, memo } from 'react'
import wLocalStoreage, { VIDEO_VOLUME } from 'utils/localStorage'

const videoVolume = wLocalStoreage.getItem(VIDEO_VOLUME)
if (videoVolume === null && videoVolume === undefined) {
  wLocalStoreage.setItem(VIDEO_VOLUME, '1')
}

interface IProps {
  changeVolume: (volume: number) => void
}

function Volume(props: IProps) {
  const { changeVolume } = props
  // 音量范围 0 ~ 100
  const [height, setHeight] = useState<number>(parseFloat(wLocalStoreage.getItem(VIDEO_VOLUME) as string) * 100)
  const flagRef = useRef<boolean>(false)
  const startPosRef = useRef<number>(0)
  const endPosRef = useRef<number>(height)
  // 标杆，高度元素
  const sliderElRef = useRef<HTMLDivElement>(null)
  const sliderH = useRef<number>(0)

  const mouseDown = useCallback((e: MouseEvent) => {
    flagRef.current = true
    startPosRef.current = e.pageY
  }, [])
  const mouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()
    if (!sliderH.current) sliderH.current = sliderElRef.current?.offsetHeight ?? 0

    if (flagRef.current === true) {
      // 移动的像素
      const pos = 1 - (e.pageY - startPosRef.current) / sliderH.current - (endPosRef.current ? (1 - (endPosRef.current) / 100) : 0)

      if (pos <= 0) {
        setHeight(0)
        changeVolume(0)
        wLocalStoreage.setItem(VIDEO_VOLUME, '0')
      } else if (pos >= 1) {
        setHeight(100)
        changeVolume(1)
        wLocalStoreage.setItem(VIDEO_VOLUME, '1')
      } else {
        setHeight(pos * 100)
        changeVolume(pos)
        wLocalStoreage.setItem(VIDEO_VOLUME, pos.toString())
      }
    }
  }, [changeVolume])

  //
  useEffect(() => {
    document.addEventListener('mouseup', MouseUp)

    function MouseUp() {
      flagRef.current = false
      startPosRef.current = 0
      endPosRef.current = height
    }

    return () => {
      document.removeEventListener('mouseup', MouseUp)
    }
  }, [height])

  return (
    <div className='volume'>
      <i className={`mute pointer ${height ? '' : 'z-mute'}`}></i>
      <div className='sliderbg' onMouseMove={mouseMove}>
        <div className='slider' ref={sliderElRef}>
          <div className='out' style={{ height: `${height}%` }}>
            <div className='in'>
              <span className='dot' onMouseDown={mouseDown}></span>
            </div>
          </div>
        </div>
        <i className='arrow'></i>
      </div>
    </div>
  )
}

export default memo(Volume)
