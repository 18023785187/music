/**
 * 右边
 */
import React, { memo } from 'react'
import About from 'common/About'

interface IProps {
  id: string
}

function Right(props: IProps) {
  // const { id } = props

  return (
    <div className='album-right'>
      <div className='g-sd4'>
        <div className='g-wrap7'>
          {/* 关于 */}
          <About />
        </div>
      </div>
    </div>
  )
}

export default memo(Right)
