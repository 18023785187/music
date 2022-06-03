/**
 * 全屏标题
 */
import React, { useCallback, memo, MouseEvent } from 'react'

interface IProps {
  titleName: string
}

function FullscreenNav(props: IProps) {
  const { titleName } = props

  const likeClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])
  const subClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])
  const shareClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <div className='opbar'>
      <h2 className='tt fthide'>{titleName}</h2>
      <ul className='ops'>
        <li className='itm'>
          <i className='icn icn-like pointer' onClick={likeClick}></i>
        </li>
        <li className='itm'>
          <i className='icn icn-sub pointer' onClick={subClick}></i>
        </li>
        <li className='itm'>
          <i className='icn icn-share pointer' onClick={shareClick}></i>
        </li>
      </ul>
    </div>
  )
}

export default memo(FullscreenNav)
