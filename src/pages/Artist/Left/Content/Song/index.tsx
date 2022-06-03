/**
 * 歌手歌曲
 */
import React, { useState, useEffect, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { SONG, MV, ALBUM } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { getArtists, cancelArtist } from 'network/artist'
import { getCheckMusic } from 'network/song'
import { formatDate, songFilter } from 'utils'
import PubSub, { PUBSUB } from '@/utils/PubSub'
import PlayBtn from 'common/PlayBtn'

interface IProps {
  id: string
}

function Song(props: IProps) {
  const { id } = props
  // songs
  const [songs, setSongs] = useState<{ [propName: string]: any }[]>([])

  // 以下是处理歌曲项
  const addSong = useAddSong()
  const playSong = usePlaySong()
  const addSongClick = useCallback((id: number | string) => {

    songFilter(id, addSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [addSong])
  const playSongClick = useCallback((id: number | string) => {

    songFilter(id, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [playSong])
  const addSongsClick = useCallback(() => {
    songs.forEach((song: { [propName: string]: any }) => {
      const { id } = song

      getCheckMusic(id).then((res: any) => {
        try {
          if (res.success) {
            addSong(song)
          }
        } catch (e) {
          PubSub.publish(PUBSUB.TOAST_SHOW, {
            showWran: 'err',
            txt: '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）'
          })
        }
      })
    })
  }, [songs, addSong])
  const playSongsClick = useCallback(() => {
    addSongsClick()
    playSongClick(songs[0]?.id ?? 0)
  }, [addSongsClick, playSongClick, songs])

  useEffect(() => {
    getArtists(id).then((res: any) => {
      if (res.hotSongs) {
        setSongs(res.hotSongs)
      }
    }).catch(rej => {

    })

    return () => {
      cancelArtist.cancelGetArtists && cancelArtist.cancelGetArtists()
    }
  }, [id])

  return (
    <div className='artsong'>
      {/* 按钮 */}
      <div className='btns'>
        <PlayBtn playFunc={playSongsClick} addFunc={addSongsClick} />
        <i className='btn-img u-btni btni u-btn-3'>
          <i className='btn-fav btn-img'>收藏热门{songs.length}</i>
        </i>
      </div>
      {/* 歌曲列表 */}
      <div className='hotsong-list'>
        <table className='m-table m-table-1 m-table-4'>
          <tbody>
            {
              songs.map((song: { [propName: string]: any }, index: number) => {
                const { id, name, mv, dt, al, alia } = song
                const { id: alId, name: alName } = al ?? {}

                return <tr key={id} className={index % 2 === 0 ? 'even ' : ''}>
                  <td className='w1'>
                    <div className='hd'>
                      <span className='num'>{index + 1}</span>
                      <i className='ply' onClick={() => playSongClick(id)}>&nbsp;</i>
                    </div>
                  </td>
                  <td>
                    <div className='tt'>
                      <div className='ttc'>
                        <span className='txt'>
                          <Link title={name} className='hover' to={`${SONG}?id=${id}`}>{name}</Link>
                          {alia?.[0] ? <span className='s-fc8' title={alia?.[0]}>{` - (${alia?.[0]})`}</span> : <></>}
                          {mv ? <Link to={MV + `?id=${mv}`} title="播放mv" className="mv table-img">MV</Link> : ''}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='w2-1 s-fc3'>
                    <span className='u-dur'>{formatDate(new Date(dt), 'mm:ss')}</span>
                    <div className='hshow'>
                      <span className='pointer icon1 u-btn u-icn81' title="添加到播放列表" onClick={() => addSongClick(id)}></span>
                      <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
                      <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
                      <span className='pointer table-img u-btn icn icn-dl' title="下载"></span>
                    </div>
                  </td>
                  <td className='w4'>
                    <div className='text'>
                      <Link className='hover' to={ALBUM + `?id=${alId}`} title={alName}>{alName}</Link>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default memo(Song)
