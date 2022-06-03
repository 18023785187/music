/**
 * 歌词页
 */
import React from 'react'
import Lyric from 'common/Lyric'

interface IProps {
  data: { [propName: string]: any }
}

function Lyrics(props: IProps) {
  const { data: songs } = props

  return (
    <div className='lyrics'>
      {
        songs.songs && songs.songs.map((item: any, index: number) => <Lyric key={item.id} lyric={item} even={index % 2 === 1} />)
      }
    </div>
  )
}

export default Lyrics
