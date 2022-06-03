/**
 * 播放按钮
 */
import React, { memo } from 'react'

interface IProps {
  playFunc: () => void,
  addFunc: () => void
}

function PlayBtn(props: IProps) {
  const { playFunc, addFunc } = props

  return (
    <div>
      <i className='btn-img u-btn2 u-btn2-2' title='播放' onClick={playFunc}>
        <i className='btn-img u-btn2'>
          <em className='ply btn-img'></em>
          播放
        </i>
      </i>
      <i className="btn-img u-btni btn-add" title="添加到播放列表" onClick={addFunc}></i>
    </div>
  )
}

export default memo(PlayBtn)
