/**
 * 歌手页
 */
import React from 'react'
import ArtistItem from 'common/ArtistItem'

interface IProps {
  data: { [propName: string]: any }
}

function Artists(props: IProps) {
  const { data: artists } = props

  return (
    <div className='artists'>
      <ul>
        {
          artists.artists && artists.artists.map((item: any) => <ArtistItem key={item.id} artist={item} />)
        }
      </ul>
    </div>
  )
}

export default Artists
