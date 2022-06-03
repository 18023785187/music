/**
 * 窗口卡片标题
 */
import React, { MouseEvent, memo } from 'react'

interface IPorps {
  target: React.RefObject<HTMLDivElement>,
  title: string
}

function Title(props: IPorps) {
  const { target, title } = props
  let offsetWidth = 0
  let offsetHeight = 0

  // 拖拽函数
  const onMouseDown = (e: MouseEvent) => {
    if (target.current) {
      offsetWidth = target.current.offsetWidth
      offsetHeight = target.current.offsetHeight
    }
    const onMouseMove = (e: globalThis.MouseEvent) => {
      let posX: number = e.pageX - disX
      let posY: number = e.pageY - disY
      let windowW: number = window.innerWidth - offsetWidth
      let windowH: number = window.innerHeight - offsetHeight

      if (posX <= 0) posX = 0
      if (posY <= 0) posY = 0
      if (posX >= windowW) posX = windowW
      if (posY >= windowH) posY = windowH
      target.current!.style.left = posX + 'px'
      target.current!.style.top = posY + 'px'
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const disX: number = e.pageX - parseInt(target.current!.style.left)
    const disY: number = e.pageY - parseInt(target.current!.style.top)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      className='shade-title'
      onMouseDown={onMouseDown}
    >
      {title}
    </div>
  )
}

export default memo(Title)
