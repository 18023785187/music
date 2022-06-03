/**
 * 名次项
 */
import React, { useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { SONG } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { getSongDetail } from 'network/song'

interface IProps {
  item: any,
  index: number
}

function Item(props: IProps) {
  const { item, index } = props
  const { id, name } = item
  const addSong = useAddSong()
  const playSong = usePlaySong()

  const addSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        addSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [addSong])

  const playSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        playSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [playSong])

  return (
    <li>
      <span className={`no ${index <= 3 ? 'no-top' : ''}`}>{index}</span>
      <Link className='hover f-thide' to={`${SONG}?id=${id}`} title={name}>{name}</Link>

      <div className='oper'>
        <i className='v-hd2 pointer s-bg-11' title='播放' onClick={() => playSongClick(item.id)}></i>
        <i className='icon1 pointer u-icn-81' title='添加到播放列表' onClick={() => addSongClick(item.id)}></i>
        <i className='v-hd2 pointer s-bg-12' title='收藏'></i>
      </div>
    </li>
  )
}

export default memo(Item)
