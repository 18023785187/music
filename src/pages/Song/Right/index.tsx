/**
 * 右边
 */
import React, { useState, useEffect, useCallback, memo, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SONG, ARTIST } from 'pages/path'
import About from 'common/About'
import { getSimiSong, cancelGetSong } from 'network/song'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { songFilter } from 'utils'

interface IProps {
  id: string
}

function Right(props: IProps) {
  const { id } = props

  const [simiSongs, setSimiSongs] = useState<{ [propName: string]: any }[]>([])

  const addSong = useAddSong()
  const playSong = usePlaySong()

  const addSongClick = useCallback((id: number | string) => {

    songFilter(id, addSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [addSong])

  const playSongClick = useCallback((id: number | string) => {

    songFilter(id, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [playSong])

  useEffect(() => {
    getSimiSong(id).then((res: any) => {
      if (res.songs) {
        setSimiSongs(res.songs)
      }
    }).catch(rej => {

    })

    return () => {
      cancelGetSong.cancelGetSimiSong && cancelGetSong.cancelGetSimiSong()
    }
  }, [id])

  /* 相似歌曲展示区 */
  const SimiSongs = useMemo(() => {
    return simiSongs.map((simiSong: any) => {
      const { id, name, artists } = simiSong

      return (
        <li key={id}>
          {/* 歌曲详情 */}
          <div className='txt'>
            <div className='f-thide'>
              <Link className='s-fc1 hover' to={SONG + `?id=${id}`} title={name}>{name}</Link>
            </div>
            <div className='f-thide s-fc4'>
              <span title={artists.map((a: any) => a.name).join('/')}>
                {
                  artists.map((a: any, i: number) => {
                    const { id, name } = a

                    return i !== artists.length - 1 ? (
                      <Fragment key={id}>
                        <Link className='f-thide hover s-fc4' to={ARTIST + `?id=${id}`}>{name}</Link>
                        /
                      </Fragment>
                    ) : (
                      <Link key={id} className='f-thide hover s-fc4' to={ARTIST + `?id=${id}`}>{name}</Link>
                    )
                  })
                }
              </span>
            </div>
          </div>
          {/* 歌曲播放与添加 */}
          <div className='opr'>
            <i className='play icon2 pointer' onClick={() => { playSongClick(id) }}></i>
            <i className='add icon2 pointer' onClick={() => { addSongClick(id) }}></i>
          </div>
        </li>
      )
    })
  }, [simiSongs, playSongClick, addSongClick])

  return (
    <div className='song-right'>
      <div className='g-sd4'>
        <div className='g-wrap7'>
          {/* 相似歌曲 */}
          <h3 className='u-hd3'>
            <span>相似歌曲</span>
          </h3>
          <ul className='m-sglist'>
            {SimiSongs}
          </ul>
          {/* 关于 */}
          <About />
        </div>
      </div>
    </div>
  )
}

export default memo(Right)
