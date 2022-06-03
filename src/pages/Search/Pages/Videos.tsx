/**
 * 视频页
 */
import React from 'react'
import VideoItem from 'common/VideoItem'

interface IProps {
  data: { [propName: string]: any }
}

function Videos(props: IProps) {
  const { data: videos } = props

  return (
    <div className='videos'>
      <ul>
        {
          videos.videos && videos.videos.map((item: any) => <VideoItem key={item.vid} video={item} />)
        }
      </ul>
    </div>
  )
}

export default Videos
