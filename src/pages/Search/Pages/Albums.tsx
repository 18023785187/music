/**
 * 专辑页
 */
import React from 'react'
import Album from 'common/Album'

interface IProps {
  data: { [propsName: string]: any }
}

function Albums(props: IProps) {
  const { data: albums } = props

  return (
    <div className='albums'>
      <Album albums={albums.albums ? albums.albums : ([])} />
    </div>
  )
}

export default Albums
