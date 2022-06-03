/**
 * 左边的主体
 */
import React, { memo } from 'react'

interface IProps {
  id: string
}

function Content(props: IProps) {
  // const { id } = props

  return (
    <div className='playlist-content'>
    </div>
  )
}

export default memo(Content)
